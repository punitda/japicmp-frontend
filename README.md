# Japicmp Report Generator

[Website](https://japicmp-report.vercel.app/)

Generate Source and Binary compatibility reports between two java/android library versions. Check report before updating to a newer version of the library in your project. So, you can update it without worrying about breaking the app 😄

To know more about what is source and binary compatiblity, you can read the following blog posts:

- [Source, Binary and backward compatibility to rule them all](https://proandroiddev.com/source-binary-and-backward-compatibility-rule-them-all-61d3d358582e)
- [Maintaining compatibility in Kotlin libraries](https://zsmb.co/maintaining-compatibility-in-kotlin-libraries/)

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

## Deployment

It is deployed on [Vercel](https://vercel.com/)

## Tech Stack

- [Remix](https://remix.run/)
- [React](https://remix.run/)
- [TailwindCss](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)

## License

[MIT License](./LICENSE)
