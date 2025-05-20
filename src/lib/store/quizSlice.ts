import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = {
  answers: Record<string, string>;
};

const initialState: State = {
  answers: {},
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswer(state, action: PayloadAction<{ question: string; answer: string }>) {
      state.answers[action.payload.question] = action.payload.answer;
    },
  },
});

export const { setAnswer } = quizSlice.actions;
export const quizReducer = quizSlice.reducer;
