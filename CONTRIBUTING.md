# Contributing

First off, thank you for taking the time to contribute to Vime ❤️

This document will guide you on how to go from zero to PR!

## 💭 Knowledge

### TypeScript

It's important to note early on that this project is written with 
[TypeScript](https://www.typescriptlang.org/). If you're unfamiliar with it or any strongly typed 
languages such as Java then this may be a slight roadblock. However, there's never a truly perfect 
time to start learning it, so ... why not today! You can always reach out on our Discord if 
you get stuck.

### Stencil

This project relies on [Stencil](https://stenciljs.com) to build and distribute 
[Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). As a contributor 
you don't really need to worry about much other then how to simply 
[build components](https://stenciljs.com/docs/decorators). If you're already familiar with 
ES6 classes, decorators and JSX then this will all be a walk in the park. There's really not much 
more to it. You can always refer to existing components in Vime to see how to accomplish certain 
tasks.

## 🎒 Getting Started

### Install

Let's setup our machine. The only software you'll need to install is:

- [node](https://nodejs.org/en/download/)
- [git](https://git-scm.com/downloads)
- [pnpm](https://pnpm.js.org/en/installation)

They're very easy to install, just follow the links and you should be up and running in no time.

### Fork + Clone

Now we need to fork and clone the repository, install all the projects dependencies, and create 
a seperate branch to work on our feature/fix. We can name the branch by the 
[issue](https://github.com/vime-js/vime/issues) number on GitHub such as `issue-64`. It's always 
best to create an issue before submitting a PR. If you haven't, then you can simply name the branch 
whatever you want, no wrong answers here.

Head over to the [Vime repository](https://github.com/vime-js/vime) on GitHub and click the `Fork`
button in the top right corner. After the project has been forked, run the following commands in 
your terminal:

```bash
$: git clone https://github.com/{my-github-username}/vime

$: cd vime

# Ignore all the warnings.
$: pnpm install

$: git checkout -b {issue-64}
```

The first install may take a little while due to some larger development dependencies such as 
Cypress and Jest. Thanks to pnpm this will take no time on subsequent installations.

Now it'll help if we keep our `master` branch pointing at the original repository and you make pull 
requests from branches on your fork.

```bash
# Add the original repository as a "remote" called "upstream".
$: git remote add upstream git@github.com:vime-js/vime.git

# Fetch the git information from the remote. 
$: git fetch upstream

# Set your local master branch to use the upstream master branch whenver you run `git pull`.
$: git branch --set-upstream-to=upstream/master master

# Run this when we want to update our version of master.
$: git pull
```

### Structure

The project is setup in a monorepo-esque fashion, in which multiple packages are stored under 
the `packages` directory. All your work will mainly take place in the `core` package so we can 
simply `cd` into it.

```bash
$: cd packages/core
```

The only directory from here that really matters is the `src` directory which contains all 
the source code for Vime. Inside it you'll find:

- `utils`: This directory contains utility functions used throughout Vime.
- `globals`: This directory contains code that is shared/applied to all components.
- `components/core`: This directory contains components the are the heart of Vime such as the `Player`.
- `components/plugins`: This directory contains components that add completely new functionality to 
the Vime player such as the Chromecast plugin.
- `components/providers`: This directory contains the components that are responsible for loading
and controlling media players such as YouTube, Vimeo etc.
- `components/ui`: This directory contains user interface (UI) components such as controls or captions.

### Scripts

```bash
# Example of how to run a script.
$: npm run serve
```

- `build`: This script will generate/update any new component documentation.
- `serve`: This script will boot the development environment at `http://localhost:3333`.
- `test:unit.watch`: This script will run all unit tests, and watch for file changes to re-run.
- `cy:open`: This script will launch the Cypress GUI for performing E2E testing.
- `generate:provider`: This script will create a new media provider.

## 🖌️ Code Style

### TypeScript + TSX

This project relies on [ESLint](https://eslint.org) for formatting/styling TypeScript and TSX 
code. We use the [`eslint-config-airbnb-typescript`](https://www.npmjs.com/package/eslint-config-airbnb-typescript)
preset which contains a pretty comprehensive set of linting rules, so you don't need to think about 
formatting your code, as long as your editor is setup to catch and auto-fix linting errors. 
Alternatively, you can run the `lint` script from the root of the project.

In regards to naming variables:

- Use descriptive names so anyone can understand what it stores or does.
- Prefer `is`, `has`, `can`, and `should` prefixes for booleans (`isActive`). 
- Name props/attributes as short and descriptive as possible, and don't use any prefixes for booleans.
- Prefer the negated version for boolean props/attributes, so instead of 
`showHighlight` use `hideHighlight`.

### CSS

This project utilizes both CSS and [SCSS](https://sass-lang.com). You can create either file per 
component depending on the complexity of your styling needs.

There are no styling or formatting rules, simply refer to other files to maintain some
consistency, and don't use any naming conventions such as BEM. Make sure to scope each file by 
always referring to the root component selector first in any CSS declaration. 

For example, if we have a slider component we could create some styles like so:

```scss
vime-slider {
  // ...

  // vime-slider.active
  &.active {
    // ...
  }

  // vime-slider .child
  & .child {
    // ...
  }
}
```

## 🧰 Core

At the root of Vime we always have the `vime-player` component which maintains the current 
state of the player and keeps plugins, providers and UI components in sync. Properties are passed 
down from the player to update child components through Wormholes (exactly 
like `React.ContextProvider`), and updates are sent to the player via the `vStateChange` custom 
event. The event simply contains the property to update and its new value (`paused, false`). Any 
"special" properties that require calling a method on the provider are watched and called 
automatically. For example, updating the `currentTime` property would require calling the provider's 
`setCurrentTime` method.

It's important to note that changes don't happen immediately but rather asynchronously. The player 
maintains its own queue for processing all state changes, so as updates comes through the 
`vStateChange` event, they are processed and queued to happen in the next render cycle.

There are only two simple functions that matter when creating a new Vime component and interacting
with the player. Let's go through them one at a time.

The `openPlayerWormhole` function simply behaves as `Context.Consumer` in React. It enables properties 
to be passed down from the player directly to components, bypassing any parent components in the 
tree. You can refer to existing Vime components to see its usage (scroll down to the bottom of 
any component file).

The `createPlayerStateDispatcher` function creates an event dispatcher to send updates to the 
player through the `vStateChange` event. The dispatcher is typed to simply take in a player property 
that can be written to, and its new value. You can refer to existing Vime components to see its usage.

## 🎥 Providers

Providers are responsible for loading players/media and controlling it. For example, the YouTube
provider sets up the YouTube player embed and loads a video through it. All providers implement the 
`MediaProvider` interface which ensures some properties and the `getAdapter` method are 
defined. The `getAdapter` method returns an object implementing the  `MediaProviderAdapter` interface,
which is simply a set of functions that enable the root player to update the state of the provider 
such as playing/pausing media, or setting the current time of playback.

Let's pretend we're creating a new provider for Twitch, the steps will generally go as follows:

1. Make sure we're in the root of the `core` package directory.
2. Run the following script `npm run generate:provider` and pass in the name `Twitch`.
3. Go to `src/components/providers/twitch`.
4. Create interfaces for the parameters, commands, events and messages that the Twitch embed 
takes and fires. Make sure everything is documented, most the time it's simply copy and pasting from 
the provider's documentation. Always refer to existing providers for some guidance.
5. Setup the properties that we will expose on the component to set player parameters.
6. The Twitch player is loaded in an `<iframe>` so we'll need to setup the `Embed` component.

From here onwards it's best to refer to existing providers as a guide and slowly implement each 
method you see. Don't forget to emit the `vLoadStart` event when new media is loading, and to
finalize the `getAdapter` method.

As we're building out our provider we'll want to see and test the player in the browser. There's 
already a file setup to do this. Go to `tests/providers.html` and add the provider just like the 
others have already been done so. You can serve the dev environment `npm run serve`, and select 
the file through the explorer to begin interacting with it in the browser.

When it comes to running automated E2E tests on the provider we can head over to 
`cypress/tests/providers` and add our provider just like the others have already been done so. Launch
the Cypress testing environment `npm run cy:open`, and run the test file we just created. A few 
tests are a little flaky, re-run if you're sure something should pass. At the minimum, the test 
harness should give you a good idea of everything your provider should be able to perform.

After we wrap up all our testing and we're satisfied, the final steps are:

1. Run the build script `npm run build`.
2. Add documentation and usage example to the auto-generated `readme.md` file in the provider 
directory. Make sure to add it above the `<-- Auto Generated Below -->` comment.
3. Add the new provider component to [`VimeModule`](./packages/angular/src/vime-module.ts) in the 
`@vime/angular` package.
5. Commit your changes `git commit -m 'feat(core/providers): add twitch provider'`
6. Create a PR!

## 🖥️ UI Components

UI components are visually displayed elements inside the media player that may be interactable 
such as a playback control, slider etc. The [Core](#-core) section above describes mostly what 
you need to know to create a UI component, and you can refer to existing components to guide you.

When creating new components you need to be aware of if it'll be displayed in an audio or video 
player. Hide/show and position it accordingly, and if it's inside a video player then be aware of 
the `z-index` and `pointer-events` css properties of any elements that are positioned absolutely, 
such as a container that stretches out the entire video player. We don't want to block other 
components and consume click events, preventing other components from being interacted with. Open
the `src/globals/variables.scss` file, and go to the `Z-Index` section to see existing z-index levels. 

If you're creating any CSS variables then make sure to document them (see existing components on 
how to do so), and set it's value inside `src/globals/theme.css`. If the component has a light 
theme, set the variable values inside the `vime-player[theme="light"]` block as well.

UI components can be structurally, visually, unit or E2E tested. All UI test files are located 
either in the `tests` directory next to the component or in `cypress/tests/ui`.

- Structural tests inform us on whether what's rendered in the DOM is correct. We can use Jest 
snapshots to get the structure of the component's DOM tree and validate it.
- Visual tests are a manual test in which we validate the correctness of the component by seeing,
and interacting with it directly in the browser. You can create a `index.html` file in the `tests` 
directory of the component, and visit it by serving the development environment `npm run serve`, 
and navigating to the file through the explorer. If it's part of the default UI then see 
`tests/ui.html` in the root of the `core` package.
- Unit tests enable us to test specific state changes and their outcomes, such as the changing of a 
component property. Create the `component.spec.ts` file in the `tests` directory of the components,
and refer to existing tests to guide you here. For some additional context, review the 
[Stencil unit testing guide](https://stenciljs.com/docs/unit-testing).
- E2E tests allow us to behave as the end user, and see if components interact with each other 
correctly in a real world scenario. These are performed with Cypress. Refer to existing tests 
in the `cypress/tests/ui` directory to guide you.

> TIP: You can press "p" when running unit tests with Jest to filter which tests are run.

After we wrap up all our testing and we're satisfied, the final steps are:

1. Run the build script `npm run build`.
2. Add documentation and usage example to the auto-generated `readme.md` file in the provider 
directory. Make sure to add it above the `<-- Auto Generated Below -->` comment.
3. Add the new provider component to [`VimeModule`](./packages/angular/src/vime-module.ts) in the 
`@vime/angular` package.
5. Commit your changes `git commit -m 'feat(core/ui): add {component name}'`
6. Create a PR!

## 📖 Documentation

There is component API documentation, and the documentation website that guides developers on how to 
install and use Vime. 

The API docs are auto-generated `readme.md` files that reside in each 
component's respective directory. You can create and update them by running the `npm run build` 
command from the `packages/core` directory.

The documentation website is created with [Docusaurus](https://v2.docusaurus.io) and can be found 
at `packages/docs`. The [Docusaurus guide](https://v2.docusaurus.io/docs/creating-pages) will teach 
you everything you need to know on how to write documentation for Vime.

## ✍️ Commit 

We commit our changes by running `git commit -m 'commit message'`.

This project uses [semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) 
to automate package releases. Simply refer to the link, and also see existing commits to get an 
idea of how to write your message.

If possible, rebase your commits into a single commit for the feature or fix you're implementing. 
For an interactive rebase you can run the command `git rebase -i HEAD~10`, where `10` refers to the 
number of commits you'd like to rebase. See the commit history by running `git log`.

## 🎉 Pull Request

When you're all done, push your changes up to GitHub and head over to the 
[Vime repository](https://github.com/vime-js/vime). To create a pull request, click the big 
green `Compare & Pull Request` button that should appear after you've pushed your changes.

Don't expect your PR to be accepted immediately or even accepted at all. Give the community time 
to vet it and see if it should be merged into Vime. One of the following events will happen:

1. You listen to feedback/reviews and make the necessary changes for it to be approved.
2. The changes are rejected by the community and you can try to understand why, or ask more questions 
to clarify.
3. Your changes are approved and merged into Vime.

Please don't be disheartened if it's not accepted. Your contribution is appreciated more then you can 
imagine, and even a failed PR can teach us a lot ❤️
