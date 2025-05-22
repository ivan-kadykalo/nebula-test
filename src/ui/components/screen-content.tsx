"use client";

import { type IQuiz } from "@/types/quiz";
import {
  addScreenToHistory,
  completeQuiz,
  goNext,
  setAnswer,
} from "@/store/quizSlice";
import { getCurrentSlide } from "@/utils/getCurrentSlide";
import { useCallback, useEffect } from "react";
import { SUPPORTED_SLIDE_TYPES } from "@/data/constants";
import {
  selectCurrentSlideSlug,
  selectIsCompleted,
} from "@/store/quizSelectors";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { SectionWrapper } from "@/ui/wrappers/section-wrapper";
import { logError } from "@/utils/logger";
import { SlideComponent } from "@/ui/components/slide-component";

interface Props {
  quiz: IQuiz;
}

export interface HandleAnswerOptions {
  nextSlideSlug: string | null;
  currentSlideSlug: string;
  answerSlug: string;
}

export interface HandleNextScreenOptions {
  nextSlideSlug: string | null;
  currentSlideSlug?: string;
}

export const ScreenContent = (props: Props) => {
  const { quiz } = props;
  const { slug: quizSlug, slides, start } = quiz;

  const dispatch = useAppDispatch();

  const currentSlideSlug =
    useAppSelector(selectCurrentSlideSlug(quizSlug)) || start;
  const isCompleted = useAppSelector(selectIsCompleted(quizSlug));

  const handleFinalScreen = useCallback(() => {
    dispatch(completeQuiz({ quizSlug }));
  }, [dispatch, quizSlug]);

  const handleNextScreen = useCallback(
    (options: HandleNextScreenOptions) => {
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

  const handleSaveAnswer = useCallback(
    (options: HandleAnswerOptions) => {
      const { currentSlideSlug, answerSlug, nextSlideSlug } = options;

      dispatch(
        setAnswer({ quizSlug, questionSlug: currentSlideSlug, answerSlug }),
      );
      handleNextScreen({
        currentSlideSlug,
        nextSlideSlug,
      });
    },
    [dispatch, handleNextScreen, quizSlug],
  );

  const currentSlide = getCurrentSlide(slides, currentSlideSlug);

  useEffect(() => {
    if (currentSlide && !SUPPORTED_SLIDE_TYPES.includes(currentSlide.type)) {
      logError(`Unsupported slide type: "${currentSlide.type}"!`);

      handleNextScreen({
        nextSlideSlug: currentSlide.nextSlideSlug,
      });
    }
  }, [currentSlide, handleNextScreen, currentSlideSlug]);

  return (
    <SectionWrapper
      key={`${currentSlideSlug}${isCompleted}`} // To force animation
      className="fade-in"
    >
      <SlideComponent
        quiz={quiz}
        isCompleted={isCompleted}
        currentSlide={currentSlide}
        handleNextScreen={handleNextScreen}
        handleSaveAnswer={handleSaveAnswer}
      />
    </SectionWrapper>
  );
};
