# Gossip!

Gossip is my project for a social network website, written in React.js with Typescript and styled with Tailwind. Among the core highlights of this project are:

- Dynamic styling with TailwindCSS to make colors and font-sizes across the page easy to change.
- Reusable Components using design patterns (i.e: Compound components) and SOLID principles.
- Internationalization with react-i18next.
- Validated forms with react-hook-form and yup.
- Formatting and linting with Prettier and eslint.
- Bundled with vite
- and more!

## How to install

### Env files

Make sure you have at least a .env.local file with the API URL (see .env )

### Local

To run this project first install the dependencies:

```
  npm install
```

Then run the following script to create a build:

```
  npm run build
```

And you can run the project:

```
  npm run preview
```

Additionally, you can run development mode with:

```
  npm run dev
```

### Docker

Since this is prepared for Production, make sure you have set up the .env.production file with the correct endpoint of the API, otherwise it won't work. Then you can install this project using:

```
  docker-compose up
```

Make sure you have Docker engine running (or Docker-desktop if you're using that)

## Mock User Data

Since the API currently doesn't support Authentication you can test the endpoints with the user in [src/mockData.ts](src/mockData.ts).
Feel free to make any changes to that user object.

## i18n internationalization

This project uses react-i18next for internationalization support, with translation files organized in a nested JSON structure.

### Translation Structure

Translation files are located in [public/locales/](public/locales/) with separate folders for each language (currently `en` and `es`). Each language has a `translation.json` file organized with namespaces to group related translations, the structure of each namespace is the following:

- `labels`: labels for simple text like titles, field names and placeholders.
- `actions`: for specific actions, as in a button or a menu option.
- `copy`: longer text used for subtitles, explanations or API messages.
- `validation`: validation messages.
- `error`: general error translations

### The i18n:scan Script

The `npm run i18n:scan` script uses i18next-scanner to automatically scan your source code for translation keys. It searches through all TypeScript and TSX files in the [src/](src/) directory looking for translation function calls like `t()`, `i18n.t()`, or `i18next.t()`.

When the scanner finds a translation key in your code that doesn't exist in the translation files, it automatically adds it with the placeholder value `"__NOT_TRANSLATED__"`. This makes it easy to identify which translations need to be added or updated.
