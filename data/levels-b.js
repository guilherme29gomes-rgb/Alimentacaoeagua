/* Trilha — níveis B1 e B2 */
window.LEVELS = window.LEVELS || [];

window.LEVELS.push({
  id: 'b1', cefr: 'B1', name: 'Intermediário', color: '#7a5af5',
  goal: 'Manter conversas sobre assuntos conhecidos, contar experiências e dar opiniões.',
  cando: [
    'Consigo contar uma história ou experiência com detalhes.',
    'Consigo explicar minha opinião e dar motivos.',
    'Consigo me virar sozinho em uma viagem ao exterior.',
    'Consigo entender os pontos principais de séries com legenda em inglês.',
    'Consigo escrever um e-mail simples de trabalho.',
  ],
  topics: [
    {
      id: 'b1-pp', cat: 'Gramática', title: 'Present perfect — experiências (ever / never)',
      lesson: `<p><b>have/has + particípio</b> (3ª coluna). Usado quando o <b>momento não importa</b> ou não foi dito.</p>
<ul><li>I <b>have been</b> to London. — Já estive em Londres (algum momento da vida).</li>
<li><b>Have you ever</b> eaten sushi? — Você já comeu sushi?</li><li>She <b>has never</b> seen snow.</li></ul>
<p>Particípios comuns: be → <b>been</b>, go → <b>gone</b>, do → <b>done</b>, see → <b>seen</b>, eat → <b>eaten</b>, write → <b>written</b>, take → <b>taken</b>, have → <b>had</b>, make → <b>made</b>.</p>
<p>⚠️ Se disser <b>quando</b> (yesterday, in 2019), use o simple past.</p>`,
      examples: [['Have you ever been to the USA?', 'Você já foi aos EUA?'], ["I've never tried Indian food.", 'Nunca experimentei comida indiana.'], ['She has worked in three countries.', 'Ela já trabalhou em três países.']],
      ex: [
        ['fill', 'Have you ever ___ (see) a whale?', ['seen'], 'see → seen.'],
        ['fill', 'She ___ never been to Europe.', ['has'], 'she → has.'],
        ['mc', 'Escolha a correta:', ['I have visited Rome in 2019.', 'I visited Rome in 2019.'], 1, 'Com tempo definido → simple past.'],
        ['fill', "I've ___ (write) three books.", ['written'], 'write → written.'],
        ['mc', '“Você já comeu sushi?”', ['Did you ever eat sushi?', 'Have you ever eaten sushi?', 'Have you ever ate sushi?'], 1, 'Experiência: Have you ever + particípio.'],
        ['mc', 'Particípio de “go”:', ['went', 'gone', 'goed'], 1, 'go – went – gone.'],
      ],
    },
    {
      id: 'b1-pp2', cat: 'Gramática', title: 'Present perfect — for, since, just, already, yet',
      lesson: `<p>O present perfect liga o passado ao <b>agora</b>:</p>
<ul><li><b>for</b> + período: I've lived here <b>for</b> five years. (e ainda moro)</li>
<li><b>since</b> + ponto de início: I've lived here <b>since</b> 2019.</li>
<li><b>just</b> = acabou de: I've <b>just</b> arrived.</li><li><b>already</b> = já (afirmativa): She's <b>already</b> finished.</li>
<li><b>yet</b> = ainda (negativa) / já (pergunta), no final: I haven't eaten <b>yet</b>. Have you finished <b>yet</b>?</li></ul>
<p>⚠️ “Moro aqui há 5 anos” = <i>I <b>have lived</b> here for 5 years</i> (nunca “I live here for…”).</p>`,
      examples: [["I've known her since we were kids.", 'Eu a conheço desde que éramos crianças.'], ["We've just had lunch.", 'Acabamos de almoçar.'], ["Have you done your homework yet? — Not yet.", 'Você já fez a lição? — Ainda não.']],
      ex: [
        ['fill', "I've worked here ___ 2020.", ['since'], 'ponto de início → since.'],
        ['fill', "They've been married ___ ten years.", ['for'], 'período → for.'],
        ['mc', '“Moro em Recife há 3 anos.”', ['I live in Recife for 3 years.', "I've lived in Recife for 3 years.", 'I lived in Recife since 3 years.'], 1, 'Até agora → present perfect + for.'],
        ['fill', "I haven't finished the report ___.", ['yet'], 'Negativa com “ainda” → yet no final.'],
        ['mc', '“Ela acabou de sair.”', ['She has just left.', 'She just has left.', 'She left just.'], 0, 'have/has + just + particípio.'],
        ['fill', "Don't worry, I've ___ paid the bill. (já)", ['already'], 'Afirmativa “já” → already.'],
      ],
    },
    {
      id: 'b1-pastcont', cat: 'Gramática', title: 'Past continuous (when / while)',
      lesson: `<p><b>was/were + -ing</b>: ação em andamento no passado.</p>
<ul><li>At 9 p.m. I <b>was watching</b> TV.</li>
<li>Ação longa interrompida por uma curta: I <b>was taking</b> a shower <b>when</b> the phone <b>rang</b>.</li>
<li>Duas ações ao mesmo tempo: <b>While</b> I was cooking, he was cleaning.</li></ul>
<p>💡 <b>when</b> + ação curta (simple past) · <b>while</b> + ação longa (past continuous).</p>`,
      examples: [['What were you doing at 10 last night?', 'O que você estava fazendo às 10 ontem à noite?'], ['I was driving when I saw the accident.', 'Eu estava dirigindo quando vi o acidente.'], ['While we were sleeping, it started to rain.', 'Enquanto dormíamos, começou a chover.']],
      ex: [
        ['fill', 'I ___ walking home when it started to rain.', ['was'], 'I → was.'],
        ['fill', 'They ___ playing cards at midnight.', ['were'], 'they → were.'],
        ['mc', 'She was reading ___ the lights went out.', ['while', 'when'], 1, 'Ação curta → when.'],
        ['mc', '___ I was studying, my brother was playing games.', ['When', 'While'], 1, 'Ações longas simultâneas → while.'],
        ['fill', 'What ___ you doing when I called?', ['were'], 'you → were.'],
        ['mc', 'Escolha a correta:', ['I was cook when he arrived.', 'I was cooking when he arrived.', 'I cooking when he arrived.'], 1, 'was + -ing.'],
      ],
    },
    {
      id: 'b1-cond1', cat: 'Gramática', title: 'First conditional (possibilidade real)',
      lesson: `<p><b>If + simple present, will + verbo</b> — situações reais/possíveis no futuro.</p>
<ul><li><b>If it rains</b>, I'<b>ll stay</b> home.</li><li>You'll pass the test <b>if you study</b>.</li></ul>
<p>⚠️ Depois de <b>if</b> não use will: <i>If it <b>rains</b></i> (nunca “if it will rain”). O mesmo vale para <b>when, as soon as, unless</b> (a menos que).</p>
<p><i>Unless you hurry, you'll miss the bus.</i> = If you don't hurry…</p>`,
      examples: [["If you need help, I'll be here.", 'Se precisar de ajuda, estarei aqui.'], ["We'll go to the beach if the weather is good.", 'Vamos à praia se o tempo estiver bom.'], ["I'll call you as soon as I arrive.", 'Te ligo assim que eu chegar.']],
      ex: [
        ['fill', 'If it ___ (rain) tomorrow, we will cancel the trip.', ['rains'], 'If + simple present.'],
        ['fill', 'If you study, you ___ pass.', ['will', "'ll"], 'Resultado com will.'],
        ['mc', 'Escolha a correta:', ['If I will see him, I tell him.', "If I see him, I'll tell him."], 1, 'If + presente, will + verbo.'],
        ['mc', '“A menos que você corra…”', ['If you hurry…', 'Unless you hurry…'], 1, 'unless = a menos que.'],
        ['fill', "I'll text you when I ___ (get) home.", ['get'], 'when + presente com sentido de futuro.'],
        ['mc', 'If she ___ late again, she will lose her job.', ['is', 'will be', 'was'], 0, 'If + presente.'],
      ],
    },
    {
      id: 'b1-cond2', cat: 'Gramática', title: 'Second conditional (situação imaginária)',
      lesson: `<p><b>If + simple past, would + verbo</b> — situações irreais ou improváveis no presente/futuro.</p>
<ul><li><b>If I had</b> a lot of money, I <b>would travel</b> the world. (mas não tenho)</li>
<li>What <b>would</b> you <b>do</b> if you <b>won</b> the lottery?</li>
<li>Conselho: <b>If I were you</b>, I'd talk to her. (se eu fosse você)</li></ul>
<p>💡 Com to be, o padrão é <b>were</b> para todas as pessoas: <i>If I were, if she were</i>.</p>`,
      examples: [['If I lived near the beach, I would surf every day.', 'Se eu morasse perto da praia, surfaria todo dia.'], ["If I were you, I wouldn't buy that car.", 'Se eu fosse você, não compraria aquele carro.'], ['What would you do if you lost your job?', 'O que você faria se perdesse o emprego?']],
      ex: [
        ['fill', 'If I ___ (have) more time, I would learn to play the guitar.', ['had'], 'If + simple past.'],
        ['fill', 'If she won the lottery, she ___ buy a house.', ['would', "'d"], 'Resultado com would.'],
        ['mc', '“Se eu fosse você…”', ['If I was you…', 'If I were you…', 'If I am you…'], 1, 'Expressão fixa: If I were you.'],
        ['mc', 'Situação imaginária:', ['If I am rich, I will stop working.', 'If I were rich, I would stop working.'], 1, 'Irreal → second conditional.'],
        ['fill', 'What would you do if you ___ (meet) a famous person?', ['met'], 'meet → met.'],
        ['mc', 'Qual frase é uma possibilidade REAL?', ['If it rains, I’ll take an umbrella.', 'If I were a bird, I would fly.'], 0, 'Real → first conditional.'],
      ],
    },
    {
      id: 'b1-passive', cat: 'Gramática', title: 'Voz passiva (presente e passado)',
      lesson: `<p><b>to be + particípio</b>. Usamos quando o importante é a ação, não quem fez.</p>
<ul><li>Presente: English <b>is spoken</b> all over the world.</li><li>Passado: The house <b>was built</b> in 1950.</li>
<li>Quem fez (se importar): The book was written <b>by</b> J.K. Rowling.</li></ul>
<p>Muito usada em notícias, avisos e textos técnicos: <i>Breakfast is served from 7 to 10. Two people were arrested.</i></p>`,
      examples: [['Coffee is grown in Brazil.', 'Café é cultivado no Brasil.'], ['My phone was stolen yesterday.', 'Meu celular foi roubado ontem.'], ['The Mona Lisa was painted by Leonardo da Vinci.', 'A Mona Lisa foi pintada por Leonardo da Vinci.']],
      ex: [
        ['fill', 'This car ___ made in Japan. (presente)', ['is'], 'Presente: is + particípio.'],
        ['fill', 'The letters were ___ (send) yesterday.', ['sent'], 'send → sent.'],
        ['mc', '“A ponte foi construída em 1990.”', ['The bridge built in 1990.', 'The bridge was built in 1990.', 'The bridge is built in 1990.'], 1, 'Passado: was + particípio.'],
        ['mc', 'Quem fez a ação na passiva vem depois de:', ['by', 'for', 'of'], 0, 'by = por.'],
        ['fill', 'Portuguese ___ spoken in Brazil and Portugal.', ['is'], 'Presente: is spoken.'],
        ['fill', 'The thieves were ___ (catch) by the police.', ['caught'], 'catch → caught.'],
      ],
    },
    {
      id: 'b1-relative', cat: 'Gramática', title: 'Relative clauses (who, which, that, where, whose)',
      lesson: `<ul><li><b>who</b> — pessoas: The man <b>who</b> lives next door is a pilot.</li>
<li><b>which</b> — coisas: The car <b>which</b> I bought is red.</li>
<li><b>that</b> — pessoas ou coisas (informal, muito usado)</li>
<li><b>where</b> — lugares: This is the city <b>where</b> I was born.</li>
<li><b>whose</b> — de quem/cujo: That's the girl <b>whose</b> father is a famous singer.</li></ul>
<p>💡 Quando o pronome é objeto, ele pode sumir: <i>The movie (that) we watched was great.</i></p>`,
      examples: [['She is the teacher who helped me.', 'Ela é a professora que me ajudou.'], ['This is the restaurant where we met.', 'Este é o restaurante onde nos conhecemos.'], ['The book (that) you gave me is amazing.', 'O livro que você me deu é incrível.']],
      ex: [
        ['mc', 'The woman ___ called you is my boss.', ['which', 'who', 'where'], 1, 'Pessoa → who.'],
        ['mc', 'The hotel ___ we stayed was cheap.', ['where', 'who', 'whose'], 0, 'Lugar → where.'],
        ['fill', 'I have a friend ___ brother is a doctor. (cujo)', ['whose'], 'whose = cujo.'],
        ['mc', 'The phone ___ I bought broke.', ['who', 'which', 'where'], 1, 'Coisa → which/that.'],
        ['mc', 'Em qual frase o pronome pode ser omitido?', ['The man who lives here is old.', 'The pizza that we ordered was cold.'], 1, 'Omitido quando é objeto (we ordered it).'],
        ['fill', 'Do you know the guy ___ is talking to Ana?', ['who', 'that'], 'Pessoa → who/that.'],
      ],
    },
    {
      id: 'b1-gerund', cat: 'Gramática', title: 'Gerúndio (-ing) × infinitivo (to)',
      lesson: `<p>Alguns verbos pedem <b>-ing</b>, outros pedem <b>to + verbo</b>.</p>
<ul><li><b>+ -ing</b>: enjoy, finish, mind, avoid, suggest, keep, miss, can't stand — <i>I enjoy <b>reading</b>.</i></li>
<li><b>+ to</b>: want, need, decide, hope, plan, promise, agree, learn, would like — <i>I want <b>to travel</b>.</i></li>
<li>Depois de <b>preposição</b>, sempre -ing: I'm good <b>at cooking</b>. Thanks <b>for helping</b>. I'm interested <b>in learning</b>.</li>
<li>Como sujeito: <b>Swimming</b> is good for you.</li></ul>
<p>⚠️ <b>stop</b> + -ing = parar de fazer · <b>stop</b> + to = parar para fazer.</p>`,
      examples: [['I finished working at 6.', 'Terminei de trabalhar às 6.'], ['She decided to quit her job.', 'Ela decidiu largar o emprego.'], ['I look forward to seeing you.', 'Estou ansioso para te ver.']],
      ex: [
        ['mc', 'I enjoy ___ to music.', ['to listen', 'listening'], 1, 'enjoy + -ing.'],
        ['mc', 'We decided ___ a new car.', ['buying', 'to buy'], 1, 'decide + to.'],
        ['fill', "I'm interested in ___ (learn) Spanish.", ['learning'], 'Após preposição → -ing.'],
        ['mc', '“Parei de fumar.”', ['I stopped to smoke.', 'I stopped smoking.'], 1, 'stop + -ing = parar de.'],
        ['fill', 'Do you mind ___ (open) the window?', ['opening'], 'mind + -ing.'],
        ['fill', 'I need ___ talk to you.', ['to'], 'need + to.'],
      ],
    },
    {
      id: 'b1-phrasal', cat: 'Vocabulário', title: 'Phrasal verbs essenciais',
      lesson: `<p>Verbo + partícula com significado novo. Os mais usados:</p>
<ul><li><b>get up</b> — levantar · <b>wake up</b> — acordar · <b>go out</b> — sair (passear)</li>
<li><b>look for</b> — procurar · <b>find out</b> — descobrir · <b>give up</b> — desistir</li>
<li><b>turn on / turn off</b> — ligar / desligar · <b>put on / take off</b> — vestir / tirar (roupa); take off também = decolar</li>
<li><b>pick up</b> — buscar alguém, pegar · <b>come back</b> — voltar · <b>look after</b> — cuidar de</li>
<li><b>run out of</b> — ficar sem · <b>get along (with)</b> — se dar bem · <b>hang out</b> — sair com amigos</li></ul>
<p>💡 Aprenda phrasal verbs em frases, não em listas soltas.</p>`,
      examples: [["Don't give up! You're almost there.", 'Não desista! Você está quase lá.'], ['Can you pick me up at the airport?', 'Você pode me buscar no aeroporto?'], ["We've run out of coffee.", 'Acabou o café.']],
      ex: [
        ['mc', '“Procurar” =', ['look after', 'look for', 'look up to'], 1, 'look for = procurar.'],
        ['fill', 'Please turn ___ the lights when you leave.', ['off'], 'turn off = desligar.'],
        ['mc', '“Desistir” =', ['give up', 'give in', 'get up'], 0, 'give up = desistir.'],
        ['fill', 'Who will look ___ the kids while we travel?', ['after'], 'look after = cuidar.'],
        ['mc', 'I get ___ well with my colleagues.', ['along', 'up', 'out'], 0, 'get along = se dar bem.'],
        ['fill', 'I need to find ___ what time the store opens.', ['out'], 'find out = descobrir.'],
      ],
    },
    {
      id: 'b1-usedto', cat: 'Gramática', title: 'Used to (costumava)',
      lesson: `<p><b>used to + verbo</b> = hábitos ou estados do passado que <b>não existem mais</b>.</p>
<ul><li>I <b>used to</b> play soccer when I was a kid.</li><li>Negativa: I <b>didn't use to</b> like vegetables.</li>
<li>Pergunta: <b>Did</b> you <b>use to</b> live here?</li></ul>
<p>⚠️ Não confunda com <b>be used to + -ing</b> = estar acostumado: <i>I'm used to waking up early.</i></p>`,
      examples: [['We used to go to the beach every summer.', 'Costumávamos ir à praia todo verão.'], ["She didn't use to wear glasses.", 'Ela não usava óculos.'], ["I'm used to working at night.", 'Estou acostumado a trabalhar à noite.']],
      ex: [
        ['fill', 'I ___ to have long hair. Now it’s short.', ['used'], 'used to = costumava.'],
        ['mc', 'Negativa correta:', ["I didn't used to smoke.", "I didn't use to smoke.", "I used not smoke."], 1, 'didn’t use to (sem d).'],
        ['mc', '“Estou acostumado a dirigir à esquerda.”', ['I used to drive on the left.', "I'm used to driving on the left."], 1, 'be used to + -ing = acostumado.'],
        ['fill', 'Did you use ___ play video games?', ['to'], 'use to + verbo.'],
        ['mc', 'Used to indica:', ['hábito atual', 'hábito passado que acabou', 'plano futuro'], 1, 'Passado que não existe mais.'],
        ['fill', "She's used to ___ (live) alone.", ['living'], 'be used to + -ing.'],
      ],
    },
    {
      id: 'b1-reported', cat: 'Gramática', title: 'Reported speech (discurso indireto)',
      lesson: `<p>Para contar o que alguém disse, o tempo verbal costuma “voltar” um passo:</p>
<ul><li>“I <b>am</b> tired.” → She said (that) she <b>was</b> tired.</li>
<li>“I <b>will</b> call.” → He said he <b>would</b> call.</li>
<li>“I <b>can</b> help.” → She said she <b>could</b> help.</li>
<li>“I <b>saw</b> it.” → He said he <b>had seen</b> it.</li></ul>
<p><b>say</b> × <b>tell</b>: <i>She <b>said</b> (that)…</i> · <i>She <b>told me</b> (that)…</i> — tell precisa de pessoa.</p>
<p>Também mudam: now → then, today → that day, tomorrow → the next day.</p>`,
      examples: [['He said he was busy.', 'Ele disse que estava ocupado.'], ['She told me she would be late.', 'Ela me disse que se atrasaria.'], ['They said they had already eaten.', 'Disseram que já tinham comido.']],
      ex: [
        ['fill', '“I am hungry.” → She said she ___ hungry.', ['was'], 'am → was.'],
        ['fill', '“I will help you.” → He said he ___ help me.', ['would'], 'will → would.'],
        ['mc', 'She ___ me that she was leaving.', ['said', 'told'], 1, 'tell + pessoa.'],
        ['mc', 'He ___ that he was tired.', ['said', 'told'], 0, 'say sem pessoa.'],
        ['fill', '“I can swim.” → She said she ___ swim.', ['could'], 'can → could.'],
        ['mc', '“tomorrow” no discurso indireto:', ['the next day', 'yesterday', 'today'], 0, 'tomorrow → the next day.'],
      ],
    },
  ],
});

