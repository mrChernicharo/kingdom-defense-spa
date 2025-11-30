import { persist } from "zustand/middleware";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { appLog, customLogger } from "./store.helper";
import type { PlayerSkillCard, SkillCard } from "./types";

export type AppState = {
    currentLevel: number;
    player: {
        skillCards: Record<string, PlayerSkillCard>;
    };
    incrementCurrentLevel: () => void;
    resetCurrentLevel: () => void;
    addSkillCard: (skillCard: SkillCard) => void;
    resetSkillCards: () => void;

    // deep: { nested: { name: string } };
    // setDeepNestedName: (newName: string) => void;
};

export const useStore = create<AppState>()(
    customLogger(
        persist(
            immer((set) => ({
                currentLevel: 0,
                player: {
                    skillCards: {},
                },
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
                        if (!state.player.skillCards[skillCard.name]) {
                            state.player.skillCards[skillCard.name] = { ...skillCard, quantity: 0 };
                        }
                        state.player.skillCards[skillCard.name].quantity++;
                    });
                },
                resetSkillCards: () => {
                    appLog("store/resetSkillCards", "lightgreen");
                    set((state) => {
                        state.player.skillCards = {};
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
