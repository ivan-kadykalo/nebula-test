"use client";

import { Content } from "@/ui/wrappers/content";
import { ISlideSingleChoice } from "@/types/quiz";
import cn from "classnames";
import { OptionButton } from "@/ui/components/option-button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AnswerOptions } from "@/ui/components/quiz-screen";

interface Props {
  isTransitioning: boolean;
  slideInfo: ISlideSingleChoice;
  handleAnswerClick: (options: AnswerOptions) => void;
}

// TODO: rename slug to screen slug and next to nextScreenSlug
export const SlideSingleChoiceQuestion = (props: Props) => {
  const { isTransitioning, slideInfo, handleAnswerClick } = props;
  const {
    slug: currentSlideSlug,
    title,
    answers,
    note,
    nextSlideSlug,
  } = slideInfo;

  const currentAnswers = useSelector((state: RootState) => state.quiz.answers);
  const currentAnswer = currentAnswers[currentSlideSlug];

  // TODO: fix problem with blinking button on info
  return (
    <Content
      className={cn(
        "px-4 md:px-6",
        "flex flex-col items-center justify-center max-w-md",
        "fade-in",
        { "fade-out": isTransitioning },
      )}
    >
      <h1 className="text-2xl font-bold mb-8 text-center">{title}</h1>

      {note && (
        <p className="text-md mb-8 text-gray-500 text-center">
          This is a placeholder for the Single Choice screen.
        </p>
      )}

      <div className="space-y-3 w-full">
        {answers.map((answer) => (
          <OptionButton
            key={answer.slug}
            label={answer.label}
            isActive={currentAnswer === answer.slug}
            handleAnswerClick={() =>
              handleAnswerClick({
                currentSlideSlug,
                answerSlug: answer.slug,
                nextSlideSlug: answer.nextSlideSlug || nextSlideSlug,
              })
            }
          />
        ))}
      </div>
    </Content>
  );
};
