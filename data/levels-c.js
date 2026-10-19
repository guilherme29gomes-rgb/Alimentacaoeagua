/* Trilha — níveis C1 e C2 */
window.LEVELS = window.LEVELS || [];

window.LEVELS.push({
  id: 'c1', cefr: 'C1', name: 'Avançado', color: '#d64545',
  goal: 'Usar o inglês com flexibilidade no trabalho e nos estudos, entendendo sentidos implícitos.',
  cando: [
    'Consigo assistir filmes e séries sem legenda e entender quase tudo.',
    'Consigo fazer uma apresentação de trabalho em inglês.',
    'Consigo escrever textos claros e bem estruturados sobre temas complexos.',
    'Consigo entender piadas, ironia e expressões idiomáticas comuns.',
    'Consigo ajustar meu registro (formal × informal) à situação.',
  ],
  topics: [
    {
      id: 'c1-inversion', cat: 'Gramática', title: 'Inversão para ênfase',
      lesson: `<p>Em inglês formal ou enfático, algumas expressões negativas/restritivas no início da frase invertem sujeito e auxiliar (como numa pergunta):</p>
<ul><li><b>Never have I</b> seen such a beautiful place.</li><li><b>Rarely do we</b> get a chance like this.</li>
<li><b>Not only did she</b> win, <b>but</b> she also broke the record.</li>
<li><b>No sooner had I</b> arrived <b>than</b> it started to rain.</li><li><b>Hardly had</b> we sat down <b>when</b> the phone rang.</li>
<li><b>Under no circumstances should you</b> open this door.</li><li><b>Only then did I</b> realize the truth.</li></ul>`,
      examples: [['Never have I felt so happy.', 'Nunca me senti tão feliz.'], ['Not only is he smart, but he is also kind.', 'Ele não só é inteligente, como também é gentil.'], ['Under no circumstances should you share your password.', 'Em hipótese alguma você deve compartilhar sua senha.']],
      ex: [
        ['mc', 'Never ___ such a mess!', ['I have seen', 'have I seen', 'I saw'], 1, 'Inversão: have I seen.'],
        ['fill', 'Rarely ___ he arrive on time. (presente)', ['does'], 'Inversão com does.'],
        ['mc', 'No sooner had I left ___ it started raining.', ['when', 'than', 'that'], 1, 'No sooner… than.'],
        ['fill', 'Not only ___ she sing, but she also dances. (presente)', ['does'], 'Not only does she…'],
        ['mc', 'Escolha a correta:', ['Only then I understood.', 'Only then did I understand.'], 1, 'Only then + inversão.'],
        ['fill', 'Under no circumstances ___ you leave the room. (should)', ['should'], 'Under no circumstances should you…'],
      ],
    },
    {
      id: 'c1-cleft', cat: 'Gramática', title: 'Cleft sentences (frases de destaque)',
      lesson: `<p>Estruturas para destacar uma informação:</p>
<ul><li><b>It was</b> John <b>who</b> broke the window. (foi o John que…)</li>
<li><b>What I need is</b> a long holiday. (o que eu preciso é…)</li>
<li><b>All I want is</b> some peace and quiet. (tudo que eu quero é…)</li>
<li><b>The reason why</b> I called <b>is that</b>… · <b>The thing is</b>,… (o problema é que…)</li>
<li><b>What happened was</b> (that)… — muito usado ao contar histórias.</li></ul>`,
      examples: [["What I love about this city is the food.", 'O que eu amo nesta cidade é a comida.'], ['It was in Lisbon that we first met.', 'Foi em Lisboa que nos conhecemos.'], ["The thing is, I don't have enough time.", 'O problema é que não tenho tempo suficiente.']],
      ex: [
        ['fill', '___ I need is a cup of coffee.', ['what'], 'What I need is…'],
        ['mc', '“Foi a Maria que ligou.”', ['It was Maria who called.', 'Was Maria who called.', 'It is Maria called.'], 0, 'It was … who …'],
        ['fill', '___ I want is to sleep. (tudo que)', ['all'], 'All I want is…'],
        ['mc', '“O problema é que…” (informal):', ['The problem it is…', 'The thing is,…', 'The thing that…'], 1, 'The thing is,…'],
        ['fill', 'It was in 2010 ___ I moved to Canada.', ['that'], 'It was … that …'],
        ['mc', 'Função das cleft sentences:', ['fazer perguntas', 'dar ênfase', 'falar do futuro'], 1, 'Destacar informação.'],
      ],
    },
    {
      id: 'c1-idioms', cat: 'Vocabulário', title: 'Expressões idiomáticas do dia a dia',
      lesson: `<ul><li><b>break the ice</b> — quebrar o gelo · <b>a piece of cake</b> — moleza</li>
<li><b>hit the books</b> — estudar pra valer · <b>call it a day</b> — encerrar o dia (trabalho)</li>
<li><b>under the weather</b> — meio doente · <b>on the same page</b> — alinhados, de acordo</li>
<li><b>cost an arm and a leg</b> — custar os olhos da cara · <b>once in a blue moon</b> — muito raramente</li>
<li><b>get the hang of</b> — pegar o jeito · <b>the ball is in your court</b> — agora é com você</li>
<li><b>beat around the bush</b> — enrolar · <b>let the cat out of the bag</b> — deixar escapar um segredo</li>
<li><b>it's not my cup of tea</b> — não é a minha praia</li></ul>`,
      examples: [["The test was a piece of cake.", 'A prova foi moleza.'], ["I'm feeling a bit under the weather today.", 'Estou meio indisposto hoje.'], ["Stop beating around the bush and tell me!", 'Pare de enrolar e me conte!']],
      ex: [
        ['mc', '“It costs an arm and a leg” significa:', ['é muito caro', 'é perigoso', 'é pesado'], 0, 'Custa os olhos da cara.'],
        ['mc', '“Let’s call it a day.”', ['Vamos marcar um dia.', 'Vamos encerrar por hoje.', 'Vamos ligar amanhã.'], 1, 'Encerrar o trabalho do dia.'],
        ['fill', "Don't worry, you'll get the ___ of it. (pegar o jeito)", ['hang'], 'get the hang of.'],
        ['mc', '“Once in a blue moon” =', ['toda noite', 'muito raramente', 'em noites de lua cheia'], 1, 'Muito raramente.'],
        ['fill', 'Horror movies are not my cup of ___.', ['tea'], 'not my cup of tea.'],
        ['mc', '“Estamos alinhados?”', ['Are we on the same page?', 'Are we in the same paper?'], 0, 'on the same page.'],
      ],
    },
    {
      id: 'c1-formal', cat: 'Conversação', title: 'Linguagem formal e “hedging” (suavizar)',
      lesson: `<p>No trabalho e em textos acadêmicos, o inglês evita frases diretas demais. Isso se chama <b>hedging</b>:</p>
<ul><li>It <b>seems / appears</b> that… · There <b>might be</b> a problem with… · <b>It could be argued</b> that…</li>
<li><b>I'm afraid</b> I can't… (lamento, mas não posso) · <b>I was wondering if</b> you could…</li>
<li><b>Would you mind</b> + -ing…? · <b>It might be worth</b> + -ing… (talvez valha a pena)</li>
<li>Discordar com educação: <b>I see your point, but</b>… · <b>I'm not sure I agree.</b> · <b>With all due respect,</b>…</li></ul>
<p>Formal × informal: get → obtain/receive · need → require · help → assist · buy → purchase · ask → enquire · start → commence.</p>`,
      examples: [['I was wondering if you could send me the file.', 'Gostaria de saber se você poderia me enviar o arquivo.'], ["I'm afraid we can't accept your offer.", 'Lamento, mas não podemos aceitar sua proposta.'], ['It might be worth checking the numbers again.', 'Talvez valha a pena conferir os números de novo.']],
      ex: [
        ['mc', 'Forma mais educada:', ['Send me the report.', 'I was wondering if you could send me the report.'], 1, 'I was wondering if… suaviza o pedido.'],
        ['mc', 'Equivalente formal de “buy”:', ['purchase', 'get', 'take'], 0, 'purchase.'],
        ['fill', "I'm ___ I can't attend the meeting. (lamento)", ['afraid'], 'I’m afraid = lamento.'],
        ['mc', 'Discordar educadamente:', ["You're wrong.", "I see your point, but I'm not sure I agree."], 1, 'Reconhecer + discordar.'],
        ['fill', 'Would you ___ closing the door? (se importaria)', ['mind'], 'Would you mind + -ing.'],
        ['mc', 'Equivalente formal de “need”:', ['want', 'require', 'ask'], 1, 'require.'],
      ],
    },
    {
      id: 'c1-participle', cat: 'Gramática', title: 'Participle clauses (orações reduzidas)',
      lesson: `<p>Deixam o texto mais elegante e curto:</p>
<ul><li><b>-ing</b> (ação ativa/simultânea): <b>Walking</b> down the street, I saw an old friend. (Enquanto andava…)</li>
<li><b>particípio</b> (passiva): <b>Built</b> in 1890, the house needs repairs. (Construída em 1890…)</li>
<li><b>Having + particípio</b> (ação anterior): <b>Having finished</b> the report, she went home.</li>
<li>Reduzindo relativas: The man <b>sitting</b> there is my boss. (= who is sitting) · The car <b>stolen</b> yesterday was found. (= which was stolen)</li></ul>`,
      examples: [['Feeling tired, I went to bed early.', 'Sentindo-me cansado, fui dormir cedo.'], ['Having lived in London, he speaks English well.', 'Tendo morado em Londres, ele fala inglês bem.'], ['The documents signed yesterday are on your desk.', 'Os documentos assinados ontem estão na sua mesa.']],
      ex: [
        ['mc', '___ in 1900, the bridge is still in use.', ['Building', 'Built', 'Having build'], 1, 'Passiva → particípio.'],
        ['fill', '___ finished his work, he left. (tendo)', ['having'], 'Having + particípio.'],
        ['mc', 'The girl ___ next to Tom is his sister.', ['sitting', 'sat', 'sits'], 0, '= who is sitting.'],
        ['mc', '“Não sabendo o que fazer, ela ligou para a mãe.”', ['Not knowing what to do, she called her mom.', 'Not knew what to do, she called her mom.'], 0, 'Not + -ing.'],
        ['fill', 'The emails ___ (send) last week never arrived.', ['sent'], 'Passiva reduzida → particípio.'],
        ['mc', '“Having eaten” indica:', ['ação simultânea', 'ação anterior', 'ação futura'], 1, 'Having + particípio = antes.'],
      ],
    },
    {
      id: 'c1-modals-past', cat: 'Gramática', title: 'Modais no passado (should have, needn’t have…)',
      lesson: `<ul><li><b>should have</b> + particípio — devia ter (crítica/arrependimento): You <b>should have told</b> me.</li>
<li><b>shouldn't have</b> — não devia ter: I <b>shouldn't have eaten</b> so much.</li>
<li><b>could have</b> — podia ter (possibilidade não usada): You <b>could have called</b>!</li>
<li><b>needn't have</b> — fiz, mas não era necessário: I <b>needn't have brought</b> an umbrella.</li>
<li><b>didn't need to</b> — não precisei (e provavelmente não fiz).</li>
<li><b>would have</b> — teria (vontade): I <b>would have come</b>, but I was sick.</li></ul>`,
      examples: [['You should have seen his face!', 'Você precisava ter visto a cara dele!'], ['We could have won if we had tried harder.', 'Poderíamos ter ganhado se tivéssemos nos esforçado mais.'], ["You needn't have bought me a gift.", 'Não precisava ter me comprado um presente.']],
      ex: [
        ['fill', 'I failed. I should ___ studied more.', ['have'], 'should have + particípio.'],
        ['mc', '“Você podia ter me avisado!”', ['You could have told me!', 'You could told me!', 'You can have told me!'], 0, 'could have + particípio.'],
        ['mc', '“Não precisava ter cozinhado (mas cozinhou).”', ["You didn't need to cook.", "You needn't have cooked."], 1, 'needn’t have = fez sem necessidade.'],
        ['fill', "I shouldn't ___ said that. Sorry.", ['have'], 'shouldn’t have.'],
        ['mc', '“Eu teria ido, mas estava doente.”', ['I would go, but I was sick.', 'I would have gone, but I was sick.'], 1, 'would have + particípio.'],
        ['fill', 'You should have ___ (see) the view!', ['seen'], 'see → seen.'],
      ],
    },
    {
      id: 'c1-markers', cat: 'Conversação', title: 'Marcadores de conversa (soar natural)',
      lesson: `<p>Palavras que nativos usam o tempo todo para organizar a fala:</p>
<ul><li><b>Actually</b> — na verdade (não é “atualmente”!) · <b>Anyway</b> — enfim, de qualquer forma</li>
<li><b>By the way</b> — aliás · <b>I mean</b> — quer dizer · <b>You know</b> — sabe</li>
<li><b>Basically</b> — basicamente · <b>To be honest</b> — sinceramente · <b>As far as I know</b> — até onde eu sei</li>
<li><b>Speaking of which</b> — falando nisso · <b>Having said that</b> — dito isso · <b>Fair enough</b> — justo, faz sentido</li>
<li>Ganhar tempo: <b>Let me think…</b> · <b>That's a good question.</b> · <b>How can I put it?</b></li></ul>`,
      examples: [["Actually, I've never been there.", 'Na verdade, nunca estive lá.'], ['Anyway, what was I saying?', 'Enfim, o que eu estava dizendo?'], ["It's expensive. Having said that, it's worth it.", 'É caro. Dito isso, vale a pena.']],
      ex: [
        ['mc', '“Actually” significa:', ['atualmente', 'na verdade', 'realmente agora'], 1, 'Falso cognato: actually = na verdade.'],
        ['mc', '“Atualmente” em inglês:', ['actually', 'currently / nowadays', 'actual'], 1, 'currently / nowadays.'],
        ['fill', 'By the ___, did you call your mom? (aliás)', ['way'], 'by the way.'],
        ['mc', '“Fair enough” =', ['é justo / faz sentido', 'muito justo de preço', 'está claro demais'], 0, 'Aceitar o argumento.'],
        ['fill', 'As far as I ___, the store closes at 10. (até onde sei)', ['know'], 'As far as I know.'],
        ['mc', 'Para ganhar tempo ao responder:', ["That's a good question.", 'Fair enough.', 'Anyway.'], 0, 'That’s a good question…'],
      ],
    },
    {
      id: 'c1-wordform', cat: 'Vocabulário', title: 'Formação de palavras (prefixos e sufixos)',
      lesson: `<p>Conhecer prefixos e sufixos multiplica seu vocabulário:</p>
<ul><li>Negativos: <b>un</b>happy, <b>in</b>correct, <b>im</b>possible, <b>il</b>legal, <b>ir</b>responsible, <b>dis</b>agree, <b>mis</b>understand</li>
<li><b>re-</b> (de novo): redo, rewrite · <b>over-</b> (demais): overwork, overcooked · <b>under-</b> (de menos): underpaid</li>
<li>Substantivos: -<b>tion</b> (decision), -<b>ment</b> (improvement), -<b>ness</b> (happiness), -<b>ity</b> (ability), -<b>ance/-ence</b> (difference)</li>
<li>Adjetivos: -<b>ful</b> (useful), -<b>less</b> (useless), -<b>able</b> (comfortable), -<b>ous</b> (dangerous), -<b>ive</b> (creative)</li>
<li>Verbos: -<b>ize</b> (organize), -<b>en</b> (widen, strengthen)</li></ul>`,
      examples: [['Sorry, I misunderstood your question.', 'Desculpe, entendi errado sua pergunta.'], ['This tool is useless.', 'Esta ferramenta é inútil.'], ['We need to strengthen our team.', 'Precisamos fortalecer nossa equipe.']],
      ex: [
        ['fill', 'possible → ___ (impossível)', ['impossible'], 'im + possible.'],
        ['fill', 'legal → ___ (ilegal)', ['illegal'], 'il + legal.'],
        ['mc', 'Substantivo de “happy”:', ['happily', 'happiness', 'happyness'], 1, 'happy → happiness.'],
        ['mc', '“Sem esperança”:', ['hopeful', 'hopeless', 'unhope'], 1, '-less = sem.'],
        ['fill', 'decide → ___ (decisão)', ['decision'], 'decide → decision.'],
        ['mc', '“Mal pago”:', ['overpaid', 'underpaid', 'unpaid'], 1, 'under- = de menos.'],
      ],
    },
  ],
});

