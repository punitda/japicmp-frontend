# Japicmp Report Generator

[Website](https://japicmp-report.vercel.app/)

Generate Source and Binary compatibility reports between two java/android library versions. Check report before update to newer version of the library. So, you can update it without worrying about the breaking the app.

To know more about what is source and binary compatiblity, you can read [this](https://zsmb.co/maintaining-compatibility-in-kotlin-libraries/) blogpost.

## Local Development

Create `.env` file with following config:

```bash
SERVER_BASE_URL=http://localhost:8080
```

> Note: Make sure you're running BE web server on port 8080

From your terminal:

```sh
npm ci
npm run dev
```

## Tech Stack

- [Remix](https://remix.run/)
- [React](https://remix.run/)
- [TailwindCss](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)

## Deployment

It is deployed on [Vercel](https://vercel.com/)
