# 🇬🇧 Trilha Fluente — inglês do iniciante ao fluente

App (web + Android) com a trilha completa de estudo de inglês, organizada pelos níveis do Quadro Europeu (CEFR):

| Nível | Nome | O que você estuda |
|---|---|---|
| A1 | Iniciante | cumprimentos, números, to be, pronomes, artigos, simple present, can, horas, present continuous |
| A2 | Básico | passado (regular/irregular), futuro (going to / will), comparativos, some/any, modais, e-mails |
| B1 | Intermediário | present perfect, past continuous, condicionais 1 e 2, passiva, relative clauses, phrasal verbs, reported speech |
| B2 | Intermediário avançado | present perfect continuous, past perfect, 3º condicional, modais de dedução, wish, conectores, collocations |
| C1 | Avançado | inversão, cleft sentences, idioms, linguagem formal, participle clauses, marcadores de conversa |
| C2 | Fluente | registro e gírias, phrasal verbs avançados, ironia, precisão, escrita argumentativa, sotaques, inglês de negócios |

## O que tem

- **60 assuntos** com explicação em português, exemplos com áudio e **360 exercícios** corrigidos na hora
  (múltipla escolha e completar). Um assunto é concluído com 60% de acerto.
- **“Eu consigo…”**: metas práticas por nível para você marcar quando conseguir.
- **Extras por nível**: músicas, filmes, séries, podcasts e livros com uma tarefa de estudo para cada um,
  e **10 textos de leitura** escritos para o app com áudio, glossário e perguntas de compreensão.
- **Vocabulário**: **1.002 palavras** em ordem de frequência (das mais usadas para as menos), divididas em 10 níveis,
  cada uma com significado e **3 frases de exemplo traduzidas** e com áudio. Modos **Lista** (com busca),
  **Flashcards** e **Quiz**.
- **Evolução**: progresso por nível e até o fluente, XP, meta diária, sequência de dias 🔥 e mapa de constância.
  Um nível é concluído com 80% (assuntos + eu consigo + extras + leituras + vocabulário do nível).
- Tema claro (padrão) ou escuro, velocidade da voz e lembrete diário (no app Android).

Todo o progresso fica salvo **no próprio aparelho**. Em **Evolução → Configurações** há **backup** (no Android abre o
“Compartilhar” para salvar no Google Drive, WhatsApp, e-mail…) e **restauração**, que também serve para levar o
progresso do navegador para o app e vice-versa.

## Baixar o APK (Android)

**Link direto:** https://github.com/guilherme29gomes-rgb/Alimentacaoeagua/releases/download/app/TrilhaFluente.apk

O GitHub Actions gera um APK novo a cada atualização no branch principal (mesmo link). As versões novas
instalam por cima sem perder o progresso.

## Rodar no computador

```bash
python3 -m http.server 8000   # abra http://localhost:8000
```

Compilar o APK localmente (Node 20+, JDK 17, Android SDK):

```bash
npm install
npm run android:add && npm run android:icons && npm run android:apk
```

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `data/levels-*.js` | Trilha: níveis, assuntos, lições e exercícios |
| `data/extras.js` | Músicas, filmes, séries, podcasts, livros e textos de leitura |
| `data/vocab-*.js` | Vocabulário por frequência (`palavra\|classe\|significado\|exemplo=tradução…`) |
| `app.js`, `index.html`, `styles.css` | O aplicativo |
| `.github/workflows/android-apk.yml` | Gera e publica o APK |

> O app sugere músicas, filmes e livros, mas não reproduz letras nem obras: os botões abrem uma busca
> para você encontrar onde ouvir/assistir/ler.