window.LEVELS.push({
  id: 'c2', cefr: 'C2', name: 'Fluente', color: '#13212e',
  goal: 'Entender praticamente tudo e se expressar com precisão, naturalidade e nuance.',
  cando: [
    'Consigo entender sotaques diferentes (americano, britânico, australiano).',
    'Consigo debater temas complexos sem preparar o que vou dizer.',
    'Consigo usar ironia, humor e expressões idiomáticas com naturalidade.',
    'Consigo escrever textos persuasivos e profissionais com precisão.',
    'Consigo pensar em inglês sem traduzir mentalmente.',
  ],
  topics: [
    {
      id: 'c2-register', cat: 'Conversação', title: 'Registro: formal, neutro, informal e gíria',
      lesson: `<p>Fluência é saber <b>qual versão</b> usar em cada situação:</p>
<table class="tbl"><tr><th>Formal</th><th>Neutro</th><th>Informal / gíria</th></tr>
<tr><td>I would be grateful if…</td><td>Could you…?</td><td>Can you…? / Mind…?</td></tr>
<tr><td>Children</td><td>Kids</td><td>Little ones</td></tr>
<tr><td>Excellent</td><td>Great</td><td>Awesome / Sick / Lit</td></tr>
<tr><td>I am exhausted.</td><td>I'm really tired.</td><td>I'm beat / I'm wiped out.</td></tr>
<tr><td>Departure</td><td>Leaving</td><td>Heading off</td></tr></table>
<p>Gírias comuns: <b>gonna, wanna, gotta</b> · <b>kinda / sorta</b> · <b>no worries</b> · <b>my bad</b> (foi mal) · <b>chill</b> · <b>hang on</b> · <b>I'm down</b> (tô dentro) · <b>it slaps / it's fire</b> (é muito bom).</p>
<p>⚠️ Gíria em e-mail de trabalho ou entrevista soa pouco profissional.</p>`,
      examples: [["My bad, I forgot to text you.", 'Foi mal, esqueci de te mandar mensagem.'], ['Pizza tonight? — Sure, I\'m down!', 'Pizza hoje? — Claro, tô dentro!'], ['I would be grateful if you could reply by Friday.', 'Ficaria grato se pudesse responder até sexta.']],
      ex: [
        ['mc', 'Em uma entrevista de emprego, use:', ["I'm super down for this job, dude.", "I'm very interested in this position."], 1, 'Situação formal → registro formal.'],
        ['mc', '“My bad” significa:', ['minha culpa / foi mal', 'meu pior', 'que pena'], 0, 'Assumir um erro leve.'],
        ['fill', 'I ___ go now. (gotta = have got to)', ['gotta', 'have to', 'have got to'], 'gotta = have got to.'],
        ['mc', '“I’m down” em conversa informal:', ['estou triste', 'estou dentro', 'estou caindo'], 1, 'Topo / estou dentro.'],
        ['mc', 'Versão formal de “kids”:', ['children', 'little ones', 'babies'], 0, 'children.'],
        ['mc', '“I’m beat” =', ['estou exausto', 'fui derrotado', 'estou animado'], 0, 'beat = muito cansado.'],
      ],
    },
    {
      id: 'c2-phrasal-adv', cat: 'Vocabulário', title: 'Phrasal verbs avançados e idiomáticos',
      lesson: `<ul><li><b>come across</b> — encontrar por acaso / passar uma impressão: She comes across as shy.</li>
<li><b>bring up</b> — mencionar um assunto / criar (filhos) · <b>put up with</b> — tolerar</li>
<li><b>figure out</b> — entender, resolver · <b>come up with</b> — ter (uma ideia), inventar</li>
<li><b>back down</b> — recuar · <b>fall through</b> — dar errado (planos) · <b>pull off</b> — conseguir algo difícil</li>
<li><b>brush up on</b> — reciclar/revisar · <b>get away with</b> — sair impune · <b>live up to</b> — corresponder (expectativas)</li>
<li><b>wind up</b> — acabar (em algum lugar/situação) · <b>talk someone into/out of</b> — convencer a fazer/não fazer</li></ul>`,
      examples: [["I can't put up with this noise anymore.", 'Não aguento mais esse barulho.'], ['Our plans fell through at the last minute.', 'Nossos planos deram errado na última hora.'], ['She came up with a brilliant idea.', 'Ela teve uma ideia brilhante.']],
      ex: [
        ['mc', '“Tolerar” =', ['put up with', 'put off', 'put on'], 0, 'put up with.'],
        ['fill', 'I need to brush ___ on my French before the trip.', ['up'], 'brush up on = revisar.'],
        ['mc', '“The deal fell through” significa:', ['o negócio foi fechado', 'o negócio deu errado', 'o negócio caiu de preço'], 1, 'fall through = não se concretizar.'],
        ['fill', 'Who came up ___ this idea?', ['with'], 'come up with.'],
        ['mc', '“Corresponder às expectativas”:', ['live up to', 'look up to', 'get up to'], 0, 'live up to.'],
        ['fill', "He thinks he can get away ___ lying.", ['with'], 'get away with = sair impune.'],
      ],
    },
    {
      id: 'c2-irony', cat: 'Conversação', title: 'Ironia, understatement e humor',
      lesson: `<p>Grande parte do humor em inglês (especialmente britânico) é <b>indireto</b>:</p>
<ul><li><b>Understatement</b> — dizer menos do que é: “It's <b>a bit</b> chilly” (está −10°C). “Not bad” pode significar “muito bom”.</li>
<li><b>Sarcasmo</b> — dizer o oposto: “Oh, <b>great</b>. Another meeting.” · “<b>Thanks a lot</b>” (quando alguém atrapalhou).</li>
<li>“<b>I'll bear it in mind</b>” / “<b>That's interesting</b>” — em contexto britânico pode ser um “não” educado.</li>
<li>“<b>With all due respect</b>” muitas vezes antecede uma crítica dura.</li></ul>
<p>💡 O tom de voz e o contexto mostram o sentido real. Séries como <i>The Office</i>, <i>Fleabag</i> e <i>Ted Lasso</i> são ótimas para treinar.</p>`,
      examples: [["The food wasn't exactly great.", 'A comida não estava exatamente ótima (= estava ruim).'], ['Oh, perfect. My phone just died.', 'Ah, perfeito. Meu celular acabou de descarregar.'], ["He's not the sharpest tool in the shed.", 'Ele não é o mais esperto da turma.']],
      ex: [
        ['mc', 'Está um calor de 40°C e alguém diz “It’s a little warm today”. Isso é:', ['erro', 'understatement', 'elogio'], 1, 'Dizer menos do que é.'],
        ['mc', '“Oh, great. It’s raining again.” Provavelmente é:', ['sarcasmo', 'alegria sincera'], 0, 'Sarcasmo — o oposto do que se diz.'],
        ['mc', 'Um britânico diz “That’s an interesting idea…” em tom seco. Pode significar:', ['adorou a ideia', 'não gostou muito'], 1, 'Muitas vezes é discordância educada.'],
        ['mc', '“Not the sharpest tool in the shed” =', ['não é muito esperto', 'é desorganizado', 'é preguiçoso'], 0, 'Forma irônica de dizer que não é esperto.'],
        ['fill', "It wasn't ___ cheap. (= foi caro; não exatamente)", ['exactly'], 'not exactly = suaviza a crítica.'],
        ['mc', 'O que mais ajuda a perceber ironia?', ['tom e contexto', 'tempo verbal', 'ortografia'], 0, 'Tom de voz e situação.'],
      ],
    },
    {
      id: 'c2-precision', cat: 'Vocabulário', title: 'Precisão: sinônimos e nuances',
      lesson: `<p>No nível fluente, escolha a palavra <b>exata</b>:</p>
<ul><li><b>look</b> (olhar) · <b>glance</b> (olhar rápido) · <b>stare</b> (encarar) · <b>gaze</b> (contemplar) · <b>peek</b> (espiar)</li>
<li><b>say</b> · <b>whisper</b> (sussurrar) · <b>mutter</b> (resmungar) · <b>yell</b> (gritar) · <b>claim</b> (alegar)</li>
<li><b>big</b> · <b>huge</b> · <b>massive</b> · <b>vast</b> (área) · <b>significant</b> (importância)</li>
<li><b>funny</b> (engraçado) × <b>fun</b> (divertido) · <b>economic</b> (da economia) × <b>economical</b> (econômico, que poupa)</li>
<li><b>Falsos cognatos</b>: pretend (fingir), push (empurrar), library (biblioteca), college (faculdade), exquisite (requintado), eventually (por fim), sensible (sensato).</li></ul>`,
      examples: [['She glanced at her watch and left.', 'Ela deu uma olhada no relógio e saiu.'], ["Don't stare at people, it's rude.", 'Não encare as pessoas, é falta de educação.'], ['Eventually, we found the hotel.', 'Por fim, encontramos o hotel.']],
      ex: [
        ['mc', 'Olhar rapidamente:', ['stare', 'glance', 'gaze'], 1, 'glance = olhadela.'],
        ['mc', '“Eventually” significa:', ['eventualmente', 'por fim / finalmente', 'às vezes'], 1, 'Falso cognato.'],
        ['mc', '“Pretend” significa:', ['pretender', 'fingir'], 1, 'pretend = fingir.'],
        ['mc', 'Um carro que gasta pouco é:', ['economic', 'economical'], 1, 'economical = que economiza.'],
        ['mc', '“A festa foi divertida.”', ['The party was funny.', 'The party was fun.'], 1, 'fun = divertido; funny = engraçado.'],
        ['fill', 'He ___ (sussurrou) something in her ear.', ['whispered'], 'whisper = sussurrar.'],
      ],
    },
    {
      id: 'c2-writing', cat: 'Escrita', title: 'Escrita persuasiva e argumentação',
      lesson: `<p>Estrutura de um texto argumentativo:</p>
<ol><li><b>Introdução</b> com tese clara: <i>This essay argues that…</i></li>
<li><b>Argumentos</b> com evidência: <i>Firstly,… · Research suggests that… · A clear example of this is…</i></li>
<li><b>Contra-argumento</b> e resposta: <i>Critics may argue that… However,… · While it is true that…, …</i></li>
<li><b>Conclusão</b>: <i>In conclusion,… · On balance,… · All things considered,…</i></li></ol>
<p>Técnicas: perguntas retóricas, regra de três (“fast, cheap and reliable”), verbos fortes (<i>undermine, foster, boost, hinder</i>), evitar repetir palavras.</p>`,
      examples: [['On balance, the benefits outweigh the risks.', 'Pesando tudo, os benefícios superam os riscos.'], ['While it is true that remote work is flexible, it can also lead to isolation.', 'Embora seja verdade que o trabalho remoto é flexível, ele também pode levar ao isolamento.'], ['This policy could undermine public trust.', 'Essa política pode minar a confiança pública.']],
      ex: [
        ['mc', 'Para apresentar um contra-argumento:', ['Critics may argue that…', 'Firstly,…', 'In conclusion,…'], 0, 'Critics may argue that…'],
        ['mc', '“Outweigh” significa:', ['pesar menos', 'superar (em importância)', 'emagrecer'], 1, 'outweigh = superar.'],
        ['fill', 'All things ___, it was a good decision.', ['considered'], 'All things considered.'],
        ['mc', '“Hinder” significa:', ['ajudar', 'atrapalhar/dificultar', 'esconder'], 1, 'hinder = dificultar.'],
        ['mc', 'Melhor abertura de conclusão:', ['On balance,…', 'By the way,…', 'Anyway,…'], 0, 'On balance = pesando tudo.'],
        ['fill', 'Research ___ that sleep improves memory. (sugere)', ['suggests', 'shows', 'indicates'], 'Research suggests that…'],
      ],
    },
    {
      id: 'c2-accents', cat: 'Pronúncia', title: 'Sotaques e fala conectada',
      lesson: `<p><b>Fala conectada</b> — por que nativos parecem falar “tudo junto”:</p>
<ul><li><b>Linking</b>: “turn_off” → “tur-noff” · “an_apple” → “a-napple”</li>
<li><b>Redução</b>: going to → gonna · want to → wanna · did you → “didja” · what are you → “whatcha”</li>
<li><b>Weak forms</b>: to, for, and, of, can viram “tə, fər, ən, əv, kən”: <i>cup of tea</i> → “cuppa tea”</li>
<li><b>T americano</b> entre vogais vira um “r” rápido: water → “wárer”, better → “bérer”</li></ul>
<p><b>Sotaques</b>: americano (r forte, t “flap”), britânico (r final mudo: “car” → “cah”), australiano (vogais abertas: “day” → “dai”). Exponha-se a todos.</p>
<p>💡 Técnica <b>shadowing</b>: ouça uma frase e repita junto, imitando ritmo e entonação.</p>`,
      examples: [['What are you doing? → “Whatcha doin’?”', 'O que você está fazendo?'], ["I'm gonna grab a cuppa.", 'Vou pegar uma xícara de chá.'], ["Didja see that?", 'Você viu aquilo?']],
      ex: [
        ['mc', '“wanna” é a redução de:', ['want a', 'want to', 'were not'], 1, 'want to → wanna.'],
        ['mc', 'Em inglês americano, “water” costuma soar como:', ['uó-ter', 'uá-rer', 'uó-tá'], 1, 'T entre vogais vira r rápido.'],
        ['mc', 'No sotaque britânico padrão, o “r” de “car”:', ['é forte', 'quase não é pronunciado'], 1, 'R final mudo.'],
        ['mc', 'Shadowing é:', ['ler em voz baixa', 'repetir junto com o áudio imitando', 'traduzir legendas'], 1, 'Repetir junto, imitando.'],
        ['fill', '“Did you eat?” na fala rápida vira “___ eat?”', ['didja', 'didya'], 'did you → didja.'],
        ['mc', '“cup of tea” na fala:', ['cuppa tea', 'cup off tea', 'cupof-ti'], 0, 'of reduzido → cuppa.'],
      ],
    },
    {
      id: 'c2-business', cat: 'Conversação', title: 'Inglês profissional e reuniões',
      lesson: `<ul><li>Abrir: <b>Let's get started.</b> · <b>The purpose of this meeting is to…</b></li>
<li>Opinião: <b>From my perspective,…</b> · <b>The way I see it,…</b> · <b>I'd like to add that…</b></li>
<li>Interromper: <b>Sorry to interrupt, but…</b> · <b>If I could just jump in here…</b></li>
<li>Clarificar: <b>Just to clarify,…</b> · <b>What I meant was…</b> · <b>Could you elaborate on that?</b></li>
<li>Encerrar: <b>Let's wrap up.</b> · <b>To sum up,…</b> · <b>Let's touch base next week.</b> · <b>I'll follow up by email.</b></li>
<li>Jargão: deadline, stakeholder, KPI, bandwidth (disponibilidade), circle back (voltar ao assunto), action items.</li></ul>`,
      examples: [["Let's circle back to this next week.", 'Vamos retomar isso na semana que vem.'], ["I don't have the bandwidth for this project right now.", 'Não tenho disponibilidade para este projeto agora.'], ["Just to clarify, the deadline is Friday, right?", 'Só para esclarecer, o prazo é sexta, certo?']],
      ex: [
        ['mc', 'Para encerrar uma reunião:', ["Let's wrap up.", "Let's get started.", 'Let me jump in.'], 0, 'wrap up = finalizar.'],
        ['mc', '“I don’t have the bandwidth” no trabalho significa:', ['minha internet está lenta', 'não tenho tempo/disponibilidade'], 1, 'bandwidth = capacidade/tempo.'],
        ['fill', 'Just to ___, you want the report by Monday?', ['clarify'], 'Just to clarify = só para esclarecer.'],
        ['mc', 'Interromper com educação:', ['Stop talking.', 'Sorry to interrupt, but…'], 1, 'Sorry to interrupt, but…'],
        ['fill', "I'll ___ up by email tomorrow. (dar seguimento)", ['follow'], 'follow up.'],
        ['mc', '“Deadline” =', ['linha morta', 'prazo final', 'reunião'], 1, 'deadline = prazo.'],
      ],
    },
    {
      id: 'c2-thinking', cat: 'Método', title: 'Fluência: pensar em inglês',
      lesson: `<p>Chegar ao fluente é mais hábito do que gramática. Rotina recomendada:</p>
<ul><li><b>Narre seu dia</b> mentalmente em inglês (“Now I'm making coffee…”).</li>
<li><b>Monólogo de 2 minutos</b> por dia sobre um tema aleatório — grave e ouça.</li>
<li><b>Input massivo</b>: séries/podcasts sem legenda em português; use legenda em inglês só quando necessário.</li>
<li><b>Shadowing</b> de 5 minutos com um trecho de podcast ou série.</li>
<li><b>Diário</b> em inglês: 5 linhas por dia.</li>
<li><b>Conversação real</b>: tandem, aulas, grupos — falar com gente é insubstituível.</li>
<li><b>Revisão espaçada</b> do vocabulário (use a aba Vocabulário!).</li></ul>
<p>💡 Errar faz parte. Fluente não é quem não erra — é quem se comunica sem travar.</p>`,
      examples: [["Right now I'm walking to work and thinking about my day.", 'Agora estou indo a pé para o trabalho e pensando no meu dia.'], ['Today I learned three new phrasal verbs.', 'Hoje aprendi três phrasal verbs novos.'], ["I don't need to translate in my head anymore.", 'Não preciso mais traduzir na cabeça.']],
      ex: [
        ['mc', 'Melhor estratégia para pensar em inglês:', ['decorar listas de palavras', 'narrar o dia mentalmente em inglês', 'só estudar gramática'], 1, 'Narrar o dia cria o hábito.'],
        ['mc', 'Legenda mais útil no nível avançado:', ['em português', 'em inglês ou nenhuma'], 1, 'Legenda em inglês ou nenhuma.'],
        ['mc', '“Shadowing” treina principalmente:', ['escrita', 'pronúncia e ritmo', 'leitura'], 1, 'Pronúncia, ritmo e entonação.'],
        ['mc', 'Revisão espaçada serve para:', ['memorizar vocabulário a longo prazo', 'melhorar a letra'], 0, 'Fixar na memória de longo prazo.'],
        ['mc', 'Fluência significa:', ['não cometer erros', 'se comunicar sem travar'], 1, 'Comunicar com naturalidade.'],
        ['fill', "I ___ a journal in English every day. (keep = manter)", ['keep'], 'keep a journal = manter um diário.'],
      ],
    },
  ],
});
