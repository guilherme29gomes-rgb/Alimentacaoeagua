'use strict';

/* =========================================================
   Trilha Fluente — inglês do iniciante ao fluente
   Tudo roda no aparelho; o progresso fica no localStorage.
   ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const dateKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const norm = s => String(s).toLowerCase().trim().replace(/[’`]/g, "'").replace(/\s+/g, ' ').replace(/[.!?]+$/, '');

/* ---------------- Estado salvo ---------------- */
const KEY = 'tf_state';
const DEFAULT = {
  topics: {},      // id → { best, total, done, manual }
  cando: {},       // levelId → [índices marcados]
  extras: {},      // id → data
  readings: {},    // id → { best, total, done }
  words: {},       // palavra → 'k' (aprendi) | 'r' (revisar)
  xp: {},          // data → xp
  celebrated: {},  // levelId → true
  settings: { theme: 'claro', goal: 30, rate: 0.9, reminder: false, reminderTime: '20:00' },
};
let S = (() => {
  const fresh = () => JSON.parse(JSON.stringify(DEFAULT));
  try { const raw = JSON.parse(localStorage.getItem(KEY)); return raw ? { ...fresh(), ...raw, settings: { ...DEFAULT.settings, ...(raw.settings || {}) } } : fresh(); }
  catch { return fresh(); }
})();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* cheio / privado */ } };

/* ---------------- Dados ---------------- */
const LEVELS = window.LEVELS;
const LEVEL = Object.fromEntries(LEVELS.map(l => [l.id, l]));
const TOPIC = {};
LEVELS.forEach(l => l.topics.forEach(t => { TOPIC[t.id] = { ...t, level: l.id }; }));
const EXTRAS = window.EXTRAS;
const READINGS = window.READINGS;

const WORDS = window.VOCAB_RAW.join('\n').split('\n').map(l => l.trim()).filter(Boolean).map((line, i) => {
  const [w, pos, mean, ...ex] = line.split('|');
  return { rank: i + 1, w, pos, mean, ex: ex.map(e => e.split('=')) };
});
const BAND_SIZE = 100;
const BANDS = [];
for (let i = 0; i < WORDS.length; i += BAND_SIZE) BANDS.push(WORDS.slice(i, i + BAND_SIZE));
// faixa de frequência → nível da trilha
const BAND_LEVEL = i => ['a1', 'a1', 'a2', 'a2', 'b1', 'b1', 'b2', 'b2', 'c1', 'c2'][Math.min(i, 9)];
const BAND_NAMES = ['Essenciais', 'Básicas', 'Do dia a dia', 'Casa e cidade', 'Rotina', 'Intermediárias', 'Opiniões', 'Trabalho', 'Avançadas', 'Fluência'];

const TYPE = {
  leitura: { icon: '📖', name: 'Leitura' }, musica: { icon: '🎵', name: 'Música' }, filme: { icon: '🎬', name: 'Filme' },
  serie: { icon: '📺', name: 'Série' }, podcast: { icon: '🎙️', name: 'Podcast / vídeo' }, livro: { icon: '📚', name: 'Livro' },
};
const CAT_ICON = { 'Gramática': '📐', 'Vocabulário': '🔤', 'Conversação': '💬', 'Pronúncia': '🗣️', 'Escrita': '✍️', 'Método': '🧭' };

/* =========================================================
   PROGRESSO E XP
   ========================================================= */
const XP_TOPIC = 30, XP_CANDO = 10, XP_EXTRA = 15, XP_READING = 20, XP_WORD = 2;

function addXP(n) {
  if (!n) return;
  const k = dateKey();
  S.xp[k] = (S.xp[k] || 0) + n;
  save();
  updateChips();
}

function streak() {
  let n = 0;
  for (let i = 0; i < 3650; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    if ((S.xp[dateKey(d)] || 0) > 0) n++;
    else if (i > 0) break;
  }
  return n;
}

const topicDone = id => !!(S.topics[id] && (S.topics[id].done || S.topics[id].manual));
const learnedIn = list => list.filter(w => S.words[w.w] === 'k').length;

/** Progresso de um nível: assuntos (peso 2), "eu consigo" (1), extras (1), leituras (1), vocabulário (3 por faixa). */
function levelProgress(id) {
  const lv = LEVEL[id];
  let done = 0, total = 0;
  lv.topics.forEach(t => { total += 2; if (topicDone(t.id)) done += 2; });
  lv.cando.forEach((_, i) => { total += 1; if ((S.cando[id] || []).includes(i)) done += 1; });
  EXTRAS.filter(e => e.level === id).forEach(e => { total += 1; if (S.extras[e.id]) done += 1; });
  READINGS.filter(r => r.level === id).forEach(r => { total += 1; if (S.readings[r.id] && S.readings[r.id].done) done += 1; });
  BANDS.forEach((b, i) => { if (BAND_LEVEL(i) === id) { total += 3; done += 3 * learnedIn(b) / b.length; } });
  return total ? done / total : 0;
}
const overallProgress = () => LEVELS.reduce((a, l) => a + levelProgress(l.id), 0) / LEVELS.length;
const currentLevel = () => LEVELS.find(l => levelProgress(l.id) < 0.8) || LEVELS[LEVELS.length - 1];
const pct = v => `${Math.round(v * 100)}%`;

function checkLevelUps() {
  for (const l of LEVELS) {
    if (!S.celebrated[l.id] && levelProgress(l.id) >= 0.8) {
      S.celebrated[l.id] = true; save();
      celebrate();
      const next = LEVELS[LEVELS.indexOf(l) + 1];
      toast(`🏆 Nível ${l.cefr} (${l.name}) concluído!` + (next ? ` Rumo ao ${next.cefr}!` : ' Você chegou ao fluente! 🎉'), 5000);
      break;
    }
  }
}

function updateChips() {
  $('#streak-chip').textContent = `🔥 ${streak()}`;
  const today = S.xp[dateKey()] || 0;
  $('#xp-chip').textContent = `⭐ ${today}/${S.settings.goal}`;
  $('#xp-chip').style.background = today >= S.settings.goal ? 'var(--green-soft)' : '';
  $('#xp-chip').style.color = today >= S.settings.goal ? 'var(--green)' : '';
}

/* =========================================================
   ÁUDIO (pronúncia)
   ========================================================= */
