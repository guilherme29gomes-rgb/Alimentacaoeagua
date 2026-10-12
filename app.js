'use strict';

/* =========================================================
   HidraFit — água + nutrição para ganho de massa magra
   Tudo roda no navegador; dados ficam no localStorage.
   ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const round = (v, step = 1) => Math.round(v / step) * step;

/* ---------------- App Android (Capacitor) ----------------
   No APK, os lembretes viram notificações nativas agendadas no sistema,
   que chegam mesmo com o app fechado. No navegador, nada disso existe. */
const Native = (() => {
  const cap = window.Capacitor;
  const isNative = !!(cap && cap.isNativePlatform && cap.isNativePlatform());
  return { isNative, LN: isNative && cap.Plugins ? cap.Plugins.LocalNotifications : null };
})();

/* ---------------- Armazenamento ---------------- */
const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem('hf_' + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('hf_' + key, JSON.stringify(value)); } catch { /* sem espaço / modo privado */ }
  },
};

/* ---------------- Datas e horários ---------------- */
const dateKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const toMin = hhmm => { const [h, m] = String(hhmm || '0:0').split(':').map(Number); return h * 60 + (m || 0); };
const fmtTime = min => {
  const m = ((Math.round(min) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
const nowMinutes = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

/** Converte horários do dia para uma linha do tempo que começa ao acordar
 *  (assim "dormir 01:00" vira 25:00 e as contas não quebram). */
function dayClock(p) {
  const wake = toMin(p.wake);
  const norm = m => (m < wake ? m + 1440 : m);
  let sleep = norm(toMin(p.sleep));
  if (sleep - wake < 8 * 60) sleep = wake + 16 * 60; // valor absurdo → assume 16 h acordado
  return { wake, sleep, norm, now: () => norm(nowMinutes()) };
}

/* =========================================================
   CÁLCULOS
   ========================================================= */
const ACTIVITY = {
  sed: { f: 1.2, label: 'Sedentário' },
  leve: { f: 1.375, label: 'Levemente ativo' },
  ativo: { f: 1.55, label: 'Ativo' },
  muito: { f: 1.725, label: 'Muito ativo' },
};
const SURPLUS = { leve: 0.10, moderado: 0.15 };
const KCAL_PER_TRAIN_MIN = 7; // musculação moderada/intensa ≈ 5–8 kcal/min

function isTrainingDay(p, d = new Date()) {
  const override = store.get('dayOverride', {})[dateKey(d)];
  if (override !== undefined) return override;
  return p.trainDays.includes(d.getDay());
}

function bmiInfo(p) {
  const h = p.height / 100;
  const bmi = p.weight / (h * h);
  const label = bmi < 18.5 ? 'abaixo do peso' : bmi < 25 ? 'peso adequado' : bmi < 30 ? 'sobrepeso' : 'obesidade';
  return { bmi, label, ideal: 22 * h * h };
}

/** Peso de referência: o real, ou o ajustado quando bem acima do ideal para a altura. */
function leanRefWeight(p) {
  const { ideal } = bmiInfo(p);
  if (p.weight > ideal * 1.25) return { refWeight: ideal + 0.4 * (p.weight - ideal), adjusted: true };
  return { refWeight: p.weight, adjusted: false };
}

/** Meta de água: 35 ml/kg (30 ml/kg acima de 55 anos).
 *  Para quem está bem acima do peso ideal (calculado pela altura) usa
 *  o peso ajustado, pois gordura retém pouca água.
 *  Dias de treino: +500 ml por hora de treino. */
function waterGoal(p, training) {
  const { refWeight, adjusted } = leanRefWeight(p);
  const mlPerKg = p.age > 55 ? 30 : 35;
  const base = refWeight * mlPerKg;
  const extra = training ? (p.trainDuration / 60) * 500 : 0;
  const goal = clamp(round(base + extra, 50), 1500, 5000);
  return { goal, base: round(base, 50), extra: round(extra, 50), mlPerKg, refWeight, adjusted };
}

/** Calorias e macros para ganho de massa magra (lean bulk). */
function nutritionTargets(p, training) {
  const bmr = 10 * p.weight + 6.25 * p.height - 5 * p.age + (p.gender === 'm' ? 5 : -161);
  const daily = bmr * ACTIVITY[p.activity].f;
  const trainKcal = training ? p.trainDuration * KCAL_PER_TRAIN_MIN : 0;
  const tdee = daily + trainKcal;
  const kcal = round(tdee * (1 + SURPLUS[p.surplus]), 10);
  const { refWeight } = leanRefWeight(p);
  const protein = round(refWeight * (p.gender === 'm' ? 2.0 : 1.8));
  let fat = round(refWeight * 0.9);
  if (fat * 9 < kcal * 0.2) fat = round(kcal * 0.2 / 9);
  const carbs = Math.max(0, round((kcal - protein * 4 - fat * 9) / 4));
  return { bmr: round(bmr), tdee: round(tdee), kcal, protein, fat, carbs };
}

/* =========================================================
   BANCO DE ALIMENTOS (valores por 100 g — base TACO/USDA aprox.)
   tags: meat, fish, egg, dairy(lactose)
   ========================================================= */
const FOODS = {
  // proteínas
  ovos:        { name: 'Ovos (cozidos ou mexidos)', kcal: 143, p: 13, c: 1, f: 9.5, tags: ['egg'], unit: { g: 50, s: 'ovo', pl: 'ovos' }, max: 200 },
  grego:       { name: 'Iogurte grego', kcal: 105, p: 6, c: 9, f: 5, tags: ['dairy'], unit: { g: 100, s: 'pote', pl: 'potes' }, max: 200 },
  frango:      { name: 'Peito de frango grelhado', kcal: 159, p: 32, c: 0, f: 2.5, tags: ['meat'], max: 250, min: 100 },
  patinho:     { name: 'Carne moída (patinho)', kcal: 219, p: 35.9, c: 0, f: 7.3, tags: ['meat'], max: 220, min: 100 },
  tilapia:     { name: 'Filé de tilápia', kcal: 128, p: 26, c: 0, f: 2.7, tags: ['fish'], max: 250, min: 100 },
  atum:        { name: 'Atum em lata (em água)', kcal: 116, p: 26, c: 0, f: 1, tags: ['fish'], unit: { g: 120, s: 'lata', pl: 'latas' }, max: 240 },
  whey:        { name: 'Whey protein', kcal: 400, p: 80, c: 8, f: 6, tags: ['dairy'], unit: { g: 30, s: 'scoop', pl: 'scoops', half: true }, max: 60 },
  claras:      { name: 'Claras de ovo', kcal: 52, p: 11, c: 0.7, f: 0.2, tags: ['egg'], unit: { g: 33, s: 'clara', pl: 'claras' }, max: 200 },
  // menos comuns: só entram quando as opções acima não servem (vegano, sem lactose...)
  cottage:     { name: 'Queijo cottage', kcal: 98, p: 11, c: 3.4, f: 4.3, tags: ['dairy'], max: 200, rare: true },
  tofu:        { name: 'Tofu firme', kcal: 144, p: 15.8, c: 2.8, f: 8.7, tags: [], max: 250, min: 100, rare: true },
  soja:        { name: 'Proteína de soja (PTS) cozida', kcal: 120, p: 17, c: 10, f: 0.5, tags: [], max: 250, min: 100, rare: true },
  protveg:     { name: 'Proteína vegetal em pó', kcal: 380, p: 75, c: 6, f: 7, tags: [], unit: { g: 30, s: 'scoop', pl: 'scoops', half: true }, max: 60, rare: true },
  lentilha:    { name: 'Lentilha cozida', kcal: 116, p: 9, c: 20, f: 0.4, tags: [], max: 250, rare: true },

  // carboidratos
  banana:      { name: 'Banana', kcal: 98, p: 1.3, c: 26, f: 0.1, tags: [], unit: { g: 90, s: 'banana', pl: 'bananas' }, max: 270 },
  aveia:       { name: 'Aveia em flocos', kcal: 394, p: 13.9, c: 66.6, f: 8.5, tags: [], unit: { g: 15, s: 'colher de sopa', pl: 'colheres de sopa' }, max: 90 },
  neston:      { name: 'Neston', kcal: 386, p: 9, c: 78, f: 4, tags: [], unit: { g: 10, s: 'colher de sopa', pl: 'colheres de sopa' }, max: 50 },
  paofrances:  { name: 'Pão francês', kcal: 300, p: 8, c: 58.6, f: 3.1, tags: [], unit: { g: 50, s: 'pão', pl: 'pães' }, max: 150 },
  pao:         { name: 'Pão de forma integral', kcal: 253, p: 9.4, c: 49.9, f: 3.7, tags: [], unit: { g: 25, s: 'fatia', pl: 'fatias' }, max: 125 },
  tapioca:     { name: 'Tapioca', kcal: 240, p: 0, c: 60, f: 0, tags: [], max: 120 },
  cuscuz:      { name: 'Cuscuz de milho', kcal: 113, p: 2.2, c: 25.3, f: 0.7, tags: [], max: 300 },
  arroz:       { name: 'Arroz branco', kcal: 128, p: 2.5, c: 28, f: 0.2, tags: [], max: 350 },
  batatadoce:  { name: 'Batata-doce cozida', kcal: 77, p: 0.6, c: 18.4, f: 0.1, tags: [], max: 450 },
  batata:      { name: 'Batata cozida', kcal: 52, p: 1.2, c: 11.9, f: 0.1, tags: [], max: 450 },
  macarrao:    { name: 'Macarrão cozido', kcal: 157, p: 5.8, c: 30.9, f: 0.9, tags: [], max: 300 },
  mandioca:    { name: 'Mandioca cozida', kcal: 125, p: 0.6, c: 30, f: 0.3, tags: [], max: 350 },

  // gorduras boas
  pasta:       { name: 'Pasta de amendoim', kcal: 588, p: 25, c: 20, f: 50, tags: [], unit: { g: 15, s: 'colher de sopa', pl: 'colheres de sopa' }, max: 45 },
  azeite:      { name: 'Azeite', kcal: 884, p: 0, c: 0, f: 100, tags: [], unit: { g: 8, s: 'colher de sopa', pl: 'colheres de sopa' }, max: 24 },
  castanha:    { name: 'Castanhas ou amendoim', kcal: 607, p: 15, c: 20, f: 54, tags: [], max: 40 },
  abacate:     { name: 'Abacate', kcal: 96, p: 1.2, c: 6, f: 8.4, tags: [], max: 150 },

  // acompanhamentos com quantidade fixa
  feijao:      { name: 'Feijão (1 concha)', kcal: 76, p: 4.8, c: 13.6, f: 0.5, tags: [] },
  salada:      { name: 'Salada à vontade', kcal: 15, p: 1.3, c: 2.5, f: 0.2, tags: [] },
  legumes:     { name: 'Legumes (cenoura, brócolis...)', kcal: 35, p: 2.4, c: 7, f: 0.3, tags: [] },
  fruta:       { name: 'Fruta (mamão, maçã...)', kcal: 45, p: 0.6, c: 11, f: 0.2, tags: [] },
};

/* Alimentos que aparecem no cadastro (para excluir ou marcar como favorito) */
const CHOOSABLE = ['banana', 'aveia', 'grego', 'ovos', 'neston', 'whey', 'frango', 'patinho', 'tilapia', 'atum',
  'arroz', 'feijao', 'batatadoce', 'batata', 'macarrao', 'mandioca', 'paofrances', 'pao', 'tapioca', 'cuscuz',
  'pasta', 'castanha', 'abacate'];
const DEFAULT_FAVORITES = ['banana', 'aveia', 'grego', 'ovos', 'neston'];
const favoritesOf = p => (Array.isArray(p.favorites) ? p.favorites : DEFAULT_FAVORITES);

/* Cada tipo de refeição: peso relativo de cada macro + opções por categoria (as mais comuns primeiro). */
const MEAL_TYPES = {
  cafe:   { name: 'Café da manhã', icon: '☕', w: { p: 1.0, c: 1.0, f: 1.0 },
            protein: ['ovos', 'grego', 'whey', 'claras', 'tofu', 'protveg'],
            carb: ['banana', 'aveia', 'paofrances', 'neston', 'pao', 'tapioca', 'cuscuz'], fat: ['pasta', 'castanha'] },
  almoco: { name: 'Almoço', icon: '🍛', w: { p: 1.4, c: 1.4, f: 1.2 },
            protein: ['frango', 'patinho', 'tilapia', 'ovos', 'tofu', 'soja'],
            carb: ['arroz', 'arroz', 'arroz', 'arroz', 'batatadoce', 'macarrao', 'batata', 'mandioca'], fat: ['azeite'], // arroz e feijão na maioria dos dias
            fixed: [['feijao', 140], ['salada', 80], ['legumes', 100]], fallbackProtein: 'lentilha' },
  jantar: { name: 'Jantar', icon: '🍽️', w: { p: 1.3, c: 1.1, f: 1.1 },
            protein: ['frango', 'patinho', 'ovos', 'tilapia', 'atum', 'tofu', 'soja'],
            carb: ['arroz', 'batatadoce', 'arroz', 'macarrao', 'batata', 'mandioca'], fat: ['azeite', 'abacate'],
            fixed: [['salada', 80], ['legumes', 120]], fallbackProtein: 'lentilha' },
  lanche: { name: 'Lanche', icon: '🥪', w: { p: 0.7, c: 0.7, f: 0.8 },
            protein: ['grego', 'ovos', 'whey', 'atum', 'cottage', 'protveg'],
            carb: ['banana', 'aveia', 'neston', 'paofrances', 'pao', 'tapioca'], fat: ['pasta', 'castanha', 'abacate'] },
  pre:    { name: 'Pré-treino', icon: '⚡', w: { p: 0.5, c: 1.0, f: 0.2 },
            protein: ['whey', 'grego', 'claras', 'protveg'],
            carb: ['banana', 'aveia', 'neston', 'tapioca', 'paofrances'], fat: [] },
  pos:    { name: 'Pós-treino', icon: '💪', w: { p: 1.0, c: 1.2, f: 0.2 },
            protein: ['whey', 'frango', 'ovos', 'protveg', 'soja'],
            carb: ['banana', 'arroz', 'batatadoce', 'aveia', 'tapioca'], fat: [] },
  ceia:   { name: 'Ceia', icon: '🌙', w: { p: 0.8, c: 0.2, f: 0.8 },
            protein: ['grego', 'ovos', 'cottage', 'tofu', 'protveg'],
            carb: ['banana', 'fruta'], fat: ['pasta', 'castanha', 'abacate'] },
};
const MAIN_MEALS = ['cafe', 'almoco', 'jantar'];

function allowedFood(p) {
  const excluded = new Set(p.exclude || []);
  return id => {
    const f = FOODS[id];
    if (!f || excluded.has(id)) return false;
    if (p.diet !== 'onivoro' && (f.tags.includes('meat') || f.tags.includes('fish'))) return false;
    if (p.diet === 'vegano' && (f.tags.includes('egg') || f.tags.includes('dairy'))) return false;
    if (p.noLactose && f.tags.includes('dairy') && id !== 'whey') return false; // whey isolado costuma ser ok
    if (p.noLactose && id === 'whey' && p.diet === 'vegano') return false;
    return true;
  };
}

/* ---------------- Horários das refeições ---------------- */
function buildSchedule(p, training, kcal) {
  const clk = dayClock(p);
  const meals = [{ type: 'cafe', time: clk.wake + 30 }];
  const lunch = clk.norm(toMin(p.lunch));
  const dinner = clk.norm(toMin(p.dinner));
  if (lunch > clk.wake + 150) meals.push({ type: 'almoco', time: lunch });
  if (dinner > lunch + 180 && dinner < clk.sleep - 30) meals.push({ type: 'jantar', time: dinner });
  const last = meals[meals.length - 1].time;
  if (clk.sleep - 60 - last >= 120) meals.push({ type: 'ceia', time: clk.sleep - 60 });
  meals.sort((a, b) => a.time - b.time);

  // Preenche intervalos longos com lanches (comer a cada ~3 h)
  const filled = [];
  meals.forEach((m, i) => {
    filled.push(m);
    const next = meals[i + 1];
    if (!next) return;
    const gap = next.time - m.time;
    const k = Math.max(0, Math.floor((gap - 90) / 180));
    for (let j = 1; j <= k; j++) filled.push({ type: 'lanche', time: m.time + (gap * j) / (k + 1) });
  });
  let list = filled;

  if (training && p.trainTime) {
    let t = clk.norm(toMin(p.trainTime));
    if (t > clk.sleep) t -= 1440; // treina logo cedo, antes do horário de acordar informado
    const d = p.trainDuration;
    // nada de lanche no meio do treino
    list = list.filter(m => !(m.type === 'lanche' && m.time > t - 30 && m.time < t + d + 15));
    if (t - 45 < clk.wake + 30) {
      // treino logo ao acordar: não dá tempo de comer antes → café vira o pós-treino
      const cafe = list.find(m => m.type === 'cafe');
      cafe.time = Math.max(t + d + 20, clk.wake + 15);
      cafe.tag = 'pos';
      list = list.filter(m => m === cafe || m.type !== 'lanche' || Math.abs(m.time - cafe.time) >= 120);
    } else {
      list = placeTrainingMeal(list, t - 60, 'pre', clk);
      list = placeTrainingMeal(list, t + d + 30, 'pos', clk);
    }
  }
  list.sort((a, b) => a.time - b.time);

  // Quem precisa de menos calorias não precisa de tantas refeições
  const maxMeals = !kcal ? 7 : kcal < 2200 ? 5 : kcal < 2800 ? 6 : 7;
  while (list.length > maxMeals) {
    let best = -1, bestGap = Infinity;
    list.forEach((m, i) => {
      if (m.type !== 'lanche' || i === 0 || i === list.length - 1) return;
      const gap = list[i + 1].time - list[i - 1].time;
      if (gap < bestGap) { bestGap = gap; best = i; }
    });
    if (best < 0) break;
    list.splice(best, 1);
  }
  return list.map((m, i) => ({ ...m, time: round(m.time, 5), id: `${m.type}-${i}` }));
}

function placeTrainingMeal(list, time, type, clk) {
  time = clamp(time, clk.wake + 15, clk.sleep - 20);
  const main = list.find(m => MAIN_MEALS.includes(m.type) && !m.tag && Math.abs(m.time - time) <= 75);
  if (main) { main.tag = type; return list; }
  const out = list.filter(m => !((m.type === 'lanche' || m.type === 'ceia') && Math.abs(m.time - time) < 100));
  // pré e pós colados (treino curto ou fora do horário acordado): fica só o pós
  if (type === 'pos') {
    const pre = out.find(m => m.type === 'pre' && Math.abs(m.time - time) < 60);
    if (pre) { pre.type = 'pos'; return out; }
  }
  out.push({ type, time });
  return out;
}

/* ---------------- Montagem das refeições ---------------- */
function portion(food, grams) {
  let g = clamp(Math.max(grams, food.min || 0), 0, food.max || 9999);
  let label;
  if (food.unit) {
    const step = food.unit.half ? 0.5 : 1;
    const n = Math.max(step, round(g / food.unit.g, step));
    g = n * food.unit.g;
    const whole = Math.floor(n);
    const num = (whole || '') + (n % 1 ? '½' : '');
    label = `${num} ${n <= 1 ? food.unit.s : food.unit.pl}`;
  } else {
    g = Math.max(10, round(g, 10));
    label = `${g} g`;
  }
  return { g, label };
}

function buildMeal(type, target, allowed, alt, favorites = [], uses = {}) {
  const def = MEAL_TYPES[type];
  const items = [];
  const rem = { ...target };
  const add = (id, grams, fixed = false) => {
    const food = FOODS[id];
    const { g, label } = fixed ? { g: grams, label: `${grams} g` } : portion(food, grams);
    const k = g / 100;
    const item = { id, name: food.name, label, kcal: food.kcal * k, p: food.p * k, c: food.c * k, f: food.f * k };
    items.push(item);
    rem.p -= item.p; rem.c -= item.c; rem.f -= item.f;
    return g >= (food.max || 9999); // true = chegou no limite
  };
  // Só alimentos permitidos; os "raros" (tofu, PTS...) só se não houver opção comum.
  // Favoritos entram 3x no rodízio dos lanches/café → saem com mais frequência.
  // Almoço e jantar ficam com comida de prato (sem bônus de favorito).
  const boost = MAIN_MEALS.includes(type) && type !== 'cafe' ? 0 : 2;
  const options = list => {
    const ok = list.filter(allowed);
    const common = ok.filter(id => !FOODS[id].rare);
    const base = common.length ? common : ok;
    const favs = base.filter(id => favorites.includes(id));
    return [...Array(boost).fill(favs).flat(), ...base];
  };
  const MAX_USES = 2; // mesmo alimento em no máximo 2 refeições por dia

  (def.fixed || []).forEach(([id, g]) => { if (allowed(id)) add(id, g, true); });

  // Carboidrato → proteína → gordura; se a 1ª opção bater no limite, completa com a próxima.
  const fill = (list, macro, minLeft, share = 1) => {
    const opts = options(list);
    const used = new Set();
    for (let i = 0; i < Math.min(2, opts.length); i++) {
      if (rem[macro] <= minLeft) break;
      let k = (alt + i) % opts.length;
      const inMeal = id => used.has(id) || items.some(it => it.id === id);
      const seek = test => { let j = k; for (let t = 0; t < opts.length; t++, j = (j + 1) % opts.length) if (!test(opts[j])) return j; return -1; };
      // 1º: algo ainda não comido hoje; 2º: até 2x no dia; 3º: qualquer um
      const pick = [seek(id => inMeal(id) || (uses[id] || 0) > 0), seek(id => inMeal(id) || (uses[id] || 0) >= MAX_USES)].find(j => j >= 0);
      if (pick !== undefined) k = pick;
      else { // tudo já usado demais hoje: aceita repetir
        for (let tries = 0; (used.has(opts[k]) || items.some(it => it.id === opts[k])) && tries < opts.length; tries++) k = (k + 1) % opts.length;
      }
      const id = opts[k];
      if (used.has(id) || items.some(it => it.id === id)) break;
      used.add(id);
      const per = FOODS[id][macro] / 100;
      if (per <= 0) break;
      if (i > 0 && (rem[macro] * share) / per < 40) break; // complemento pequeno demais: deixa pra lá
      const capped = add(id, (rem[macro] * share) / per);
      if (!capped) break;
    }
  };
  let proteinList = def.protein;
  if (!options(proteinList).length && def.fallbackProtein) proteinList = [def.fallbackProtein];
  if (!options(proteinList).length) proteinList = ['protveg', 'lentilha', 'tofu'];
  // carbo antes da proteína: pães, aveia e feijão também trazem proteína.
  // Deixa ~10% do carbo para o que vem junto com a proteína (iogurte, PTS...).
  fill(def.carb, 'c', 6, 0.9);
  fill(proteinList, 'p', 4);
  fill(def.fat, 'f', 3);

  const tot = items.reduce((a, it) => ({ kcal: a.kcal + it.kcal, p: a.p + it.p, c: a.c + it.c, f: a.f + it.f }),
    { kcal: 0, p: 0, c: 0, f: 0 });
  return { items, total: tot };
}

function buildDayPlan(p, d = new Date()) {
  const training = isTrainingDay(p, d);
  const targets = nutritionTargets(p, training);
  const schedule = buildSchedule(p, training, targets.kcal);
  const allowed = allowedFood(p);
  const alts = store.get('alts', {})[dateKey(d)] || {};
  const dayIndex = Math.floor(d.getTime() / 864e5); // varia o cardápio a cada dia

  const weightOf = m => {
    const w = { ...MEAL_TYPES[m.type].w };
    if (m.tag) { w.f *= 0.5; w.c *= 1.2; } // refeição principal perto do treino: menos gordura, mais carbo
    return w;
  };
  const sum = { p: 0, c: 0, f: 0 };
  schedule.forEach(m => { const w = weightOf(m); sum.p += w.p; sum.c += w.c; sum.f += w.f; });

  const uses = {};
  const meals = schedule.map((m, i) => {
    const w = weightOf(m);
    const target = {
      p: targets.protein * w.p / sum.p,
      c: targets.carbs * w.c / sum.c,
      f: targets.fat * w.f / sum.f,
    };
    const alt = dayIndex + i + (alts[m.id] || 0);
    const meal = buildMeal(m.type, target, allowed, alt + i * 2, favoritesOf(p), uses);
    const fixedIds = (MEAL_TYPES[m.type].fixed || []).map(([id]) => id);
    meal.items.forEach(it => { if (!fixedIds.includes(it.id)) uses[it.id] = (uses[it.id] || 0) + 1; });
    return { ...m, ...meal };
  });
  return { training, targets, meals };
}

/* =========================================================
   ESTADO
   ========================================================= */
let profile = store.get('profile', null);
const settings = Object.assign({ waterRem: true, mealRem: true, interval: 'auto' }, store.get('settings', {}));
const saveSettings = () => { store.set('settings', settings); scheduleNative(); };

const waterLog = () => store.get('water', {});
const todayWater = () => waterLog()[dateKey()] || [];
const sumMl = arr => arr.reduce((a, e) => a + e.ml, 0);

function addWater(ml) {
  ml = Math.round(Number(ml));
  if (!ml || ml < 10 || ml > 3000) { toast('Informe uma quantidade entre 10 e 3000 ml'); return; }
  const before = sumMl(todayWater());
  const log = waterLog();
  const key = dateKey();
  (log[key] = log[key] || []).push({ t: Date.now(), ml });
  store.set('water', log);
  const goal = waterGoal(profile, isTrainingDay(profile)).goal;
  const after = before + ml;
  const drop = $('#drop');
  drop.classList.remove('bounce'); void drop.offsetWidth; drop.classList.add('bounce');
  if (before < goal && after >= goal) { celebrate(); toast('🎉 Meta de água batida! Seu corpo agradece.'); }
  else toast(`+${ml} ml 💧 ${motivation(after / goal)}`);
  renderWater();
  scheduleNative();
}

function removeWater(t) {
  const log = waterLog();
  const key = dateKey();
  log[key] = (log[key] || []).filter(e => e.t !== t);
  store.set('water', log);
  renderWater();
}

function motivation(r) {
  if (r >= 1) return 'Meta cumprida!';
  if (r >= 0.75) return 'Quase lá!';
  if (r >= 0.5) return 'Metade do caminho!';
  if (r >= 0.25) return 'Bom começo, continue!';
  return 'Cada gole conta.';
}

/* ---------- O que já foi comido (por alimento) ----------
   eaten[data][idRefeição] = [idAlimento, ...]
   mealsDone[data] = refeições 100% comidas (usado nos lembretes e no gráfico) */
function eatenSet(plan, key = dateKey()) {
  const day = store.get('eaten', {})[key];
  const legacy = new Set(store.get('mealsDone', {})[key] || []);
  const set = new Set();
  for (const m of plan.meals) {
    const list = day && day[m.id] ? day[m.id] : legacy.has(m.id) ? m.items.map(it => it.id) : [];
    list.forEach(id => set.add(`${m.id}|${id}`));
  }
  return set;
}

function saveEaten(plan, set, key = dateKey()) {
  const all = store.get('eaten', {});
  const day = {};
  for (const m of plan.meals) day[m.id] = m.items.map(it => it.id).filter(id => set.has(`${m.id}|${id}`));
  all[key] = day;
  store.set('eaten', all);
  const done = store.get('mealsDone', {});
  done[key] = plan.meals.filter(m => m.items.every(it => set.has(`${m.id}|${it.id}`))).map(m => m.id);
  store.set('mealsDone', done);
}

function eatenTotals(plan, set) {
  const t = { kcal: 0, p: 0, c: 0, f: 0 };
  plan.meals.forEach(m => m.items.forEach(it => {
    if (set.has(`${m.id}|${it.id}`)) { t.kcal += it.kcal; t.p += it.p; t.c += it.c; t.f += it.f; }
  }));
  return t;
}

/** Itens de refeições cujo horário já passou (+1 h) e que não foram confirmados. */
function pendingItems(plan, set) {
  const now = dayClock(profile).now();
  const out = [];
  plan.meals.forEach(m => {
    if (m.time + 60 > now) return;
    m.items.forEach(it => { if (!set.has(`${m.id}|${it.id}`)) out.push({ meal: m, item: it }); });
  });
  return out;
}

/* =========================================================
   RENDER
   ========================================================= */
const fmtMl = ml => (ml >= 1000 ? `${(ml / 1000).toFixed(ml % 1000 ? 2 : 0).replace('.', ',')} L` : `${ml} ml`);
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

function renderHeader() {
  const h = new Date().getHours();
  const greet = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  $('#hello').textContent = `${greet}, ${profile.name}!`;
  $('#today-label').textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const training = isTrainingDay(profile);
  const badge = $('#day-type');
  badge.textContent = training ? '🏋️ Dia de treino' : '😴 Dia de descanso';
  badge.classList.toggle('rest', !training);
}

function renderWater() {
  const training = isTrainingDay(profile);
  const wg = waterGoal(profile, training);
  const entries = todayWater();
  const total = sumMl(entries);
  const ratio = total / wg.goal;

  // guarda a meta do dia para o histórico/sequência
  const goals = store.get('goals', {});
  goals[dateKey()] = wg.goal;
  store.set('goals', goals);

  const C = 2 * Math.PI * 86;
  const fg = $('#ring-fg');
  fg.style.strokeDasharray = C;
  fg.style.strokeDashoffset = C * (1 - clamp(ratio, 0, 1));
  fg.classList.toggle('done', ratio >= 1);
  $('#water-total').textContent = fmtMl(total);
  $('#water-goal').textContent = `de ${fmtMl(wg.goal)}`;
  $('#water-pct').textContent = `${Math.round(ratio * 100)}%`;

  // ritmo: quanto já deveria ter bebido até agora (meta termina 1 h antes de dormir)
  const clk = dayClock(profile);
  const now = clk.now();
  const end = clk.sleep - 60;
  const expected = round(wg.goal * clamp((now - clk.wake) / (end - clk.wake), 0, 1), 50);
  const pace = $('#water-pace');
  if (ratio >= 1) { pace.textContent = '✅ Meta de hoje cumprida!'; pace.className = 'pace ok'; }
  else if (now > clk.sleep || now < clk.wake) { pace.textContent = `Faltam ${fmtMl(wg.goal - total)} para a meta.`; pace.className = 'pace'; }
  else if (total >= expected) { pace.textContent = `👍 No ritmo! Faltam ${fmtMl(wg.goal - total)}.`; pace.className = 'pace ok'; }
  else { pace.textContent = `⏰ Você está ${fmtMl(expected - total)} atrás do ritmo ideal.`; pace.className = 'pace behind'; }

  const bmi = bmiInfo(profile);
  $('#water-explain').innerHTML =
    `${wg.mlPerKg} ml × ${wg.refWeight.toFixed(1).replace('.', ',')} kg${wg.adjusted ? ' (peso ajustado pela sua altura)' : ''} = <b>${fmtMl(wg.base)}</b>` +
    (wg.extra ? ` + <b>${fmtMl(wg.extra)}</b> pelo treino de hoje` : '') +
    `. IMC ${bmi.bmi.toFixed(1).replace('.', ',')} (${bmi.label}).`;

  const nr = nextWaterReminder();
  $('#next-reminder').textContent = settings.waterRem && profile.reminders
    ? (nr ? `🔔 Próximo lembrete por volta das ${fmtTime(nr)} (a cada ${reminderInterval()} min).` : '🔔 Lembretes pausados até amanhã.')
    : '🔕 Lembretes de água desligados (ative em Perfil).';

  const ul = $('#water-log');
  ul.innerHTML = entries.length
    ? entries.slice().reverse().map(e => `<li><span>💧 <b>${e.ml} ml</b></span><span class="muted">${new Date(e.t).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}<button class="x" data-t="${e.t}" aria-label="Remover registro">✕</button></span></li>`).join('')
    : '<li class="empty">Nenhum registro ainda. Que tal um copo agora?</li>';
}

function renderDiet() {
  const plan = buildDayPlan(profile);
  const t = plan.targets;
  const eatenNow = eatenSet(plan);
  const isMealDone = m => m.items.every(it => eatenNow.has(`${m.id}|${it.id}`));
  renderProteinCounter(plan, eatenNow);
  $('#diet-daytype').textContent = plan.training ? 'Treino: +carbo' : 'Descanso';
  $('#macro-targets').innerHTML = `
    <div><strong>${t.kcal}</strong><span>kcal</span></div>
    <div class="p"><strong>${t.protein} g</strong><span>proteína</span></div>
    <div class="c"><strong>${t.carbs} g</strong><span>carbo</span></div>
    <div class="f"><strong>${t.fat} g</strong><span>gordura</span></div>`;

  const eaten = eatenTotals(plan, eatenNow);
  const bar = (label, val, goal, color, unit) => `
    <div class="bar"><span>${label}</span>
      <div class="track"><div class="fill" style="width:${clamp(val / goal * 100, 0, 100)}%;background:${color}"></div></div>
      <span>${Math.round(val)}/${goal} ${unit}</span></div>`;
  $('#macro-progress').innerHTML =
    bar('Calorias', eaten.kcal, t.kcal, 'var(--primary)', '') +
    bar('Proteína', eaten.p, t.protein, 'var(--p)', 'g') +
    bar('Carbo', eaten.c, t.carbs, 'var(--c)', 'g') +
    bar('Gordura', eaten.f, t.fat, 'var(--f)', 'g');
  $('#diet-explain').textContent =
    `Gasto estimado: ${t.tdee} kcal (metabolismo basal ${t.bmr} kcal × atividade${plan.training ? ' + treino' : ''}). ` +
    `Superávit de ${Math.round(SURPLUS[profile.surplus] * 100)}% para ganhar músculo com o mínimo de gordura. ` +
    `Confirme cada alimento conforme for comendo.` +
    (bmiInfo(profile).bmi >= 30 ? ' ⚠️ Com IMC acima de 30, o ideal costuma ser recomposição (perder gordura enquanto ganha músculo) — converse com um nutricionista.' : '');

  const clk = dayClock(profile);
  const now = clk.now();
  const nextIdx = plan.meals.findIndex(m => !isMealDone(m) && m.time + 45 >= now);
  $('#meal-list').innerHTML = plan.meals.map((m, i) => {
    const def = MEAL_TYPES[m.type];
    const tagTxt = m.tag ? ` · ${MEAL_TYPES[m.tag].name.toLowerCase()}` : '';
    const isDone = isMealDone(m);
    const late = m.time + 60 <= now;
    return `
    <article class="card meal ${isDone ? 'done' : ''} ${i === nextIdx ? 'now' : ''}">
      <div class="meal-head">
        <span class="time">${fmtTime(m.time)}</span>
        <span class="name">${def.icon} ${def.name}${tagTxt}<small>${i === nextIdx ? 'Próxima refeição' : ''}</small></span>
        <input type="checkbox" class="meal-check" data-id="${m.id}" ${isDone ? 'checked' : ''} aria-label="Marcar ${def.name} como feita">
      </div>
      <ul class="foods">${m.items.map(it => {
        const ate = eatenNow.has(`${m.id}|${it.id}`);
        return `<li class="${ate ? 'ate' : late ? 'pending' : ''}"><label>
          <input type="checkbox" class="food-check" data-meal="${m.id}" data-food="${it.id}" ${ate ? 'checked' : ''}>
          <span class="fname">${esc(it.name)}${!ate && late ? '<em>pendente</em>' : ''}</span>
          <span class="qty">${it.label}${it.p >= 1 ? `<b class="p">${Math.round(it.p)}g prot</b>` : ''}</span></label></li>`;
      }).join('')}</ul>
      <div class="meal-foot">
        <span>${Math.round(m.total.kcal)} kcal · <b class="p">P ${Math.round(m.total.p)}g</b> · <b class="c">C ${Math.round(m.total.c)}g</b> · <b class="f">G ${Math.round(m.total.f)}g</b></span>
        <button class="btn small ghost swap" data-id="${m.id}">🔄 Trocar opção</button>
      </div>
    </article>`;
  }).join('');
}

function renderProteinCounter(plan, set) {
  const goal = plan.targets.protein;
  const ate = eatenTotals(plan, set).p;
  const pend = pendingItems(plan, set).filter(x => x.item.p >= 3);
  const pendP = pend.reduce((a, x) => a + x.item.p, 0);
  const pct = clamp(ate / goal, 0, 1) * 100;
  const left = Math.max(0, goal - ate);
  const status = ate >= goal ? '✅ Meta de proteína batida hoje!'
    : `Faltam <b>${Math.round(left)} g</b>` + (pend.length ? ` · <span class="warn">${pend.length} pendente${pend.length > 1 ? 's' : ''} (${Math.round(pendP)} g)</span>` : '');
  const html = `
    <div class="prot-big"><strong>${Math.round(ate)}</strong><span>/ ${goal} g de proteína</span></div>
    <div class="track big"><div class="fill" style="width:${pct}%"></div></div>
    <p class="prot-status">${status}</p>`;
  $('#prot-counter').innerHTML = html + (pend.length ? `
    <p class="small muted">Pendentes — toque para confirmar se comeu:</p>
    <ul class="pend-list">${pend.map(x => `<li><button class="pend-btn" data-meal="${x.meal.id}" data-food="${x.item.id}">
      <span>⏳ ${esc(x.item.name.split(' (')[0])} <small>${x.item.label} · ${MEAL_TYPES[x.meal.type].name} ${fmtTime(x.meal.time)}</small></span>
      <b>+${Math.round(x.item.p)} g ✓</b></button></li>`).join('')}</ul>` : '');
  $('#prot-mini').innerHTML = html;
}

function toggleFood(mealId, foodId, on) {
  const plan = buildDayPlan(profile);
  const set = eatenSet(plan);
  const k = `${mealId}|${foodId}`;
  on ? set.add(k) : set.delete(k);
  saveEaten(plan, set);
  if (on) {
    const it = plan.meals.find(m => m.id === mealId)?.items.find(i => i.id === foodId);
    const p = eatenTotals(plan, set).p;
    toast(it && it.p >= 1 ? `+${Math.round(it.p)} g de proteína 💪 (${Math.round(p)}/${plan.targets.protein} g)` : 'Confirmado ✅');
  }
  renderDiet(); renderProgress();
  scheduleNative();
}

function renderProgress() {
  const log = waterLog();
  const goals = store.get('goals', {});
  const mealsDone = store.get('mealsDone', {});
  const days = [];
  for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days.push(d); }

  const waterVals = days.map(d => {
    const key = dateKey(d);
    const goal = goals[key] || waterGoal(profile, isTrainingDay(profile, d)).goal;
    return { d, ml: sumMl(log[key] || []), goal };
  });
  const maxMl = Math.max(...waterVals.map(v => Math.max(v.ml, v.goal)), 1);
  $('#water-chart').innerHTML = waterVals.map((v, i) => `
    <div class="col">
      <span class="val">${v.ml ? fmtMl(v.ml) : ''}</span>
      <div class="colbar ${v.ml >= v.goal ? 'hit' : ''}" style="height:${(v.ml / maxMl) * 100}%"></div>
      <span class="lbl ${i === 6 ? 'today' : ''}">${i === 6 ? 'Hoje' : WEEKDAYS[v.d.getDay()]}</span>
    </div>`).join('');

  // sequência de dias batendo a meta (hoje conta se já bateu)
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = dateKey(d);
    const ml = sumMl(log[key] || []);
    const goal = goals[key];
    if (goal && ml >= goal) streak++;
    else if (i === 0) continue;
    else break;
  }
  $('#streak').textContent = streak ? `🔥 ${streak} dia${streak > 1 ? 's' : ''} seguido${streak > 1 ? 's' : ''}` : 'Comece sua sequência!';

  $('#meal-chart').innerHTML = days.map((d, i) => {
    const n = (mealsDone[dateKey(d)] || []).length;
    const tr = isTrainingDay(profile, d);
    const total = buildSchedule(profile, tr, nutritionTargets(profile, tr).kcal).length;
    const pct = clamp(n / total, 0, 1);
    return `<div class="col"><span class="val">${n ? `${n}/${total}` : ''}</span>
      <div class="colbar meal" style="height:${pct * 100}%"></div>
      <span class="lbl ${i === 6 ? 'today' : ''}">${i === 6 ? 'Hoje' : WEEKDAYS[d.getDay()]}</span></div>`;
  }).join('');

  const weights = store.get('weights', []);
  $('#weight-log').innerHTML = weights.length
    ? weights.slice().reverse().slice(0, 10).map(w => `<li><span><b>${w.kg.toFixed(1).replace('.', ',')} kg</b></span><span class="muted">${new Date(w.t).toLocaleDateString('pt-BR')}</span></li>`).join('')
    : '<li class="empty">Registre seu peso uma vez por semana.</li>';
  const trend = $('#weight-trend');
  if (weights.length >= 2) {
    const first = weights[0], last = weights[weights.length - 1];
    const weeks = Math.max((last.t - first.t) / (7 * 864e5), 1 / 7);
    const perWeek = (last.kg - first.kg) / weeks;
    const pct = perWeek / first.kg * 100;
    let msg = `Variação: ${perWeek >= 0 ? '+' : ''}${perWeek.toFixed(2).replace('.', ',')} kg/semana. `;
    if (weeks < 1.5) msg += 'Ainda é cedo para tirar conclusões.';
    else if (pct < 0.1) msg += 'Ganho lento — considere +150 kcal por dia (ex.: 1 banana + 1 colher de pasta de amendoim).';
    else if (pct > 0.6) msg += 'Ganho rápido — pode estar acumulando gordura. Considere -150 kcal por dia.';
    else msg += 'Ótimo ritmo para ganho de massa magra! 💪';
    trend.textContent = msg;
  } else trend.textContent = '';
}

function renderProfile() {
  const p = profile;
  const bmi = bmiInfo(p);
  const dietLabel = { onivoro: 'Come de tudo', vegetariano: 'Vegetariano', vegano: 'Vegano' }[p.diet];
  const days = p.trainDays.length ? p.trainDays.slice().sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7)).map(d => WEEKDAYS[d]).join(', ') : 'Nenhum';
  const rows = [
    ['Nome', p.name], ['Gênero', p.gender === 'm' ? 'Masculino' : 'Feminino'], ['Idade', `${p.age} anos`],
    ['Peso', `${String(p.weight).replace('.', ',')} kg`], ['Altura', `${p.height} cm`],
    ['IMC', `${bmi.bmi.toFixed(1).replace('.', ',')} — ${bmi.label}`],
    ['Dia a dia', ACTIVITY[p.activity].label], ['Ganho de massa', p.surplus === 'leve' ? 'Limpo' : 'Moderado'],
    ['Acorda / dorme', `${p.wake} / ${p.sleep}`], ['Almoço / jantar', `${p.lunch} / ${p.dinner}`],
    ['Treino', p.trainDays.length ? `${days} às ${p.trainTime} (${p.trainDuration} min)` : 'Não treina'],
    ['Alimentação', dietLabel + (p.noLactose ? ', sem lactose' : '')],
    ['Favoritos', favoritesOf(p).filter(id => FOODS[id]).map(id => FOODS[id].name.split(' (')[0]).join(', ') || '—'],
    ['Excluídos', (p.exclude || []).filter(id => FOODS[id]).map(id => FOODS[id].name.split(' (')[0]).join(', ') || '—'],
  ];
  $('#profile-data').innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');
  $('#set-water-rem').checked = settings.waterRem && p.reminders;
  $('#set-meal-rem').checked = settings.mealRem && p.reminders;
  $('#set-interval').value = settings.interval;
  renderNotifStatus();
}

