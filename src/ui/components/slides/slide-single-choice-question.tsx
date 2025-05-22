"use client";

import type { ISlideSingleChoice } from "@/types/quiz";
import { Button } from "@/ui/components/button";
import { selectDraftAnswers } from "@/store/quizSelectors";
import { useSelector } from "react-redux";
import type { AnswerOptions } from "@/ui/components/screen-content";

interface Props {
  quizSlug: string;
  slideInfo: ISlideSingleChoice;
  onClick: (options: AnswerOptions) => void;
}

export const SlideSingleChoiceQuestion = (props: Props) => {
  const { quizSlug, slideInfo, onClick } = props;
  const { slug: questionSlug, title, answers, note, nextSlideSlug } = slideInfo;

  const userAnswers = useSelector(selectDraftAnswers(quizSlug));
  const currentAnswerSlug = userAnswers[questionSlug];

  return (
    <div className="space-y-8 w-full">
      <h1 className="text-2xl font-bold text-center">{title}</h1>

      {note && (
        <p className="text-md text-gray-500 text-center">
          This is a placeholder for the Single Choice screen.
        </p>
      )}

      <div className="space-y-3 w-full">
        {answers.map((answer) => {
          const handleButtonClick = () => {
            onClick({
              currentSlideSlug: questionSlug,
              answerSlug: answer.slug,
              nextSlideSlug: answer.nextSlideSlug || nextSlideSlug,
            });
          };

          return (
            <Button
              key={answer.slug}
              label={answer.label}
              isActive={currentAnswerSlug === answer.slug}
              onClick={handleButtonClick}
            />
          );
        })}
      </div>
    </div>
  );
};
