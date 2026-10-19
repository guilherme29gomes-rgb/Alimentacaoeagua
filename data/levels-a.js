/* Trilha — níveis A1 e A2.
   Exercício: ['mc', pergunta, [opções], índiceCorreto, explicação]
              ['fill', frase com ___, [respostas aceitas], explicação] */
window.LEVELS = window.LEVELS || [];

/* Blocos interativos das lições de alfabeto e números (toque para ouvir) */
const A1X = (() => {
  const tile = (label, speak, sub) => `<button class="tile" data-act="say" data-text="${speak}"><b>${label}</b><small>${sub}</small></button>`;
  const say = (t, show) => `<span class="say-inline">${show || t} <button class="say" data-act="say" data-text="${t}" aria-label="Ouvir">🔊</button></span>`;
  const letters = [['A', 'ay', 'êi'], ['B', 'bee', 'bí'], ['C', 'see', 'sí'], ['D', 'dee', 'dí'], ['E', 'ee', 'í'], ['F', 'ef', 'éf'],
    ['G', 'gee', 'djí'], ['H', 'aitch', 'êitch'], ['I', 'eye', 'ái'], ['J', 'jay', 'djêi'], ['K', 'kay', 'kêi'], ['L', 'el', 'él'],
    ['M', 'em', 'ém'], ['N', 'en', 'én'], ['O', 'oh', 'ôu'], ['P', 'pee', 'pí'], ['Q', 'cue', 'kiú'], ['R', 'ar', 'ár'],
    ['S', 'ess', 'és'], ['T', 'tee', 'tí'], ['U', 'you', 'iú'], ['V', 'vee', 'ví'], ['W', 'double you', 'dâbliu'], ['X', 'ex', 'éks'],
    ['Y', 'why', 'uái'], ['Z', 'zee', 'zí / zéd']];
  const nato = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel', 'India', 'Juliett', 'Kilo', 'Lima', 'Mike',
    'November', 'Oscar', 'Papa', 'Quebec', 'Romeo', 'Sierra', 'Tango', 'Uniform', 'Victor', 'Whiskey', 'X-ray', 'Yankee', 'Zulu'];
  const units = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty'.split(' ');
  const tens = [[20, 'twenty'], [30, 'thirty'], [40, 'forty'], [50, 'fifty'], [60, 'sixty'], [70, 'seventy'], [80, 'eighty'], [90, 'ninety']];
  const ordinals = [['1st', 'first'], ['2nd', 'second'], ['3rd', 'third'], ['4th', 'fourth'], ['5th', 'fifth'], ['6th', 'sixth'],
    ['7th', 'seventh'], ['8th', 'eighth'], ['9th', 'ninth'], ['10th', 'tenth'], ['11th', 'eleventh'], ['12th', 'twelfth'],
    ['13th', 'thirteenth'], ['20th', 'twentieth'], ['21st', 'twenty-first'], ['22nd', 'twenty-second'], ['23rd', 'twenty-third'], ['31st', 'thirty-first']];
  return {
    say,
    alphabet: `<div class="tiles">${letters.map(([l, , pt]) => tile(l, l, pt)).join('')}</div>`, // o leitor de voz diz o nome da letra
    nato: `<div class="tiles wide">${nato.map(w => tile(w[0], w, w)).join('')}</div>`,
    units: `<div class="tiles">${units.map((w, i) => tile(i, w, w)).join('')}</div>`,
    tens: `<div class="tiles">${tens.map(([n, w]) => tile(n, w, w)).join('')}</div>`,
    ordinals: `<div class="tiles wide">${ordinals.map(([n, w]) => tile(n, w, w)).join('')}</div>`,
  };
})();

