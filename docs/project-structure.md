## Project structure

### Naming conventions

in Code, All folder, file names will follow camelCasing,
Except react component names, component names will always PascalCase, (in which several words are joined together, and the first letter of every word is capitalized)

### Folders structure

Folders inside `src` directory follow a convention:

<application-name> (eg. webapp)\
| _components_/ (building blocks for views, it doesn't matter if they are stateless or stateful)\
| _views_/ (includes the views that can be found in the application)\
|---- RandomView/ (views use "component per folder" structure)\
|-------- index.js (index file containts base)\
|-------- index.spec.js (contains component test)\
|-------- index.css (contains custom styles)\
| _App.js_ (entry point of the application)\
| _index.ejs_ (template file used by webpack to build index.html)\

### | _routes.js_ (contains client side routes - used by NavProvider)\ in development

### Preferred ordering of imports

Each group should be divided by a newline

1. third party dependencies (installed through npm)
2. shared dependencies
3. specific app level dependencies
4. local imports

### Providers

Providers are used for different purposes, but their main task is to keep shared state in the application.
They are more flexible than redux state so that, they can change their behavior entirely in the application runtime.
Simplest use case for provider/consumer hook pair is dependency injection (see use of NavProvider).
Currently there are 7 providers in the project:

- _ApiProvider_ - acts like an api client, can be used in authenticated and public API scenarios,
  api methods are passed through "createEndpoints" factory function
- _AuthProvider_ - it keeps authenticated user state and exposes methods such as "signIn", "resetPassword", etc.
- _CacheProvider_ - does what normally redux state would do, it acts like a in memory cache for the application,
  keeps business related data (dashboard, connectors list, etc.). It's dumb in a way that it doesn't
  handle data fetching part
- _ErrorProvider_ - keeps track of global application errors, it's use should be extended in the future
- _I18nProvider_ - cares about internationalization state in the application
- _NavProvider_ - acts as a simple DI for routes and navigation related things
  (as Routes can change dynamically during application runtime, the same applies for routes)
- _ThemeProvider_ - takes care about visuals

### Styling

We try to write as little custom styles as possible
We try to reuse components, dumb reusable components can be found in `shared/components`.
Shared components are styled using "native" MaterialUI jss approach.
Custom styles are usually styled using `styled-components`.
Custom styles are preferably located in `styles.js` file.
Styles in `styles.js` are usually used like that:

In `styles.js`

```javascript
export const CustomComponent = styled.div`
  // custom styles here
`;
```

In `index.js`

```javascript
   import * as S from "./styles";


   // in the component
   <S.CustomComponent>{...}</S.CustomComponent>
```

The reason is that we don't want to use `className` (thanks to `styled-components` we don't have to),
but we want to know while reading JSX where this component came from,
so if it starts with "S" it's clear that it's for styling

### Component complexity lifecycle

General rule - try to keep related things together and local state local\
For example: reducer for specific component could be declared in the same file\
custom style could be declared in the same file (when there)\
helper function used in the component could be declared in the same file.

1. We start with `React.useState`.
2. When we have a few `useState`'s we can move to `useReducer`.
3. When the reducer grows too big - we can create a custom hook dedicated for this component,
   which could be unit tested even in separation from the component.
4. Custom component hooks follow the same interface as providers.

```javascript
const [customState, actionsToChangeCustomState] = useCustomHook();
```

### Other rules

1. Try to keep folder structure flat
2. Try to minimize number of files created
3. Try to keep things easy to remove
4. Don't care that much about DRY
5. YAGNI applies
6. Every view in the application should be able to load itself directly by the URL in the address bar
   (eg. connector view)
7. Prefered way of reusing react code are hooks (not higher order components)

### Things that should be improved in the project

1. Common components consistency
2. CSS architecture, with more holistic RWD aproach
3. Remove inline react inline styles
4. More tests
