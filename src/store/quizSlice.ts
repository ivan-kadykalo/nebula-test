import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  answers: Record<string, string>;
  currentSlideSlug: string | null;
  history: string[];
};

const initialState: State = {
  answers: {},
  currentSlideSlug: null,
  history: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswer(
      state,
      action: PayloadAction<{
        questionSlug: string;
        answerSlug: string;
      }>,
    ) {
      state.answers[action.payload.questionSlug] = action.payload.answerSlug;
    },
    goNext: (state, action: PayloadAction<string>) => {
      state.currentSlideSlug = action.payload;
    },
    addScreenToHistory: (state, action: PayloadAction<string>) => {
      state.history.push(action.payload);
    },
    goBack: (state) => {
      const prev = state.history.pop();

      if (prev) {
        state.currentSlideSlug = prev;
      }
    },
  },
});

export const { setAnswer, goNext, addScreenToHistory, goBack } =
  quizSlice.actions;
export const quizReducer = quizSlice.reducer;
