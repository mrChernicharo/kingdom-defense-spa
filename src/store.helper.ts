/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StateCreator, StoreMutatorIdentifier } from "zustand";

export function appLog(log: string, color: string, extra?: any) {
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

export const customLogger: CustomLogger = (config) => (set, get, api) => {
    // Helper to filter out functions from state
    const getStateWithoutFunctions = () => {
        const state = get() as Record<string, unknown>;
        return Object.fromEntries(Object.entries(state).filter(([, value]) => typeof value !== "function"));
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
