import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserAnswer {
  questionSlug: string;
  answerSlug: string;
}

type QuizState = {
  answers: IUserAnswer[];
  draftAnswers: Record<string, string>;
  history: string[];
  currentSlideSlug: string | null;
  isCompleted: boolean;
};

type State = {
  /** Separate quiz state per quiz slug **/
  [quizSlug: string]: QuizState;
};

export const getInitialQuizState = (): QuizState => ({
  answers: [],
  isCompleted: false,
  draftAnswers: {},
  history: [],
  currentSlideSlug: null,
});

function ensureQuizState(state: State, quizSlug: string): QuizState {
  if (!state[quizSlug]) {
    state[quizSlug] = getInitialQuizState();
  }
  return state[quizSlug];
}

const initialState: State = {};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswer(
      state,
      action: PayloadAction<{
        quizSlug: string;
        questionSlug: string;
        answerSlug: string;
      }>,
    ) {
      const { quizSlug, questionSlug, answerSlug } = action.payload;
      const quizState = ensureQuizState(state, quizSlug);

      /** Add answers to the final state, for result page **/
      quizState.answers.push({ questionSlug, answerSlug });
      /** Add answers to the draft state, for history while navigating through quiz **/
      quizState.draftAnswers[questionSlug] = answerSlug;
    },
    goNext(
      state,
      action: PayloadAction<{ quizSlug: string; nextSlideSlug: string }>,
    ) {
      const { quizSlug, nextSlideSlug } = action.payload;
      const quizState = ensureQuizState(state, quizSlug);

      quizState.currentSlideSlug = nextSlideSlug;
    },
    goBack(state, action: PayloadAction<{ quizSlug: string }>) {
      const { quizSlug } = action.payload;
      const quizState = ensureQuizState(state, quizSlug);

      /** Remove last answer from final state to avoid duplication **/
      quizState.answers.pop();
      quizState.currentSlideSlug = quizState.history.pop() || null;
    },
    addScreenToHistory(
      state,
      action: PayloadAction<{ quizSlug: string; slideSlug: string }>,
    ) {
      const { quizSlug, slideSlug } = action.payload;
      const quizState = ensureQuizState(state, quizSlug);

      quizState.history.push(slideSlug);
    },
    completeQuiz(state, action: PayloadAction<{ quizSlug: string }>) {
      const { quizSlug } = action.payload;
      const quizState = ensureQuizState(state, quizSlug);

      quizState.isCompleted = true;

      /** Partially reset state, for result screen (store only answers and status) **/
      const initialState = getInitialQuizState();
      quizState.currentSlideSlug = initialState.currentSlideSlug;
      quizState.draftAnswers = initialState.draftAnswers;
      quizState.history = initialState.history;
    },
    resetQuiz(state, action: PayloadAction<{ quizSlug: string }>) {
      const { quizSlug } = action.payload;

      state[quizSlug] = getInitialQuizState();
    },
  },
});

export const {
  setAnswer,
  goNext,
  addScreenToHistory,
  goBack,
  completeQuiz,
  resetQuiz,
} = quizSlice.actions;
export const quizReducer = quizSlice.reducer;
