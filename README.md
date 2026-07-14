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
