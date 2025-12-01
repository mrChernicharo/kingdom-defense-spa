import { persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { appLog, customLogger } from "./store.helper";
import type { PlayerSkillCard, SkillCard } from "./types";

export type AppState = {
    currentLevel: number;
    skillCards: Record<string, PlayerSkillCard>;
    gold: number;
    gems: number;
    xp: number;
    incrementCurrentLevel: () => void;
    resetCurrentLevel: () => void;
    addSkillCard: (skillCard: SkillCard) => void;
    resetSkillCards: () => void;
    addGold: (amount: number) => void;
    addGems: (amount: number) => void;
    addXp: (amount: number) => void;

    // deep: { nested: { name: string } };
    // setDeepNestedName: (newName: string) => void;
};

export const useStore = create<AppState>()(
    customLogger(
        persist(
            immer((set) => ({
                currentLevel: 0,
                gold: 0,
                gems: 0,
                xp: 0,
                skillCards: {},
                incrementCurrentLevel: () => {
                    appLog("store/incrementCurrentLevel", "lightgreen");
                    set((state) => {
                        state.currentLevel++;
                    });
                },
                resetCurrentLevel: () => {
                    appLog("store/resetCurrentLevel", "lightgreen");
                    set({ currentLevel: 0 });
                },
                addSkillCard: (skillCard) => {
                    appLog("store/addSkillCard", "lightgreen", { skillCard });
                    set((state) => {
                        if (!state.skillCards[skillCard.name]) {
                            state.skillCards[skillCard.name] = { ...skillCard, quantity: 0 };
                        }
                        state.skillCards[skillCard.name].quantity++;
                    });
                },
                resetSkillCards: () => {
                    appLog("store/resetSkillCards", "lightgreen");
                    set((state) => {
                        state.skillCards = {};
                    });
                },
                addGold: (amount) => {
                    appLog("store/addGold", "lightgreen", { amount });
                    set((state) => {
                        state.gold += amount;
                    });
                },
                addGems: (amount) => {
                    appLog("store/addGems", "lightgreen", { amount });
                    set((state) => {
                        state.gems += amount;
                    });
                },
                addXp: (amount) => {
                    appLog("store/addXp", "lightgreen", { amount });
                    set((state) => {
                        state.xp += amount;
                    });
                },
            })),
            { name: "app-store" }
        )
    )
);

// export const currentLevel = useStore((state) => state.currentLevel);
// export const incrementCurrentLevel = useStore((state) => state.incrementCurrentLevel);
// export const resetCurrentLevel = useStore((state) => state.resetCurrentLevel);
