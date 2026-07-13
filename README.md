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
