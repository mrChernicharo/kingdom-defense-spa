import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

type BearState = {
  bears: number;
  deep: { nested: { name: string } };
  increasePopulation: () => void;
  removeAllBears: () => void;
  setDeepNestedName: (newName: string) => void;
};

const useBear = create<BearState>()(
  devtools(
    immer((set) => ({
      bears: 0,
      deep: { nested: { name: "Default" } },
      increasePopulation: () =>
        set(
          (state) => ({ bears: state.bears + 1 }),
          undefined,
          "bears/increasePopulation"
        ),
      removeAllBears: () =>
        set({ bears: 0 }, undefined, "bears/removeAllBears"),

      // **** WITHOUT IMMER ****
      // setDeepNestedName: (newName: string) =>
      //   set((state) => ({
      //     ...state,
      //     deep: {
      //       ...state.deep,
      //       nested: { ...state.deep.nested, name: newName },
      //     },
      //   })),

      // **** WITH IMMER ****
      setDeepNestedName: (newName: string) =>
        set(
          (state) => {
            state.deep.nested.name = newName;
          },
          undefined,
          "bears/setDeepNestedName"
        ),
    }))
  )
);

function App() {
  const bears = useBear((state) => state.bears);
  const name = useBear((state) => state.deep.nested.name);
  const increasePopulation = useBear((state) => state.increasePopulation);
  const removeAllBears = useBear((state) => state.removeAllBears);
  const setDeepNestedName = useBear((state) => state.setDeepNestedName);

  return (
    <div>
      <img src={reactLogo} />
      <img src={viteLogo} />

      <output>{name}</output>
      <br />
      <input
        type="text"
        value={name}
        onChange={(ev) => setDeepNestedName(ev.target.value)}
      />
      <br />
      <output>{bears}</output>
      <br />

      <button onClick={increasePopulation}>increase</button>
      <button onClick={removeAllBears}>reset</button>
    </div>
  );
}

export default App;
