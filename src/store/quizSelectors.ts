import { RootState } from "@/store/store";
import { getInitialQuizState } from "@/store/quizSlice";

/** Wrapper around selectors to get exact quiz state **/
export const selectQuizState = (state: RootState, quizSlug: string) =>
  state.quiz[quizSlug] ?? getInitialQuizState();

/** Factory to create quiz field selectors **/
const makeQuizFieldSelector =
  <T extends keyof ReturnType<typeof getInitialQuizState>>(field: T) =>
  (quizSlug: string) =>
  (state: RootState) =>
    selectQuizState(state, quizSlug)[field];

export const selectCurrentSlideSlug = makeQuizFieldSelector("currentSlideSlug");
export const selectIsCompleted = makeQuizFieldSelector("isCompleted");
export const selectHistory = makeQuizFieldSelector("history");
export const selectAnswers = makeQuizFieldSelector("answers");
export const selectDraftAnswers = makeQuizFieldSelector("draftAnswers");
