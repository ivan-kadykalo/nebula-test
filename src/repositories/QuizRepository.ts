import type { IQuiz } from "@/types/quiz";

interface IQuizInfo {
  slug: string;
  name: string;
}

export interface QuizRepository {
  getQuizzesList(): Promise<IQuizInfo[]>;
  getQuizBySlug(slug: string): Promise<IQuiz | null>;
}