function renderNotifStatus() {
  const el = $('#notif-status');
  const btn = $('#enable-notif');
  if (Native.LN) {
    Native.LN.checkPermissions().then(perm => {
      const ok = perm.display === 'granted';
      el.textContent = ok ? '✅ Notificações ativadas — você recebe os avisos mesmo com o app fechado.'
        : perm.display === 'denied' ? '🚫 Notificações bloqueadas. Libere em Configurações → Apps → HidraFit → Notificações.'
          : 'Toque em "Ativar notificações" para receber os lembretes.';
      btn.classList.toggle('hidden', ok);
    }).catch(() => {});
    return;
  }
  if (!('Notification' in window)) {
    el.textContent = 'Este navegador não suporta notificações — os avisos aparecem só dentro do app.';
    btn.classList.add('hidden');
    return;
  }
  const s = Notification.permission;
  el.textContent = s === 'granted' ? '✅ Notificações ativadas. Deixe o app aberto (ou instalado) para receber os avisos.'
    : s === 'denied' ? '🚫 Notificações bloqueadas no navegador. Libere nas configurações do site.'
      : 'Toque em "Ativar notificações" para receber avisos mesmo com o app em segundo plano.';
  btn.classList.toggle('hidden', s !== 'default');
}

function renderAll() {
  renderHeader();
  renderWater();
  renderDiet();
  renderProgress();
  renderProfile();
}

