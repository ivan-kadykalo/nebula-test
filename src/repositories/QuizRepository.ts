import { Quiz } from "@/types/quiz";

export interface QuizRepository {
  getAllQuizzesSlugs(): Promise<string[]>;
  getQuizBySlug(slug: string): Promise<Quiz | null>;
}