const Native = (() => {
  const cap = window.Capacitor;
  const isNative = !!(cap && cap.isNativePlatform && cap.isNativePlatform());
  const P = isNative && cap.Plugins ? cap.Plugins : {};
  return { isNative, TTS: P.TextToSpeech, LN: P.LocalNotifications, FS: P.Filesystem, Share: P.Share };
})();

let enVoice = null;
function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices();
  enVoice = vs.find(v => v.lang === 'en-US') || vs.find(v => v.lang && v.lang.startsWith('en')) || null;
}
if ('speechSynthesis' in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }

function speak(text) {
  if (Native.TTS) {
    Native.TTS.stop().catch(() => {}).finally(() =>
      Native.TTS.speak({ text, lang: 'en-US', rate: S.settings.rate, pitch: 1, volume: 1 }).catch(() => toast('Não foi possível reproduzir o áudio.')));
    return;
  }
  if (!('speechSynthesis' in window)) { toast('Seu navegador não tem voz para leitura.'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.rate = S.settings.rate;
  if (enVoice) u.voice = enVoice;
  speechSynthesis.speak(u);
}
const sayBtn = (text, label = 'Ouvir') => `<button class="say" data-act="say" data-text="${esc(text)}" aria-label="${label}">🔊</button>`;

/* =========================================================
   NAVEGAÇÃO
   ========================================================= */
let route = { name: 'trilha', p: {} };
const ROOTS = ['trilha', 'vocab', 'extras', 'evolucao'];
const TAB_OF = { trilha: 'trilha', level: 'trilha', topic: 'trilha', vocab: 'vocab', extras: 'extras', reading: 'extras', evolucao: 'evolucao' };

function go(name, p = {}, push = true) {
  route = { name, p };
  if (push) history.pushState(route, '');
  render();
  window.scrollTo({ top: 0 });
}
window.addEventListener('popstate', e => { route = e.state || { name: 'trilha', p: {} }; render(); });

function render() {
  const v = $('#view');
  const isRoot = ROOTS.includes(route.name);
  $('#back').classList.toggle('hidden', isRoot);
  $('#brand-icon').classList.toggle('hidden', !isRoot);
  $$('.tabbar button').forEach(b => b.classList.toggle('active', b.dataset.tab === TAB_OF[route.name]));
  const views = { trilha: viewTrilha, level: viewLevel, topic: viewTopic, vocab: viewVocab, extras: viewExtras, reading: viewReading, evolucao: viewEvolucao };
  const out = (views[route.name] || viewTrilha)(route.p);
  $('#title').textContent = out.title;
  v.innerHTML = out.html;
  if (out.after) out.after();
  updateChips();
}

/* =========================================================
   VIEW: TRILHA
   ========================================================= */
function viewTrilha() {
  const cur = currentLevel();
  const all = overallProgress();
  const learned = Object.values(S.words).filter(x => x === 'k').length;
  const html = `
  <section class="hero">
    <p>Seu nível agora</p>
    <h2>${cur.cefr} · ${cur.name}</h2>
    <p class="small">${esc(cur.goal)}</p>
    <div class="bar big"><i style="width:${pct(all)}"></i></div>
    <div class="row"><span>Rumo ao fluente</span><b>${pct(all)}</b></div>
  </section>
  <div class="btn-row">
    <button class="btn primary" data-act="go" data-to="level" data-id="${cur.id}">▶️ Continuar no ${cur.cefr}</button>
    <button class="btn" data-act="go" data-to="vocab">📚 ${learned} palavras</button>
  </div>
  <div class="section-label">Trilha completa</div>
  <div class="path">${LEVELS.map(l => {
    const p = levelProgress(l.id);
    const done = l.topics.filter(t => topicDone(t.id)).length;
    return `<div class="card ${l.id === cur.id ? 'current' : ''}"><button class="level-card" data-act="go" data-to="level" data-id="${l.id}">
      <span class="badge ${p >= 0.8 ? 'done' : ''}" style="background:${l.color}">${l.cefr}</span>
      <span class="info"><span style="display:flex;justify-content:space-between;gap:.5rem"><b>${l.name}</b><span class="pct">${pct(p)}</span></span>
        <p>${done}/${l.topics.length} assuntos · ${esc(l.goal)}</p>
        <span class="bar"><i style="width:${pct(p)};background:${l.color}"></i></span></span>
    </button></div>`;
  }).join('')}</div>
  <p class="small muted" style="text-align:center">Um nível é concluído com 80% de progresso: assuntos com exercícios, “eu consigo”, extras, leituras e vocabulário.</p>`;
  return { title: 'Trilha Fluente', html };
}

/* =========================================================
   VIEW: NÍVEL
   ========================================================= */
function viewLevel({ id }) {
  const l = LEVEL[id];
  const p = levelProgress(id);
  const checked = S.cando[id] || [];
  const ex = EXTRAS.filter(e => e.level === id);
  const rd = READINGS.filter(r => r.level === id);
  const exDone = ex.filter(e => S.extras[e.id]).length + rd.filter(r => S.readings[r.id] && S.readings[r.id].done).length;
  const bandIdx = BANDS.map((_, i) => i).filter(i => BAND_LEVEL(i) === id);
  const html = `
  <section class="card" style="border-top:5px solid ${l.color}">
    <div class="card-title"><h2>${l.cefr} · ${l.name}</h2><span class="tag">${pct(p)}</span></div>
    <p class="muted small" style="margin:.2rem 0 .6rem">${esc(l.goal)}</p>
    <div class="bar"><i style="width:${pct(p)};background:${l.color}"></i></div>
  </section>

  <div class="section-label">Assuntos na ordem de estudo</div>
  <section class="card">${l.topics.map((t, n) => {
    const st = S.topics[t.id];
    const done = topicDone(t.id);
    const sub = `${CAT_ICON[t.cat] || '📘'} ${t.cat}` + (st && st.total ? ` · melhor nota ${st.best}/${st.total}` : '');
    return `<button class="topic-row ${done ? 'done' : ''}" data-act="go" data-to="topic" data-id="${t.id}">
      <span class="ico">${done ? '✓' : n + 1}</span><span class="t">${esc(t.title)}<small>${sub}</small></span><span class="arrow">›</span></button>`;
  }).join('')}</section>

  <div class="section-label">Eu consigo… (marque quando conseguir)</div>
  <section class="card">${l.cando.map((c, i) => `
    <label class="check-row ${checked.includes(i) ? 'on' : ''}"><input type="checkbox" data-act="cando" data-level="${id}" data-i="${i}" ${checked.includes(i) ? 'checked' : ''}><span>${esc(c)}</span></label>`).join('')}
  </section>

  <div class="section-label">Pratique além da lição</div>
  <section class="card">
    <button class="topic-row" data-act="go" data-to="extras" data-level="${id}"><span class="ico">🎧</span><span class="t">Músicas, leituras, filmes e séries<small>${exDone}/${ex.length + rd.length} feitos neste nível</small></span><span class="arrow">›</span></button>
    ${bandIdx.length ? `<button class="topic-row" data-act="go" data-to="vocab" data-band="${bandIdx[0]}"><span class="ico">📚</span><span class="t">Vocabulário do nível<small>${bandIdx.map(i => `Faixa ${i + 1}: ${learnedIn(BANDS[i])}/${BANDS[i].length}`).join(' · ')}</small></span><span class="arrow">›</span></button>` : ''}
  </section>`;
  return { title: `${l.cefr} · ${l.name}`, html };
}

/* =========================================================
   VIEW: ASSUNTO (lição + exercícios)
   ========================================================= */
let quiz = null; // { topicId, answers: [{ok, given}] }

function viewTopic({ id }) {
  const t = TOPIC[id];
  const l = LEVEL[t.level];
  if (!quiz || quiz.topicId !== id) quiz = { topicId: id, answers: [] };
  const st = S.topics[id] || {};
  const list = l.topics;
  const idx = list.findIndex(x => x.id === id);
  const next = list[idx + 1];
  const html = `
  <section class="card">
    <div class="card-title"><span class="tag">${CAT_ICON[t.cat] || ''} ${t.cat}</span>${topicDone(id) ? '<span class="tag ok">✓ Concluído</span>' : ''}</div>
    <h2 style="margin:.3rem 0 .4rem">${esc(t.title)}</h2>
    <div class="lesson">${t.lesson}</div>
  </section>
  <section class="card">
    <div class="card-title"><h3>Exemplos</h3><span class="small muted">toque em 🔊 para ouvir</span></div>
    ${t.examples.map(([en, pt]) => `<div class="example">${sayBtn(en)}<div><div class="en">${esc(en)}</div><div class="pt">${esc(pt)}</div></div></div>`).join('')}
  </section>
  <section class="card" id="exercises">
    <div class="card-title"><h3>✏️ Exercícios</h3>${st.total ? `<span class="tag">Melhor: ${st.best}/${st.total}</span>` : ''}</div>
    ${t.ex.map((e, i) => exerciseHtml(e, i, quiz.answers[i])).join('')}
    <div id="ex-result">${resultHtml(t)}</div>
  </section>
  <div class="btn-row">
    <button class="btn ghost" data-act="manual" data-id="${id}">${st.manual ? '↩️ Desmarcar estudado' : '☑️ Marcar como estudado'}</button>
    ${next ? `<button class="btn primary" data-act="go" data-to="topic" data-id="${next.id}" data-replace="1">Próximo assunto ›</button>` : `<button class="btn primary" data-act="go" data-to="level" data-id="${l.id}">Voltar ao ${l.cefr}</button>`}
  </div>`;
  return { title: t.title, html };
}

function exerciseHtml(e, i, ans) {
  const [type, q] = e;
  const qText = esc(q).replace('___', '<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>');
  let body;
  if (type === 'mc' || type === 'listen') {
    const [, , opts, right] = e;
    body = `<div class="opts">${opts.map((o, j) => {
      let cls = '';
      if (ans) { if (j === right) cls = 'right'; else if (j === ans.given) cls = 'wrong'; }
      return `<button class="opt ${cls}" data-act="mc" data-i="${i}" data-j="${j}" ${ans ? 'disabled' : ''}>${esc(o)}</button>`;
    }).join('')}</div>`;
  } else {
    body = `<form class="fill" data-act="fill" data-i="${i}">
      <input type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Sua resposta" aria-label="Resposta"
        value="${ans ? esc(ans.given) : ''}" class="${ans ? (ans.ok ? 'right' : 'wrong') : ''}" ${ans ? 'disabled' : ''}>
      ${ans ? '' : '<button class="btn small primary" type="submit">OK</button>'}</form>`;
  }
  const expl = type === 'fill' ? e[3] : e[4];
  const fb = ans ? `<div class="feedback ${ans.ok ? 'right' : 'wrong'}">${ans.ok ? '✅ Certo!' : `❌ ${type === 'fill' ? `Resposta: <b>${esc(e[2][0])}</b>. ` : ''}`} ${esc(expl)}</div>` : '';
  const head = type === 'listen'
    ? `<div class="q listen-q"><span class="n">${i + 1}.</span>Ouça e escolha o que foi dito: <button class="btn small" data-act="say" data-text="${esc(q)}">🔊 Ouvir</button>${ans ? ` <span class="muted small">(“${esc(q)}”)</span>` : ''}</div>`
    : `<div class="q"><span class="n">${i + 1}.</span>${qText}</div>`;
  return `<div class="ex">${head}${body}${fb}</div>`;
}

function resultHtml(t) {
  const n = t.ex.length;
  if (quiz.answers.filter(Boolean).length < n) return '';
  const ok = quiz.answers.filter(a => a && a.ok).length;
  const pass = ok / n >= 0.6;
  return `<div class="result card" style="background:var(--bg);box-shadow:none">
    <div class="big">${ok}/${n}</div>
    <p>${pass ? '🎉 Muito bem! Assunto concluído.' : '💪 Quase lá! Releia a lição e tente de novo (precisa de 60%).'}</p>
    <button class="btn" data-act="retry">🔄 Refazer exercícios</button></div>`;
}

function answer(i, ok, given) {
  const t = TOPIC[quiz.topicId];
  quiz.answers[i] = { ok, given };
  if (ok) addXP(1);
  const n = t.ex.length;
  if (quiz.answers.filter(Boolean).length === n) {
    const score = quiz.answers.filter(a => a.ok).length;
    const st = S.topics[t.id] || { best: 0, total: n };
    const firstDone = !topicDone(t.id) && score / n >= 0.6;
    st.best = Math.max(st.best || 0, score); st.total = n;
    if (score / n >= 0.6) st.done = true;
    S.topics[t.id] = st; save();
    if (firstDone) { addXP(XP_TOPIC); toast(`+${XP_TOPIC} XP · assunto concluído ✅`); }
    checkLevelUps();
  }
  // re-renderiza só o exercício e o resultado (sem perder a rolagem)
  const box = $$('#exercises .ex')[i];
  box.outerHTML = exerciseHtml(t.ex[i], i, quiz.answers[i]);
  $('#ex-result').innerHTML = resultHtml(t);
}

/* =========================================================
   VIEW: VOCABULÁRIO
   ========================================================= */
const vocab = { mode: 'lista', band: 0, q: '', flash: null, quiz: null };

function viewVocab(p) {
  if (p.band !== undefined) { vocab.band = Number(p.band); delete p.band; }
  const total = WORDS.length;
  const learned = Object.values(S.words).filter(x => x === 'k').length;
  const html = `
  <section class="card">
    <div class="card-title"><h2>📚 Vocabulário</h2><span class="tag ok">${learned}/${total} aprendidas</span></div>
    <p class="small muted" style="margin:.2rem 0 .6rem">As ${total} palavras mais usadas do inglês, em ordem de frequência, com significado e 3 exemplos.</p>
    <div class="seg" role="tablist">${['lista', 'flash', 'quiz'].map(m =>
      `<button class="${vocab.mode === m ? 'on' : ''}" data-act="vmode" data-m="${m}">${{ lista: '📋 Lista', flash: '🃏 Flashcards', quiz: '❓ Quiz' }[m]}</button>`).join('')}</div>
    <div class="bands">${BANDS.map((b, i) => {
      const k = learnedIn(b);
      return `<button class="${i === vocab.band ? 'on' : ''}" data-act="band" data-i="${i}"><b>Nível ${i + 1} · ${LEVEL[BAND_LEVEL(i)].cefr}</b>
        ${b[0].rank}–${b[b.length - 1].rank} · ${BAND_NAMES[i] || ''}<span class="bar" style="display:block"><i style="width:${pct(k / b.length)};background:var(--green)"></i></span></button>`;
    }).join('')}</div>
  </section>
  <div id="vbody">${vocabBody()}</div>`;
  return { title: 'Vocabulário', html };
}

function vocabBody() {
  if (vocab.mode === 'flash') return flashHtml();
  if (vocab.mode === 'quiz') return vquizHtml();
  const list = vocab.q.trim()
    ? WORDS.filter(w => w.w.toLowerCase().includes(vocab.q.trim().toLowerCase()) || w.mean.toLowerCase().includes(vocab.q.trim().toLowerCase())).slice(0, 60)
    : BANDS[vocab.band];
  return `<input type="search" class="search" id="vsearch" placeholder="🔎 Buscar palavra em inglês ou português" value="${esc(vocab.q)}">
  <section class="card">${list.length ? list.map(wordHtml).join('') : '<p class="muted">Nenhuma palavra encontrada.</p>'}</section>`;
}

function wordHtml(w) {
  const st = S.words[w.w];
  return `<div class="word ${st === 'k' ? 'learned' : ''}" id="w-${w.rank}">
    <div class="word-head">${sayBtn(w.w)}<span class="w">${esc(w.w)}</span><span class="pos">${esc(w.pos)}</span>
      ${st ? `<span class="st ${st}">${st === 'k' ? 'aprendida' : 'revisar'}</span>` : ''}<span class="rank">#${w.rank}</span></div>
    <div class="mean">${esc(w.mean)}</div>
    ${w.ex.map(([en, pt]) => `<div class="example">${sayBtn(en)}<div><div class="en">${esc(en)}</div><div class="pt">${esc(pt)}</div></div></div>`).join('')}
    <div class="actions">
      <button class="btn small ${st === 'k' ? 'ok' : ''}" data-act="wk" data-w="${esc(w.w)}">${st === 'k' ? '✓ Aprendida' : '✓ Aprendi'}</button>
      <button class="btn small ghost" data-act="wr" data-w="${esc(w.w)}">↺ Revisar depois</button>
    </div></div>`;
}

/** Marca a palavra. toggle=true (botão da lista) desmarca se já estava aprendida. */
function setWord(word, state, toggle = false) {
  const before = S.words[word];
  if (toggle && before === 'k' && state === 'k') { delete S.words[word]; save(); return; }
  S.words[word] = state; save();
  if (state === 'k' && before !== 'k') addXP(XP_WORD);
  checkLevelUps();
}

/* Flashcards: palavras ainda não aprendidas da faixa (revisar primeiro) */
function newFlash() {
  const band = BANDS[vocab.band];
  const review = band.filter(w => S.words[w.w] === 'r');
  const fresh = band.filter(w => !S.words[w.w]);
  let deck = [...shuffle(review), ...shuffle(fresh)];
  if (!deck.length) deck = shuffle(band);
  vocab.flash = { deck, i: 0, flipped: false, band: vocab.band, ok: 0 };
}

function flashHtml() {
  if (!vocab.flash || vocab.flash.band !== vocab.band) newFlash();
  const f = vocab.flash;
  if (f.i >= f.deck.length) {
    return `<section class="card result"><div class="big">${f.ok}/${f.deck.length}</div><p>Rodada concluída! Palavras que você sabia foram marcadas como aprendidas.</p>
      <button class="btn primary" data-act="flash-new">🔄 Nova rodada</button></section>`;
  }
  const w = f.deck[f.i];
  return `<p class="flash-count">${f.i + 1} de ${f.deck.length}</p>
  <div class="flash"><div class="flash-inner" data-act="flip">
    ${f.flipped ? `<div class="back-side"><div class="word-head">${sayBtn(w.w)}<span class="w">${esc(w.w)}</span><span class="pos">${esc(w.pos)}</span></div>
      <div class="word"><div class="mean" style="font-size:1.15rem">${esc(w.mean)}</div>
      ${w.ex.map(([en, pt]) => `<div class="example">${sayBtn(en)}<div><div class="en">${esc(en)}</div><div class="pt">${esc(pt)}</div></div></div>`).join('')}</div></div>`
    : `<div class="w">${esc(w.w)}</div><div>${sayBtn(w.w)}</div><div class="hint">Você sabe o significado? Toque para virar.</div>`}
  </div></div>
  <div class="btn-row">
    <button class="btn danger" data-act="flash-no">✗ Não sabia</button>
    <button class="btn ok" data-act="flash-yes">✓ Sabia</button>
  </div>`;
}

/* Quiz: 10 perguntas de significado */
function newVQuiz() {
  const band = BANDS[vocab.band];
  const pool = shuffle(band).slice(0, 10);
  vocab.quiz = {
    band: vocab.band, i: 0, ok: 0,
    qs: pool.map(w => {
      const wrong = shuffle(band.filter(o => o.w !== w.w && o.mean !== w.mean)).slice(0, 3).map(o => o.mean);
      const opts = shuffle([w.mean, ...wrong]);
      return { w, opts, right: opts.indexOf(w.mean), given: null };
    }),
  };
}

function vquizHtml() {
  if (!vocab.quiz || vocab.quiz.band !== vocab.band) newVQuiz();
  const z = vocab.quiz;
  if (z.i >= z.qs.length) {
    return `<section class="card result"><div class="big">${z.ok}/${z.qs.length}</div>
      <p>${z.ok >= 8 ? '🎉 Excelente!' : z.ok >= 5 ? '👍 Bom trabalho!' : '💪 Continue praticando!'} Acertos viraram “aprendidas”; erros foram para “revisar”.</p>
      <button class="btn primary" data-act="vquiz-new">🔄 Novo quiz</button></section>`;
  }
  const q = z.qs[z.i];
  return `<section class="card">
    <p class="flash-count">Pergunta ${z.i + 1} de ${z.qs.length} · ${z.ok} acertos</p>
    <div style="text-align:center;margin:.6rem 0 1rem"><div style="font-size:2rem;font-weight:800">${esc(q.w.w)}</div>${sayBtn(q.w.w)}</div>
    <div class="opts">${q.opts.map((o, j) => {
      let cls = '';
      if (q.given !== null) { if (j === q.right) cls = 'right'; else if (j === q.given) cls = 'wrong'; }
      return `<button class="opt ${cls}" data-act="vq" data-j="${j}" ${q.given !== null ? 'disabled' : ''}>${esc(o)}</button>`;
    }).join('')}</div>
    ${q.given !== null ? `<p class="small muted" style="margin-top:.7rem">“${esc(q.w.ex[0][0])}” — ${esc(q.w.ex[0][1])}</p>
      <button class="btn primary wide" data-act="vq-next">Próxima ›</button>` : ''}
  </section>`;
}

/* =========================================================
   VIEW: EXTRAS
   ========================================================= */
const extrasFilter = { level: null, type: 'todos' };

function viewExtras(p) {
  if (p.level) { extrasFilter.level = p.level; delete p.level; }
  if (!extrasFilter.level) extrasFilter.level = currentLevel().id;
  const lv = extrasFilter.level, ty = extrasFilter.type;
  const types = ['todos', 'leitura', 'musica', 'filme', 'podcast', 'livro'];
  const matchType = e => ty === 'todos' || e.type === ty || (ty === 'filme' && e.type === 'serie');
  const items = EXTRAS.filter(e => (lv === 'todos' || e.level === lv) && matchType(e));
  const reads = (ty === 'todos' || ty === 'leitura') ? READINGS.filter(r => lv === 'todos' || r.level === lv) : [];
  const doneCount = items.filter(e => S.extras[e.id]).length + reads.filter(r => S.readings[r.id] && S.readings[r.id].done).length;
  const html = `
  <section class="card">
    <div class="card-title"><h2>🎧 Estudo extra</h2><span class="tag ok">${doneCount}/${items.length + reads.length} feitos</span></div>
    <p class="small muted" style="margin:.2rem 0 0">Aprenda com o que você gosta. Cada atividade tem uma tarefa; marque quando terminar.</p>
    <div class="filters">${['todos', ...LEVELS.map(l => l.id)].map(id =>
      `<button class="${lv === id ? 'on' : ''}" data-act="xlevel" data-v="${id}">${id === 'todos' ? 'Todos' : LEVEL[id].cefr}</button>`).join('')}</div>
    <div class="filters" style="padding-top:0">${types.map(t =>
      `<button class="${ty === t ? 'on' : ''}" data-act="xtype" data-v="${t}">${t === 'todos' ? 'Tudo' : `${TYPE[t].icon} ${t === 'filme' ? 'Filmes e séries' : TYPE[t].name}`}</button>`).join('')}</div>
  </section>
  ${reads.map(r => {
    const st = S.readings[r.id];
    return `<section class="card extra ${st && st.done ? 'done' : ''}"><span class="emoji">📖</span><div class="body">
      <div class="card-title"><h3>${esc(r.title)}</h3><span class="tag">${LEVEL[r.level].cefr}</span></div>
      <div class="by">Texto do app com áudio e perguntas${st && st.total ? ` · melhor: ${st.best}/${st.total}` : ''}</div>
      <div class="btn-row"><button class="btn primary" data-act="go" data-to="reading" data-id="${r.id}">${st && st.done ? '✓ Ler de novo' : 'Ler texto'}</button></div></div></section>`;
  }).join('')}
  ${items.map(e => `<section class="card extra ${S.extras[e.id] ? 'done' : ''}"><span class="emoji">${TYPE[e.type].icon}</span><div class="body">
    <div class="card-title"><h3>${esc(e.title)}</h3><span class="tag">${LEVEL[e.level].cefr}</span></div>
    <div class="by">${TYPE[e.type].name} · ${esc(e.by)}</div>
    <p class="why">${esc(e.why)}</p>
    <div class="task">🎯 ${esc(e.task)}</div>
    <div class="btn-row">
      <a class="btn ghost small" href="${esc(e.link)}" target="_blank" rel="noopener">🔗 Abrir / buscar</a>
      <button class="btn small ${S.extras[e.id] ? 'ok' : ''}" data-act="extra" data-id="${e.id}">${S.extras[e.id] ? '✓ Feito' : 'Marcar como feito'}</button>
    </div></div></section>`).join('')}
  ${!items.length && !reads.length ? '<p class="muted" style="text-align:center">Nada com esse filtro.</p>' : ''}`;
  return { title: 'Extras', html };
}

/* =========================================================
   VIEW: LEITURA
   ========================================================= */
let rquiz = null;
function viewReading({ id }) {
  const r = READINGS.find(x => x.id === id);
  if (!rquiz || rquiz.id !== id) rquiz = { id, given: [] };
  const answered = rquiz.given.filter(g => g !== undefined).length;
  const ok = r.questions.filter((q, i) => rquiz.given[i] === q[2]).length;
  const html = `
  <section class="card">
    <div class="card-title"><span class="tag">${LEVEL[r.level].cefr} · Leitura</span><button class="btn small" data-act="say" data-text="${esc(r.text)}">🔊 Ouvir texto</button></div>
    <h2 style="margin:.3rem 0 .6rem">${esc(r.title)}</h2>
    <div class="reading-text">${esc(r.text)}</div>
  </section>
  <section class="card"><div class="card-title"><h3>📝 Vocabulário do texto</h3></div>
    <div class="gloss">${r.glossary.map(([a, b]) => `<span><b>${esc(a)}</b> = ${esc(b)}</span>`).join('')}</div></section>
  <section class="card"><div class="card-title"><h3>❓ Compreensão</h3></div>
    ${r.questions.map((q, i) => {
      const g = rquiz.given[i];
      return `<div class="ex"><div class="q"><span class="n">${i + 1}.</span>${esc(q[0])}</div><div class="opts">${q[1].map((o, j) => {
        let cls = '';
        if (g !== undefined) { if (j === q[2]) cls = 'right'; else if (j === g) cls = 'wrong'; }
        return `<button class="opt ${cls}" data-act="rq" data-i="${i}" data-j="${j}" ${g !== undefined ? 'disabled' : ''}>${esc(o)}</button>`;
      }).join('')}</div></div>`;
    }).join('')}
    ${answered === r.questions.length ? `<div class="result"><div class="big">${ok}/${r.questions.length}</div>
      <p>${ok / r.questions.length >= 0.75 ? '🎉 Leitura concluída!' : 'Releia o texto com calma e tente de novo (precisa de 75%).'}</p>
      <button class="btn" data-act="rq-retry">🔄 Refazer</button></div>` : ''}
  </section>`;
  return { title: r.title, html };
}

/* =========================================================
   VIEW: EVOLUÇÃO (+ configurações)
   ========================================================= */
function viewEvolucao() {
  const all = overallProgress();
  const cur = currentLevel();
  const C = 2 * Math.PI * 86;
  const topicsDone = Object.keys(TOPIC).filter(topicDone).length;
  const learned = Object.values(S.words).filter(x => x === 'k').length;
  const extrasDone = Object.keys(S.extras).length + Object.values(S.readings).filter(r => r.done).length;
  const cando = Object.values(S.cando).reduce((a, l) => a + l.length, 0);
  const totalXP = Object.values(S.xp).reduce((a, b) => a + b, 0);
  const today = S.xp[dateKey()] || 0;

  // mapa de calor das últimas 8 semanas (colunas = dias da semana)
  const start = new Date(); start.setDate(start.getDate() - 55 - start.getDay());
  const cells = [];
  for (let i = 0; i < 56 + new Date().getDay() + 1 && cells.length < 63; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    if (d > new Date()) break;
    const x = S.xp[dateKey(d)] || 0;
    cells.push(`<i class="${x >= S.settings.goal ? 'l3' : x >= S.settings.goal / 2 ? 'l2' : x > 0 ? 'l1' : ''}" title="${dateKey(d)}: ${x} XP"></i>`);
  }

  const html = `
  <section class="card" style="text-align:center">
    <div class="ring-wrap"><svg viewBox="0 0 200 200" class="ring" aria-hidden="true">
      <circle cx="100" cy="100" r="86" class="bg"/><circle cx="100" cy="100" r="86" class="fg" style="stroke-dasharray:${C};stroke-dashoffset:${C * (1 - all)}"/></svg>
      <div class="ring-center"><strong>${pct(all)}</strong><span>do caminho até<br>o fluente</span></div></div>
    <p style="margin:.2rem 0 0">Nível atual: <b>${cur.cefr} · ${cur.name}</b></p>
  </section>
  <section class="card">
    <div class="card-title"><h3>Hoje</h3><span class="tag ${today >= S.settings.goal ? 'ok' : ''}">${today}/${S.settings.goal} XP</span></div>
    <div class="bar"><i style="width:${pct(clamp(today / S.settings.goal, 0, 1))};background:var(--green)"></i></div>
    <p class="small muted" style="margin:.5rem 0 0">${today >= S.settings.goal ? '✅ Meta diária cumprida!' : 'Faça exercícios, aprenda palavras ou um extra para bater a meta.'} 🔥 ${streak()} dia(s) seguidos.</p>
  </section>
  <section class="card"><div class="stats">
    <div class="stat"><strong>${topicsDone}/${Object.keys(TOPIC).length}</strong><span>assuntos concluídos</span></div>
    <div class="stat"><strong>${learned}/${WORDS.length}</strong><span>palavras aprendidas</span></div>
    <div class="stat"><strong>${extrasDone}</strong><span>extras e leituras feitos</span></div>
    <div class="stat"><strong>${cando}</strong><span>“eu consigo” marcados</span></div>
    <div class="stat"><strong>${totalXP}</strong><span>XP total</span></div>
    <div class="stat"><strong>${streak()}</strong><span>dias seguidos</span></div>
  </div></section>
  <section class="card"><div class="card-title"><h3>Progresso por nível</h3></div>
    ${LEVELS.map(l => { const p = levelProgress(l.id); return `<div class="lvl-line"><b style="text-align:left;color:${l.color}">${l.cefr}</b><div class="bar"><i style="width:${pct(p)};background:${l.color}"></i></div><b>${pct(p)}</b></div>`; }).join('')}
  </section>
  <section class="card"><div class="card-title"><h3>Constância (8 semanas)</h3></div>
    <div class="heat-days">${['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => `<span>${d}</span>`).join('')}</div>
    <div class="heat">${cells.join('')}</div>
  </section>
  <section class="card"><div class="card-title"><h3>⚙️ Configurações</h3></div>
    <div class="seg" style="margin-top:.3rem">
      <button class="${S.settings.theme !== 'escuro' ? 'on' : ''}" data-act="theme" data-v="claro">☀️ Claro</button>
      <button class="${S.settings.theme === 'escuro' ? 'on' : ''}" data-act="theme" data-v="escuro">🌙 Escuro</button>
    </div>
    <label class="field">Meta diária de XP
      <select id="set-goal">${[10, 20, 30, 50, 80].map(g => `<option value="${g}" ${S.settings.goal === g ? 'selected' : ''}>${g} XP${g === 10 ? ' (leve)' : g === 30 ? ' (recomendado)' : g === 80 ? ' (intenso)' : ''}</option>`).join('')}</select></label>
    <label class="field">Velocidade da voz
      <select id="set-rate">${[[0.7, 'Bem devagar'], [0.85, 'Devagar'], [0.9, 'Normal'], [1, 'Natural'], [1.15, 'Rápida']].map(([v, n]) => `<option value="${v}" ${S.settings.rate === v ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
    ${Native.LN ? `<label class="field">Lembrete diário de estudo
      <select id="set-rem"><option value="off">Desligado</option>${['07:00', '08:00', '12:30', '18:00', '19:00', '20:00', '21:00', '22:00'].map(h => `<option value="${h}" ${S.settings.reminder && S.settings.reminderTime === h ? 'selected' : ''}>Todo dia às ${h}</option>`).join('')}</select></label>` : ''}
    <div class="btn-row">
      <button class="btn ghost" data-act="say" data-text="Hello! This is how the voice sounds.">🔊 Testar voz</button>
    </div>
    <div class="btn-row">
      <button class="btn" data-act="export">💾 Fazer backup</button>
      <button class="btn ghost" data-act="import">📂 Restaurar backup</button>
    </div>
    <p class="small muted" style="margin:.5rem 0 0">O backup é um arquivo com todo o seu progresso. ${Native.isNative ? 'Salve no Google Drive, WhatsApp ou e-mail' : 'Guarde o arquivo baixado'} e use “Restaurar” para levar o progresso para outro aparelho (app ou navegador).</p>
    <div class="btn-row"><button class="btn danger" data-act="reset">Apagar progresso</button></div>
  </section>
  <p class="small muted" style="text-align:center;padding:0 1rem">Níveis seguem o Quadro Europeu Comum (CEFR): A1–A2 básico, B1–B2 independente, C1–C2 proficiente.</p>`;
  return { title: 'Sua evolução', html };
}

/* =========================================================
   EVENTOS
   ========================================================= */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const a = el.dataset.act;
  if (a === 'flip' && e.target.closest('.say')) return; // botão de som dentro do card
  switch (a) {
    case 'go': {
      const p = { id: el.dataset.id, level: el.dataset.level, band: el.dataset.band };
      Object.keys(p).forEach(k => p[k] === undefined && delete p[k]);
      if (el.dataset.replace) { route = { name: el.dataset.to, p }; history.replaceState(route, ''); render(); window.scrollTo({ top: 0 }); }
      else go(el.dataset.to, p);
      break;
    }
    case 'say': e.stopPropagation(); speak(el.dataset.text); break;
    case 'mc': {
      const t = TOPIC[quiz.topicId];
      const i = Number(el.dataset.i), j = Number(el.dataset.j);
      answer(i, j === t.ex[i][3], j);
      break;
    }
    case 'retry': quiz = null; render(); $('#exercises').scrollIntoView({ behavior: 'smooth' }); break;
    case 'manual': {
      const id = el.dataset.id;
      const st = S.topics[id] || {};
      const wasDone = topicDone(id);
      st.manual = !st.manual;
      S.topics[id] = st; save();
      if (st.manual && !wasDone) addXP(10);
      toast(st.manual ? 'Marcado como estudado ✅' : 'Desmarcado');
      checkLevelUps(); render();
      break;
    }
    case 'cando': break; // tratado no "change"
    case 'extra': {
      const id = el.dataset.id;
      if (S.extras[id]) delete S.extras[id];
      else { S.extras[id] = dateKey(); addXP(XP_EXTRA); toast(`+${XP_EXTRA} XP · atividade feita 🎉`); }
      save(); checkLevelUps(); render();
      break;
    }
    case 'xlevel': extrasFilter.level = el.dataset.v; render(); break;
    case 'xtype': extrasFilter.type = el.dataset.v; render(); break;
    case 'rq': {
      const r = READINGS.find(x => x.id === rquiz.id);
      const i = Number(el.dataset.i);
      rquiz.given[i] = Number(el.dataset.j);
      if (rquiz.given[i] === r.questions[i][2]) addXP(2);
      if (rquiz.given.filter(g => g !== undefined).length === r.questions.length) {
        const ok = r.questions.filter((q, k) => rquiz.given[k] === q[2]).length;
        const st = S.readings[r.id] || { best: 0 };
        const first = !st.done && ok / r.questions.length >= 0.75;
        st.best = Math.max(st.best || 0, ok); st.total = r.questions.length;
        if (ok / r.questions.length >= 0.75) st.done = true;
        S.readings[r.id] = st; save();
        if (first) { addXP(XP_READING); toast(`+${XP_READING} XP · leitura concluída 📖`); }
        checkLevelUps();
      }
      const y = window.scrollY; render(); window.scrollTo({ top: y });
      break;
    }
    case 'rq-retry': rquiz = null; render(); break;
    case 'vmode': vocab.mode = el.dataset.m; render(); break;
    case 'band': vocab.band = Number(el.dataset.i); vocab.q = ''; render(); break;
    case 'wk': case 'wr': {
      setWord(el.dataset.w, a === 'wk' ? 'k' : 'r', true);
      const w = WORDS.find(x => x.w === el.dataset.w);
      const node = $(`#w-${w.rank}`);
      if (node) node.outerHTML = wordHtml(w);
      break;
    }
    case 'flip': vocab.flash.flipped = !vocab.flash.flipped; $('#vbody').innerHTML = vocabBody(); break;
    case 'flash-yes': case 'flash-no': {
      const f = vocab.flash; const w = f.deck[f.i];
      if (a === 'flash-yes') { f.ok++; setWord(w.w, 'k'); }
      else setWord(w.w, 'r');
      f.i++; f.flipped = false;
      $('#vbody').innerHTML = vocabBody();
      break;
    }
    case 'flash-new': newFlash(); render(); break;
    case 'vq': {
      const z = vocab.quiz; const q = z.qs[z.i];
      q.given = Number(el.dataset.j);
      if (q.given === q.right) { z.ok++; if (S.words[q.w.w] !== 'k') setWord(q.w.w, 'k'); else addXP(1); }
      else setWord(q.w.w, 'r');
      $('#vbody').innerHTML = vocabBody();
      break;
    }
    case 'vq-next': vocab.quiz.i++; $('#vbody').innerHTML = vocabBody(); break;
    case 'vquiz-new': newVQuiz(); render(); break;
    case 'theme': S.settings.theme = el.dataset.v; save(); applyTheme(); render(); break;
    case 'export': exportData(); break;
    case 'import': importData(); break;
    case 'reset':
      if (confirm('Apagar todo o seu progresso (assuntos, palavras, extras, XP)? Isso não pode ser desfeito.')) {
        const keep = S.settings; S = JSON.parse(JSON.stringify(DEFAULT)); S.settings = keep; save(); quiz = null; rquiz = null; go('trilha');
      }
      break;
  }
});

