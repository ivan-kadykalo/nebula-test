"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { IQuiz, SlideType } from "@/types/quiz";

interface Props {
  quiz: IQuiz;
}

export const ResultData = (props: Props) => {
  const { quiz } = props;
  const response = useSelector((state: RootState) => state.quiz.answers);

  const responseArray = Object.entries(response).map(([key, value]) => ({
    questionSlug: key,
    answerSlug: value,
  }));

  const parsedData = responseArray.map((item) => {
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

  return (
    <div>
      {parsedData.map((item, index) => (
        <div key={index} className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">{item.question}</h3>
          <p className="text-sm text-muted-foreground">{item.answer}</p>
        </div>
      ))}
    </div>
  );
};
