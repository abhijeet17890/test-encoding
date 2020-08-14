## Providers design rules:

1. Don't use providers inside other providers\
   this will quickly make the code unmaintainable nightmare.\
   Providers should have their own, clearly defined responsibility
2. Consumers are created by applying react hooks use pattern:
   ```javascript
   const [state, setState] = React.useState();
   ```
   so, generic provider use case should look like this:
   ```javascript
   const [providerState, actionsToChangeProviderState] = useProvider();
   ```

## How to build a Provider from scratch?

We're creating 2 react contexts for one provider, to make possible using them separately.\
The thought behind that is "dispatch" could be used\
in totally different place than the effect of that dispatch will be consumed\
eg. click on a button in the header can have an effect in changing other component somewhere else\
it's a measure to prevent unnecessary re-renders

```javascript
const ProviderStateContext = React.createContext({});
const ProviderDispatchContext = React.createContext({});
```

Good to have method like that to be able to restore to initial state when needed

```javascript
function getInitialProviderState() {
  return { valueOne: 0, valueTwo: 0 };
}
```

Provider basically works somehow like a OOP class:

- it exposes it's state
- it exposes "public" methods to change it's state

```javascript
export default function Provider({ children }) {
  const [providerState, providerSetState] = React.useState(getInitialProviderState());

  // Normally Provider is placed in the top level of the application,
  // so it's good idea to memoize as much as possible
  const setValueOne = React.useCallback(
    value => {
      providerSetState(state => ({ ...state, valueOne: value }));
    },
    [providerSetState]
  );

  const setValueTwo = React.useCallback(
    value => {
      providerSetState(state => ({ ...state, valueTwo: value }));
    },
    [providerSetState]
  );

  const resetProviderState = React.useCallback(() => {
    providerSetState(getInitialProviderState());
  }, [providerSetState]);

  return (
    // putting dispatch context one level higher, because it'll change less often
    <ProviderDispatchContext.Provider value={{ setValueOne, setValueTwo, resetProviderState }}>
      <ProviderStateContext.Provider value={providerState}>
        {children}
      </ProviderStateContext.Provider>
    </ProviderDispatchContext.Provider>
  );
}
```

## How to 'install' the provider to use in the application?

```javascript
function App() {
  return (
    <Provider>
      <ComponentOne />
      <ComponentTwo />
      <ComponentThree />
    </Provider>
  );
}
```

## How to create Provider consumer?

We can create some hooks which will make life easier

```javascript
// used in Example 1
function useProviderState() {
  return React.useContext(ProviderStateContext);
}

// used in Example 2.
function useProviderDispatch() {
  return React.useContext(ProviderDispatchContext);
}

// And there's double version which will allow us to use both state & dispatch in the same component
// used in Example 3.
function useProvider() {
  const providerState = React.useContext(ProviderStateContext);
  const providerDispatch = React.useContext(ProviderDispatchContext);

  return [providerState, providerDispatch];
}
```

## Examples

### Example 1.

```javascript
function ComponentOne() {
  const providerState = useProviderState();

  return (
    <div>
      <div>Value One: {providerState.valueOne}</div>
      <div>Value Two: {providerState.valueTwo}</div>
    </div>
  );
}
```

### Example 2.

```javascript
function ComponentTwo() {
  const providerDispatch = useProviderDispatch();

  return (
    <div>
      <button onClick={() => providerDispatch.setValueOne("new value one")}>
        Change Value One
      </button>
      <button onClick={() => providerDispatch.setValueTwo("new value two")}>
        Change Value Two
      </button>
      <button onClick={() => providerDispatch.resetProviderState()}>Reset</button>
    </div>
  );
}
```

### Example 3.

```javascript
function ComponentThree() {
  const [providerState, providerDispatch] = useProvider();

  return (
    <div>
      <div>Value One: {providerState.valueOne}</div>
      <div>Value Two: {providerState.valueTwo}</div>
      <button onClick={() => providerDispatch.setValueOne("new value one")}>
        Change Value One
      </button>
      <button onClick={() => providerDispatch.setValueTwo("new value two")}>
        Change Value Two
      </button>
      <button onClick={() => providerDispatch.resetProviderState()}>Reset</button>
    </div>
  );
}
```

## Useful links

Most, if not all concepts were applied from this series of blogposts:

- https://kentcdodds.com/blog/how-to-use-react-context-effectively
- https://kentcdodds.com/blog/application-state-management-with-react
- https://kentcdodds.com/blog/how-to-optimize-your-context-value
- https://kentcdodds.com/blog/usememo-and-usecallback