window.LEVELS.push({
  id: 'a1', cefr: 'A1', name: 'Iniciante', color: '#22a06b',
  goal: 'Entender e usar frases do dia a dia, se apresentar e fazer perguntas simples.',
  cando: [
    'Consigo me apresentar (nome, idade, cidade, profissão).',
    'Consigo soletrar meu nome e dizer números de telefone.',
    'Consigo falar da minha rotina com frases simples.',
    'Consigo pedir algo em uma loja ou restaurante.',
    'Consigo dizer as horas e marcar um dia.',
  ],
  topics: [
    {
      id: 'a1-hello', cat: 'Conversação', title: 'Cumprimentos e apresentações',
      lesson: `<p>As primeiras frases que você vai usar todo dia:</p>
<ul><li><b>Hello / Hi</b> — Olá / Oi (hi é mais informal)</li>
<li><b>Good morning / afternoon / evening</b> — Bom dia / Boa tarde / Boa noite (ao chegar)</li>
<li><b>Good night</b> — Boa noite (só ao se despedir ou ir dormir)</li>
<li><b>How are you?</b> — Como vai? → <b>I'm fine, thanks. And you?</b></li>
<li><b>What's your name?</b> → <b>My name is…</b> / <b>I'm…</b></li>
<li><b>Nice to meet you.</b> — Prazer em conhecer. → <b>Nice to meet you too.</b></li>
<li><b>Where are you from?</b> → <b>I'm from Brazil.</b></li>
<li><b>Bye / See you later / See you tomorrow</b> — Tchau / Até mais / Até amanhã</li></ul>
<p>💡 Em inglês quase sempre se usa o sujeito: “<i>I'm</i> fine”, nunca só “fine” em frase completa.</p>`,
      examples: [['Hi! My name is Ana. Nice to meet you.', 'Oi! Meu nome é Ana. Prazer em te conhecer.'], ['Good morning! How are you?', 'Bom dia! Como vai você?'], ["I'm from São Paulo. Where are you from?", 'Sou de São Paulo. De onde você é?']],
      ex: [
        ['mc', 'Às 22h, você vai embora de uma festa. Você diz:', ['Good evening', 'Good night', 'Good afternoon'], 1, '“Good night” é usado para se despedir à noite.'],
        ['mc', 'Resposta natural para “Nice to meet you”:', ['Nice to meet you too.', 'I am fine.', 'Good morning.'], 0, 'Responde-se com “Nice to meet you too”.'],
        ['fill', "What's your ___? — My name is Paulo.", ['name'], '“What’s your name?” = Qual é o seu nome?'],
        ['fill', 'Where are you ___? — I am from Brazil.', ['from'], '“Where are you from?” pergunta a origem.'],
        ['mc', '“How are you?” significa:', ['Quantos anos você tem?', 'Como vai você?', 'Onde você mora?'], 1, 'How are you? = Como vai?'],
        ['fill', "I'm fine, ___. And you?", ['thanks', 'thank you'], 'Agradecemos com “thanks” ou “thank you”.'],
      ],
    },
    {
      id: 'a1-alphabet', cat: 'Pronúncia', title: 'Alfabeto e como soletrar',
      lesson: `<p>Em inglês você vai soletrar o tempo todo: nome, sobrenome, e-mail, endereço. <b>Toque em cada letra para ouvir</b> (embaixo, a pronúncia aproximada em português):</p>
${A1X.alphabet}
<p><b>⚠️ As que mais confundem brasileiros</b></p>
<ul><li>As vogais soam diferente: <b>A</b> (êi) · <b>E</b> (í) · <b>I</b> (ái) · <b>O</b> (ôu) · <b>U</b> (iú). O <b>E</b> inglês soa como nosso “i”, e o <b>I</b> como “ai”.</li>
<li><b>G</b> (djí) × <b>J</b> (djêi) — parecidos; o J termina em “êi”.</li>
<li><b>H</b> (êitch), <b>R</b> (ár), <b>W</b> (dâbliu = “double u”), <b>Y</b> (uái).</li>
<li><b>Z</b> é “zí” nos EUA e “zéd” no Reino Unido.</li></ul>
<p><b>Soletrando</b></p>
<ul><li>${A1X.say('How do you spell your name?')} — Como se soletra seu nome?</li>
<li>${A1X.say('It is S, I, L, V, A.', "It's S-I-L-V-A.")}</li>
<li>Letras repetidas: <b>double</b> — ${A1X.say('B, E, double L, A', 'Bella = B-E-double L-A')} (também pode dizer L-L)</li>
<li>Maiúscula = <b>capital letter</b> · minúscula = <b>lowercase / small letter</b></li></ul>
<p><b>E-mail e internet</b></p>
<ul><li><b>@</b> = at · <b>.</b> = dot · <b>-</b> = dash (ou hyphen) · <b>_</b> = underscore · <b>/</b> = slash</li>
<li>${A1X.say('ana dot silva at gmail dot com', 'ana.silva@gmail.com → “ana dot silva at gmail dot com”')}</li></ul>
<p><b>Alfabeto do telefone</b> — para não haver confusão (B ou D? M ou N?), usa-se uma palavra para cada letra: “B as in Bravo”.</p>
${A1X.nato}`,
      examples: [['How do you spell your last name?', 'Como se soletra o seu sobrenome?'], ["It's G-O-M-E-S.", 'É G-O-M-E-S.'], ['My email is paulo at gmail dot com.', 'Meu e-mail é paulo@gmail.com.']],
      ex: [
        ['listen', 'G', ['G', 'J', 'Z'], 0, 'G soa “djí”.'],
        ['listen', 'J', ['G', 'J', 'Y'], 1, 'J soa “djêi”.'],
        ['listen', 'I', ['E', 'I', 'A'], 1, 'I soa “ái”.'],
        ['listen', 'E', ['I', 'E', 'A'], 1, 'E soa “í”.'],
        ['listen', 'H, Y, R', ['H - Y - R', 'A - I - R', 'H - I - A'], 0, 'H (êitch), Y (uái), R (ár).'],
        ['mc', 'Como se lê a letra W?', ['dâbliu (double u)', 'vê dobrado', 'uí'], 0, 'W = double u (dâbliu).'],
        ['fill', 'No e-mail, o símbolo @ se lê ___', ['at'], '@ = at.'],
        ['mc', 'Em um e-mail, “dot” é o:', ['ponto (.)', 'arroba (@)', 'traço (-)'], 0, 'dot = ponto.'],
      ],
    },
    {
      id: 'a1-numbers', cat: 'Vocabulário', title: 'Números de 0 a 1 milhão',
      lesson: `<p><b>0 a 20</b> — toque para ouvir:</p>
${A1X.units}
<p><b>Dezenas</b>:</p>
${A1X.tens}
<p>💡 <b>forty</b> (40) não tem “u”, mesmo four (4) e fourteen (14) tendo.</p>
<p><b>-teen × -ty</b> (a confusão mais comum!): ${A1X.say('thirteen', '13 thir<b>TEEN</b>')} tem a força no final e um “n”. ${A1X.say('thirty', '30 <b>THIR</b>ty')} tem a força no começo.</p>
<p><b>21 a 99</b> — dezena + hífen + unidade: ${A1X.say('twenty-one', '21 twenty-one')} · ${A1X.say('forty-five', '45 forty-five')} · ${A1X.say('ninety-nine', '99 ninety-nine')}</p>
<p><b>Centenas</b>: ${A1X.say('one hundred', '100 one hundred')} (ou <i>a hundred</i>) · ${A1X.say('one hundred and five', '105 one hundred and five')} · ${A1X.say('two hundred and fifty', '250 two hundred (and) fifty')}. O “and” é comum no Reino Unido; nos EUA é opcional.</p>
<p><b>Milhares e milhões</b>: ${A1X.say('one thousand', '1,000 one thousand')} · ${A1X.say('two thousand five hundred', '2,500 two thousand five hundred')} · ${A1X.say('ten thousand', '10,000 ten thousand')} · ${A1X.say('one hundred thousand', '100,000 one hundred thousand')} · ${A1X.say('one million', '1,000,000 one million')} · ${A1X.say('one billion', '1,000,000,000 one billion')} (= 1 bilhão)</p>
<ul><li>⚠️ Sem plural depois de número: <b>two hundred</b>, <b>five thousand</b>, <b>three million</b> (nunca “two hundreds”).</li>
<li>Mas no plural quando é “muitos”: <i>hundreds of people</i> (centenas de pessoas), <i>thousands of dollars</i>.</li>
<li>⚠️ Inglês usa <b>vírgula</b> para milhar e <b>ponto</b> para decimal — o contrário do português: 1,500 = mil e quinhentos; 1.5 = um e meio.</li></ul>`,
      examples: [['There are thirty-two students in my class.', 'Há trinta e dois alunos na minha turma.'], ['The car costs fifteen thousand dollars.', 'O carro custa quinze mil dólares.'], ['More than two million people live here.', 'Mais de dois milhões de pessoas moram aqui.']],
      ex: [
        ['listen', 'fifteen', ['15', '50', '5'], 0, 'fifteen = 15 (fifty = 50).'],
        ['listen', 'forty', ['14', '40', '4'], 1, 'forty = 40, força no início.'],
        ['listen', 'seventy-three', ['73', '37', '63'], 0, 'seventy-three = 73.'],
        ['listen', 'three thousand two hundred', ['3,200', '320', '32,000'], 0, '3,200 = three thousand two hundred.'],
        ['fill', '99 em inglês: ___', ['ninety-nine', 'ninety nine'], '99 = ninety-nine.'],
        ['mc', '200 em inglês:', ['two hundreds', 'two hundred', 'two hundred of'], 1, 'Sem plural: two hundred.'],
        ['mc', 'Em inglês, “1,500” significa:', ['um vírgula cinco', 'mil e quinhentos'], 1, 'Vírgula separa milhar em inglês.'],
        ['fill', '1.000.000 = one ___', ['million'], '1 milhão = one million.'],
      ],
    },
    {
      id: 'a1-numbers2', cat: 'Vocabulário', title: 'Números no dia a dia: ordinais, datas, preços',
      lesson: `<p><b>Ordinais</b> (primeiro, segundo…) — usados em datas, andares e posições:</p>
${A1X.ordinals}
<ul><li>Regra: número + <b>th</b> (fourth, sixth). Terminados em 1, 2, 3 usam <b>st, nd, rd</b>: 21st, 32nd, 43rd — exceto 11th, 12th, 13th.</li>
<li>Irregulares: first, second, third, fifth, eighth, ninth, twelfth, twentieth.</li></ul>
<p><b>Datas</b></p>
<ul><li>EUA: ${A1X.say('May fifth', 'May 5th → “May fifth”')} · Reino Unido: ${A1X.say('the fifth of May', '“the fifth of May”')}</li>
<li>⚠️ Nos EUA a data numérica é <b>mês/dia</b>: 04/07 = <b>7 de abril</b> (April 7th)!</li></ul>
<p><b>Anos</b> — em pares: ${A1X.say('nineteen ninety-eight', '1998 nineteen ninety-eight')} · ${A1X.say('two thousand and five', '2005 two thousand (and) five')} · ${A1X.say('twenty twenty-five', '2025 twenty twenty-five')}</p>
<p><b>Preços</b>: ${A1X.say('four ninety-nine', '$4.99 “four ninety-nine”')} ou “four dollars and ninety-nine cents” · ${A1X.say('twenty pounds', '£20 twenty pounds')} · ${A1X.say('fifty reais', 'R$50 fifty reais')}</p>
<p><b>Telefone</b>: número por número; 0 = “oh” ou “zero”; repetido pode ser “double”: ${A1X.say('nine eight seven, double five, oh one', '987-5501 → nine eight seven, double five, oh one')}</p>
<p><b>Decimais, porcentagem e frações</b>: ${A1X.say('two point five', '2.5 two point five')} · ${A1X.say('thirty percent', '30% thirty percent')} · ½ <b>a half</b> · ⅓ <b>a third</b> · ¼ <b>a quarter</b> · ¾ <b>three quarters</b></p>`,
      examples: [['I live on the third floor.', 'Moro no terceiro andar.'], ['My birthday is on June twenty-first.', 'Meu aniversário é em 21 de junho.'], ['It costs nine ninety-nine.', 'Custa 9,99.']],
      ex: [
        ['listen', 'twenty-first', ['21st', '20th', '23rd'], 0, 'twenty-first = 21st.'],
        ['fill', '3rd = ___', ['third'], '3º = third.'],
        ['mc', '12º em inglês:', ['twelveth', 'twelfth', 'twelvth'], 1, 'twelfth (irregular).'],
        ['listen', 'nineteen ninety-eight', ['1998', '1898', '9198'], 0, 'Anos se leem em pares: 19 | 98.'],
        ['mc', 'Como se lê o ano 2025?', ['twenty twenty-five', 'two zero two five', 'twenty hundred twenty-five'], 0, '2025 = twenty twenty-five.'],
        ['mc', 'Nos EUA, a data 04/07 significa:', ['4 de julho', '7 de abril'], 1, 'EUA usa mês/dia: April 7th.'],
        ['listen', 'two point five', ['2.5', '25', '2,500'], 0, 'point = vírgula decimal: 2.5.'],
        ['fill', '½ = a ___', ['half'], '½ = a half.'],
      ],
    },
    {
      id: 'a1-tobe', cat: 'Gramática', title: 'Verbo to be (am / is / are)',
      lesson: `<p>O verbo <b>to be</b> significa <b>ser</b> e <b>estar</b>.</p>
<ul><li><b>I am</b> (I'm)</li><li><b>You / We / They are</b> (you're, we're, they're)</li><li><b>He / She / It is</b> (he's, she's, it's)</li></ul>
<p><b>Negativa</b>: coloque <b>not</b> depois: I'm not / she isn't / they aren't.</p>
<p><b>Pergunta</b>: inverta o verbo: <b>Are</b> you tired? — Yes, I am. / No, I'm not. <b>Is</b> he a doctor?</p>
<p>💡 Idade usa to be: <i>I am 20</i> (não “I have 20”). Fome, sede e frio também: <i>I'm hungry, I'm cold</i>.</p>`,
      examples: [['She is a teacher.', 'Ela é professora.'], ["We aren't at home now.", 'Não estamos em casa agora.'], ['Are you hungry? — Yes, I am.', 'Você está com fome? — Sim, estou.']],
      ex: [
        ['fill', 'They ___ my friends.', ['are'], 'They → are.'],
        ['fill', 'My mother ___ a nurse.', ['is'], 'My mother = she → is.'],
        ['mc', 'Como dizer “Eu tenho 18 anos”?', ['I have 18 years.', 'I am 18 years old.', 'I has 18.'], 1, 'Idade usa to be: I am 18 (years old).'],
        ['mc', 'Escolha a negativa correta:', ["He aren't tired.", "He isn't tired.", "He not is tired."], 1, 'He → is not / isn’t.'],
        ['fill', '___ you from Brazil? — Yes, I am.', ['are'], 'Pergunta com you: Are you…?'],
        ['fill', 'I ___ cold. Close the window, please.', ['am', "'m"], 'I → am. “I am cold” = estou com frio.'],
      ],
    },
    {
      id: 'a1-pronouns', cat: 'Gramática', title: 'Pronomes pessoais e possessivos',
      lesson: `<table class="tbl"><tr><th>Sujeito</th><th>Possessivo</th></tr>
<tr><td>I (eu)</td><td>my (meu/minha)</td></tr><tr><td>you (você)</td><td>your</td></tr>
<tr><td>he (ele)</td><td>his</td></tr><tr><td>she (ela)</td><td>her</td></tr>
<tr><td>it (coisa/animal)</td><td>its</td></tr><tr><td>we (nós)</td><td>our</td></tr>
<tr><td>they (eles/elas)</td><td>their</td></tr></table>
<p>💡 O possessivo concorda com o <b>dono</b>, não com a coisa: “a mãe <b>dele</b>” = <i>his mother</i>; “o carro <b>dela</b>” = <i>her car</i>.</p>
<p>💡 <b>its</b> (dele, de coisa) ≠ <b>it's</b> (it is).</p>`,
      examples: [['This is my brother. His name is Leo.', 'Este é meu irmão. O nome dele é Leo.'], ['They love their dog.', 'Eles amam o cachorro deles.'], ['Our house is small.', 'Nossa casa é pequena.']],
      ex: [
        ['fill', 'Maria loves ___ job. (o trabalho dela)', ['her'], 'Dona = Maria (she) → her.'],
        ['fill', 'John is with ___ wife. (a esposa dele)', ['his'], 'Dono = John (he) → his.'],
        ['mc', '“Nossos filhos” em inglês:', ['their children', 'our children', 'your children'], 1, 'we → our.'],
        ['mc', 'Complete: The cat is eating ___ food.', ["it's", 'its', 'his'], 1, 'Possessivo de it = its (sem apóstrofo).'],
        ['fill', 'My parents live in Rio. ___ house is big.', ['their'], 'they → their.'],
        ['mc', '“Is this ___ phone, sir?”', ['you', 'your', "you're"], 1, 'Possessivo de you = your.'],
      ],
    },
    {
      id: 'a1-articles', cat: 'Gramática', title: 'Artigos (a, an, the) e plural',
      lesson: `<ul><li><b>a</b> — antes de som de consoante: a car, a house, <b>a u</b>niversity (som de “iu”)</li>
<li><b>an</b> — antes de som de vogal: an apple, an egg, <b>an h</b>our (h mudo)</li>
<li><b>the</b> — o/a/os/as, algo específico: <i>the book on the table</i></li></ul>
<p>Use a/an com <b>profissões</b>: <i>She is <b>a</b> doctor</i> (em português não usamos artigo).</p>
<p><b>Plural</b>: em geral + <b>s</b> (cars). Terminações s/sh/ch/x + <b>es</b> (buses, watches). Consoante + y → <b>ies</b> (city → cities).</p>
<p><b>Irregulares</b>: man → men, woman → women, child → children, person → people, foot → feet, tooth → teeth.</p>`,
      examples: [["I'm an engineer.", 'Sou engenheiro.'], ['The children are in the park.', 'As crianças estão no parque.'], ['I need an hour to finish.', 'Preciso de uma hora para terminar.']],
      ex: [
        ['mc', '___ orange, please.', ['A', 'An', 'The an'], 1, 'Orange começa com som de vogal → an.'],
        ['mc', 'He is ___ university student.', ['a', 'an'], 0, 'University começa com som “iu” (consoante) → a.'],
        ['fill', 'One child, two ___.', ['children'], 'Plural irregular: children.'],
        ['fill', 'One city, three ___.', ['cities'], 'Consoante + y → ies.'],
        ['mc', '“Ela é dentista” em inglês:', ['She is dentist.', 'She is a dentist.', 'She is the dentist.'], 1, 'Profissão leva a/an.'],
        ['fill', 'One person, many ___.', ['people'], 'Plural de person = people.'],
      ],
    },
    {
      id: 'a1-thereis', cat: 'Gramática', title: 'There is / There are e preposições de lugar',
      lesson: `<p><b>There is</b> (singular) / <b>There are</b> (plural) = <b>há / tem</b> (existir).</p>
<ul><li>There is a bank near here. — Tem um banco aqui perto.</li><li>There are two bedrooms. — Há dois quartos.</li>
<li>Pergunta: <b>Is there</b> a pharmacy? <b>Are there</b> any chairs?</li></ul>
<p>⚠️ Não use “have” para existir: “Tem um problema” = <i>There is a problem</i>.</p>
<p><b>Lugar</b>: in (dentro), on (em cima/sobre), under (embaixo), next to (ao lado), between (entre), behind (atrás), in front of (na frente).</p>`,
      examples: [['There is a cat under the table.', 'Tem um gato embaixo da mesa.'], ['Are there any restaurants near the hotel?', 'Há restaurantes perto do hotel?'], ['The bank is between the school and the park.', 'O banco fica entre a escola e o parque.']],
      ex: [
        ['fill', 'There ___ three people in the room.', ['are'], 'Plural → there are.'],
        ['fill', 'There ___ a problem with my computer.', ['is'], 'Singular → there is.'],
        ['mc', '“Tem um mercado aqui perto?”', ['Have a market near here?', 'Is there a market near here?', 'There is a market near here?'], 1, 'Pergunta: Is there…?'],
        ['mc', 'The keys are ___ the table. (em cima)', ['on', 'under', 'between'], 0, 'Em cima de uma superfície = on.'],
        ['fill', 'The car is ___ front of the house.', ['in'], 'in front of = na frente de.'],
        ['mc', 'O oposto de “in front of”:', ['behind', 'next to', 'under'], 0, 'behind = atrás.'],
      ],
    },
    {
      id: 'a1-present', cat: 'Gramática', title: 'Simple present — afirmativa e rotina',
      lesson: `<p>Usamos o <b>simple present</b> para rotinas, hábitos e verdades.</p>
<p>Com <b>he / she / it</b> o verbo ganha <b>-s</b>: I work → she work<b>s</b>.</p>
<ul><li>Terminações o, s, sh, ch, x → <b>-es</b>: go → goes, watch → watches</li>
<li>Consoante + y → <b>-ies</b>: study → studies</li><li>have → <b>has</b></li></ul>
<p>Rotina: get up, have breakfast, go to work, have lunch, come back home, take a shower, go to bed.</p>`,
      examples: [['I get up at 6 every day.', 'Eu acordo às 6 todo dia.'], ['She works in a hospital.', 'Ela trabalha em um hospital.'], ['My brother studies English at night.', 'Meu irmão estuda inglês à noite.']],
      ex: [
        ['fill', 'He ___ (play) soccer on Sundays.', ['plays'], 'he → verbo + s.'],
        ['fill', 'She ___ (watch) TV every night.', ['watches'], 'ch → es.'],
        ['fill', 'My father ___ (have) two cars.', ['has'], 'have → has com he/she/it.'],
        ['mc', 'Escolha a correta:', ['They works here.', 'They work here.', 'They working here.'], 1, 'They → sem s.'],
        ['fill', 'Ana ___ (study) at night.', ['studies'], 'consoante + y → ies.'],
        ['mc', '“Eu vou dormir às 23h” (rotina):', ['I go to bed at 11.', 'I goes to bed at 11.', 'I going to bed at 11.'], 0, 'I → go.'],
      ],
    },
    {
      id: 'a1-dodoes', cat: 'Gramática', title: 'Simple present — negativa e perguntas (do / does)',
      lesson: `<p>Para negar e perguntar usamos o auxiliar <b>do</b> (I, you, we, they) ou <b>does</b> (he, she, it).</p>
<ul><li>Negativa: I <b>don't</b> like coffee. She <b>doesn't</b> like coffee.</li>
<li>Pergunta: <b>Do</b> you speak English? <b>Does</b> he live here?</li>
<li>Respostas curtas: Yes, I do. / No, she doesn't.</li></ul>
<p>⚠️ Com does/doesn't o verbo volta ao normal: <i>She doesn't <b>work</b></i> (não “works”).</p>
<p>Perguntas com palavras: What do you do? (o que você faz/profissão) · Where does she live? · What time do you get up?</p>`,
      examples: [["I don't eat meat.", 'Eu não como carne.'], ['Does your sister speak English?', 'Sua irmã fala inglês?'], ['What do you do? — I am a designer.', 'O que você faz? — Sou designer.']],
      ex: [
        ['fill', 'She ___ like fish. (negativa)', ["doesn't", 'does not'], 'she → doesn’t.'],
        ['fill', '___ you live near here?', ['do'], 'you → Do.'],
        ['mc', 'Escolha a correta:', ["He doesn't works.", "He don't work.", "He doesn't work."], 2, 'doesn’t + verbo sem s.'],
        ['fill', 'Where ___ your parents live?', ['do'], 'parents = they → do.'],
        ['mc', 'Resposta curta para “Does he smoke?” (não):', ["No, he doesn't.", "No, he don't.", 'No, he not.'], 0, 'he → doesn’t.'],
        ['mc', '“What do you do?” pergunta:', ['O que você está fazendo agora?', 'Qual é a sua profissão?', 'O que você quer?'], 1, 'É a pergunta clássica sobre profissão.'],
      ],
    },
    {
      id: 'a1-can', cat: 'Gramática', title: 'Can — habilidade, permissão e pedidos',
      lesson: `<p><b>Can</b> = poder / saber fazer. Igual para todas as pessoas e seguido de verbo sem “to”.</p>
<ul><li>I <b>can</b> swim. She <b>can</b> speak Spanish.</li><li>Negativa: <b>can't</b> (cannot): I can't drive.</li>
<li>Pergunta: <b>Can</b> you help me? <b>Can</b> I open the window?</li></ul>
<p>Pedidos educados: <b>Could you</b>…? (mais educado) · <b>Can I have</b> a coffee, please?</p>
<p>⚠️ Nunca “He cans” nem “can to swim”.</p>`,
      examples: [['Can you speak more slowly, please?', 'Você pode falar mais devagar, por favor?'], ["I can't find my keys.", 'Não consigo achar minhas chaves.'], ['Can I have the menu, please?', 'Pode me trazer o cardápio, por favor?']],
      ex: [
        ['mc', 'Escolha a correta:', ['She cans dance.', 'She can dance.', 'She can to dance.'], 1, 'can + verbo, sem s e sem to.'],
        ['fill', 'I ___ swim. I never learned. (negativa)', ["can't", 'cannot', 'can not'], 'Negativa: can’t.'],
        ['fill', '___ I have a glass of water, please?', ['can', 'could'], 'Pedido: Can I have…?'],
        ['mc', 'O pedido mais educado:', ['Give me the salt.', 'Could you pass the salt, please?', 'You pass the salt.'], 1, 'Could you…, please? é bem educado.'],
        ['fill', 'My son is two. He ___ walk but he can\'t read.', ['can'], 'Habilidade: can.'],
        ['mc', '“Você sabe dirigir?”', ['Can you drive?', 'Do you can drive?', 'Are you drive?'], 0, 'Pergunta: Can you…?'],
      ],
    },
    {
      id: 'a1-time', cat: 'Vocabulário', title: 'Horas, dias, meses e datas',
      lesson: `<p><b>Horas</b>: What time is it? — It's <b>seven o'clock</b> (7:00) · <b>half past</b> seven (7:30) · <b>a quarter past</b> seven (7:15) · <b>a quarter to</b> eight (7:45) · ten <b>past</b> seven (7:10). Também pode dizer só os números: <i>seven thirty</i>.</p>
<p><b>Dias</b> (sempre com maiúscula): Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.</p>
<p><b>Meses</b>: January, February, March, April, May, June, July, August, September, October, November, December.</p>
<p><b>Preposições</b>: <b>at</b> + horas (at 8) · <b>on</b> + dias/datas (on Monday, on May 5th) · <b>in</b> + meses/anos (in July, in 2025).</p>
<p>Datas usam números ordinais: first (1st), second (2nd), third (3rd), fourth (4th), twenty-first (21st).</p>`,
      examples: [["The meeting is at half past ten.", 'A reunião é às 10h30.'], ['My birthday is on March 3rd.', 'Meu aniversário é em 3 de março.'], ['We travel in December.', 'Viajamos em dezembro.']],
      ex: [
        ['mc', '8:30 em inglês:', ['half past eight', 'half to eight', 'eight and half'], 0, '8:30 = half past eight / eight thirty.'],
        ['fill', 'I have English class ___ Monday.', ['on'], 'Dias da semana: on.'],
        ['fill', 'The movie starts ___ 9 p.m.', ['at'], 'Horas: at.'],
        ['fill', 'I was born ___ 1995.', ['in'], 'Anos: in.'],
        ['mc', 'O dia depois de Tuesday:', ['Thursday', 'Wednesday', 'Monday'], 1, 'Tuesday → Wednesday.'],
        ['mc', '7:45 pode ser dito como:', ['a quarter past seven', 'a quarter to eight', 'half past seven'], 1, '7:45 = a quarter to eight.'],
      ],
    },
    {
      id: 'a1-continuous', cat: 'Gramática', title: 'Present continuous (agora)',
      lesson: `<p>Para ações <b>acontecendo agora</b>: <b>am/is/are + verbo-ing</b>.</p>
<ul><li>I <b>am working</b> now. She <b>is sleeping</b>. They <b>are playing</b>.</li>
<li>Negativa: I'm not watching TV. Pergunta: <b>Are</b> you listening?</li></ul>
<p>Regras do -ing: write → writ<b>ing</b> (tira o e) · run → ru<b>nn</b>ing, swim → swi<b>mm</b>ing (dobra a consoante).</p>
<p>Compare: <i>I work every day</i> (rotina) × <i>I'm working now</i> (agora).</p>`,
      examples: [["I'm studying English right now.", 'Estou estudando inglês agora.'], ['What are you doing?', 'O que você está fazendo?'], ["It's raining. Take an umbrella.", 'Está chovendo. Leve um guarda-chuva.']],
      ex: [
        ['fill', 'Be quiet! The baby ___ sleeping.', ['is'], 'The baby = it/he → is.'],
        ['fill', 'They are ___ (swim) in the pool.', ['swimming'], 'swim → swimming (dobra o m).'],
        ['mc', 'Escolha a correta para “agora”:', ['I read a book now.', "I'm reading a book now.", 'I reading a book now.'], 1, 'Agora → present continuous.'],
        ['fill', 'What are you ___ (do)?', ['doing'], 'do → doing.'],
        ['mc', '“Ela trabalha aqui” (sempre):', ['She is working here.', 'She works here.', 'She working here.'], 1, 'Rotina → simple present.'],
        ['fill', "Look! It ___ snowing!", ['is', "'s"], 'it → is.'],
      ],
    },
    {
      id: 'a1-useful', cat: 'Conversação', title: 'Frases úteis: restaurante, loja e viagem',
      lesson: `<ul><li><b>I'd like</b> a coffee, please. — Eu gostaria de um café.</li>
<li><b>How much is it?</b> — Quanto custa? <b>How much are these?</b> — Quanto custam estes?</li>
<li><b>Can I pay by card?</b> — Posso pagar no cartão?</li>
<li><b>Where is the bathroom?</b> — Onde fica o banheiro?</li>
<li><b>Excuse me</b> — Com licença (para chamar atenção) · <b>Sorry</b> — Desculpa</li>
<li><b>I don't understand. Can you repeat, please?</b></li>
<li><b>The check / the bill, please.</b> — A conta, por favor.</li></ul>
<p>💡 “Please” e “thank you” são muito usados. Sem eles a frase pode soar grosseira.</p>`,
      examples: [["I'd like a table for two, please.", 'Eu gostaria de uma mesa para dois, por favor.'], ['How much is this T-shirt?', 'Quanto custa esta camiseta?'], ["Excuse me, where's the train station?", 'Com licença, onde fica a estação de trem?']],
      ex: [
        ['mc', 'Para perguntar o preço:', ['How many is it?', 'How much is it?', 'What cost?'], 1, 'Preço: How much is it?'],
        ['fill', "I'd ___ a sandwich, please.", ['like'], 'I’d like = eu gostaria.'],
        ['mc', 'Para pedir a conta:', ['The count, please.', 'The bill, please.', 'The account, please.'], 1, 'A conta = the bill / the check (EUA).'],
        ['fill', "Excuse me, where ___ the bathroom?", ['is'], 'Singular → is.'],
        ['mc', 'Você não entendeu. Diga:', ["Sorry, I don't understand.", "I'm not understand.", "I no understand."], 0, 'I don’t understand.'],
        ['fill', 'Can I pay ___ card?', ['by', 'with'], 'pay by card = pagar com cartão.'],
      ],
    },
  ],
});

