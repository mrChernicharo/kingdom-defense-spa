/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { create } from "zustand";
import type { StateCreator, StoreMutatorIdentifier } from "zustand";
import { immer } from "zustand/middleware/immer";

function appLog(log: string, color: string, extra?: any) {
  console.log(`%c${log}`, `color: ${color}`, extra ? extra : "");
}

// Custom logger middleware
type CustomLogger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  config: StateCreator<T, Mps, Mcs>
) => StateCreator<T, Mps, Mcs>;

const customLogger: CustomLogger = (config) => (set, get, api) => {
  // Helper to filter out functions from state
  const getStateWithoutFunctions = () => {
    const state = get() as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(state).filter(([, value]) => typeof value !== "function")
    );
  };

  return config(
    ((...args: any[]) => {
      appLog("  [Before]", "lightblue", getStateWithoutFunctions());
      (set as any)(...args);
      appLog("  [After]", "lightblue", getStateWithoutFunctions());
    }) as any,
    get,
    api
  );
};

type BearState = {
  bears: number;
  deep: { nested: { name: string } };
  increasePopulation: () => void;
  removeAllBears: () => void;
  setDeepNestedName: (newName: string) => void;
};

const useStore = create<BearState>()(
  customLogger(
    immer((set) => ({
      bears: 0,
      deep: { nested: { name: "Default" } },
      increasePopulation: () => {
        appLog("store/increasePopulation", "lightgreen");
        set((state: BearState) => ({ bears: state.bears + 1 }));
      },
      removeAllBears: () => {
        appLog("store/removeAllBears", "lightgreen");
        set({ bears: 0 });
      },
      // **** WITH IMMER ****
      setDeepNestedName: (newName: string) => {
        appLog("store/setDeepNestedName", "lightgreen", { newName });
        set((state: BearState) => {
          state.deep.nested.name = newName;
        });
      },
    }))
  )
);

function App() {
  const bears = useStore((state) => state.bears);
  const name = useStore((state) => state.deep.nested.name);
  const increasePopulation = useStore((state) => state.increasePopulation);
  const removeAllBears = useStore((state) => state.removeAllBears);
  const setDeepNestedName = useStore((state) => state.setDeepNestedName);

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
