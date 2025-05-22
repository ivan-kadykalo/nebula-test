"use client";

import { type IQuiz, SlideType } from "@/types/quiz";
import { SlideSingleChoiceQuestion } from "@/ui/components/slides/slide-single-choice-question";
import {
  addScreenToHistory,
  completeQuiz,
  goNext,
  setAnswer,
} from "@/store/quizSlice";
import { getCurrentSlide } from "@/utils/getCurrentSlide";
import { SlideInfo } from "@/ui/components/slides/slide-info";
import { useCallback, useEffect } from "react";
import { SUPPORTED_SLIDE_TYPES } from "@/data/constants";
import { SlideResult } from "@/ui/components/slides/slide-result";
import {
  selectCurrentSlideSlug,
  selectIsCompleted,
} from "@/store/quizSelectors";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { CONTAINER_PADDING_Y } from "@/styles/commonStyles";
import cn from "classnames";
import { Content } from "@/ui/wrappers/content";

interface Props {
  quiz: IQuiz;
}

export interface AnswerOptions {
  nextSlideSlug: string | null;
  currentSlideSlug: string;
  answerSlug: string;
}

export interface NextScreenOptions {
  nextSlideSlug: string | null;
  currentSlideSlug?: string;
}

// TODO: Return some error if there are no such screen type (screen type invalid) and redirect next

export const ScreenContent = (props: Props) => {
  const { quiz } = props;
  const { slug: quizSlug, slides, start } = quiz;

  const dispatch = useAppDispatch();

  const currentSlideSlug =
    useAppSelector(selectCurrentSlideSlug(quizSlug)) || start;

  // TODO: handle error when there are no such slide
  const currentSlide = getCurrentSlide(slides, currentSlideSlug);
  const isCompleted = useAppSelector(selectIsCompleted(quizSlug));

  const handleFinalScreen = useCallback(() => {
    dispatch(completeQuiz({ quizSlug }));
  }, [dispatch, quizSlug]);

  const handleNextScreen = useCallback(
    (options: NextScreenOptions) => {
      const { currentSlideSlug, nextSlideSlug } = options;

      const isLastScreen = !nextSlideSlug;

      if (currentSlideSlug) {
        dispatch(addScreenToHistory({ quizSlug, slideSlug: currentSlideSlug }));
      }

      if (isLastScreen) {
        handleFinalScreen();

        return;
      }

      dispatch(goNext({ quizSlug, nextSlideSlug }));
    },
    [dispatch, handleFinalScreen, quizSlug],
  );

  const handleSaveAnswer = (options: AnswerOptions) => {
    const { currentSlideSlug, answerSlug, nextSlideSlug } = options;

    dispatch(
      setAnswer({ quizSlug, questionSlug: currentSlideSlug, answerSlug }),
    );
    handleNextScreen({
      currentSlideSlug,
      nextSlideSlug,
    });
  };

  useEffect(() => {
    // TODO: create logger
    if (!SUPPORTED_SLIDE_TYPES.includes(currentSlide.type)) {
      // eslint-disable-next-line no-console
      console.error("Unsupported screen type:", currentSlide.type); // TODO: Implement logger

      handleNextScreen({
        nextSlideSlug: currentSlide.nextSlideSlug,
      });
    }
  }, [currentSlide, handleNextScreen]);

  const DefinedSlideComponent = () => {
    if (isCompleted) {
      return <SlideResult quiz={quiz} />;
    }

    if (currentSlide.type === SlideType.Info) {
      return <SlideInfo slideInfo={currentSlide} onClick={handleNextScreen} />;
    }

    if (currentSlide.type === SlideType.SingleChoiceQuestion) {
      return (
        <SlideSingleChoiceQuestion
          quizSlug={quizSlug}
          slideInfo={currentSlide}
          onClick={handleSaveAnswer}
        />
      );
    }

    return <p>Unsupported screen type</p>;
  };

  return (
    <section className={CONTAINER_PADDING_Y}>
      <Content
        key={`${currentSlideSlug}${isCompleted}`} // Force animation
        className={cn(
          "px-4 md:px-6",
          "flex flex-col items-center justify-center max-w-md",
          "fade-in",
        )}
      >
        <DefinedSlideComponent />
      </Content>
    </section>
  );
};
