# Gavarnie

_[Read the announcement](https://soubiran.dev/posts/introducing-gavarnie-launch-your-saas-with-nuxt-and-assurance)_

Preconfigured and ready-to-use features designed to help you kickstart your full-stack NuxtHub project **quickly**.

> [!NOTE]
> My aim with Gavarnie is not just to create another starter kit, but to contribute to the initiative of advancing Nuxt and NuxtHub.
> Therefore, Gavarnie serves as a starting point, rather than an end, and it's up to us to foster its development. Please join me in enhancing it.

[⛰️ Gavarnie in action](https://gavarnie.barbapapazes.com)

Crafted with [Nuxt UI Pro](https://ui.nuxt.com/pro), [NuxtHub](https://hub.nuxt.com), [Nuxt Auth Utils](https://github.com/atinux/nuxt-auth-utils), and [Nuxt Security](https://nuxt.com/modules/security).

[![Deploy to NuxtHub](https://hub.nuxt.com/button.svg)](https://hub.nuxt.com/new?template=gavarnie)

## Features

- 🎨 **Nuxt UI**: Design stunning and responsive user interfaces swiftly with Nuxt UI
- 💻 **NuxtHub**: Access an extensive array of full-stack capabilities with NuxtHub
- 🔑 **Nuxt Auth Utils**: Simplified social authentication using Nuxt Auth Utils, seamlessly integrated with NuxtHub
- 🚪 **Login & Signup**: Comes with built-in login and signup pages
- 🧑 **Profile**: Ready-to-use profile page, with email modification and account removal options.

## Setup

Ensure to install the dependencies:

```bash
pnpm install
```

Next, set up a `.env` file based on the `.env.example` template. Modify the values as necessary.

## Development Server

Launch the development server at `http://localhost:3000`:

```bash
pnpm run dev
```

## Production

This application is intended for deployment on [Cloudflare](https://cloudflare.com). You can effortlessly utilize [NuxtHub Admin](https://hub.nuxt.com/docs/getting-started/deploy#nuxthub-admin) for a smooth deployment process or use the CLI:

```bash
npx nuxthub deploy
```

You will also need a [Nuxt UI Pro License](https://ui.nuxt.com/pro) to build the application for production.

## License

[MIT License](./LICENSE)
