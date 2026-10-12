# 💧 HidraFit — Água + Nutrição para ganho de massa magra

Aplicativo (PWA) que:

- **Calcula sua meta diária de água** pelo peso, altura e idade (35 ml/kg; 30 ml/kg acima de 55 anos; peso ajustado pela altura quando o IMC está alto) e soma **+500 ml por hora de treino** nos dias de treino.
- **Monitora o quanto você bebeu**: anel de progresso, botões rápidos (+200/+300/+500 ml ou valor livre), indicador de ritmo ("você está 300 ml atrás"), comemoração ao bater a meta e sequência de dias 🔥.
- **Cria avisos**: lembretes para beber água (intervalo automático pela meta ou fixo) e no horário de cada refeição.
- **Funciona como nutricionista para ganhar músculo sem muita gordura**:
  - pergunta gênero, idade, peso, altura, como é seu dia a dia, horários (acordar, dormir, almoço, jantar), dias/horário/duração do treino e preferências (vegetariano, vegano, sem lactose, alimentos que não quer);
  - calcula calorias (Mifflin-St Jeor × nível de atividade + gasto do treino + superávit de 10% ou 15%), proteína (2,0 g/kg homens, 1,8 g/kg mulheres), gordura (~0,9 g/kg) e carboidrato;
  - **monta os horários das refeições** pela sua rotina (café, lanches a cada ~3 h, almoço, jantar, ceia, pré e pós-treino);
  - **monta o cardápio com quantidades em gramas** para bater as metas, com botão "Trocar opção" e variação a cada dia;
  - mais carboidrato nos dias de treino, menos nos de descanso (o botão no topo alterna o tipo do dia).
- **Contador de proteína**: cada alimento é confirmado individualmente; o que passou do horário fica *pendente*.
- **Trocar alimento no dia** (✏️): comeu carne em vez de frango? Troque pelo que comeu — mais de 80 alimentos com a
  proteína de cada um, quantidade equivalente sugerida, ou digite um alimento qualquer. Também dá para registrar algo a mais.
- **Tema claro ou escuro** (Perfil → Aparência). O padrão é claro.
- **Progresso**: gráfico de água e refeições dos últimos 7 dias, registro de peso com análise do ritmo de ganho (ajusta as metas automaticamente).

Todos os dados ficam salvos **apenas no seu aparelho** (localStorage). Há opção de exportar backup.

## Como usar

Não precisa instalar nada nem compilar. Sirva a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

Ou publique no **GitHub Pages** (Settings → Pages → branch → pasta raiz) e abra o link no celular.
No celular, use **"Adicionar à tela inicial"** para instalar como aplicativo (funciona offline).

## 📱 APK para Android

O app é empacotado com [Capacitor](https://capacitorjs.com). No APK os lembretes são **notificações nativas agendadas**
(água e refeições para os próximos 5 dias, renovadas sempre que você abre o app), então chegam **mesmo com o app fechado**.

### Baixar o APK

**Link direto:** https://github.com/guilherme29gomes-rgb/Alimentacaoeagua/releases/download/apk/HidraFit.apk

(É atualizado automaticamente a cada nova versão no branch principal.)

### Ou pelo GitHub Actions

A cada push, o workflow **"Gerar APK Android"** compila o app:

1. Abra a aba **Actions** do repositório → clique na execução mais recente de "Gerar APK Android".
2. Em **Artifacts**, baixe **HidraFit-apk** (é um .zip com o `HidraFit.apk` dentro).
3. No celular, abra o `HidraFit.apk` e permita "instalar apps de fontes desconhecidas".
4. Ao abrir, vá em **Perfil → Ativar notificações**.

Dica: em alguns celulares (Xiaomi, Samsung, Motorola) é bom desativar a "otimização de bateria" do HidraFit para os avisos
saírem no horário exato.

O APK é assinado sempre com a mesma chave (`android-signing/debug.keystore`), então versões novas instalam por cima sem
apagar seus dados. Para publicar na Play Store é preciso gerar uma chave de release própria e um `.aab`.

### Compilar no seu computador

Requer Node 20+, JDK 17 e Android SDK (Android Studio):

```bash
npm install
npm run android:add     # cria a pasta android/ (só na primeira vez)
npm run android:icons   # gera os ícones a partir de assets/
npm run android:apk     # APK em android/app/build/outputs/apk/debug/
```

Ou `npx cap open android` para abrir no Android Studio.

### Sobre as notificações (versão web)

Toque em **Perfil → Ativar notificações**. Os avisos são disparados enquanto o app estiver aberto ou em segundo plano
(como app instalado). Navegadores podem pausar abas fechadas por completo; se quiser avisos garantidos com o app
fechado, o próximo passo é empacotar como app nativo (ex.: Capacitor) com notificações locais agendadas.

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Telas: cadastro (4 passos), Água, Alimentação, Progresso, Perfil |
| `app.js` | Cálculos, banco de alimentos, montagem do cardápio, lembretes |
| `styles.css` | Visual (modo claro/escuro automático) |
| `sw.js` | Service worker: offline + notificações |
| `manifest.webmanifest`, `icon.svg` | Instalação como app |
| `capacitor.config.json`, `package.json` | Empacotamento Android (Capacitor) |
| `assets/` | Imagens de origem do ícone e da tela de abertura |
| `.github/workflows/android-apk.yml` | Gera o APK automaticamente |

> ⚠️ As recomendações são gerais, baseadas em fórmulas científicas. Não substituem a avaliação de um nutricionista ou médico.
