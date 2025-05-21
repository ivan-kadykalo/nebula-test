import { FileQuizRepository } from "@/repositories/FileQuizRepository";

/** Можна переключитись на іншу реалізацію в майбутньому, наприклад запит в DB **/
export const quizRepository = new FileQuizRepository();
