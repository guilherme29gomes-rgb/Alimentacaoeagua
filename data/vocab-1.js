/* Vocabulário por frequência (mais usadas primeiro).
   Formato de cada linha: palavra|classe|significado|exemplo=tradução|exemplo=tradução|exemplo=tradução */
window.VOCAB_RAW = window.VOCAB_RAW || [];
window.VOCAB_RAW.push(`
the|art.|o, a, os, as|The sun is hot today.=O sol está quente hoje.|Close the door, please.=Feche a porta, por favor.|She is the best student in the class.=Ela é a melhor aluna da turma.
be|v.|ser; estar|I want to be a doctor.=Quero ser médico.|Be careful!=Tome cuidado!|It will be cold tomorrow.=Vai estar frio amanhã.
to|prep.|para; a (e marca o infinitivo)|I go to work by bus.=Vou para o trabalho de ônibus.|She wants to learn English.=Ela quer aprender inglês.|Give it to me.=Dê isso para mim.
of|prep.|de|A cup of coffee, please.=Uma xícara de café, por favor.|He is a friend of mine.=Ele é um amigo meu.|The end of the movie was sad.=O final do filme foi triste.
and|conj.|e|I like rice and beans.=Gosto de arroz e feijão.|She sings and dances.=Ela canta e dança.|Come in and sit down.=Entre e sente-se.
a|art.|um, uma|I have a dog.=Tenho um cachorro.|She is a teacher.=Ela é professora.|Wait a minute.=Espere um minuto.
in|prep.|em, dentro de|I live in Brazil.=Eu moro no Brasil.|The keys are in my bag.=As chaves estão na minha bolsa.|I'll be back in ten minutes.=Volto em dez minutos.
that|pron./conj.|que; aquele, aquela, aquilo|I know that you are tired.=Sei que você está cansado.|Who is that man?=Quem é aquele homem?|That's a great idea!=Essa é uma ótima ideia!
have|v.|ter; (aux.) ter feito|I have two brothers.=Tenho dois irmãos.|We have breakfast at 7.=Tomamos café da manhã às 7.|Have you finished?=Você terminou?
I|pron.|eu|I am hungry.=Estou com fome.|I love music.=Eu amo música.|Can I help you?=Posso te ajudar?
it|pron.|ele, ela (coisa); isso|It is raining.=Está chovendo.|I bought a book. It is great.=Comprei um livro. Ele é ótimo.|It's very important.=Isso é muito importante.
for|prep.|para; por; durante|This gift is for you.=Este presente é para você.|Thanks for your help.=Obrigado pela sua ajuda.|I studied for two hours.=Estudei por duas horas.
not|adv.|não|I am not tired.=Não estou cansado.|It's not my fault.=Não é minha culpa.|Not now, please.=Agora não, por favor.
on|prep.|em, sobre; ligado|The book is on the table.=O livro está sobre a mesa.|See you on Monday.=Até segunda.|Is the TV on?=A TV está ligada?
with|prep.|com|I live with my parents.=Moro com meus pais.|Coffee with milk, please.=Café com leite, por favor.|What's wrong with you?=O que há com você?
he|pron.|ele|He is my brother.=Ele é meu irmão.|He works at a bank.=Ele trabalha em um banco.|Where is he?=Onde ele está?
as|conj./prep.|como; enquanto; tão|She works as a nurse.=Ela trabalha como enfermeira.|As I said, it's late.=Como eu disse, está tarde.|He is as tall as me.=Ele é tão alto quanto eu.
you|pron.|você, vocês; te|Do you speak English?=Você fala inglês?|I love you.=Eu te amo.|Are you ready?=Vocês estão prontos?
do|v.|fazer; (aux.) perguntas e negativas|What do you do?=O que você faz?|I do my homework at night.=Faço minha lição à noite.|I don't know.=Não sei.
at|prep.|em, no, na; às (horas)|I'm at home.=Estou em casa.|The class starts at 8.=A aula começa às 8.|Look at me.=Olhe para mim.
this|pron.|este, esta, isto|This is my sister.=Esta é minha irmã.|I like this song.=Gosto desta música.|What's this?=O que é isto?
but|conj.|mas|I'm tired, but happy.=Estou cansado, mas feliz.|It's cheap, but it's good.=É barato, mas é bom.|Sorry, but I can't go.=Desculpe, mas não posso ir.
his|pron.|dele, seu (de homem)|His name is Paulo.=O nome dele é Paulo.|He lost his keys.=Ele perdeu as chaves dele.|Is this car his?=Este carro é dele?
by|prep.|por; de (meio); até (prazo)|I go to work by car.=Vou trabalhar de carro.|This book was written by her.=Este livro foi escrito por ela.|Finish it by Friday.=Termine até sexta.
from|prep.|de (origem)|I'm from Brazil.=Sou do Brasil.|A letter from my mother.=Uma carta da minha mãe.|From 9 to 5.=Das 9 às 5.
they|pron.|eles, elas|They are my friends.=Eles são meus amigos.|They live in Rio.=Elas moram no Rio.|What did they say?=O que eles disseram?
we|pron.|nós|We are a team.=Nós somos uma equipe.|We need to talk.=Precisamos conversar.|Can we go now?=Podemos ir agora?
say|v.|dizer, falar|What did you say?=O que você disse?|Say hello to your mom.=Diga oi para sua mãe.|They say it will rain.=Dizem que vai chover.
her|pron.|ela (objeto); dela|I love her.=Eu a amo.|Her car is red.=O carro dela é vermelho.|Call her later.=Ligue para ela mais tarde.
she|pron.|ela|She is very smart.=Ela é muito inteligente.|She lives alone.=Ela mora sozinha.|Is she your sister?=Ela é sua irmã?
or|conj.|ou|Coffee or tea?=Café ou chá?|Now or never.=Agora ou nunca.|Hurry, or we'll be late.=Corra, ou vamos nos atrasar.
an|art.|um, uma (antes de som de vogal)|I eat an apple every day.=Como uma maçã todo dia.|She is an engineer.=Ela é engenheira.|Wait an hour.=Espere uma hora.
will|aux.|(indica futuro)|I will call you.=Vou te ligar.|It will be fine.=Vai ficar tudo bem.|Will you help me?=Você vai me ajudar?
my|pron.|meu, minha|My name is Ana.=Meu nome é Ana.|This is my house.=Esta é minha casa.|My parents are here.=Meus pais estão aqui.
one|num./pron.|um; alguém|I have one question.=Tenho uma pergunta.|Which one do you want?=Qual você quer?|One day I will travel.=Um dia eu vou viajar.
all|adj./pron.|todo, todos, tudo|All my friends came.=Todos os meus amigos vieram.|That's all.=É só isso.|I worked all day.=Trabalhei o dia todo.
would|aux.|(condicional) -ria|I would like a coffee.=Eu gostaria de um café.|What would you do?=O que você faria?|Would you help me?=Você me ajudaria?
there|adv.|lá, ali; (there is) há|I was there yesterday.=Eu estive lá ontem.|There is a problem.=Há um problema.|Put it over there.=Coloque ali.
their|pron.|deles, delas|Their house is big.=A casa deles é grande.|They love their dog.=Eles amam o cachorro deles.|It was their idea.=Foi ideia delas.
what|pron.|o que, qual|What is your name?=Qual é o seu nome?|What time is it?=Que horas são?|I know what you mean.=Sei o que você quer dizer.
so|adv./conj.|então; tão; por isso|I was tired, so I slept.=Eu estava cansado, então dormi.|You are so kind.=Você é tão gentil.|I think so.=Acho que sim.
up|adv./prep.|para cima; acima|Stand up, please.=Levante-se, por favor.|Prices went up.=Os preços subiram.|What's up?=E aí? / O que houve?
out|adv.|fora, para fora|Get out!=Saia!|She is out now.=Ela está fora agora.|Let's eat out tonight.=Vamos comer fora hoje.
if|conj.|se|If it rains, I'll stay home.=Se chover, fico em casa.|Ask him if he can come.=Pergunte se ele pode vir.|If I were you, I'd go.=Se eu fosse você, eu iria.
about|prep.|sobre; cerca de|Let's talk about it.=Vamos falar sobre isso.|It costs about ten dollars.=Custa cerca de dez dólares.|What about you?=E você?
who|pron.|quem; que (pessoas)|Who is she?=Quem é ela?|The man who called is my boss.=O homem que ligou é meu chefe.|Who wants pizza?=Quem quer pizza?
get|v.|conseguir; pegar; ficar; chegar|I got a new job.=Consegui um emprego novo.|It's getting cold.=Está ficando frio.|What time did you get home?=Que horas você chegou em casa?
which|pron.|qual; que (coisas)|Which color do you prefer?=Qual cor você prefere?|The car which I bought is blue.=O carro que comprei é azul.|Which one is yours?=Qual é o seu?
go|v.|ir|I go to school every day.=Vou à escola todo dia.|Let's go!=Vamos!|Where did you go?=Aonde você foi?
me|pron.|me, mim|Call me later.=Me ligue mais tarde.|Can you help me?=Pode me ajudar?|This is for me?=Isto é para mim?
when|adv./conj.|quando|When is your birthday?=Quando é seu aniversário?|Call me when you arrive.=Me ligue quando chegar.|I was happy when I saw you.=Fiquei feliz quando te vi.
make|v.|fazer (criar, produzir)|I'll make dinner.=Vou fazer o jantar.|Don't make noise.=Não faça barulho.|You make me happy.=Você me faz feliz.
can|aux.|poder; saber (fazer)|I can swim.=Sei nadar.|Can I sit here?=Posso sentar aqui?|You can do it!=Você consegue!
like|v./prep.|gostar; como|I like chocolate.=Gosto de chocolate.|She looks like her mother.=Ela se parece com a mãe.|I'd like some water.=Eu gostaria de água.
time|s.|tempo; vez; hora|What time is it?=Que horas são?|I don't have time.=Não tenho tempo.|This is my first time here.=É minha primeira vez aqui.
no|adv./adj.|não; nenhum|No, thank you.=Não, obrigado.|There's no milk.=Não tem leite.|No problem!=Sem problema!
just|adv.|só, apenas; acabou de|I just want to sleep.=Só quero dormir.|She just arrived.=Ela acabou de chegar.|Just a moment, please.=Só um momento, por favor.
him|pron.|ele (objeto), o, lhe|I know him.=Eu o conheço.|Tell him to wait.=Diga a ele para esperar.|I gave him a gift.=Dei um presente para ele.
know|v.|saber; conhecer|I don't know.=Não sei.|Do you know her?=Você a conhece?|I know how to cook.=Sei cozinhar.
take|v.|pegar; levar; tomar|Take an umbrella.=Leve um guarda-chuva.|I take the bus to work.=Pego o ônibus para o trabalho.|It takes two hours.=Leva duas horas.
people|s.|pessoas, gente|Many people live here.=Muitas pessoas moram aqui.|People are nice in this city.=As pessoas são legais nesta cidade.|How many people are coming?=Quantas pessoas vêm?
into|prep.|para dentro de|Come into the house.=Entre na casa.|She jumped into the pool.=Ela pulou na piscina.|Translate it into English.=Traduza para o inglês.
year|s.|ano|Happy New Year!=Feliz Ano Novo!|I'm 30 years old.=Tenho 30 anos.|Last year I went to Chile.=No ano passado fui ao Chile.
your|pron.|seu, sua, teu, tua|What's your name?=Qual é o seu nome?|Is this your phone?=Este celular é seu?|Wash your hands.=Lave suas mãos.
good|adj.|bom, boa|Good morning!=Bom dia!|This is a good book.=Este é um bom livro.|You look good.=Você está bem (bonito).
some|adj./pron.|algum, alguns; um pouco de|I need some help.=Preciso de uma ajuda.|Some people don't like it.=Algumas pessoas não gostam.|Would you like some tea?=Quer um pouco de chá?
could|aux.|podia; poderia|Could you help me?=Você poderia me ajudar?|I couldn't sleep.=Não consegui dormir.|It could rain later.=Pode chover mais tarde.
them|pron.|eles, elas (objeto); os, as, lhes|I love them.=Eu os amo.|Call them now.=Ligue para eles agora.|I gave them my number.=Dei meu número para elas.
see|v.|ver|I can't see anything.=Não consigo ver nada.|See you later!=Até mais!|I see what you mean.=Entendo o que você quer dizer.
other|adj.|outro, outra|The other day I saw her.=Outro dia eu a vi.|Do you have other colors?=Você tem outras cores?|They help each other.=Eles se ajudam.
than|conj.|do que (comparação)|She is taller than me.=Ela é mais alta do que eu.|Better late than never.=Antes tarde do que nunca.|More than ten people came.=Mais de dez pessoas vieram.
then|adv.|então; depois; naquela época|First eat, then study.=Primeiro coma, depois estude.|I was young then.=Eu era jovem naquela época.|OK, see you then.=Ok, até lá.
now|adv.|agora|I'm busy now.=Estou ocupado agora.|Do it right now!=Faça isso agora mesmo!|From now on, I'll study.=De agora em diante, vou estudar.
look|v.|olhar; parecer|Look at this!=Olhe isto!|You look tired.=Você parece cansado.|I'm looking for my keys.=Estou procurando minhas chaves.
only|adv./adj.|só, somente; único|I have only five dollars.=Tenho só cinco dólares.|She is an only child.=Ela é filha única.|It's only a game.=É só um jogo.
come|v.|vir|Come here!=Venha aqui!|Can you come to my party?=Você pode vir à minha festa?|Where do you come from?=De onde você vem?
its|pron.|seu, sua (de coisa ou animal)|The dog wagged its tail.=O cachorro balançou o rabo.|The company changed its name.=A empresa mudou de nome.|Every city has its problems.=Toda cidade tem seus problemas.
over|prep./adv.|sobre, acima; acabado|The game is over.=O jogo acabou.|The plane flew over the city.=O avião voou sobre a cidade.|Come over tonight.=Venha aqui em casa hoje.
think|v.|pensar; achar|I think you're right.=Acho que você tem razão.|What do you think?=O que você acha?|I'm thinking about you.=Estou pensando em você.
also|adv.|também|I also like jazz.=Também gosto de jazz.|She speaks English and also French.=Ela fala inglês e também francês.|It's also cheaper.=Também é mais barato.
back|adv./s.|de volta; costas|I'll be right back.=Já volto.|My back hurts.=Minhas costas doem.|Give it back to me.=Devolva para mim.
after|prep.|depois, após|Let's talk after lunch.=Vamos conversar depois do almoço.|After you.=Você primeiro.|I'll call you after work.=Te ligo depois do trabalho.
use|v.|usar|Can I use your phone?=Posso usar seu celular?|I use the computer every day.=Uso o computador todo dia.|How do you use this?=Como se usa isto?
two|num.|dois, duas|I have two cats.=Tenho dois gatos.|Two coffees, please.=Dois cafés, por favor.|It's two o'clock.=São duas horas.
how|adv.|como; quão|How are you?=Como vai?|How old are you?=Quantos anos você tem?|How do you say this in English?=Como se diz isso em inglês?
our|pron.|nosso, nossa|This is our house.=Esta é a nossa casa.|Our teacher is great.=Nosso professor é ótimo.|We love our kids.=Amamos nossos filhos.
work|v./s.|trabalhar; trabalho|I work in an office.=Trabalho em um escritório.|I'm at work.=Estou no trabalho.|Does this machine work?=Esta máquina funciona?
first|adj.|primeiro|This is my first time.=É minha primeira vez.|First, wash your hands.=Primeiro, lave as mãos.|She came first.=Ela chegou em primeiro.
well|adv.|bem|I don't feel well.=Não estou me sentindo bem.|She speaks English very well.=Ela fala inglês muito bem.|Well, I have to go.=Bem, preciso ir.
way|s.|caminho; jeito, maneira|Is this the way to the beach?=Este é o caminho para a praia?|I like the way you smile.=Gosto do jeito que você sorri.|No way!=De jeito nenhum! / Não acredito!
even|adv.|até, mesmo|Even my mom likes it.=Até minha mãe gosta.|I didn't even see him.=Eu nem o vi.|It's even better now.=Está ainda melhor agora.
new|adj.|novo|I have a new car.=Tenho um carro novo.|Happy New Year!=Feliz Ano Novo!|What's new?=Quais as novidades?
want|v.|querer|I want to go home.=Quero ir para casa.|What do you want?=O que você quer?|She wants a new phone.=Ela quer um celular novo.
because|conj.|porque|I'm late because of the traffic.=Estou atrasado por causa do trânsito.|I study because I want a better job.=Estudo porque quero um emprego melhor.|Why? Because I said so.=Por quê? Porque eu disse.
any|adj./pron.|algum, nenhum, qualquer|Do you have any questions?=Você tem alguma pergunta?|I don't have any money.=Não tenho nenhum dinheiro.|Take any seat.=Sente em qualquer lugar.
these|pron.|estes, estas|These shoes are new.=Estes sapatos são novos.|I like these songs.=Gosto destas músicas.|Are these yours?=Estes são seus?
give|v.|dar|Give me a minute.=Me dê um minuto.|She gave me a present.=Ela me deu um presente.|Don't give up!=Não desista!
day|s.|dia|Have a nice day!=Tenha um bom dia!|I work every day.=Trabalho todo dia.|What day is today?=Que dia é hoje?
most|adv./adj.|mais; a maioria|Most people agree.=A maioria das pessoas concorda.|She is the most beautiful girl.=Ela é a garota mais bonita.|What I like most is the food.=O que mais gosto é a comida.
us|pron.|nós (objeto), nos|Join us!=Junte-se a nós!|They invited us.=Eles nos convidaram.|Let us know.=Nos avise.
find|v.|encontrar, achar|I can't find my phone.=Não consigo achar meu celular.|Did you find a job?=Você encontrou um emprego?|I find it difficult.=Acho isso difícil.
here|adv.|aqui|Come here.=Venha aqui.|I live here.=Moro aqui.|Here you are.=Aqui está.
thing|s.|coisa|I have many things to do.=Tenho muitas coisas para fazer.|The best thing is to wait.=A melhor coisa é esperar.|What's that thing?=O que é aquela coisa?
many|adj.|muitos, muitas|How many brothers do you have?=Quantos irmãos você tem?|Many people came.=Muitas pessoas vieram.|Thanks so many times.=Obrigado muitas vezes.
tell|v.|contar, dizer (a alguém)|Tell me the truth.=Me conte a verdade.|Can you tell me the time?=Pode me dizer as horas?|Don't tell anyone.=Não conte a ninguém.
very|adv.|muito|I'm very happy.=Estou muito feliz.|Thank you very much.=Muito obrigado.|It's very cold today.=Está muito frio hoje.
need|v.|precisar|I need help.=Preciso de ajuda.|You need to rest.=Você precisa descansar.|Do you need anything?=Precisa de alguma coisa?
feel|v.|sentir|I feel tired.=Estou me sentindo cansado.|How do you feel?=Como você se sente?|I feel like eating pizza.=Estou com vontade de comer pizza.
should|aux.|deveria|You should see a doctor.=Você deveria ir ao médico.|What should I do?=O que eu deveria fazer?|We should go now.=Deveríamos ir agora.
call|v./s.|ligar; chamar; ligação|Call me later.=Me ligue mais tarde.|What do you call this?=Como se chama isto?|I missed your call.=Perdi sua ligação.
where|adv.|onde|Where are you?=Onde você está?|Where do you live?=Onde você mora?|This is where I work.=É aqui que eu trabalho.
life|s.|vida|Life is beautiful.=A vida é bela.|I've lived here all my life.=Moro aqui a vida toda.|Get a life!=Vá arrumar o que fazer!
child|s.|criança, filho(a)|She is an only child.=Ela é filha única.|The child is sleeping.=A criança está dormindo.|They have three children.=Eles têm três filhos.
try|v.|tentar; experimentar|Try again.=Tente de novo.|Can I try this on?=Posso experimentar isto?|Try the cake, it's delicious.=Experimente o bolo, está delicioso.
last|adj./v.|último; passado; durar|Last night I slept well.=Ontem à noite dormi bem.|This is the last one.=Este é o último.|The movie lasts two hours.=O filme dura duas horas.
ask|v.|perguntar; pedir|Can I ask you something?=Posso te perguntar uma coisa?|Ask for help.=Peça ajuda.|She asked me to wait.=Ela me pediu para esperar.
still|adv.|ainda|I still love you.=Ainda te amo.|Are you still at work?=Você ainda está no trabalho?|It's still raining.=Ainda está chovendo.
world|s.|mundo|I want to travel the world.=Quero viajar pelo mundo.|It's the best pizza in the world.=É a melhor pizza do mundo.|Welcome to my world.=Bem-vindo ao meu mundo.
through|prep.|através de; por|We walked through the park.=Caminhamos pelo parque.|I got the job through a friend.=Consegui o emprego por meio de um amigo.|Monday through Friday.=De segunda a sexta.
school|s.|escola|My kids go to school by bus.=Meus filhos vão à escola de ônibus.|I hated school.=Eu odiava a escola.|School starts in February.=As aulas começam em fevereiro.
hand|s.|mão|Wash your hands.=Lave as mãos.|Can you give me a hand?=Pode me dar uma mão?|Raise your hand.=Levante a mão.
between|prep.|entre|The bank is between the school and the park.=O banco fica entre a escola e o parque.|It's between you and me.=Fica entre nós.|Come between 2 and 4.=Venha entre 2 e 4.
high|adj.|alto (altura, nível)|The prices are very high.=Os preços estão muito altos.|How high is the mountain?=Qual a altura da montanha?|She has a high fever.=Ela está com febre alta.
must|aux.|deve (obrigação ou certeza)|You must wear a seatbelt.=Você deve usar cinto de segurança.|You must be tired.=Você deve estar cansado.|I must go now.=Preciso ir agora.
really|adv.|realmente; muito|I really like it.=Gosto muito disso.|Really? I didn't know!=Sério? Eu não sabia!|It's really cold.=Está muito frio.
something|pron.|algo, alguma coisa|I want something to eat.=Quero algo para comer.|Something is wrong.=Algo está errado.|Can I ask you something?=Posso te perguntar uma coisa?
too|adv.|também; demais|I love you too.=Também te amo.|It's too expensive.=É caro demais.|Me too!=Eu também!
leave|v.|sair, partir; deixar|What time do you leave work?=Que horas você sai do trabalho?|Leave me alone.=Me deixe em paz.|I left my phone at home.=Deixei meu celular em casa.
put|v.|colocar, pôr|Put it on the table.=Coloque na mesa.|Put on your jacket.=Vista sua jaqueta.|Where did you put my keys?=Onde você colocou minhas chaves?
while|conj.|enquanto|I listen to music while I work.=Ouço música enquanto trabalho.|Wait a while.=Espere um pouco.|While you were out, she called.=Enquanto você estava fora, ela ligou.
mean|v.|significar; querer dizer|What does this word mean?=O que esta palavra significa?|I didn't mean to hurt you.=Não tive a intenção de te magoar.|What do you mean?=O que você quer dizer?
keep|v.|manter; guardar; continuar|Keep the change.=Fique com o troco.|Keep going!=Continue!|Can you keep a secret?=Você sabe guardar segredo?
let|v.|deixar, permitir|Let me help you.=Deixe-me te ajudar.|Let's go!=Vamos!|My parents let me travel alone.=Meus pais me deixam viajar sozinho.
never|adv.|nunca|I never drink coffee.=Nunca bebo café.|Never give up.=Nunca desista.|I've never been to Japan.=Nunca fui ao Japão.
begin|v.|começar|Let's begin the class.=Vamos começar a aula.|The movie begins at 8.=O filme começa às 8.|It began to rain.=Começou a chover.
seem|v.|parecer|You seem happy.=Você parece feliz.|It seems easy.=Parece fácil.|She seems to be tired.=Ela parece estar cansada.
help|v./s.|ajudar; ajuda|Can you help me?=Você pode me ajudar?|Thanks for your help.=Obrigado pela ajuda.|Help!=Socorro!
show|v./s.|mostrar; show, programa|Show me your photos.=Me mostre suas fotos.|Let me show you the way.=Deixe-me te mostrar o caminho.|It's my favorite TV show.=É meu programa de TV favorito.
talk|v.|conversar, falar|We need to talk.=Precisamos conversar.|Talk to me.=Fale comigo.|She talks too much.=Ela fala demais.
turn|v./s.|virar; vez|Turn left.=Vire à esquerda.|Turn off the light.=Apague a luz.|It's your turn.=É sua vez.
start|v.|começar; ligar (motor)|When do you start your new job?=Quando você começa no emprego novo?|The car won't start.=O carro não liga.|Let's start again.=Vamos começar de novo.
might|aux.|talvez, poderia|It might rain.=Pode ser que chova.|I might go to the party.=Talvez eu vá à festa.|You might be right.=Você pode ter razão.
both|pron.|ambos, os dois|Both of my parents are teachers.=Meus pais são os dois professores.|I like both.=Gosto dos dois.|Both options are good.=As duas opções são boas.
little|adj.|pequeno; pouco|I have a little dog.=Tenho um cachorro pequeno.|I speak a little English.=Falo um pouco de inglês.|Little by little.=Pouco a pouco.
every|adj.|todo, cada|I run every morning.=Corro toda manhã.|Every student has a book.=Cada aluno tem um livro.|Every time I see you, I smile.=Toda vez que te vejo, sorrio.
same|adj.|mesmo, igual|We have the same shoes.=Temos os mesmos sapatos.|It's the same thing.=É a mesma coisa.|Same to you!=Igualmente!
few|adj.|poucos; (a few) alguns|I have a few friends here.=Tenho alguns amigos aqui.|Few people know this.=Poucas pessoas sabem disso.|Wait a few minutes.=Espere alguns minutos.
play|v.|jogar; tocar; brincar|Do you play soccer?=Você joga futebol?|She plays the piano.=Ela toca piano.|The kids are playing outside.=As crianças estão brincando lá fora.
run|v.|correr; administrar|I run every morning.=Corro toda manhã.|She runs a small business.=Ela administra um pequeno negócio.|We ran out of milk.=Acabou o leite.
small|adj.|pequeno|I live in a small town.=Moro numa cidade pequena.|This shirt is too small.=Esta camisa está pequena demais.|Can I have a small coffee?=Me vê um café pequeno?
number|s.|número|What's your phone number?=Qual é o seu número de telefone?|A large number of people came.=Um grande número de pessoas veio.|Pick a number.=Escolha um número.
off|adv./prep.|desligado; fora; de folga|Turn off the TV.=Desligue a TV.|I'm off tomorrow.=Estou de folga amanhã.|Take off your shoes.=Tire os sapatos.
always|adv.|sempre|I always wake up early.=Sempre acordo cedo.|She is always late.=Ela está sempre atrasada.|I'll always love you.=Sempre vou te amar.
move|v.|mover; mudar(-se)|Don't move!=Não se mexa!|We moved to a new house.=Nos mudamos para uma casa nova.|Can you move your car?=Você pode tirar seu carro?
live|v.|morar, viver|Where do you live?=Onde você mora?|I live with my wife.=Moro com minha esposa.|Live and learn.=Vivendo e aprendendo.
believe|v.|acreditar|I believe you.=Acredito em você.|I can't believe it!=Não acredito!|Do you believe in God?=Você acredita em Deus?
hold|v.|segurar; manter|Hold my hand.=Segure minha mão.|Hold on, please.=Aguarde, por favor.|The meeting will be held on Monday.=A reunião será realizada na segunda.
bring|v.|trazer|Bring your passport.=Traga seu passaporte.|Can I bring a friend?=Posso trazer um amigo?|She brought me flowers.=Ela me trouxe flores.
happen|v.|acontecer|What happened?=O que aconteceu?|Accidents happen.=Acidentes acontecem.|It happened last week.=Aconteceu semana passada.
next|adj.|próximo; ao lado|See you next week.=Até a semana que vem.|Who's next?=Quem é o próximo?|She sat next to me.=Ela sentou ao meu lado.
without|prep.|sem|Coffee without sugar, please.=Café sem açúcar, por favor.|I can't live without you.=Não consigo viver sem você.|He left without saying goodbye.=Ele saiu sem se despedir.
before|prep.|antes|Wash your hands before eating.=Lave as mãos antes de comer.|I've seen this before.=Já vi isso antes.|Call me before 10.=Me ligue antes das 10.
large|adj.|grande|A large pizza, please.=Uma pizza grande, por favor.|They live in a large house.=Eles moram numa casa grande.|Do you have this in large?=Tem este no tamanho G?
million|num.|milhão|The city has two million people.=A cidade tem dois milhões de pessoas.|Thanks a million!=Muitíssimo obrigado!|It cost a million dollars.=Custou um milhão de dólares.
home|s.|casa, lar|I'm going home.=Vou para casa.|Make yourself at home.=Fique à vontade.|There's no place like home.=Não há lugar como o nosso lar.
under|prep.|embaixo de; menos de|The cat is under the bed.=O gato está embaixo da cama.|Children under 12 don't pay.=Crianças com menos de 12 não pagam.|Everything is under control.=Está tudo sob controle.
water|s.|água|Can I have a glass of water?=Pode me dar um copo de água?|Drink more water.=Beba mais água.|The water is cold.=A água está fria.
room|s.|quarto; sala; espaço|My room is small.=Meu quarto é pequeno.|Is there room for one more?=Tem espaço para mais um?|The meeting room is on the second floor.=A sala de reunião fica no segundo andar.
write|v.|escrever|Write your name here.=Escreva seu nome aqui.|She writes books.=Ela escreve livros.|Write to me!=Me escreva!
mother|s.|mãe|My mother is a teacher.=Minha mãe é professora.|Happy Mother's Day!=Feliz Dia das Mães!|She looks like her mother.=Ela se parece com a mãe.
area|s.|área, região|I live in a quiet area.=Moro numa região tranquila.|This is a no-smoking area.=Esta é uma área para não fumantes.|What's your area of work?=Qual é a sua área de trabalho?
money|s.|dinheiro|I don't have money.=Não tenho dinheiro.|Time is money.=Tempo é dinheiro.|How much money do you need?=De quanto dinheiro você precisa?
story|s.|história|Tell me a story.=Me conte uma história.|It's a long story.=É uma longa história.|That's a true story.=É uma história verdadeira.
young|adj.|jovem, novo|She is very young.=Ela é muito jovem.|When I was young, I lived in Bahia.=Quando eu era jovem, morei na Bahia.|You look young!=Você parece jovem!
fact|s.|fato|In fact, I agree.=Na verdade, eu concordo.|That's a fact.=Isso é um fato.|The fact is we need more time.=O fato é que precisamos de mais tempo.
month|s.|mês|I'll travel next month.=Vou viajar no mês que vem.|I pay rent every month.=Pago aluguel todo mês.|She is six months old.=Ela tem seis meses.
lot|s.|(a lot) muito, bastante|Thanks a lot!=Muito obrigado!|I have a lot of work.=Tenho muito trabalho.|She talks a lot.=Ela fala bastante.
right|adj./adv.|certo; direito; logo|You're right.=Você tem razão.|Turn right.=Vire à direita.|I'll be right back.=Volto já.
book|s./v.|livro; reservar|I'm reading a good book.=Estou lendo um bom livro.|I booked a hotel.=Reservei um hotel.|Open your books.=Abram seus livros.
eye|s.|olho|She has blue eyes.=Ela tem olhos azuis.|Close your eyes.=Feche os olhos.|Keep an eye on the kids.=Fique de olho nas crianças.
job|s.|emprego, trabalho|I love my job.=Amo meu trabalho.|She's looking for a job.=Ela está procurando emprego.|Good job!=Bom trabalho!
word|s.|palavra|What does this word mean?=O que esta palavra significa?|I give you my word.=Te dou minha palavra.|In other words…=Em outras palavras…
business|s.|negócio; empresa|She has her own business.=Ela tem seu próprio negócio.|I'm here on business.=Estou aqui a trabalho.|Mind your own business!=Cuide da sua vida!
side|s.|lado|Which side are you on?=De que lado você está?|Sit by my side.=Sente ao meu lado.|On the other side of the street.=Do outro lado da rua.
kind|s./adj.|tipo; gentil|What kind of music do you like?=Que tipo de música você gosta?|You are very kind.=Você é muito gentil.|It's kind of strange.=É meio estranho.
head|s./v.|cabeça; ir em direção|My head hurts.=Minha cabeça dói.|She is the head of the team.=Ela é a chefe da equipe.|Let's head home.=Vamos para casa.
house|s.|casa|They bought a new house.=Eles compraram uma casa nova.|Come to my house.=Venha à minha casa.|The house is empty.=A casa está vazia.
service|s.|serviço; atendimento|The service here is great.=O atendimento aqui é ótimo.|Is service included?=A taxa de serviço está incluída?|Customer service.=Atendimento ao cliente.
friend|s.|amigo, amiga|She is my best friend.=Ela é minha melhor amiga.|I met a friend at the mall.=Encontrei um amigo no shopping.|We are just friends.=Somos só amigos.
father|s.|pai|My father works a lot.=Meu pai trabalha muito.|Happy Father's Day!=Feliz Dia dos Pais!|He's a good father.=Ele é um bom pai.
power|s.|poder; energia|Knowledge is power.=Conhecimento é poder.|There's no power in the building.=Não tem energia no prédio.|The power went out.=Acabou a luz.
hour|s.|hora|I'll be there in an hour.=Chego em uma hora.|I work eight hours a day.=Trabalho oito horas por dia.|It's rush hour.=É hora do rush.
game|s.|jogo, partida|Let's play a game.=Vamos jogar um jogo.|Did you watch the game?=Você viu o jogo?|It's just a game.=É só um jogo.
line|s.|linha; fila|Wait in line, please.=Aguarde na fila, por favor.|Draw a line.=Desenhe uma linha.|The line is busy.=A linha está ocupada.
end|s./v.|fim; terminar|This is the end.=Este é o fim.|The class ends at noon.=A aula termina ao meio-dia.|In the end, it worked.=No fim, deu certo.
member|s.|membro, sócio|She is a member of the club.=Ela é sócia do clube.|Every family member came.=Todos os membros da família vieram.|Are you a member?=Você é membro?
law|s.|lei; direito|It's against the law.=É contra a lei.|She studies law.=Ela estuda direito.|Nobody is above the law.=Ninguém está acima da lei.
car|s.|carro|I go to work by car.=Vou trabalhar de carro.|Whose car is this?=De quem é este carro?|Park the car here.=Estacione o carro aqui.
city|s.|cidade|I love this city.=Amo esta cidade.|What city are you from?=De que cidade você é?|The city center is busy.=O centro da cidade está movimentado.
name|s.|nome|What's your name?=Qual é o seu nome?|I forgot his name.=Esqueci o nome dele.|Write your full name.=Escreva seu nome completo.
team|s.|time, equipe|Which team do you support?=Para qual time você torce?|We work as a team.=Trabalhamos em equipe.|Our team won!=Nosso time ganhou!
minute|s.|minuto|Wait a minute.=Espere um minuto.|I'll be there in five minutes.=Chego em cinco minutos.|Do you have a minute?=Você tem um minutinho?
idea|s.|ideia|That's a great idea!=Essa é uma ótima ideia!|I have no idea.=Não faço ideia.|Whose idea was it?=De quem foi a ideia?
body|s.|corpo|Exercise is good for your body.=Exercício faz bem ao corpo.|My whole body hurts.=Meu corpo inteiro dói.|Listen to your body.=Escute seu corpo.
`);