/* =========================================================
   LEMBRETES
   ========================================================= */
function reminderInterval(d = new Date()) {
  if (settings.interval !== 'auto') return Number(settings.interval);
  const clk = dayClock(profile);
  const goal = waterGoal(profile, isTrainingDay(profile, d)).goal;
  const cups = goal / 250;
  return clamp(round((clk.sleep - 60 - clk.wake) / cups, 5), 30, 120);
}

function lastWaterMinute() {
  const clk = dayClock(profile);
  const entries = todayWater();
  const rem = store.get('lastWaterReminder', {});
  const times = [clk.wake];
  if (entries.length) { const d = new Date(entries[entries.length - 1].t); times.push(clk.norm(d.getHours() * 60 + d.getMinutes())); }
  if (rem.date === dateKey()) times.push(rem.min);
  return Math.max(...times);
}

function nextWaterReminder() {
  const clk = dayClock(profile);
  const goal = waterGoal(profile, isTrainingDay(profile)).goal;
  if (sumMl(todayWater()) >= goal) return null;
  const next = Math.max(lastWaterMinute() + reminderInterval(), clk.wake + 30);
  return next > clk.sleep - 30 ? null : next;
}

async function notify(title, body, tag) {
  toast(`${title} — ${body}`, 6000);
  if (Native.isNative) { if (tag === 'test') nativeTest(title, body); return; } // o sistema já mostra as agendadas
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  try {
    const reg = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistration() : null;
    const opts = { body, tag, icon: 'icon.svg', badge: 'icon.svg', vibrate: [120, 60, 120], renotify: true };
    if (reg) await reg.showNotification(title, opts);
    else new Notification(title, opts);
  } catch { /* alguns navegadores não permitem fora do SW */ }
}

