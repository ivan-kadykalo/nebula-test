import { IQuiz, SlideType } from "@/types/quiz";
import { IUserAnswer } from "@/store/quizSlice";

interface Options {
  quiz: IQuiz;
  response: IUserAnswer[];
}

export const parseQuizResults = (options: Options) => {
  const { quiz, response } = options;

  // TODO: Refactor data parsing

  return response.map((item) => {
    const { questionSlug, answerSlug } = item;

    const currentSlide = quiz.slides.find(
      (slide) => slide.slug === questionSlug,
    )!;

    const questionTitle = currentSlide.title;

    const answerLabel =
      currentSlide.type === SlideType.SingleChoiceQuestion
        ? currentSlide.answers.find((answer) => answer.slug === answerSlug)!
            .label
        : answerSlug;

    return {
      question: questionTitle,
      answer: answerLabel,
    };
  });
};