document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.act === 'cando') {
    const id = el.dataset.level, i = Number(el.dataset.i);
    const list = new Set(S.cando[id] || []);
    if (el.checked) { list.add(i); addXP(XP_CANDO); toast(`+${XP_CANDO} XP · que evolução! 💪`); } else list.delete(i);
    S.cando[id] = [...list]; save();
    el.closest('.check-row').classList.toggle('on', el.checked);
    checkLevelUps();
  }
  if (el.id === 'set-goal') { S.settings.goal = Number(el.value); save(); render(); }
  if (el.id === 'set-rate') { S.settings.rate = Number(el.value); save(); speak('This is the new speed.'); }
  if (el.id === 'set-rem') {
    S.settings.reminder = el.value !== 'off';
    if (S.settings.reminder) S.settings.reminderTime = el.value;
    save(); scheduleReminder(true);
  }
});

document.addEventListener('submit', e => {
  const f = e.target;
  if (f.dataset.act !== 'fill') return;
  e.preventDefault();
  const i = Number(f.dataset.i);
  const t = TOPIC[quiz.topicId];
  const given = f.querySelector('input').value;
  if (!given.trim()) return;
  const ok = t.ex[i][2].some(a => norm(a) === norm(given));
  answer(i, ok, given);
});

document.addEventListener('input', e => {
  if (e.target.id === 'vsearch') {
    vocab.q = e.target.value;
    const pos = e.target.selectionStart;
    $('#vbody').innerHTML = vocabBody();
    const inp = $('#vsearch'); inp.focus(); inp.setSelectionRange(pos, pos);
  }
});

