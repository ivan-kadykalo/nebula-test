"use client";

import type { ISlideSingleChoice } from "@/types/quiz";
import { Button } from "@/ui/components/button";
import { selectDraftAnswers } from "@/store/quizSelectors";
import { useSelector } from "react-redux";
import type { HandleAnswerOptions } from "@/ui/components/screen-content";
import {
  TEXT_HEADING,
  TEXT_SECONDARY,
  Y_SPACE_L,
  Y_SPACE_S,
} from "@/styles/commonStyles";
import cn from "classnames";

interface Props {
  quizSlug: string;
  slideInfo: ISlideSingleChoice;
  onClick: (options: HandleAnswerOptions) => void;
}

export const SlideSingleChoiceQuestion = (props: Props) => {
  const { quizSlug, slideInfo, onClick } = props;
  const { slug: questionSlug, title, answers, note, nextSlideSlug } = slideInfo;

  const userAnswers = useSelector(selectDraftAnswers(quizSlug));
  const currentAnswerSlug = userAnswers[questionSlug];

  return (
    <div className={cn(Y_SPACE_L, "w-full")}>
      <h1 className={cn(TEXT_HEADING, "text-center")}>{title}</h1>

      {note && (
        <p className={cn(TEXT_SECONDARY, "text-center")}>
          This is a placeholder for the Single Choice screen.
        </p>
      )}

      <div className={cn(Y_SPACE_S, "w-full")}>
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
