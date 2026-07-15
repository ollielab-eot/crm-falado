# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.16.2 create --template minimal --types ts --install npm .
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Configuração Turso

Para persistir os cards salvos pela API experimental em um banco Turso:

1. Crie um banco de dados Turso para o projeto.
2. Defina `TURSO_DATABASE_URL` no seu arquivo `.env` local.
3. Defina `TURSO_AUTH_TOKEN` no seu arquivo `.env` local.
4. Rode manualmente a migration `migrations/001_init.sql` no banco Turso.
5. Inicie o app em desenvolvimento:

```sh
npm run dev
```

Não inclua valores reais de secrets no repositório.

## Configuração IA

Para gerar previews reais de cards CRM por IA na rota `/new`, defina a variável `OPENAI_API_KEY` no arquivo `.env` local antes de iniciar o app.

```sh
OPENAI_API_KEY=
```

Não inclua valores reais de secrets no repositório. Se a chave não estiver configurada ou a IA estiver indisponível, a tela `/new` usa o fallback local `mockExtractCRM` para manter o fluxo de preview funcionando.

## Transcrição de áudio

A tela `/new` permite enviar um arquivo de áudio curto para transcrição server-side com a OpenAI API antes de gerar o preview do card CRM. Para usar esse fluxo, defina `OPENAI_API_KEY` no arquivo `.env` local; a chave é lida apenas no servidor e não deve ser exposta no frontend.

Formatos aceitos no MVP:

- mp3
- wav
- m4a
- webm
- mp4

O endpoint `/api/transcribe` recebe `FormData` com o campo `audio` e limita o upload a 20 MB. O áudio não é gravado em disco, não é salvo no Turso e serve apenas para retornar o texto transcrito que pode ser usado no fluxo existente de extração CRM.

## Gravação no navegador

A tela `/new` também permite gravar uma nota de voz curta diretamente no navegador com as APIs nativas `navigator.mediaDevices.getUserMedia` e `MediaRecorder`. O usuário precisa conceder permissão de microfone quando o navegador solicitar; se a permissão for negada ou o navegador não suportar `MediaRecorder`, a interface mostra uma mensagem amigável e mantém as entradas por upload de áudio e texto manual funcionando.

Depois de parar a gravação, o app gera um arquivo `webm` em memória para reprodução local e para envio ao fluxo existente de transcrição em `/api/transcribe`. O áudio gravado é enviado apenas para transcrição, não é armazenado no Turso, não é salvo em disco e ainda não usa Cloudflare R2.

Fluxo local sugerido:

```sh
npm install
npm run dev
```

1. Garanta `OPENAI_API_KEY` no `.env` para transcrição e extração por IA.
2. Garanta `TURSO_DATABASE_URL` e `TURSO_AUTH_TOKEN` no `.env` para salvar no CRM.
3. Acesse `/new`, clique em “Iniciar gravação”, permita o microfone, grave uma nota curta, clique em “Parar gravação” e depois em “Transcrever gravação”.
4. Confirme que o textarea foi preenchido, clique em “Gerar preview do card” e então em “Salvar no CRM”.
