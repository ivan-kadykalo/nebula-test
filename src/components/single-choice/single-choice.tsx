"use client";

import { CONTAINER_PADDING_X } from "@/styles/commonStyles";
import { Content } from "@/components/wrappers/content";
import { ScreenSingleChoice } from "@/types/quiz";
import cn from "classnames";

export const SingleChoiceScreen = (props: ScreenSingleChoice) => {
  const { slug: questionSlug, title, options, note, next } = props;

  const handleOptionClick = (options: {
    answerSlug: string;
    next: string | undefined;
  }) => {
    const { answerSlug, next } = options;

    if (!next) {
      console.log("🚨FINAL🚨");
      return;
    }

    console.log("🚨🚨", answerSlug, questionSlug, next);
  };

  // TODO: Create default button component

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

      {options.map((option) => (
        <button
          key={option.slug}
          className={cn(
            "w-full p-4 mb-2 bg-gray-200 rounded-2xl text-gray-900 shadow-xs transition duration-200 cursor-pointer",
            "hover:bg-purple-600/50 hover:text-gray-100 active:bg-purple-700/50",
          )}
          onClick={() =>
            handleOptionClick({
              answerSlug: option.slug,
              next: option.next || next,
            })
          }
        >
          {option.label}
        </button>
      ))}
    </Content>
  );
};
