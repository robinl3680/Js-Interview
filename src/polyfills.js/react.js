let myStateArray = [];
let renderIndex;
const myCustomStateHook = (initialState) => {
  let currentIndex = renderIndex++;
  const [, rerender] = useReducer(() => ({}));

  const forceUpdate = () => {
    currentIndex = 0;
    rerender({});
  };

  if (myStateArray[currentIndex]) {
    return myStateArray[currentIndex];
  }

  function setState(newState) {
    if (typeof newState === "function") {
      myStateArray[currentIndex].state = newState(
        myStateArray[currentIndex].state
      );
    } else {
      myStateArray[currentIndex].state = newState;
    }
    forceUpdate();
  }

  const currentState = { state: initialState, setState };

  myStateArray[currentIndex] = currentState;

  return [
    myStateArray[currentIndex].state,
    myStateArray[currentIndex].setState,
  ];
};

const WrapperComponent = (CB) => {
  renderIndex = 0;
  return CB;
};

const MyComponent = WrapperComponent(() => {
  renderIndex = 0;
  let [count, setCount] = myCustomStateHook(0);
  let [name, setName] = myCustomStateHook("John Doe");
  let [age, setAge] = myCustomStateHook(30);
  console.log(count, name, age);
  setCount(count + 1);
  setName("Jane Doe");
  setAge(35);
  setTimeout(() => {
    setCount(count + 5);
    setName("Jane");
    setAge(45);
  }, 2000);
});

MyComponent();
setTimeout(() => {
  MyComponent();
}, 1000);

setTimeout(() => {
  MyComponent();
}, 3000);

const myCustomUseEffectHook = (callback, dependencies) => {
  const firstRender = useRef(true);
  const depRef = useRef([]);
  if (firstRender.current) {
    firstRender.current = false;
    const cleanup = callback();
    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }
  if (JSON.stringify(depRef.current) !== JSON.stringify(dependencies)) {
    const cleanup = callback();
    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }
  if (!dependencies) {
    const cleanup = callback();
    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }
  depRef.current = dependencies ?? [];
};

const myCustomUseCallbackHook = (callback, dependencies) => {
  const savedRef = useRef({ callback, dependencies });
  if (
    !savedRef.current.dependencies ||
    JSON.stringify(savedRef.current.dependencies) !==
      JSON.stringify(dependencies)
  ) {
    savedRef.current.callback = callback;
    savedRef.current.dependencies = dependencies;
  }
  return savedRef.current.callback;
};

const myCustomUseRefHook = (initialValue) => {};
