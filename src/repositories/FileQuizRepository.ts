import fs from "fs";
import path from "path";

import type { IQuiz } from "@/types/quiz";
import { QuizRepository } from "@/repositories/QuizRepository";

const quizzesDir = path.join(process.cwd(), "src/data/quizzes");

export function getAllQuizzes() {
  const files = fs
    .readdirSync(quizzesDir)
    .filter((file) => file.endsWith(".json"));

  return files.map((file) => {
    const filePath = path.join(quizzesDir, file);
    const data = fs.readFileSync(filePath, "utf-8");

    return JSON.parse(data);
  });
}

export class FileQuizRepository implements QuizRepository {
  private quizzes: IQuiz[];

  constructor() {
    this.quizzes = getAllQuizzes() as IQuiz[];
  }

  async getAllQuizzesSlugs() {
    return this.quizzes.map((quiz) => quiz.slug);
  }

  async getQuizBySlug(slug: string) {
    return this.quizzes.find((q) => q.slug === slug) || null;
  }
}