window.LEVELS.push({
  id: 'a2', cefr: 'A2', name: 'Básico', color: '#0b84d8',
  goal: 'Falar do passado e de planos, comparar coisas e se virar em situações comuns.',
  cando: [
    'Consigo contar o que fiz no fim de semana.',
    'Consigo falar dos meus planos para o futuro.',
    'Consigo comparar produtos, lugares e pessoas.',
    'Consigo dar e pedir conselhos simples.',
    'Consigo escrever uma mensagem curta para um amigo.',
  ],
  topics: [
    {
      id: 'a2-wasw', cat: 'Gramática', title: 'Passado do verbo to be (was / were)',
      lesson: `<ul><li><b>I / he / she / it → was</b></li><li><b>you / we / they → were</b></li></ul>
<p>Negativa: wasn't / weren't. Pergunta: <b>Was</b> she at home? <b>Were</b> you tired?</p>
<p>Expressões de passado: yesterday, last night, last week, two days ago, in 2010.</p>
<p>💡 “Nasci em…” = <i>I <b>was born</b> in…</i></p>`,
      examples: [['I was at the beach yesterday.', 'Eu estava na praia ontem.'], ['Were you at the party last night?', 'Você estava na festa ontem à noite?'], ["They weren't happy with the result.", 'Eles não ficaram felizes com o resultado.']],
      ex: [
        ['fill', 'We ___ in Paris last year.', ['were'], 'we → were.'],
        ['fill', 'She ___ sick yesterday.', ['was'], 'she → was.'],
        ['mc', '“Onde você nasceu?”', ['Where did you born?', 'Where were you born?', 'Where you was born?'], 1, 'Nascer = to be born → Where were you born?'],
        ['fill', "The test ___ difficult. It was easy! (negativa)", ["wasn't", 'was not'], 'it → wasn’t.'],
        ['mc', '___ your parents at home?', ['Was', 'Were'], 1, 'parents = they → were.'],
        ['mc', '“Há dois dias”:', ['two days ago', 'ago two days', 'before two days'], 0, 'tempo + ago.'],
      ],
    },
    {
      id: 'a2-pastreg', cat: 'Gramática', title: 'Simple past — verbos regulares',
      lesson: `<p>Verbos regulares ganham <b>-ed</b> e a forma é a mesma para todas as pessoas: work → work<b>ed</b>.</p>
<ul><li>Termina em e: live → live<b>d</b> · Consoante + y: study → stud<b>ied</b> · stop → sto<b>pp</b>ed</li></ul>
<p><b>Negativa e pergunta</b> usam <b>did</b> + verbo normal: I <b>didn't work</b>. <b>Did</b> you <b>watch</b> the game?</p>
<p>Pronúncia do -ed: /t/ em <i>worked</i>, /d/ em <i>played</i>, e /id/ só depois de t/d: <i>wanted, needed</i>.</p>`,
      examples: [['I watched a great movie last night.', 'Assisti a um ótimo filme ontem à noite.'], ["She didn't call me.", 'Ela não me ligou.'], ['Did you study for the test?', 'Você estudou para a prova?']],
      ex: [
        ['fill', 'Yesterday I ___ (work) until 8 p.m.', ['worked'], 'work → worked.'],
        ['fill', 'She ___ (study) all weekend.', ['studied'], 'study → studied.'],
        ['mc', 'Escolha a correta:', ['Did you watched TV?', 'Did you watch TV?', 'You did watch TV?'], 1, 'did + verbo normal.'],
        ['fill', "We ___ play soccer yesterday. It rained. (negativa)", ["didn't", 'did not'], 'Negativa no passado: didn’t.'],
        ['mc', 'Em qual verbo o -ed soa /id/?', ['played', 'wanted', 'cooked'], 1, '/id/ após t ou d: wanted.'],
        ['fill', 'They ___ (stop) the car.', ['stopped'], 'stop → stopped (dobra o p).'],
      ],
    },
    {
      id: 'a2-pastirreg', cat: 'Gramática', title: 'Simple past — verbos irregulares',
      lesson: `<p>Os verbos mais usados são irregulares. Decore os principais:</p>
<p>go → <b>went</b> · have → <b>had</b> · do → <b>did</b> · make → <b>made</b> · get → <b>got</b> · see → <b>saw</b> · come → <b>came</b> · take → <b>took</b> · eat → <b>ate</b> · drink → <b>drank</b> · buy → <b>bought</b> · think → <b>thought</b> · say → <b>said</b> · tell → <b>told</b> · write → <b>wrote</b> · leave → <b>left</b> · meet → <b>met</b> · give → <b>gave</b> · know → <b>knew</b> · find → <b>found</b></p>
<p>⚠️ Na negativa e na pergunta o verbo volta ao normal: <i>I didn't <b>go</b></i> (não “didn't went”).</p>`,
      examples: [['We went to the beach on Saturday.', 'Fomos à praia no sábado.'], ['I bought a new phone.', 'Comprei um celular novo.'], ["Did you see the news? — No, I didn't.", 'Você viu as notícias? — Não.']],
      ex: [
        ['fill', 'I ___ (go) to the gym yesterday.', ['went'], 'go → went.'],
        ['fill', 'She ___ (buy) a dress.', ['bought'], 'buy → bought.'],
        ['mc', 'Escolha a correta:', ["I didn't went.", "I didn't go.", "I not went."], 1, 'didn’t + verbo normal.'],
        ['fill', 'We ___ (eat) pizza last night.', ['ate'], 'eat → ate.'],
        ['fill', 'He ___ (tell) me the truth.', ['told'], 'tell → told.'],
        ['mc', 'Passado de “think”:', ['thinked', 'thought', 'thank'], 1, 'think → thought.'],
      ],
    },
    {
      id: 'a2-goingto', cat: 'Gramática', title: 'Futuro com going to',
      lesson: `<p><b>am/is/are + going to + verbo</b> para <b>planos</b> e decisões já tomadas, ou previsões com evidência.</p>
<ul><li>I'<b>m going to</b> travel next month. (plano)</li><li>Look at the clouds! It's <b>going to</b> rain. (evidência)</li>
<li>Negativa: She isn't going to come. Pergunta: <b>Are</b> you going to study tonight?</li></ul>
<p>💡 Na fala, <i>going to</i> vira “<b>gonna</b>” (informal).</p>`,
      examples: [["I'm going to start a diet on Monday.", 'Vou começar uma dieta na segunda.'], ['What are you going to do this weekend?', 'O que você vai fazer neste fim de semana?'], ["Be careful! You're going to fall!", 'Cuidado! Você vai cair!']],
      ex: [
        ['fill', 'We ___ going to visit my grandma.', ['are'], 'we → are going to.'],
        ['fill', "She's going ___ buy a car.", ['to'], 'going to + verbo.'],
        ['mc', '“Vai chover” (vendo nuvens escuras):', ["It's going to rain.", 'It goes rain.', 'It going rain.'], 0, 'Previsão com evidência: going to.'],
        ['mc', 'Pergunta correta:', ['You are going to travel?', 'Are you going to travel?', 'Are you go to travel?'], 1, 'Inverte: Are you going to…?'],
        ['fill', "I'm not going to ___ (watch) TV tonight.", ['watch'], 'going to + verbo normal.'],
        ['mc', '“gonna” significa:', ['going to', 'got to', 'want to'], 0, 'gonna = going to (informal).'],
      ],
    },
    {
      id: 'a2-will', cat: 'Gramática', title: 'Futuro com will',
      lesson: `<p><b>will + verbo</b> (igual para todos) para: <b>decisões na hora</b>, <b>promessas</b>, <b>ofertas</b> e <b>previsões/opiniões</b>.</p>
<ul><li>The phone is ringing. — I'<b>ll</b> get it! (decisão na hora)</li><li>I <b>will</b> help you. (promessa)</li>
<li>I think it <b>will</b> be a good year. (opinião)</li><li>Negativa: <b>won't</b> (will not). Pergunta: <b>Will</b> you marry me?</li></ul>
<p>Compare: <i>I'm going to</i> (plano já feito) × <i>I'll</i> (decido agora).</p>`,
      examples: [["I'll call you tomorrow, I promise.", 'Eu te ligo amanhã, prometo.'], ["Don't worry, I won't tell anyone.", 'Não se preocupe, não vou contar a ninguém.'], ['I think she will love the gift.', 'Acho que ela vai amar o presente.']],
      ex: [
        ['mc', 'Alguém bate na porta. Você diz:', ["I'm going to open it.", "I'll open it.", 'I open it.'], 1, 'Decisão na hora: will.'],
        ['fill', "I ___ forget your birthday. I promise! (negativa)", ["won't", 'will not'], 'will not = won’t.'],
        ['mc', 'Escolha a correta:', ['She wills come.', 'She will comes.', 'She will come.'], 2, 'will + verbo normal.'],
        ['fill', 'I think Brazil ___ win the game.', ['will'], 'Opinião/previsão: will.'],
        ['mc', '“Vou viajar em julho, já comprei a passagem.”', ["I'll travel in July.", "I'm going to travel in July."], 1, 'Plano já feito: going to.'],
        ['fill', '___ you help me with my bags, please?', ['will', 'can', 'could'], 'Pedido: Will/Can you…?'],
      ],
    },
    {
      id: 'a2-compare', cat: 'Gramática', title: 'Comparativos e superlativos',
      lesson: `<table class="tbl"><tr><th>Adjetivo</th><th>Comparativo</th><th>Superlativo</th></tr>
<tr><td>curto: tall</td><td>tall<b>er</b> than</td><td>the tall<b>est</b></td></tr>
<tr><td>termina em y: easy</td><td>eas<b>ier</b></td><td>the eas<b>iest</b></td></tr>
<tr><td>CVC: big</td><td>bi<b>gg</b>er</td><td>the bi<b>gg</b>est</td></tr>
<tr><td>longo: expensive</td><td><b>more</b> expensive</td><td><b>the most</b> expensive</td></tr>
<tr><td>good / bad / far</td><td><b>better / worse / farther</b></td><td><b>the best / the worst / the farthest</b></td></tr></table>
<p>Igualdade: <b>as</b> tall <b>as</b> (tão alto quanto). Use <b>than</b> no comparativo (nunca “that”).</p>`,
      examples: [['My brother is taller than me.', 'Meu irmão é mais alto que eu.'], ['This is the best pizza in town.', 'Esta é a melhor pizza da cidade.'], ['English is not as difficult as you think.', 'Inglês não é tão difícil quanto você pensa.']],
      ex: [
        ['fill', 'São Paulo is ___ (big) than Curitiba.', ['bigger'], 'big → bigger.'],
        ['fill', 'This is the ___ (good) day of my life!', ['best'], 'good → the best.'],
        ['mc', 'Escolha a correta:', ['more cheap', 'cheaper', 'cheapest than'], 1, 'Adjetivo curto: cheap → cheaper.'],
        ['fill', 'A Ferrari is more expensive ___ a Fiat.', ['than'], 'Comparativo + than.'],
        ['mc', '“Hoje está pior que ontem.”', ['Today is worse than yesterday.', 'Today is badder than yesterday.', 'Today is more bad than yesterday.'], 0, 'bad → worse.'],
        ['fill', 'She is as tall ___ her mother.', ['as'], 'as … as = tão … quanto.'],
      ],
    },
    {
      id: 'a2-quant', cat: 'Gramática', title: 'Some, any, much, many, a lot of',
      lesson: `<p><b>Contáveis</b> (apple, chair) × <b>incontáveis</b> (water, money, information, advice — sem plural).</p>
<ul><li><b>some</b> → afirmativas e ofertas: I have some friends. Would you like some coffee?</li>
<li><b>any</b> → negativas e perguntas: I don't have any money. Do you have any questions?</li>
<li><b>many</b> + contáveis: How many people? · <b>much</b> + incontáveis: How much time?</li>
<li><b>a lot of</b> serve para os dois: a lot of friends / a lot of money</li>
<li><b>a few</b> (contáveis) / <b>a little</b> (incontáveis) = um pouco, alguns</li></ul>`,
      examples: [['How much water do you drink a day?', 'Quanta água você bebe por dia?'], ["There aren't any eggs in the fridge.", 'Não há ovos na geladeira.'], ['I have a few friends in London.', 'Tenho alguns amigos em Londres.']],
      ex: [
        ['mc', 'How ___ money do you need?', ['many', 'much'], 1, 'money é incontável → much.'],
        ['mc', 'How ___ brothers do you have?', ['many', 'much'], 0, 'brothers é contável → many.'],
        ['fill', "We don't have ___ milk.", ['any'], 'Negativa → any.'],
        ['fill', 'Would you like ___ tea?', ['some'], 'Oferta → some.'],
        ['mc', 'Qual é incontável?', ['chair', 'information', 'book'], 1, 'information não tem plural.'],
        ['fill', 'I need a ___ help, please. (um pouco)', ['little'], 'help é incontável → a little.'],
      ],
    },
    {
      id: 'a2-freq', cat: 'Gramática', title: 'Advérbios de frequência',
      lesson: `<p><b>always</b> (100%) → <b>usually</b> → <b>often</b> → <b>sometimes</b> → <b>rarely</b> → <b>never</b> (0%)</p>
<p>Posição: <b>antes</b> do verbo principal, mas <b>depois</b> do to be:</p>
<ul><li>I <b>always</b> drink coffee. · She <b>never</b> eats meat.</li><li>He is <b>always</b> late.</li></ul>
<p>Pergunta: <b>How often</b> do you go to the gym? — Three times a week / once a month / every day.</p>`,
      examples: [['I usually wake up at 7.', 'Eu geralmente acordo às 7.'], ["She's never late.", 'Ela nunca se atrasa.'], ['How often do you study English? — Every day.', 'Com que frequência você estuda inglês? — Todo dia.']],
      ex: [
        ['mc', 'Ordem correta:', ['I go always to work by bus.', 'I always go to work by bus.', 'Always I go to work by bus.'], 1, 'Advérbio antes do verbo principal.'],
        ['mc', 'Ordem correta com to be:', ['He always is happy.', 'He is always happy.'], 1, 'Com to be, depois do verbo.'],
        ['fill', 'How ___ do you go to the cinema?', ['often'], 'How often = com que frequência.'],
        ['mc', '“Duas vezes por semana”:', ['two times for week', 'twice a week', 'two per week times'], 1, 'twice a week.'],
        ['fill', 'I ___ eat fast food. I hate it! (0%)', ['never'], '0% = never.'],
        ['mc', 'Qual indica a maior frequência?', ['often', 'sometimes', 'usually'], 2, 'usually > often > sometimes.'],
      ],
    },
    {
      id: 'a2-object', cat: 'Gramática', title: 'Pronomes objeto e possessivo com ’s',
      lesson: `<p>Depois do verbo ou preposição use o <b>pronome objeto</b>:</p>
<p>I → <b>me</b> · you → <b>you</b> · he → <b>him</b> · she → <b>her</b> · it → <b>it</b> · we → <b>us</b> · they → <b>them</b></p>
<p><i>She loves <b>him</b>. Call <b>me</b>. This gift is for <b>them</b>.</i></p>
<p><b>Possessivo com ’s</b>: o dono + ’s + coisa: <i>John<b>'s</b> car</i> (o carro do John), <i>my mother<b>'s</b> house</i>. Plural com s: <i>my parents<b>'</b> house</i>.</p>
<p>Pronomes possessivos sozinhos: mine, yours, his, hers, ours, theirs — <i>This book is <b>mine</b>.</i></p>`,
      examples: [['Can you help me?', 'Você pode me ajudar?'], ["This is Pedro's bike.", 'Esta é a bicicleta do Pedro.'], ['Is this phone yours? — Yes, it’s mine.', 'Este celular é seu? — Sim, é meu.']],
      ex: [
        ['fill', 'I love my parents. I call ___ every day.', ['them'], 'they → them.'],
        ['fill', 'Maria is nice. I like ___.', ['her'], 'she → her.'],
        ['mc', '“O carro da minha irmã”:', ["my sister's car", 'the car of my sister', "my sister car's"], 0, 'dono + ’s + coisa.'],
        ['mc', 'This pen is not yours. It\'s ___.', ['my', 'mine', 'me'], 1, 'Pronome sozinho: mine.'],
        ['fill', 'Please wait for ___. (nós)', ['us'], 'we → us.'],
        ['mc', 'Escolha a correta:', ['She called I.', 'She called me.', 'She called my.'], 1, 'Objeto: me.'],
      ],
    },
    {
      id: 'a2-modals', cat: 'Gramática', title: 'Have to, must e should',
      lesson: `<ul><li><b>have to / has to</b> — obrigação (regras, necessidade): I have to work tomorrow.</li>
<li><b>must</b> — obrigação forte / regra escrita / opinião forte: You must wear a seatbelt.</li>
<li><b>should</b> — conselho: You should drink more water.</li></ul>
<p>⚠️ Negativas mudam de sentido: <b>don't have to</b> = não precisa · <b>mustn't</b> = é proibido · <b>shouldn't</b> = não é bom.</p>
<p>Passado de must/have to: <b>had to</b>.</p>`,
      examples: [['You should see a doctor.', 'Você deveria ir ao médico.'], ["You don't have to come if you're busy.", 'Você não precisa vir se estiver ocupado.'], ["You mustn't smoke here.", 'É proibido fumar aqui.']],
      ex: [
        ['mc', 'Conselho para alguém cansado:', ['You must sleep.', 'You should sleep more.', 'You have sleep.'], 1, 'Conselho: should.'],
        ['mc', '“Não precisa pagar, é grátis.”', ["You mustn't pay.", "You don't have to pay.", "You shouldn't pay."], 1, 'Não é necessário: don’t have to.'],
        ['fill', 'She ___ to wake up early for work.', ['has'], 'she → has to.'],
        ['mc', '“É proibido estacionar aqui.”', ["You don't have to park here.", "You mustn't park here."], 1, 'Proibição: mustn’t.'],
        ['fill', 'Yesterday I ___ to stay late at work.', ['had'], 'Passado: had to.'],
        ['fill', 'You ___ eat so much sugar. It’s bad for you.', ["shouldn't", 'should not'], 'Conselho negativo: shouldn’t.'],
      ],
    },
    {
      id: 'a2-reading-email', cat: 'Conversação', title: 'Mensagens, e-mails e telefone',
      lesson: `<p><b>Mensagem informal</b>: Hi / Hey Ana, … · Thanks for… · See you soon! · Love / Cheers / Best,</p>
<p><b>E-mail formal</b>: Dear Mr. Smith, · I am writing to… · Could you please…? · I look forward to hearing from you. · Kind regards / Best regards,</p>
<p><b>Telefone</b>: Hello, this is Carlos. (não “I am Carlos”) · Can I speak to…? · Hold on, please. · Can I leave a message? · I'll call you back.</p>
<p>Abreviações comuns: ASAP (as soon as possible), BTW (by the way), FYI (for your information), thx (thanks).</p>`,
      examples: [['Hello, this is Rafael. Can I speak to Mary, please?', 'Alô, aqui é o Rafael. Posso falar com a Mary?'], ['I look forward to hearing from you.', 'Aguardo seu retorno.'], ["She's busy now. Can I take a message?", 'Ela está ocupada agora. Quer deixar recado?']],
      ex: [
        ['mc', 'Ao telefone, para se identificar:', ['I am Carlos.', 'This is Carlos.', 'Here Carlos.'], 1, 'Ao telefone: This is…'],
        ['mc', 'Encerramento de e-mail formal:', ['Kisses,', 'Kind regards,', 'See ya!'], 1, 'Formal: Kind/Best regards.'],
        ['fill', "I'll call you ___. (retorno a ligação)", ['back'], 'call back = retornar a ligação.'],
        ['mc', '“ASAP” significa:', ['o mais rápido possível', 'por favor', 'até logo'], 0, 'as soon as possible.'],
        ['fill', 'Dear Ms. Lee, I am writing ___ ask about the job.', ['to'], 'I am writing to + verbo.'],
        ['mc', '“Aguarde um momento” ao telefone:', ['Hold on, please.', 'Hold up, please.', 'Wait me.'], 0, 'Hold on, please.'],
      ],
    },
  ],
});
