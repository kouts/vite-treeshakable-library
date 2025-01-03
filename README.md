# vite-treeshakable-library <a href="https://npm.im/@kouts/vite-treeshakable-library"><img src="https://badgen.net/npm/v/@kouts/vite-treeshakable-library"></a> ![](coverage/badge.svg)

The [Vite treeshakable library](https://github.com/kouts/vite-treeshakable-library) is a comprehensive suite of feature-rich UI components and utilities.

The library is built using [Vue 3](https://vuejs.org/) and [Tailwind CSS](https://tailwindcss.com/) and is designed to be used in Vue 3 projects.
[Vite](https://vitejs.dev/) is used as the build tool for the library and [Storybook](https://storybook.js.org/) is used for component development and documentation.

## Installation and Usage

Install the package and its dependencies using `pnpm`:

```bash
pnpm i vue @kouts/vite-treeshakable-library
```

Install Tailwind CSS:

```bash
pnpm i -D tailwindcss
```

Import the CSS to your project's `main.css` file:

```css
@import '@kouts/vite-treeshakable-library/assets/lib.css';
```

Add the "Inter" font to your project's `index.html` file:

```html
<link rel="preconnect" href="https://rsms.me/" /><link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
```

Use the Tailwind configuration as a `preset` in your project's `tailwind.config.js` file:

```js
import { libTailwindConfig } from '@kouts/vite-treeshakable-library';

export default {
  presets: [libTailwindConfig],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,mdx}',
    './node_modules/@kouts/vite-treeshakable-library/dist/**/*.{vue,js,ts,jsx,tsx,mdx}',
  ],
};
```

Import and use the components you need in your Vue 3 project:

```html
<template>
  <VAlert type="success">This is a success alert</VAlert>
</template>

<script setup lang="ts">
  import { VAlert } from '@kouts/vite-treeshakable-library';
</script>
```

If you are using Jest for unit testing in your consumer project, you will need to add the following to your Jest configuration:

```js
{
  moduleNameMapper: {
    '^@kouts/vite-treeshakable-library$': '<rootDir>/node_modules/@kouts/vite-treeshakable-library/dist/cjs',
  }
}
```

## Contributing

---

:fire: **HEADS UP!** This repo uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) and [semantic-release](https://github.com/semantic-release/semantic-release) to automate the whole package release workflow including: determining the next version number, generating the release notes, and publishing the package to npm.  
Commit messages have to follow the commit message format when contributing.

---

When adding a new component to the library, please make sure to add unit tests and Storybook stories for it.  
We strive to maintain a high level of code quality and test coverage in this project.

## Project setup for development

This project uses [pnpm](https://pnpm.io/) as the package manager.

### Install dependencies

```bash
pnpm install
```

### Start the dev server

```bash
pnpm run dev
```

### Run Storybook

```bash
pnpm run storybook
```

### Run Storybook tests

```bash
pnpm run test-storybook
```

## Run unit tests

```bash
pnpm run test:unit
```

## Run unit tests and generate coverage report

```bash
pnpm run test:unit-coverage
```

### Lint files

```bash
pnpm run lint
```

### Lint and fix files

```bash
pnpm run lint-fix
```

### Run Typechecks

```bash
pnpm run typecheck
```
