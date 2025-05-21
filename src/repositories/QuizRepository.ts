import type { IQuiz } from "@/types/quiz";

export interface QuizRepository {
  getAllQuizzesSlugs(): Promise<string[]>;
  getQuizBySlug(slug: string): Promise<IQuiz | null>;
}