function checkReminders() {
  if (!profile || !profile.reminders) return;
  const clk = dayClock(profile);
  const now = clk.now();
  const today = dateKey();

  if (settings.waterRem) {
    const next = nextWaterReminder();
    if (next !== null && now >= next && now <= clk.sleep - 30) {
      store.set('lastWaterReminder', { date: today, min: now });
      const wg = waterGoal(profile, isTrainingDay(profile));
      const left = wg.goal - sumMl(todayWater());
      notify('💧 Hora de beber água', `Faltam ${fmtMl(left)} para sua meta de hoje. Que tal um copo agora?`, 'water');
      renderWater();
      scheduleNative();
    }
  }

  if (settings.mealRem) {
    const sent = store.get('mealNotified', {});
    const list = sent.date === today ? sent.ids : [];
    const done = new Set((store.get('mealsDone', {})[today]) || []);
    const plan = buildDayPlan(profile);
    for (const m of plan.meals) {
      if (list.includes(m.id) || done.has(m.id)) continue;
      if (now >= m.time - 5 && now <= m.time + 30) {
        list.push(m.id);
        store.set('mealNotified', { date: today, ids: list });
        const def = MEAL_TYPES[m.type];
        notify(`${def.icon} ${def.name} às ${fmtTime(m.time)}`, mealPreview(m), 'meal');
        break;
      }
    }
  }
}