window.LEVELS.push({
  id: 'b2', cefr: 'B2', name: 'Intermediário avançado', color: '#e8890c',
  goal: 'Falar com naturalidade e segurança, argumentar e entender a maior parte de séries e filmes.',
  cando: [
    'Consigo participar de reuniões e discussões no trabalho.',
    'Consigo assistir séries com legenda em inglês e entender quase tudo.',
    'Consigo argumentar a favor e contra uma ideia.',
    'Consigo falar de situações hipotéticas no passado.',
    'Consigo ler notícias e artigos sem traduzir palavra por palavra.',
  ],
  topics: [
    {
      id: 'b2-ppc', cat: 'Gramática', title: 'Present perfect continuous',
      lesson: `<p><b>have/has been + -ing</b>: ação que começou no passado, <b>continua</b> (ou acabou de parar) e o foco é a <b>duração</b>.</p>
<ul><li>I'<b>ve been studying</b> English for two years.</li><li>She's tired because she'<b>s been running</b>.</li>
<li>How long <b>have you been waiting</b>?</li></ul>
<p>Compare: <i>I've read 3 books</i> (resultado, quantidade) × <i>I've been reading all day</i> (atividade, duração).</p>
<p>⚠️ Verbos de estado (know, like, own, believe) não vão no continuous: <i>I've known him for years.</i></p>`,
      examples: [["I've been working here since March.", 'Trabalho aqui desde março.'], ["It's been raining all morning.", 'Está chovendo a manhã toda.'], ['How long have you been learning English?', 'Há quanto tempo você estuda inglês?']],
      ex: [
        ['fill', "I've been ___ (wait) for an hour!", ['waiting'], 'have been + -ing.'],
        ['mc', 'Foco na duração:', ["I've written three emails.", "I've been writing emails all morning."], 1, 'Duração → continuous.'],
        ['mc', 'Escolha a correta:', ["I've been knowing her for years.", "I've known her for years."], 1, 'know é verbo de estado.'],
        ['fill', 'How long have you ___ living here?', ['been'], 'have been + -ing.'],
        ['fill', 'She ___ been working too hard lately.', ['has'], 'she → has.'],
        ['mc', 'Your eyes are red. ___ you been crying?', ['Have', 'Did', 'Are'], 0, 'Have you been…?'],
      ],
    },
    {
      id: 'b2-pastperf', cat: 'Gramática', title: 'Past perfect',
      lesson: `<p><b>had + particípio</b>: o “passado do passado” — algo que aconteceu <b>antes</b> de outro fato passado.</p>
<ul><li>When I arrived, the movie <b>had</b> already <b>started</b>.</li>
<li>I <b>had never seen</b> the sea before that trip.</li>
<li>Contínuo: She was tired because she <b>had been working</b> all day.</li></ul>
<p>💡 Comum com: before, after, already, by the time, never… before.</p>`,
      examples: [['By the time we got there, everyone had left.', 'Quando chegamos, todos já tinham ido embora.'], ["I realized I had forgotten my passport.", 'Percebi que tinha esquecido meu passaporte.'], ['She had never flown before.', 'Ela nunca tinha voado antes.']],
      ex: [
        ['fill', 'When I got to the station, the train ___ already left.', ['had'], 'Passado do passado → had.'],
        ['fill', 'I had never ___ (eat) sushi before that night.', ['eaten'], 'eat → eaten.'],
        ['mc', 'Qual aconteceu primeiro? “When she called, I had gone to bed.”', ['Ela ligou', 'Eu fui dormir'], 1, 'had gone = antes da ligação.'],
        ['mc', 'Escolha a correta:', ['After he had finished, he went home.', 'After he has finished, he went home.'], 0, 'Sequência no passado → had finished.'],
        ['fill', 'By the time the police arrived, the thief ___ escaped.', ['had'], 'had + particípio.'],
        ['fill', 'They were exhausted because they had been ___ (walk) for hours.', ['walking'], 'had been + -ing.'],
      ],
    },
    {
      id: 'b2-cond3', cat: 'Gramática', title: 'Third conditional e mixed conditionals',
      lesson: `<p><b>Third</b>: If + past perfect, <b>would have</b> + particípio — passado que <b>não aconteceu</b> (arrependimento, hipótese).</p>
<ul><li>If I <b>had studied</b>, I <b>would have passed</b>. (mas não estudei)</li>
<li>If you <b>hadn't called</b>, I <b>would have missed</b> the flight.</li></ul>
<p><b>Mixed</b>: passado → consequência no presente: If I <b>had taken</b> that job, I <b>would be</b> rich now.</p>
<p>Na fala: would have → <b>would've</b> (“would of” é erro de escrita!).</p>`,
      examples: [['If I had known, I would have helped you.', 'Se eu soubesse, teria te ajudado.'], ["We wouldn't have got lost if we had used the GPS.", 'Não teríamos nos perdido se tivéssemos usado o GPS.'], ["If I hadn't missed the bus, I would be at home now.", 'Se eu não tivesse perdido o ônibus, estaria em casa agora.']],
      ex: [
        ['fill', 'If I had left earlier, I would have ___ (catch) the train.', ['caught'], 'would have + particípio.'],
        ['fill', 'If she ___ studied, she would have passed.', ['had'], 'If + had + particípio.'],
        ['mc', '“Se eu tivesse sabido, teria vindo.”', ['If I knew, I would come.', 'If I had known, I would have come.'], 1, 'Third conditional.'],
        ['mc', 'Mixed conditional:', ['If I had saved money, I would be rich now.', 'If I save money, I will be rich.'], 0, 'Passado → presente.'],
        ['mc', 'Forma escrita correta:', ['would of', "would've"], 1, 'would’ve = would have.'],
        ['fill', "If they hadn't helped us, we ___ have finished.", ["wouldn't", 'would not'], 'Negativo: wouldn’t have.'],
      ],
    },
    {
      id: 'b2-deduction', cat: 'Gramática', title: 'Modais de dedução (must, might, can’t)',
      lesson: `<p><b>Presente</b>:</p><ul><li><b>must</b> — tenho certeza que sim: She must be tired. (trabalhou 12h)</li>
<li><b>might / may / could</b> — talvez: He might be at home.</li><li><b>can't</b> — tenho certeza que não: That can't be true!</li></ul>
<p><b>Passado</b> (+ have + particípio):</p><ul><li>He <b>must have forgotten</b>. (com certeza esqueceu)</li>
<li>She <b>might have missed</b> the bus. (talvez tenha perdido)</li><li>They <b>can't have finished</b> already! (impossível)</li></ul>`,
      examples: [["You must be hungry after that trip.", 'Você deve estar com fome depois dessa viagem.'], ["I can't find my keys. I might have left them at work.", 'Não acho minhas chaves. Talvez eu tenha deixado no trabalho.'], ["He can't have seen us. It was too dark.", 'Ele não pode ter nos visto. Estava escuro demais.']],
      ex: [
        ['mc', 'Ele trabalhou 14 horas. He ___ be exhausted.', ['must', "can't", 'might not'], 0, 'Certeza positiva → must.'],
        ['mc', 'Ela está em Paris, não pode estar aqui. That ___ be her.', ['must', "can't", 'should'], 1, 'Impossível → can’t.'],
        ['fill', 'The ground is wet. It must ___ rained.', ['have'], 'must have + particípio.'],
        ['mc', '“Talvez ele tenha esquecido.”', ['He might have forgotten.', 'He must forget.', 'He might forgot.'], 0, 'might have + particípio.'],
        ['fill', "She didn't answer. She ___ have been asleep. (talvez)", ['might', 'may', 'could'], 'Possibilidade → might/may/could.'],
        ['mc', 'Escolha a correta:', ["They can't have arrived yet.", "They can't arrived yet."], 0, 'can’t have + particípio.'],
      ],
    },
    {
      id: 'b2-wish', cat: 'Gramática', title: 'Wish e If only',
      lesson: `<ul><li>Desejo sobre o <b>presente</b>: wish + <b>simple past</b> — I <b>wish</b> I <b>had</b> more time. (não tenho)</li>
<li>Arrependimento sobre o <b>passado</b>: wish + <b>past perfect</b> — I <b>wish</b> I <b>had studied</b> more.</li>
<li>Irritação / quer que alguém mude: wish + <b>would</b> — I <b>wish</b> you <b>would</b> stop talking.</li></ul>
<p><b>If only</b> = mais forte e emotivo: <i>If only I had listened to you!</i></p>`,
      examples: [['I wish I lived closer to my family.', 'Queria morar mais perto da minha família.'], ["I wish I hadn't said that.", 'Queria não ter dito aquilo.'], ['If only it would stop raining!', 'Se ao menos parasse de chover!']],
      ex: [
        ['fill', 'I wish I ___ (can) speak French.', ['could'], 'Presente → passado: could.'],
        ['fill', 'I wish I had ___ (buy) that house.', ['bought'], 'Passado → had + particípio.'],
        ['mc', '“Queria ser mais alto.”', ['I wish I am taller.', 'I wish I were taller.', 'I wish I will be taller.'], 1, 'wish + were.'],
        ['mc', 'Arrependimento do passado:', ["I wish I didn't eat so much.", "I wish I hadn't eaten so much."], 1, 'Passado → past perfect.'],
        ['fill', 'I wish you ___ stop interrupting me!', ['would'], 'Irritação → would.'],
        ['mc', '“If only” expressa:', ['ordem', 'desejo forte/arrependimento', 'condição real'], 1, 'Desejo intenso.'],
      ],
    },
    {
      id: 'b2-passive2', cat: 'Gramática', title: 'Passiva avançada e “have something done”',
      lesson: `<ul><li>Todos os tempos: is being done (agora), has been done, will be done, can be done.</li>
<li><b>have/get something done</b> = mandar fazer: I <b>had my hair cut</b>. (cortei o cabelo — no salão)</li>
<li>Impessoal: <b>It is said that</b>… / He <b>is said to be</b> rich. (dizem que…)</li>
<li>It is believed / expected / reported that…</li></ul>`,
      examples: [['The road is being repaired.', 'A estrada está sendo consertada.'], ['I need to get my car fixed.', 'Preciso mandar consertar meu carro.'], ['It is said that the house is haunted.', 'Dizem que a casa é mal-assombrada.']],
      ex: [
        ['mc', '“Cortei o cabelo” (no cabeleireiro):', ['I cut my hair.', 'I had my hair cut.'], 1, 'have something done.'],
        ['fill', 'The new hospital will ___ opened next year.', ['be'], 'will be + particípio.'],
        ['fill', 'Your order has ___ shipped.', ['been'], 'has been + particípio.'],
        ['mc', '“Dizem que ele é milionário.”', ['He is said to be a millionaire.', 'He says to be a millionaire.'], 0, 'be said to be.'],
        ['fill', 'The house is ___ painted right now.', ['being'], 'Agora: is being + particípio.'],
        ['mc', '“Vou mandar limpar o tapete.”', ["I'm going to have the carpet cleaned.", "I'm going to clean the carpet."], 0, 'have + objeto + particípio.'],
      ],
    },
    {
      id: 'b2-linking', cat: 'Vocabulário', title: 'Conectores (although, despite, however…)',
      lesson: `<ul><li><b>although / even though</b> + frase: Although it was raining, we went out.</li>
<li><b>despite / in spite of</b> + substantivo ou -ing: Despite the rain… / Despite being tired…</li>
<li><b>however</b> (porém) — início de frase, com vírgula: The plan is good. However, it's expensive.</li>
<li><b>therefore / as a result</b> — portanto · <b>moreover / furthermore</b> — além disso</li>
<li><b>whereas / while</b> — enquanto (contraste): I like tea, whereas my wife prefers coffee.</li>
<li><b>unless</b> — a menos que · <b>as long as</b> — desde que · <b>in order to</b> — a fim de</li></ul>`,
      examples: [['Despite the traffic, we arrived on time.', 'Apesar do trânsito, chegamos a tempo.'], ['Although he is rich, he lives simply.', 'Embora seja rico, ele vive de forma simples.'], ["You can borrow my car as long as you're careful.", 'Pode pegar meu carro emprestado desde que tenha cuidado.']],
      ex: [
        ['mc', '___ the bad weather, the flight left on time.', ['Although', 'Despite'], 1, 'Antes de substantivo → despite.'],
        ['mc', '___ she was tired, she kept working.', ['Although', 'Despite'], 0, 'Antes de frase → although.'],
        ['fill', 'The hotel was nice. ___, it was too far from the beach.', ['however'], 'Contraste entre frases → However.'],
        ['mc', '“Desde que” (condição):', ['as long as', 'as soon as', 'as well as'], 0, 'as long as.'],
        ['fill', 'I study every day in ___ to improve.', ['order'], 'in order to = a fim de.'],
        ['mc', '“Além disso” (formal):', ['therefore', 'moreover', 'whereas'], 1, 'moreover = além disso.'],
      ],
    },
    {
      id: 'b2-reported2', cat: 'Gramática', title: 'Reported speech — perguntas e pedidos',
      lesson: `<ul><li>Perguntas sim/não → <b>if/whether</b> + ordem normal: “Are you OK?” → She asked <b>if I was</b> OK.</li>
<li>Perguntas com wh- → ordem normal: “Where do you live?” → He asked <b>where I lived</b>. (não “where did I live”)</li>
<li>Ordens/pedidos → <b>tell/ask + pessoa + to</b>: “Close the door.” → She <b>told me to close</b> the door. “Don't be late.” → He told us <b>not to be</b> late.</li>
<li>Outros verbos: suggest, advise, promise, refuse, admit, deny, warn.</li></ul>`,
      examples: [['She asked me what time it was.', 'Ela me perguntou que horas eram.'], ['My boss told me to send the report.', 'Meu chefe me mandou enviar o relatório.'], ['He asked if I could help him.', 'Ele perguntou se eu podia ajudá-lo.']],
      ex: [
        ['mc', '“Where is the bank?” → He asked me…', ['where was the bank.', 'where the bank was.'], 1, 'Ordem normal: where the bank was.'],
        ['fill', '“Do you like pizza?” → She asked ___ I liked pizza.', ['if', 'whether'], 'Sim/não → if/whether.'],
        ['fill', '“Sit down.” → The teacher told us ___ sit down.', ['to'], 'tell + pessoa + to.'],
        ['mc', '“Don’t touch it.” → She told me…', ["to don't touch it.", 'not to touch it.'], 1, 'not to + verbo.'],
        ['mc', 'Verbo para “aconselhar”:', ['advise', 'deny', 'refuse'], 0, 'advise = aconselhar.'],
        ['fill', '“Can you help me?” → He asked if I ___ help him.', ['could'], 'can → could.'],
      ],
    },
    {
      id: 'b2-collocations', cat: 'Vocabulário', title: 'Collocations: make × do, take, have',
      lesson: `<p>Collocations são combinações naturais de palavras. Errar soa estranho, mesmo com gramática correta.</p>
<ul><li><b>make</b>: a decision, a mistake, money, a plan, an effort, friends, noise, sense</li>
<li><b>do</b>: homework, the dishes, business, a favor, exercise, your best, research</li>
<li><b>take</b>: a photo, a break, a shower, a risk, care, place, notes</li>
<li><b>have</b>: breakfast, a good time, a look, an idea, a meeting</li>
<li>Adjetivos: <b>heavy</b> rain/traffic, <b>strong</b> coffee, <b>high</b> price, <b>fast</b> food, <b>deep</b> sleep</li></ul>`,
      examples: [['I made a lot of mistakes in the test.', 'Cometi muitos erros na prova.'], ['Can you do me a favor?', 'Você pode me fazer um favor?'], ["Let's take a break.", 'Vamos fazer uma pausa.']],
      ex: [
        ['mc', '___ a decision', ['do', 'make', 'take'], 1, 'make a decision.'],
        ['mc', '___ your homework', ['do', 'make'], 0, 'do homework.'],
        ['fill', "Don't forget to ___ a photo! (tirar)", ['take'], 'take a photo.'],
        ['mc', 'Trânsito pesado:', ['strong traffic', 'heavy traffic', 'big traffic'], 1, 'heavy traffic.'],
        ['fill', 'That doesn’t ___ sense. (não faz sentido)', ['make'], 'make sense.'],
        ['mc', '“Acontecer” (evento):', ['make place', 'take place', 'do place'], 1, 'take place = acontecer.'],
      ],
    },
    {
      id: 'b2-future', cat: 'Gramática', title: 'Future continuous e future perfect',
      lesson: `<ul><li><b>Future continuous</b> (will be + -ing): ação em andamento num momento do futuro — This time tomorrow I'<b>ll be flying</b> to Rome.</li>
<li>Também para perguntar planos educadamente: <b>Will you be using</b> the car tonight?</li>
<li><b>Future perfect</b> (will have + particípio): algo concluído <b>até</b> um momento futuro — By 2030, I'<b>ll have finished</b> college.</li></ul>
<p>💡 <b>by</b> = até (no máximo): by Friday, by the end of the year.</p>`,
      examples: [["Don't call at 8. I'll be having dinner.", 'Não ligue às 8. Estarei jantando.'], ["By next month, I'll have saved enough money.", 'Até o mês que vem, terei economizado dinheiro suficiente.'], ['Will you be working on Saturday?', 'Você vai estar trabalhando no sábado?']],
      ex: [
        ['fill', 'This time next week I will be ___ (lie) on the beach.', ['lying'], 'will be + -ing; lie → lying.'],
        ['fill', 'By 10 p.m., we will have ___ (finish) the project.', ['finished'], 'will have + particípio.'],
        ['mc', 'Ação concluída ATÉ um momento futuro:', ['future continuous', 'future perfect'], 1, 'will have done.'],
        ['mc', '“Até sexta” (prazo):', ['until Friday', 'by Friday'], 1, 'Prazo final → by.'],
        ['fill', "At 9 a.m. tomorrow I'll ___ taking my exam.", ['be'], 'will be + -ing.'],
        ['mc', 'Escolha a correta:', ["By June I'll have lived here for a year.", "By June I'll live here for a year."], 0, 'Duração até um ponto futuro → future perfect.'],
      ],
    },
  ],
});
