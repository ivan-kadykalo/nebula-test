import { IQuiz, SlideType } from "@/types/quiz";
import { IUserAnswer } from "@/store/quizSlice";
import { logError } from "@/utils/logger";

interface Options {
  quiz: IQuiz;
  response: IUserAnswer[];
}

export interface ParsedQuizResult {
  question: string;
  answer: string;
}

export const parseQuizResults = (options: Options): ParsedQuizResult[] => {
  const { quiz, response } = options;

  return response.map((item) => {
    const { questionSlug, answerSlug } = item;
    const currentSlide = quiz.slides.find(
      (slide) => slide.slug === questionSlug,
    );

    if (!currentSlide) {
      logError(`Slide not found for slug: ${questionSlug}`);

      return {
        question: questionSlug,
        answer: answerSlug,
      };
    }

    const questionTitle = currentSlide.title || questionSlug;
    let answerLabel: string;

    if (currentSlide.type === SlideType.SingleChoiceQuestion) {
      const answerObj = currentSlide.answers?.find(
        (answer) => answer.slug === answerSlug,
      );

      if (!answerObj) {
        logError(`Answer not found for slug: ${answerSlug}`);
        answerLabel = answerSlug;
      } else {
        answerLabel = answerObj.label;
      }
    } else {
      answerLabel = answerSlug;
    }

    return {
      question: questionTitle,
      answer: answerLabel,
    };
  });
};