const mealPreview = m => m.items.filter(it => !['salada', 'legumes'].includes(it.id)).slice(0, 3)
  .map(it => `${it.name.split(' (')[0]} (${it.label})`).join(', ');

/* ---------- Notificações nativas (APK) ---------- */
const NATIVE_DAYS = 5; // agenda alguns dias à frente; reabrir o app renova
let nativeQueue = Promise.resolve();
function scheduleNative() {
  if (!Native.LN || !profile) return;
  nativeQueue = nativeQueue.then(doScheduleNative).catch(err => console.warn('agendamento', err));
}

async function doScheduleNative() {
  const LN = Native.LN;
  const pending = await LN.getPending();
  if (pending.notifications.length) await LN.cancel({ notifications: pending.notifications.map(n => ({ id: n.id })) });
  if (!profile.reminders) return;
  const perm = await LN.checkPermissions();
  if (perm.display !== 'granted') return;

  const clk = dayClock(profile);
  const now = Date.now();
  const list = [];
  let id = 1;
  const push = (title, body, when) => {
    if (when.getTime() > now + 30 * 1000) list.push({ id: id++, title, body, channelId: 'lembretes', schedule: { at: when, allowWhileIdle: true } });
  };
  for (let day = 0; day < NATIVE_DAYS; day++) {
    const d = new Date(); d.setDate(d.getDate() + day); d.setHours(0, 0, 0, 0);
    const at = min => { const t = new Date(d); t.setMinutes(min); return t; }; // min > 1440 cai no dia seguinte
    const training = isTrainingDay(profile, d);
    if (settings.waterRem) {
      const wg = waterGoal(profile, training);
      const reached = day === 0 && sumMl(todayWater()) >= wg.goal;
      if (!reached) {
        const interval = reminderInterval(d);
        const start = day === 0 ? Math.max(lastWaterMinute(), clk.wake) + interval : clk.wake + interval;
        for (let m = start; m <= clk.sleep - 30; m += interval) {
          push('💧 Hora de beber água', `Meta ${day === 0 ? 'de hoje' : 'do dia'}: ${fmtMl(wg.goal)}. Que tal um copo agora?`, at(m));
        }
      }
    }
    if (settings.mealRem) {
      const done = day === 0 ? new Set(store.get('mealsDone', {})[dateKey()] || []) : new Set();
      for (const m of buildDayPlan(profile, d).meals) {
        if (done.has(m.id)) continue;
        const def = MEAL_TYPES[m.type];
        push(`${def.icon} ${def.name} às ${fmtTime(m.time)}`, mealPreview(m), at(m.time));
      }
    }
  }
  if (list.length) await LN.schedule({ notifications: list });
}

