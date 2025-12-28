# vite-treeshakable-library <a href="https://npm.im/@kouts/vite-treeshakable-library"><img src="https://badgen.net/npm/v/@kouts/vite-treeshakable-library"></a> ![](coverage/badge.svg)

This repository provides a [Vite](https://vite.dev/) template for creating JavaScript libraries optimized for tree-shaking. While it is pre-configured to support [Vue 3](https://vuejs.org/) and [Tailwind CSS](https://tailwindcss.com/), it is flexible enough to be adapted for React, vanilla JavaScript, or other frameworks. The goal of this template is to simplify the process of building, documenting, testing, and publishing modern libraries to [npm](https://www.npmjs.com/).

## Features

- **Vite-Powered Development:**
  - Fast development and optimized builds.
  - Pre-configured for tree-shaking to reduce bundle sizes.
- **TypeScript Support:**
  - TypeScript setup for type safety and better developer experience.
  - Emits TypeScript declaration files for strong type support.  
- **Component Library Support:**
  - Out-of-the-box support for Vue 3 components and utilities.
  - Includes example components such as `VAlert`.
- **Tailwind CSS Integration:**
  - Includes Tailwind theme and custom styles for shared design tokens and utility classes.
- **Storybook Integration:**
  - Documentation and components preview via [Storybook](https://storybook.js.org/).
  - Storybook deployment to GitHub Pages.
  - Visual regression testing with Playwright for Storybook stories.
- **Playground Environment:**
  - A playground setup for testing and previewing your components in isolation.
- **Path Aliases:**
  - Simplify imports with path aliases for library development.
- **Testing:**
  - Unit testing with [Vitest](https://vitest.dev/).
  - Starting with 100% test coverage.
- **Code Quality:**
  - Pre-configured [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).
  - [Lint-staged](https://github.com/lint-staged/lint-staged) and [Husky](https://typicode.github.io/husky/) for pre-commit hooks.
- **Automated Releases:**
  - [Semantic-release](https://github.com/semantic-release/semantic-release) and GitHub Actions to automate versioning and `npm` publishing.

---

## Getting Started

### Clone the Repository

Clone the repository using `degit`:

```bash
npx degit @kouts/vite-treeshakable-library my-library
```

### Rename the Library

The template uses the name `vite-treeshakable-library` in various files and also `Vite treeshakable library` as the title. Replace this with your desired library name:

1. Update `name` and other relevant fields in `package.json`.
2. Replace occurrences of `vite-treeshakable-library` in:
   - `README.md`
   - `vite.config.ts`
   - Any other relevant files.

This ensures your library is correctly identified during builds and deployment.

### Install Dependencies

```bash
pnpm install
```

### Playground

The template includes a **playground** for testing and previewing your components in an isolated environment. To launch the playground:

```bash
pnpm run dev
```

The playground can be found in the `playground` directory. Add pages or components there to test them independently before integrating them into the library.

### Building the Library

To build the library for production and check the output files in the `dist` directory:

```bash
pnpm run build
```

### Storybook

Run Storybook for interactive component development:

```bash
pnpm run storybook
```

Visit the Storybook UI at `http://localhost:6006`.

To deploy Storybook to GitHub Pages, this template includes a pre-configured GitHub Actions workflow. Simply push your changes to the `main` branch, and the workflow will:

1. Build the Storybook static files.
2. Deploy the `storybook-static` directory to GitHub Pages automatically.

No manual steps are needed to deploy Storybook.

### Adding Components

It is recommended to co-locate components with their tests and stories for better organization. Components are located in the `lib/components` directory.  
To add a new component:

1. Create a new component file e.g. `lib/components/{component-name}/{component-name}.vue`
2. Add unit tests in the corresponding `lib/components/{component-name}/{component-name}.spec.ts` file.
3. Create Storybook stories for the component under `lib/components/{component-name}/{component-name}.stories.ts`.
4. Export your component in `lib/components/index.ts`.

### Vite Configuration / Tree-Shaking

In `vite.config.ts`, the `build.lib.entry` option defines the entry points for the library. The `createEntries` function dynamically generates an entry point for each file in the `lib/` directory (such as `.ts` and `.vue` files), allowing Rollup to split them into separate chunks. This approach ensures effective tree-shaking by including *only* the used code in the final bundle. It also excludes unnecessary files, such as tests or Storybook stories, avoiding the creation of redundant chunks and optimizing the output. This method offers greater flexibility and control over the chunking process compared to using `output.preserveModules`. For more details, see the [Rollup documentation](https://rollupjs.org/configuration-options/#input).

### Tailwind Theme and Styles

This library uses [Tailwind CSS v4](https://tailwindcss.com/), which introduces a CSS-first configuration approach using the `@theme` directive.

The library's design tokens (colors, fonts, etc.) are defined in `lib/assets/lib.css` using the `@theme` directive. This file can also include any custom utility classes or component styles:

```css
@theme {
  --color-midnight: #1e293b;
  --color-ocean: #0ea5e9;
  /* ... more tokens */
}
```

This CSS file is automatically bundled and exported as `@kouts/vite-treeshakable-library/assets/lib.css`. Consumer projects import this CSS to access the library's theme tokens, custom utility classes, and component styles.

To use the library's Tailwind theme and styles in a consumer project:

1. Install Tailwind CSS v4 and its Vite plugin:
```bash
pnpm i -D tailwindcss @tailwindcss/vite
```

2. Add the Tailwind plugin to your `vite.config.ts`:
```ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

3. Import the library's styles in your project's main CSS file:
```css
@import 'tailwindcss';
@import '@kouts/vite-treeshakable-library/assets/lib.css';
```

This gives your project access to the library's theme tokens (e.g., `bg-midnight`, `text-ocean`), custom utility classes, and component styles.

---

## Using Path Aliases

This template supports path aliases for cleaner imports. When building the project, path aliases will get replaced with relative paths (using [resolve-tspaths](https://github.com/benyap/resolve-tspaths)) so that the resulting code can be consumed correctly without any errors.  
The aliases are configured in the following files:

- **`vite.config.ts`:**
  ```ts
  resolve: {
    alias: {
      '@': resolve(__dirname, 'playground'),
      '@lib': resolve(__dirname, 'lib'),
      '@assets': resolve(__dirname, 'playground/assets'),
    },
  },
  ```

- **`tsconfig.json` and `tsconfig.lib.json`:**
  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["playground/*"],
        "@lib/*": ["lib/*"],
        "@assets/*": ["playground/assets/*"]
      }
    }
  }
  ```

Use these aliases in your code to simplify imports, e.g., `import { VAlert } from '@lib/components'`.

---

## TypeScript Declaration Files

The build process emits TypeScript declaration files to ensure strong type support. These files are generated into the `dist` directory during the build step. Ensure your components and utilities are properly typed for better developer experience.

To build and emit the TypeScript declaration files, run:

```bash
pnpm run build
```

Verify the `dist/lib/index.d.ts` file for the declarations.

---

## Using the Template for other Frameworks

To adapt this template for frameworks like React or vanilla JavaScript:

1. Replace Vue-specific dependencies with those for your framework.
2. Update `vite.config.ts` and other configuration files as needed.
3. Modify the example components and utilities to match your framework.

---

## Publishing Your Library

This repository uses **semantic-release** for automated `npm` publishing with [Trusted Publishers](https://docs.npmjs.com/trusted-publishers) (OIDC authentication). This eliminates the need for long-lived npm tokens, providing enhanced security through short-lived, workflow-specific credentials.

### Setting Up Trusted Publishing

1. Navigate to your package settings on [npmjs.com](https://www.npmjs.com/) and find the "Trusted Publisher" section.
2. Select "GitHub Actions" as your provider.
3. Configure the following fields:
   - **Organization or user**: Your GitHub username or organization name
   - **Repository**: Your repository name
   - **Workflow filename**: `release.yml` (or your release workflow filename)
   - **Environment name** (optional): If using GitHub environments for deployment protection

For more details, refer to the [npm Trusted Publishers documentation](https://docs.npmjs.com/trusted-publishers).

### Release Process

Follow these steps for a seamless release:

1. Ensure all changes are committed using **conventional commit messages**:
   - Example commit message: `feat: add new button component`
   - For guidance, refer to the [Conventional Commits](https://www.conventionalcommits.org/) specification.

2. Push your changes to the `main` branch. The GitHub Actions workflow will:
   - Run tests and validate your code.
   - Determine the next version based on your commit messages.
   - Publish the package to npm automatically using OIDC authentication.
   - Generate provenance attestations for your package.
   - Update the changelog and create a GitHub release.

3. Monitor the Actions tab in your repository to ensure the release completes successfully.

**Note:** Ensure your GitHub Actions workflow includes the `id-token: write` permission, which is required for OIDC token generation. Refer to the [semantic-release documentation](https://semantic-release.gitbook.io/semantic-release/) for more information.

---

## Contributing

Contributions are welcome! Please ensure that your code adheres to the following:

- **Conventional Commits:** Use conventional commit messages for versioning and changelog generation.
- **Testing:** Add tests for all new components and features.
- **Code Style:** Run `pnpm run lint-fix` before committing.

---

## Feedback

If you find this template useful or have suggestions for improvement, feel free to open an issue or submit a pull request.


---

> Use the following boilerplate for the README.md file of your library.

# README boilerplate

The [Vite treeshakable library](https://github.com/kouts/vite-treeshakable-library) is a comprehensive suite of feature-rich UI components and utilities.

The library is built using [Vue 3](https://vuejs.org/) and [Tailwind CSS](https://tailwindcss.com/) and is designed to be used in Vue 3 projects.
[Vite](https://vitejs.dev/) is used as the build tool for the library and [Storybook](https://storybook.js.org/) is used for component development and documentation.

## Installation and Usage

Install the package and its dependencies using `pnpm`:

```bash
pnpm i vue @kouts/vite-treeshakable-library
```

Install Tailwind CSS v4 and its Vite plugin:

```bash
pnpm i -D tailwindcss @tailwindcss/vite
```

Add the Tailwind plugin to your `vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

Import Tailwind and the library's styles in your project's `main.css` file:

```css
@import 'tailwindcss';
@import '@kouts/vite-treeshakable-library/assets/lib.css';
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
