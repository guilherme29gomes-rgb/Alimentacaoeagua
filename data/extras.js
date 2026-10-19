/* Atividades extras por nível.
   type: musica | filme | serie | podcast | livro
   Não reproduzimos letras/obras: o app sugere e dá a tarefa; o link abre uma busca. */
const yt = q => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);
const gg = q => 'https://www.google.com/search?q=' + encodeURIComponent(q);

window.EXTRAS = [
  // ---------- A1 ----------
  { id: 'a1-m1', level: 'a1', type: 'musica', title: 'Count on Me', by: 'Bruno Mars', why: 'Letra lenta e repetitiva, vocabulário de amizade.', task: 'Ouça com a letra e anote 5 verbos no presente. Cante o refrão junto.', link: yt('Count on Me Bruno Mars lyrics') },
  { id: 'a1-m2', level: 'a1', type: 'musica', title: 'Let It Be', by: 'The Beatles', why: 'Pronúncia clara e frases curtas.', task: 'Ouça 3 vezes: 1ª só ouvindo, 2ª com letra em inglês, 3ª cantando.', link: yt('Let It Be Beatles lyrics') },
  { id: 'a1-m3', level: 'a1', type: 'musica', title: 'Perfect', by: 'Ed Sheeran', why: 'Ritmo lento, ótimo para treinar a pronúncia.', task: 'Encontre na letra palavras que você já conhece e marque quantas foram.', link: yt('Perfect Ed Sheeran lyrics') },
  { id: 'a1-f1', level: 'a1', type: 'serie', title: 'Peppa Pig', by: 'Série infantil (sotaque britânico)', why: 'Frases simples, fala devagar e vocabulário do dia a dia.', task: 'Assista 2 episódios com legenda em inglês e repita 5 frases em voz alta.', link: yt('Peppa Pig full episodes English') },
  { id: 'a1-f2', level: 'a1', type: 'serie', title: 'Extr@ English', by: 'Sitcom feita para estudantes', why: 'Criada para quem está começando: fala lenta e situações do cotidiano.', task: 'Assista o episódio 1 com legenda em inglês. Anote 5 expressões novas.', link: yt('Extra English episode 1') },
  { id: 'a1-f3', level: 'a1', type: 'filme', title: 'Toy Story', by: 'Pixar', why: 'Diálogos simples, você já conhece a história.', task: 'Assista com áudio em inglês e legenda em português. Preste atenção em cumprimentos.', link: gg('Toy Story onde assistir') },
  { id: 'a1-p1', level: 'a1', type: 'podcast', title: 'English in a Minute', by: 'BBC Learning English', why: 'Vídeos de 1 minuto sobre um ponto específico.', task: 'Assista 3 vídeos e escreva uma frase com cada coisa aprendida.', link: yt('BBC Learning English English in a Minute') },
  { id: 'a1-l1', level: 'a1', type: 'livro', title: 'Graded readers nível Starter / 1', by: 'Penguin Readers ou Oxford Bookworms', why: 'Livros adaptados com vocabulário controlado para iniciantes.', task: 'Leia um livro curto (Starter) até o fim, sem dicionário a cada palavra.', link: gg('Oxford Bookworms Starter graded readers') },

  // ---------- A2 ----------
  { id: 'a2-m1', level: 'a2', type: 'musica', title: 'Yesterday', by: 'The Beatles', why: 'Cheia de verbos no passado (was, had, said).', task: 'Liste todos os verbos no passado que encontrar na letra.', link: yt('Yesterday Beatles lyrics') },
  { id: 'a2-m2', level: 'a2', type: 'musica', title: 'I Will Survive', by: 'Gloria Gaynor', why: 'Futuro com will e passado simples.', task: 'Marque as frases com “will” e as no passado. Cante o refrão!', link: yt('I Will Survive Gloria Gaynor lyrics') },
  { id: 'a2-m3', level: 'a2', type: 'musica', title: 'Someone Like You', by: 'Adele', why: 'Pronúncia clara e emocional; present perfect e passado.', task: 'Traduza o refrão com suas palavras, sem tradutor.', link: yt('Someone Like You Adele lyrics') },
  { id: 'a2-f1', level: 'a2', type: 'filme', title: 'Shrek', by: 'DreamWorks', why: 'Humor e expressões informais do dia a dia.', task: 'Assista com legenda em inglês. Anote 5 expressões engraçadas.', link: gg('Shrek onde assistir') },
  { id: 'a2-f2', level: 'a2', type: 'filme', title: 'Up — Altas Aventuras', by: 'Pixar', why: 'Diálogos curtos e claros.', task: 'Assista os primeiros 20 minutos sem legenda e depois com legenda.', link: gg('Up Pixar onde assistir') },
  { id: 'a2-s1', level: 'a2', type: 'serie', title: 'Friends (temporada 1)', by: 'Sitcom americana', why: 'Conversas do cotidiano; ideal para começar com legenda.', task: 'Assista 2 episódios com legenda em inglês. Repita 3 falas imitando o tom.', link: gg('Friends season 1 onde assistir') },
  { id: 'a2-p1', level: 'a2', type: 'podcast', title: '6 Minute English', by: 'BBC Learning English', why: 'Conversas de 6 minutos com vocabulário explicado.', task: 'Ouça 2 episódios e anote as 6 palavras-chave de cada.', link: yt('BBC 6 Minute English') },
  { id: 'a2-l1', level: 'a2', type: 'livro', title: 'Diary of a Wimpy Kid', by: 'Jeff Kinney', why: 'Linguagem simples, desenhos ajudam a entender.', task: 'Leia os primeiros 30 dias do diário.', link: gg('Diary of a Wimpy Kid book') },

  // ---------- B1 ----------
  { id: 'b1-m1', level: 'b1', type: 'musica', title: 'If I Were a Boy', by: 'Beyoncé', why: 'Música inteira no second conditional!', task: 'Escreva 3 frases suas começando com “If I were…”.', link: yt('If I Were a Boy Beyonce lyrics') },
  { id: 'b1-m2', level: 'b1', type: 'musica', title: 'Viva la Vida', by: 'Coldplay', why: 'Passado e “used to” — história de um rei que perdeu tudo.', task: 'Encontre as frases com “used to” e explique o sentido.', link: yt('Viva la Vida Coldplay lyrics') },
  { id: 'b1-m3', level: 'b1', type: 'musica', title: 'Counting Stars', by: 'OneRepublic', why: 'Phrasal verbs e expressões; ritmo mais rápido.', task: 'Ouça sem letra e escreva o que entender. Depois confira.', link: yt('Counting Stars OneRepublic lyrics') },
  { id: 'b1-s1', level: 'b1', type: 'serie', title: 'Modern Family', by: 'Sitcom americana', why: 'Família, trabalho e humor; vários sotaques.', task: 'Assista 3 episódios com legenda em inglês. Anote 5 phrasal verbs.', link: gg('Modern Family onde assistir') },
  { id: 'b1-s2', level: 'b1', type: 'serie', title: 'How I Met Your Mother', by: 'Sitcom americana', why: 'Narrativa no passado — perfeito para past continuous e past perfect.', task: 'Assista 2 episódios e conte um deles em inglês em voz alta.', link: gg('How I Met Your Mother onde assistir') },
  { id: 'b1-f1', level: 'b1', type: 'filme', title: 'The Devil Wears Prada', by: 'Filme', why: 'Inglês de trabalho e diálogos rápidos mas claros.', task: 'Assista com legenda em inglês e anote 10 palavras de trabalho.', link: gg('The Devil Wears Prada onde assistir') },
  { id: 'b1-p1', level: 'b1', type: 'podcast', title: 'All Ears English', by: 'Podcast', why: 'Inglês americano natural e conversação.', task: 'Ouça 3 episódios e use uma expressão nova numa frase.', link: gg('All Ears English podcast') },
  { id: 'b1-l1', level: 'b1', type: 'livro', title: 'Charlie and the Chocolate Factory', by: 'Roald Dahl', why: 'História conhecida, linguagem divertida e acessível.', task: 'Leia 3 capítulos sem traduzir tudo; deduza pelo contexto.', link: gg('Charlie and the Chocolate Factory book') },
  { id: 'b1-l2', level: 'b1', type: 'livro', title: 'Wonder', by: 'R. J. Palacio', why: 'Capítulos curtos e linguagem do dia a dia.', task: 'Leia a primeira parte (narrada por Auggie).', link: gg('Wonder R J Palacio book') },

  // ---------- B2 ----------
  { id: 'b2-m1', level: 'b2', type: 'musica', title: 'Bohemian Rhapsody', by: 'Queen', why: 'Vocabulário rico, partes rápidas e lentas.', task: 'Ouça com a letra e explique a história com suas palavras em inglês.', link: yt('Bohemian Rhapsody Queen lyrics') },
  { id: 'b2-m2', level: 'b2', type: 'musica', title: 'Hotel California', by: 'Eagles', why: 'Narrativa no passado com metáforas.', task: 'Liste os verbos irregulares e as imagens/metáforas da letra.', link: yt('Hotel California Eagles lyrics') },
  { id: 'b2-m3', level: 'b2', type: 'musica', title: 'Rolling in the Deep', by: 'Adele', why: 'Expressões idiomáticas e condicionais.', task: 'Encontre a frase com “could have” e explique o sentido.', link: yt('Rolling in the Deep Adele lyrics') },
  { id: 'b2-s1', level: 'b2', type: 'serie', title: 'The Office (US)', by: 'Sitcom americana', why: 'Inglês de escritório, ironia e humor constrangedor.', task: 'Assista 3 episódios com legenda em inglês. Anote 5 frases sarcásticas.', link: gg('The Office US onde assistir') },
  { id: 'b2-s2', level: 'b2', type: 'serie', title: 'Stranger Things', by: 'Série', why: 'Gírias dos anos 80 e diálogos rápidos.', task: 'Assista um episódio só com legenda em inglês.', link: gg('Stranger Things Netflix') },
  { id: 'b2-f1', level: 'b2', type: 'filme', title: 'Forrest Gump', by: 'Filme', why: 'Narração clara contando uma vida inteira (tempos passados).', task: 'Assista com legenda em inglês e resuma o filme em 10 frases.', link: gg('Forrest Gump onde assistir') },
  { id: 'b2-p1', level: 'b2', type: 'podcast', title: 'TED Talks', by: 'TED', why: 'Palestras sobre tudo, com legenda em inglês.', task: 'Assista 2 palestras de até 15 min e escreva um resumo de 5 linhas.', link: yt('TED Talk') },
  { id: 'b2-p2', level: 'b2', type: 'podcast', title: 'The English We Speak', by: 'BBC Learning English', why: 'Expressões e gírias atuais em 3 minutos.', task: 'Ouça 5 episódios e use 2 expressões numa conversa ou mensagem.', link: yt('BBC The English We Speak') },
  { id: 'b2-l1', level: 'b2', type: 'livro', title: "Harry Potter and the Philosopher's Stone", by: 'J. K. Rowling', why: 'Você já conhece a história; vocabulário rico mas acessível.', task: 'Leia os 3 primeiros capítulos.', link: gg("Harry Potter and the Philosopher's Stone book") },
  { id: 'b2-l2', level: 'b2', type: 'livro', title: 'Animal Farm', by: 'George Orwell', why: 'Curto, clássico e cheio de ironia.', task: 'Leia o livro inteiro e explique a mensagem em inglês.', link: gg('Animal Farm George Orwell') },

  // ---------- C1 ----------
  { id: 'c1-m1', level: 'c1', type: 'musica', title: 'Lose Yourself', by: 'Eminem', why: 'Rap rápido: treino intenso de escuta e fala conectada.', task: 'Tente acompanhar a primeira estrofe lendo a letra. Depois sem letra.', link: yt('Lose Yourself Eminem lyrics') },
  { id: 'c1-m2', level: 'c1', type: 'musica', title: 'Fast Car', by: 'Tracy Chapman', why: 'História contada em detalhes; condicionais e planos.', task: 'Reconte a história da música em 8 frases.', link: yt('Fast Car Tracy Chapman lyrics') },
  { id: 'c1-m3', level: 'c1', type: 'musica', title: 'The Sound of Silence', by: 'Simon & Garfunkel', why: 'Poesia e metáforas.', task: 'Interprete o significado da letra em inglês.', link: yt('The Sound of Silence lyrics') },
  { id: 'c1-s1', level: 'c1', type: 'serie', title: 'Sherlock', by: 'BBC', why: 'Inglês britânico rápido e vocabulário sofisticado.', task: 'Assista um episódio com legenda em inglês e anote 10 palavras novas.', link: gg('Sherlock BBC onde assistir') },
  { id: 'c1-s2', level: 'c1', type: 'serie', title: 'Suits', by: 'Série', why: 'Inglês jurídico e de negócios, argumentação.', task: 'Assista 2 episódios sem legenda em português.', link: gg('Suits onde assistir') },
  { id: 'c1-s3', level: 'c1', type: 'serie', title: 'Ted Lasso', by: 'Apple TV+', why: 'Americano × britânico, humor e idioms.', task: 'Anote 5 diferenças entre o inglês do Ted e dos britânicos.', link: gg('Ted Lasso Apple TV') },
  { id: 'c1-f1', level: 'c1', type: 'filme', title: "The King's Speech", by: 'Filme', why: 'Pronúncia britânica formal e discursos.', task: 'Assista e repita (shadowing) o discurso final.', link: gg("The King's Speech onde assistir") },
  { id: 'c1-p1', level: 'c1', type: 'podcast', title: 'Freakonomics Radio', by: 'Podcast', why: 'Ideias complexas explicadas em linguagem natural.', task: 'Ouça um episódio inteiro e resuma os argumentos principais.', link: gg('Freakonomics Radio podcast') },
  { id: 'c1-l1', level: 'c1', type: 'livro', title: '1984', by: 'George Orwell', why: 'Clássico com vocabulário avançado e temas atuais.', task: 'Leia a primeira parte e discuta (ou escreva) suas impressões.', link: gg('1984 George Orwell book') },
  { id: 'c1-l2', level: 'c1', type: 'livro', title: 'Sapiens', by: 'Yuval Noah Harari', why: 'Não ficção com linguagem acadêmica acessível.', task: 'Leia 2 capítulos e anote 15 palavras novas com exemplos.', link: gg('Sapiens Harari book') },

  // ---------- C2 ----------
  { id: 'c2-m1', level: 'c2', type: 'musica', title: "We Didn't Start the Fire", by: 'Billy Joel', why: 'Referências culturais e históricas muito rápidas.', task: 'Pesquise 10 referências da letra e explique cada uma em inglês.', link: yt("We Didn't Start the Fire lyrics") },
  { id: 'c2-m2', level: 'c2', type: 'musica', title: 'Alright', by: 'Kendrick Lamar', why: 'Rap com gírias e inglês afro-americano (AAVE).', task: 'Estude 5 gírias da letra e o contexto social da música.', link: yt('Kendrick Lamar Alright lyrics') },
  { id: 'c2-s1', level: 'c2', type: 'serie', title: 'Peaky Blinders', by: 'BBC', why: 'Sotaque de Birmingham e gírias de época — desafio real.', task: 'Assista um episódio sem legenda e depois com legenda em inglês.', link: gg('Peaky Blinders onde assistir') },
  { id: 'c2-s2', level: 'c2', type: 'serie', title: 'Fleabag', by: 'BBC / Amazon', why: 'Humor britânico, ironia e quebras da quarta parede.', task: 'Anote exemplos de ironia e understatement.', link: gg('Fleabag onde assistir') },
  { id: 'c2-s3', level: 'c2', type: 'serie', title: 'Succession', by: 'HBO', why: 'Diálogos rápidos, inglês de negócios e insultos criativos.', task: 'Assista sem legenda e anote 10 expressões de negócios.', link: gg('Succession HBO') },
  { id: 'c2-f1', level: 'c2', type: 'filme', title: 'Stand-up comedy', by: 'Especiais de comédia', why: 'Humor depende de nuance, ritmo e cultura.', task: 'Assista um especial inteiro sem legenda e explique 3 piadas.', link: yt('stand up comedy special full') },
  { id: 'c2-p1', level: 'c2', type: 'podcast', title: 'This American Life', by: 'Podcast', why: 'Histórias reais com diversos sotaques americanos.', task: 'Ouça um episódio e reconte uma das histórias.', link: gg('This American Life podcast') },
  { id: 'c2-l1', level: 'c2', type: 'livro', title: 'Pride and Prejudice', by: 'Jane Austen', why: 'Inglês clássico, ironia fina e estruturas formais.', task: 'Leia 5 capítulos e identifique 5 frases irônicas.', link: gg('Pride and Prejudice Jane Austen') },
  { id: 'c2-l2', level: 'c2', type: 'livro', title: 'The Economist (artigos)', by: 'Revista', why: 'Escrita argumentativa de altíssimo nível.', task: 'Leia 3 artigos por semana e resuma cada um em 3 frases.', link: gg('The Economist articles') },
];