async function nativeTest(title, body) {
  if (!Native.LN) return;
  try {
    await LN_ensurePermission();
    await Native.LN.schedule({ notifications: [{ id: 99999, title, body, channelId: 'lembretes', schedule: { at: new Date(Date.now() + 3000) } }] });
  } catch (err) { console.warn(err); }
}

async function LN_ensurePermission() {
  let perm = await Native.LN.checkPermissions();
  if (perm.display !== 'granted') perm = await Native.LN.requestPermissions();
  return perm.display === 'granted';
}

async function initNative() {
  if (!Native.LN) return;
  try {
    await Native.LN.createChannel({ id: 'lembretes', name: 'Lembretes de água e refeições', importance: 4, vibration: true, visibility: 1 });
  } catch { /* iOS / versões antigas */ }
}

/* =========================================================
   UI: toast, confete, abas
   ========================================================= */
let toastTimer;
function toast(msg, ms = 2600) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), ms);
}

function celebrate() {
  const box = $('#confetti');
  const icons = ['💧', '🎉', '💦', '⭐', '💪'];
  box.innerHTML = Array.from({ length: 36 }, () =>
    `<i style="left:${Math.random() * 100}%;animation-duration:${1.8 + Math.random() * 1.8}s;animation-delay:${Math.random() * 0.6}s">${icons[Math.floor(Math.random() * icons.length)]}</i>`).join('');
  setTimeout(() => { box.innerHTML = ''; }, 4500);
}