$$('.tabbar button').forEach(b => b.addEventListener('click', () => go(b.dataset.tab)));
$('#back').addEventListener('click', () => {
  if (history.state && history.length > 1) history.back();
  else go(TAB_OF[route.name] || 'trilha');
});

/* =========================================================
   UTILITÁRIOS
   ========================================================= */
let toastTimer;
function toast(msg, ms = 2600) {
  const el = $('#toast');
  el.textContent = msg; el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), ms);
}

function celebrate() {
  const box = $('#confetti');
  const icons = ['🎉', '⭐', '🏆', '🇺🇸', '🇬🇧', '💪'];
  box.innerHTML = Array.from({ length: 40 }, () =>
    `<i style="left:${Math.random() * 100}%;animation-duration:${1.8 + Math.random() * 1.8}s;animation-delay:${Math.random() * 0.6}s">${icons[Math.floor(Math.random() * icons.length)]}</i>`).join('');
  setTimeout(() => { box.innerHTML = ''; }, 4500);
}

function applyTheme() {
  const dark = S.settings.theme === 'escuro';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  const m = document.querySelector('meta[name=theme-color]');
  if (m) m.content = dark ? '#0f1120' : '#4f46e5';
}

/* ---------- Backup e restauração ---------- */
async function exportData() {
  const json = JSON.stringify({ app: 'trilha-fluente', version: 1, savedAt: new Date().toISOString(), state: S }, null, 2);
  const name = `trilha-fluente-backup-${dateKey()}.json`;
  if (Native.FS && Native.Share) {
    // Android: grava o arquivo e abre o "Compartilhar" (Drive, WhatsApp, e-mail, Arquivos...)
    try {
      const { uri } = await Native.FS.writeFile({ path: name, data: json, directory: 'CACHE', encoding: 'utf8' });
      await Native.Share.share({ title: 'Backup Trilha Fluente', text: 'Backup do meu progresso no Trilha Fluente', url: uri, dialogTitle: 'Salvar backup em…' });
    } catch (err) {
      if (!String(err && err.message).toLowerCase().includes('cancel')) toast('Não foi possível gerar o backup.');
    }
    return;
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast('Backup baixado 💾');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.addEventListener('change', async () => {
    const file = input.files && input.files[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const st = data && data.app === 'trilha-fluente' ? data.state : data;
      if (!st || typeof st !== 'object' || !st.topics || !st.words) throw new Error('formato');
      const words = Object.values(st.words).filter(x => x === 'k').length;
      const topics = Object.values(st.topics).filter(t => t.done || t.manual).length;
      const when = data.savedAt ? ` de ${new Date(data.savedAt).toLocaleDateString('pt-BR')}` : '';
      if (!confirm(`Restaurar o backup${when}? (${topics} assuntos e ${words} palavras)\nO progresso atual deste aparelho será substituído.`)) return;
      S = { ...JSON.parse(JSON.stringify(DEFAULT)), ...st, settings: { ...DEFAULT.settings, ...(st.settings || {}) } };
      save(); quiz = null; rquiz = null; vocab.flash = null; vocab.quiz = null;
      applyTheme(); scheduleReminder(false); render();
      toast('Progresso restaurado ✅');
    } catch {
      toast('Arquivo inválido. Escolha o arquivo de backup do Trilha Fluente (.json).', 4000);
    }
  });
  input.click();
}

/* Lembrete diário (somente no app Android) */
async function scheduleReminder(fromUser) {
  const LN = Native.LN;
  if (!LN) return;
  try {
    await LN.cancel({ notifications: [{ id: 1 }] });
    if (!S.settings.reminder) { if (fromUser) toast('Lembrete desligado'); return; }
    let perm = await LN.checkPermissions();
    if (perm.display !== 'granted') perm = await LN.requestPermissions();
    if (perm.display !== 'granted') { toast('Permita as notificações para receber o lembrete.'); return; }
    try { await LN.createChannel({ id: 'estudo', name: 'Lembrete de estudo', importance: 4 }); } catch { /* ok */ }
    const [hour, minute] = S.settings.reminderTime.split(':').map(Number);
    await LN.schedule({ notifications: [{
      id: 1, channelId: 'estudo', title: '📚 Hora do inglês!',
      body: 'Só 10 minutinhos hoje: uma lição, 10 palavras ou uma música. Mantenha sua sequência 🔥',
      schedule: { on: { hour, minute }, allowWhileIdle: true },
    }] });
    if (fromUser) toast(`Lembrete todo dia às ${S.settings.reminderTime} ⏰`);
  } catch (err) { console.warn(err); }
}

/* =========================================================
   INÍCIO
   ========================================================= */
applyTheme();
history.replaceState(route, '');
render();
scheduleReminder(false);
if ('serviceWorker' in navigator && location.protocol !== 'file:' && !Native.isNative) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
