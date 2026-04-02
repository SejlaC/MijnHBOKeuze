import { create } from "zustand";

type Step = "start" | "quiz" | "results";

type QuizState = {
  step: Step;
  currentQuestion: number;
  scores: Record<string, number>;

  startQuiz: () => void;
  answer: (scores: Record<string, number>) => void;
  reset: () => void;
};

export const useQuizStore = create<QuizState>((set) => ({
  step: "start",
  currentQuestion: 0,
  scores: {},

  startQuiz: () => set({ step: "quiz" }),

  answer: (incomingScores) =>
    set((state) => {
      const newScores = { ...state.scores };

      Object.entries(incomingScores).forEach(([key, value]) => {
        newScores[key] = (newScores[key] || 0) + value;
      });

      return {
        scores: newScores,
        currentQuestion: state.currentQuestion + 1,
      };
    }),

  reset: () =>
    set({
      step: "start",
      currentQuestion: 0,
      scores: {},
    }),
}));