function showTab(name) {
  $$('.tab').forEach(t => t.classList.toggle('hidden', t.id !== `tab-${name}`));
  $$('.tabbar button').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  store.set('tab', name);
  window.scrollTo({ top: 0 });
}

/* =========================================================
   ONBOARDING
   ========================================================= */
let obStep = 0;
const OB_STEPS = 4;

function openOnboarding(prefill) {
  $('#app').classList.add('hidden');
  $('#onboarding').classList.remove('hidden');
  const form = $('#ob-form');
  const chip = name => id => `<label><input type="checkbox" name="${name}" value="${id}"><span>${FOODS[id].name.split(' (')[0]}</span></label>`;
  $('#ob-favorites').innerHTML = CHOOSABLE.map(chip('favorites')).join('');
  $('#ob-exclude').innerHTML = CHOOSABLE.map(chip('exclude')).join('');
  if (prefill) {
    for (const [k, v] of Object.entries({ favorites: favoritesOf(prefill), ...prefill })) {
      const els = form.elements[k];
      if (!els) continue;
      if (els instanceof RadioNodeList || els.length !== undefined && !(els instanceof HTMLSelectElement)) {
        [...els].forEach(el => {
          if (el.type === 'checkbox') el.checked = Array.isArray(v) ? v.map(String).includes(el.value) : !!v;
          else el.checked = String(v) === el.value;
        });
      } else if (els.type === 'checkbox') els.checked = !!v;
      else els.value = v;
    }
  } else {
    // sugestão: seg/qua/sex
    [...form.elements.trainDays].forEach(el => { el.checked = ['1', '3', '5'].includes(el.value); });
    [...form.elements.favorites].forEach(el => { el.checked = DEFAULT_FAVORITES.includes(el.value); });
  }
  obStep = 0;
  showObStep();
}

function showObStep() {
  $$('.ob-step').forEach(fs => fs.classList.toggle('hidden', Number(fs.dataset.step) !== obStep));
  $$('.steps span').forEach((s, i) => s.classList.toggle('on', i <= obStep));
  $('#ob-back').style.visibility = obStep === 0 ? 'hidden' : 'visible';
  $('#ob-next').textContent = obStep === OB_STEPS - 1 ? 'Montar meu plano' : 'Próximo';
  $('#ob-error').textContent = '';
}

function validateStep(step) {
  const f = $('#ob-form').elements;
  const num = n => Number(String(f[n].value).replace(',', '.'));
  if (step === 0) {
    if (!f.name.value.trim()) return 'Digite seu nome.';
    if (!f.gender.value) return 'Selecione o gênero (usado no cálculo do metabolismo).';
    if (!(num('age') >= 14 && num('age') <= 100)) return 'Informe uma idade entre 14 e 100 anos.';
  }
  if (step === 1) {
    if (!(num('weight') >= 30 && num('weight') <= 300)) return 'Informe um peso válido (30–300 kg).';
    if (!(num('height') >= 120 && num('height') <= 230)) return 'Informe a altura em centímetros (ex.: 175).';
  }
  if (step === 2) {
    if (!f.wake.value || !f.sleep.value || !f.lunch.value || !f.dinner.value) return 'Preencha os horários da sua rotina.';
    const anyDay = [...f.trainDays].some(el => el.checked);
    if (anyDay && !f.trainTime.value) return 'Informe o horário do treino.';
    if (anyDay && !(num('trainDuration') >= 15 && num('trainDuration') <= 240)) return 'Duração do treino entre 15 e 240 min.';
  }
  return '';
}

