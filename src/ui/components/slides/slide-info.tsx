"use client";

import { Content } from "@/ui/wrappers/content";
import { type ISlideInfo } from "@/types/quiz";
import cn from "classnames";
import { OptionButton } from "@/ui/components/option-button";
import { type NextScreenOptions } from "@/ui/components/quiz-screen";

interface Props {
  isTransitioning: boolean;
  slideInfo: ISlideInfo;
  handleButtonClick: (options: NextScreenOptions) => void;
}

export const SlideInfo = (props: Props) => {
  const { isTransitioning, slideInfo, handleButtonClick } = props;
  const { slug, title, description, button, nextSlideSlug } = slideInfo;

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

      <p className="text-md mb-8 text-gray-300 text-center">{description}</p>

      <OptionButton
        key={button}
        label={button}
        handleAnswerClick={() =>
          handleButtonClick({
            currentSlideSlug: slug,
            nextSlideSlug,
          })
        }
      />
    </Content>
  );
};