/* Textos de leitura escritos para o app, com perguntas de compreensão */
window.READINGS = [
  {
    id: 'r-a1-1', level: 'a1', title: 'My Day',
    text: `Hi! My name is Lucas. I am 24 years old and I live in Curitiba, in Brazil. I am a designer. I work from home.
I get up at seven o'clock every day. I have breakfast with my sister, Julia. She is a nurse and she works at a big hospital. After breakfast, I start work. I don't have lunch at home — I usually eat at a small restaurant near my house.
In the evening, I go to the gym. Then I watch TV or study English. I go to bed at eleven. On Saturdays, I play soccer with my friends. I love Saturdays!`,
    glossary: [['get up', 'levantar'], ['work from home', 'trabalhar de casa'], ['near', 'perto de'], ['then', 'depois']],
    questions: [
      ['Where does Lucas work?', ['At a hospital', 'At home', 'At a restaurant'], 1],
      ['What does Julia do?', ['She is a designer.', 'She is a nurse.', 'She is a teacher.'], 1],
      ['What does Lucas do on Saturdays?', ['He plays soccer.', 'He goes to the gym.', 'He studies English.'], 0],
      ['What time does he go to bed?', ['At 7', 'At 10', 'At 11'], 2],
    ],
  },
  {
    id: 'r-a1-2', level: 'a1', title: 'At the Café',
    text: `Waiter: Good morning! What can I get you?
Ana: Good morning. I'd like a cappuccino, please.
Waiter: Small, medium or large?
Ana: Medium, please. And can I have a cheese sandwich?
Waiter: Of course. Anything else?
Ana: No, thank you. How much is it?
Waiter: That's eight dollars and fifty cents.
Ana: Can I pay by card?
Waiter: Sure. Here you are. Have a nice day!
Ana: Thanks, you too!`,
    glossary: [['What can I get you?', 'O que vai querer?'], ['Anything else?', 'Mais alguma coisa?'], ['Here you are', 'Aqui está'], ['you too', 'você também']],
    questions: [
      ['What size is Ana’s cappuccino?', ['Small', 'Medium', 'Large'], 1],
      ['What does she eat?', ['A cheese sandwich', 'A cake', 'Nothing'], 0],
      ['How much does she pay?', ['$8.15', '$8.50', '$18.50'], 1],
      ['How does she pay?', ['In cash', 'By card'], 1],
    ],
  },
  {
    id: 'r-a2-1', level: 'a2', title: 'A Weekend in the Mountains',
    text: `Last weekend, my friends and I went to the mountains. We left on Friday night and drove for four hours. The road was dark and it was raining, so we drove slowly.
On Saturday morning the weather was beautiful. We walked for six hours and saw a waterfall. It was the most beautiful place I have ever seen! We took a lot of photos and had a picnic next to the river.
In the evening, we were very tired, but we made a fire and cooked dinner. We didn't have any internet, and that was great — we talked and laughed all night.
On Sunday, we came back home. Next year, we are going to visit the mountains again, but this time we are going to stay for a week.`,
    glossary: [['left', 'partimos (leave)'], ['waterfall', 'cachoeira'], ['laughed', 'rimos'], ['came back', 'voltamos']],
    questions: [
      ['Why did they drive slowly?', ['Because the car was old', 'Because it was dark and raining', 'Because they were tired'], 1],
      ['What did they see on Saturday?', ['A waterfall', 'A lake', 'A city'], 0],
      ['What did they NOT have?', ['Food', 'Internet', 'Fire'], 1],
      ['What are their plans for next year?', ['Visit the beach', 'Stay a week in the mountains', 'Never go back'], 1],
    ],
  },
  {
    id: 'r-a2-2', level: 'a2', title: 'Two Cities',
    text: `Maria lives in Lisbon and her brother Pedro lives in London. They often talk about their cities.
"London is bigger than Lisbon," says Pedro, "and there are more things to do. There are hundreds of museums and theaters." Maria agrees, but she says Lisbon is sunnier and cheaper. "In Lisbon, a coffee costs about one euro. In London it is much more expensive!"
Pedro thinks London is more exciting, but he misses the food from home. "The weather here is worse, too. It rains a lot." Maria thinks Lisbon is the best city in the world. Pedro is not so sure, but he visits her every summer.`,
    glossary: [['agrees', 'concorda'], ['cheaper', 'mais barato'], ['misses', 'sente falta'], ['sure', 'certo, seguro']],
    questions: [
      ['Which city is bigger?', ['Lisbon', 'London'], 1],
      ['Why does Maria like Lisbon?', ['It is sunnier and cheaper.', 'It has more museums.', 'It rains a lot.'], 0],
      ['What does Pedro miss?', ['The museums', 'The food from home', 'His job'], 1],
      ['When does Pedro visit Maria?', ['Every winter', 'Every summer', 'Never'], 1],
    ],
  },
  {
    id: 'r-b1-1', level: 'b1', title: 'The Job Interview',
    text: `I had never been so nervous in my life. The interview was at 9 a.m., and I had been preparing for it for two weeks. I had read everything about the company and practiced my answers in front of the mirror.
When I arrived, the receptionist told me to wait. While I was waiting, I noticed that the other candidates looked very confident. I started to think I didn't have a chance.
Then the manager called my name. She asked me why I wanted the job and what I had learned in my previous position. To my surprise, the conversation was relaxed. I explained how I had solved a difficult problem for a client, and she seemed impressed.
Two days later, my phone rang. I had got the job! If I hadn't prepared so much, I don't think I would have been so calm.`,
    glossary: [['confident', 'confiante'], ['previous', 'anterior'], ['solved', 'resolvi'], ['impressed', 'impressionada']],
    questions: [
      ['How long had the writer been preparing?', ['Two days', 'Two weeks', 'Two months'], 1],
      ['How did the other candidates look?', ['Nervous', 'Confident', 'Tired'], 1],
      ['What impressed the manager?', ['The writer’s clothes', 'How the writer solved a problem', 'The writer’s English'], 1],
      ['Why was the writer calm, according to the text?', ['Because of the preparation', 'Because the job was easy', 'Because the manager was a friend'], 0],
    ],
  },
  {
    id: 'r-b1-2', level: 'b1', title: 'Living Without a Phone',
    text: `Last month, I decided to try an experiment: I would live for one week without my smartphone. My friends thought I was crazy. "How will you get around? How will we contact you?" they asked.
The first two days were difficult. I kept reaching for my pocket, and I felt anxious because I didn't know what was happening online. I had to ask strangers for directions, which was actually a nice way to practice talking to people.
By the fourth day, something changed. I was sleeping better, reading more and paying attention to the world around me. I even remembered phone numbers again!
When the week ended, I didn't give up my phone completely, but I changed my habits. Now I turn it off at 10 p.m. and I never use it during meals. If you feel addicted to your phone, I recommend trying this — even for just a weekend.`,
    glossary: [['get around', 'se locomover'], ['kept reaching', 'ficava pegando'], ['strangers', 'desconhecidos'], ['addicted', 'viciado']],
    questions: [
      ['What did the writer’s friends think?', ['It was a great idea', 'It was crazy', 'It was easy'], 1],
      ['What was difficult at the beginning?', ['Feeling anxious', 'Sleeping too much', 'Reading books'], 0],
      ['What positive change happened?', ['Sleeping better', 'Earning more money', 'Making more calls'], 0],
      ['What is the writer’s new habit?', ['Never using a phone', 'Turning it off at 10 p.m.', 'Using it only at meals'], 1],
    ],
  },
  {
    id: 'r-b2-1', level: 'b2', title: 'The Four-Day Work Week',
    text: `Several companies around the world have been experimenting with a four-day work week, and the results have surprised many skeptics. In one of the largest trials, employees worked 80% of their usual hours while keeping 100% of their salary — on the condition that productivity stayed the same.
Most participating companies reported that productivity was maintained or even improved. Employees said they felt less stressed and had more time for their families and hobbies. Some managers admitted that they had expected chaos, but meetings became shorter and more focused.
However, the model is not suitable for every industry. Hospitals, schools and restaurants, for instance, cannot simply close one day a week. Critics also argue that some workers ended up squeezing five days of work into four, which led to longer and more intense days.
Despite these concerns, many companies that took part in the trials have decided to keep the policy. Whether it will become the norm remains to be seen.`,
    glossary: [['skeptics', 'céticos'], ['trial', 'teste, experimento'], ['suitable', 'adequado'], ['squeezing', 'espremendo']],
    questions: [
      ['What was the condition of the trial?', ['Salaries were reduced', 'Productivity had to stay the same', 'Employees worked from home'], 1],
      ['What did some managers expect?', ['Chaos', 'Higher profits', 'Longer meetings'], 0],
      ['Which is a criticism mentioned?', ['Some days became more intense', 'Salaries went down', 'Employees were bored'], 0],
      ['What does “remains to be seen” mean?', ['It is already decided', 'Nobody knows yet', 'It will never happen'], 1],
    ],
  },
  {
    id: 'r-b2-2', level: 'b2', title: 'Why We Procrastinate',
    text: `Most people assume that procrastination is simply a matter of laziness or poor time management. Psychologists, however, increasingly see it as an emotional problem. We don't delay tasks because we are lazy, but because those tasks make us feel bad — bored, anxious, insecure or overwhelmed.
When we put something off, we get immediate relief. The problem is that this relief is temporary, and the task is still there, now accompanied by guilt. Over time, this cycle can seriously affect our mental health and our careers.
Researchers suggest a few strategies. First, break big tasks into very small steps, so that starting feels less threatening. Second, be kind to yourself: people who forgive themselves for procrastinating are less likely to do it again. Finally, remove temptations — if your phone distracts you, leave it in another room.
In other words, beating procrastination is less about discipline and more about managing your emotions.`,
    glossary: [['assume', 'supõem'], ['overwhelmed', 'sobrecarregado'], ['put something off', 'adiar algo'], ['relief', 'alívio']],
    questions: [
      ['According to psychologists, procrastination is mainly:', ['a time-management problem', 'an emotional problem', 'a sign of laziness'], 1],
      ['What happens right after we postpone a task?', ['We feel relief', 'We feel guilty immediately', 'We finish faster'], 0],
      ['Which strategy is suggested?', ['Working longer hours', 'Breaking tasks into small steps', 'Punishing yourself'], 1],
      ['People who forgive themselves are:', ['more likely to procrastinate again', 'less likely to procrastinate again'], 1],
    ],
  },
  {
    id: 'r-c1-1', level: 'c1', title: 'The Myth of Multitasking',
    text: `We like to think of ourselves as accomplished multitaskers, effortlessly juggling emails, calls and conversations. Neuroscience, however, paints a rather less flattering picture. What we call multitasking is, in most cases, rapid task-switching — and every switch comes at a cost.
Each time we shift our attention, the brain needs a moment to reorient itself, a phenomenon researchers refer to as "switching cost". Individually, these delays are negligible; cumulatively, they can eat up a substantial portion of our productive time. Moreover, studies suggest that heavy multitaskers are, paradoxically, worse at filtering out irrelevant information than those who tend to focus on one thing at a time.
This is not to say that all simultaneous activity is harmful. Listening to music while running, for instance, poses little problem, since one of the tasks is largely automatic. The trouble arises when two tasks compete for the same cognitive resources, such as writing a report while following a conversation.
The implications for the modern workplace are considerable. Open-plan offices and constant notifications may well be undermining the very productivity they were designed to foster.`,
    glossary: [['juggling', 'fazendo malabarismo'], ['flattering', 'lisonjeiro'], ['negligible', 'insignificante'], ['foster', 'promover, estimular']],
    questions: [
      ['According to the text, multitasking is mostly:', ['doing two things truly at once', 'switching quickly between tasks', 'a skill that improves focus'], 1],
      ['What is surprising about heavy multitaskers?', ['They filter irrelevant information worse', 'They are more productive', 'They sleep better'], 0],
      ['When is doing two things at once less problematic?', ['When both tasks need concentration', 'When one task is automatic'], 1],
      ['What does “undermining” mean in the last paragraph?', ['improving', 'weakening', 'measuring'], 1],
    ],
  },
  {
    id: 'r-c2-1', level: 'c2', title: 'On Being Wrong',
    text: `There is a peculiar discomfort in discovering that one has been wrong — not merely mistaken about a trivial fact, but wrong about something one had defended with conviction. Few experiences are as quietly humbling. And yet, it is precisely this discomfort that many thinkers regard as the engine of intellectual growth.
The difficulty lies not in the error itself but in our attachment to being right. We tend to treat our beliefs as extensions of our identity, so that a challenge to an idea feels uncomfortably like a challenge to the self. Hence the familiar spectacle of people doubling down in the face of overwhelming evidence, as though conceding a point were tantamount to surrender.
Those who handle being wrong gracefully seem to share a certain detachment. They hold their opinions firmly enough to act on them, yet loosely enough to revise them — what some have called "strong opinions, weakly held". Far from being a sign of indecision, this flexibility reflects a deeper confidence: the confidence that one's worth does not hinge on any single belief.
Perhaps, then, the most valuable sentence in any language is also among the hardest to utter: "I was wrong."`,
    glossary: [['humbling', 'que traz humildade'], ['doubling down', 'insistir ainda mais'], ['tantamount to', 'equivalente a'], ['hinge on', 'depender de']],
    questions: [
      ['According to the author, the main difficulty is:', ['the error itself', 'our attachment to being right', 'a lack of information'], 1],
      ['Why do people “double down”?', ['Because conceding feels like surrender', 'Because the evidence supports them', 'Because they are bored'], 0],
      ['“Strong opinions, weakly held” means:', ['never changing your mind', 'acting on opinions but being willing to revise them', 'having no opinions'], 1],
      ['What is the tone of the text?', ['humorous and informal', 'reflective and philosophical', 'technical and scientific'], 1],
    ],
  },
];