function readForm() {
  const f = $('#ob-form').elements;
  const num = n => Number(String(f[n].value).replace(',', '.'));
  return {
    name: f.name.value.trim(),
    gender: f.gender.value,
    age: Math.round(num('age')),
    weight: Math.round(num('weight') * 10) / 10,
    height: Math.round(num('height')),
    activity: f.activity.value,
    surplus: f.surplus.value || 'leve',
    wake: f.wake.value, sleep: f.sleep.value, lunch: f.lunch.value, dinner: f.dinner.value,
    trainDays: [...f.trainDays].filter(el => el.checked).map(el => Number(el.value)),
    trainTime: f.trainTime.value || '18:00',
    trainDuration: Math.round(num('trainDuration')) || 60,
    diet: f.diet.value,
    noLactose: f.noLactose.checked,
    exclude: [...f.exclude].filter(el => el.checked).map(el => el.value),
    favorites: [...f.favorites].filter(el => el.checked).map(el => el.value),
    reminders: f.reminders.checked,
  };
}

function finishOnboarding() {
  const isNew = !profile;
  const oldWeight = profile && profile.weight;
  profile = readForm();
  store.set('profile', profile);
  const weights = store.get('weights', []);
  if (isNew || profile.weight !== oldWeight) { weights.push({ t: Date.now(), kg: profile.weight }); store.set('weights', weights); }
  startApp();
  scheduleNative();
  toast(isNew ? `Plano pronto, ${profile.name}! 💪` : 'Perfil atualizado — plano recalculado.');
  if (isNew && profile.reminders) requestNotifications();
}

/* =========================================================
   EVENTOS
   ========================================================= */
function bindEvents() {
  $('#ob-next').addEventListener('click', () => {
    const err = validateStep(obStep);
    if (err) { $('#ob-error').textContent = err; return; }
    if (obStep < OB_STEPS - 1) { obStep++; showObStep(); } else finishOnboarding();
  });
  $('#ob-back').addEventListener('click', () => { if (obStep > 0) { obStep--; showObStep(); } });
  $('#ob-form').addEventListener('submit', e => e.preventDefault());

  $$('.btn.water').forEach(b => b.addEventListener('click', () => addWater(b.dataset.ml)));
  $('#custom-water').addEventListener('submit', e => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    addWater(input.value);
    input.value = '';
  });
  $('#water-log').addEventListener('click', e => {
    const b = e.target.closest('.x');
    if (b) removeWater(Number(b.dataset.t));
  });

  $('#day-type').addEventListener('click', () => {
    const ov = store.get('dayOverride', {});
    ov[dateKey()] = !isTrainingDay(profile);
    store.set('dayOverride', ov);
    renderAll();
    scheduleNative();
    toast(ov[dateKey()] ? 'Hoje: dia de treino — mais água e carboidrato.' : 'Hoje: dia de descanso.');
  });

  $('#meal-list').addEventListener('change', e => {
    const el = e.target;
    if (el.classList.contains('food-check')) { toggleFood(el.dataset.meal, el.dataset.food, el.checked); return; }
    if (!el.classList.contains('meal-check')) return;
    // marcar a refeição = marcar todos os alimentos dela
    const plan = buildDayPlan(profile);
    const meal = plan.meals.find(m => m.id === el.dataset.id);
    const set = eatenSet(plan);
    meal.items.forEach(it => (el.checked ? set.add(`${meal.id}|${it.id}`) : set.delete(`${meal.id}|${it.id}`)));
    saveEaten(plan, set);
    if (el.checked) toast(`Refeição registrada ✅ +${Math.round(meal.total.p)} g de proteína`);
    renderDiet(); renderProgress();
    scheduleNative();
  });
  $('#prot-counter').addEventListener('click', e => {
    const b = e.target.closest('.pend-btn');
    if (b) toggleFood(b.dataset.meal, b.dataset.food, true);
  });
  $('#prot-mini-card').addEventListener('click', () => showTab('dieta'));
  $('#meal-list').addEventListener('click', e => {
    const b = e.target.closest('.swap');
    if (!b) return;
    const alts = store.get('alts', {});
    const key = dateKey();
    alts[key] = alts[key] || {};
    alts[key][b.dataset.id] = (alts[key][b.dataset.id] || 0) + 1;
    store.set('alts', alts);
    renderDiet();
    scheduleNative();
  });

  $('#weight-form').addEventListener('submit', e => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const kg = Math.round(Number(String(input.value).replace(',', '.')) * 10) / 10;
    if (!(kg >= 30 && kg <= 300)) { toast('Informe um peso válido.'); return; }
    const weights = store.get('weights', []);
    weights.push({ t: Date.now(), kg });
    store.set('weights', weights);
    profile.weight = kg;
    store.set('profile', profile);
    input.value = '';
    renderAll();
    scheduleNative();
    toast('Peso registrado — metas de água e comida recalculadas.');
  });

  $$('.tabbar button').forEach(b => b.addEventListener('click', () => showTab(b.dataset.tab)));
  $('#edit-profile').addEventListener('click', () => openOnboarding(profile));

  $('#set-water-rem').addEventListener('change', e => { settings.waterRem = e.target.checked; if (e.target.checked) enableReminders(); saveSettings(); renderWater(); });
  $('#set-meal-rem').addEventListener('change', e => { settings.mealRem = e.target.checked; if (e.target.checked) enableReminders(); saveSettings(); });
  $('#set-interval').addEventListener('change', e => { settings.interval = e.target.value; saveSettings(); renderWater(); });
  $('#enable-notif').addEventListener('click', requestNotifications);
  $('#test-notif').addEventListener('click', () => notify('💧 Teste de lembrete', 'Assim você será avisado para beber água e comer.', 'test'));

  $('#export-data').addEventListener('click', () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k.startsWith('hf_')) data[k] = localStorage.getItem(k);
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `hidrafit-backup-${dateKey()}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
  $('#reset-data').addEventListener('click', () => {
    if (!confirm('Apagar perfil, histórico de água, refeições e pesos? Isso não pode ser desfeito.')) return;
    Object.keys(localStorage).filter(k => k.startsWith('hf_')).forEach(k => localStorage.removeItem(k));
    if (Native.LN) Native.LN.getPending().then(p => p.notifications.length && Native.LN.cancel({ notifications: p.notifications.map(n => ({ id: n.id })) })).catch(() => {});
    location.reload();
  });

  document.addEventListener('visibilitychange', () => { if (!document.hidden && profile) { renderAll(); checkReminders(); scheduleNative(); } });
}

function enableReminders() {
  if (!profile.reminders) { profile.reminders = true; store.set('profile', profile); }
}

async function requestNotifications() {
  if (Native.LN) {
    try { if (await LN_ensurePermission()) toast('Notificações ativadas! 🔔'); } catch { /* ignorado */ }
    renderNotifStatus();
    scheduleNative();
    return;
  }
  if (!('Notification' in window)) { toast('Seu navegador não suporta notificações.'); return; }
  try {
    const res = await Notification.requestPermission();
    if (res === 'granted') toast('Notificações ativadas! 🔔');
  } catch { /* ignorado */ }
  renderNotifStatus();
}

/* =========================================================
   INÍCIO
   ========================================================= */
let ticker, lastDay = dateKey();
function startApp() {
  $('#onboarding').classList.add('hidden');
  $('#app').classList.remove('hidden');
  renderAll();
  showTab(store.get('tab', 'agua'));
  clearInterval(ticker);
  ticker = setInterval(() => {
    if (dateKey() !== lastDay) { lastDay = dateKey(); renderAll(); } // virou o dia
    else if (new Date().getSeconds() < 30) renderDiet(); // atualiza pendentes a cada minuto
    checkReminders();
  }, 30 * 1000);
  checkReminders();
}

bindEvents();
if (Native.isNative) $('#export-data').classList.add('hidden'); // download de arquivo não funciona no WebView
if (profile) startApp(); else openOnboarding();
initNative().then(scheduleNative);

if ('serviceWorker' in navigator && location.protocol !== 'file:' && !Native.isNative) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
