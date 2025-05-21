"use client";

import { CONTAINER_PADDING_X } from "@/styles/commonStyles";
import { Content } from "@/ui/wrappers/content";
import { ScreenSingleChoice } from "@/types/quiz";
import cn from "classnames";
import { QuizButton } from "@/ui/components/quiz-button";

export interface ClickOptions {
  answerSlug: string;
  next: string | undefined;
}

export const ScreenSingleChoiceQuestion = (props: ScreenSingleChoice) => {
  const { slug: questionSlug, title, answers, note, next: defaultNext } = props;

  const handleOptionClick = (options: ClickOptions) => {
    const { answerSlug, next = defaultNext } = options;

    if (!next) {
      console.log("🚨FINAL🚨");
      return;
    }

    console.log("🚨🚨", answerSlug, questionSlug, next);
  };

  return (
    <Content
      className={cn(
        CONTAINER_PADDING_X,
        "flex flex-col items-center justify-center",
      )}
    >
      <h1 className="text-2xl font-bold mb-4">{title}</h1>

      {note && (
        <p className="text-md">
          This is a placeholder for the Single Choice screen.
        </p>
      )}

      {answers.map((option) => (
        <QuizButton
          key={option.slug}
          slug={option.slug}
          label={option.label}
          handleOptionClick={handleOptionClick}
          next={option.next}
        />
      ))}
    </Content>
  );
};
