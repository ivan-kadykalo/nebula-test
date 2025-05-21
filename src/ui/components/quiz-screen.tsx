"use client";

import { type IQuiz, SlideType } from "@/types/quiz";
import { SlideSingleChoiceQuestion } from "@/ui/components/slides/slide-single-choice-question";
import { useDispatch, useSelector } from "react-redux";
import { RootState, persistor } from "@/store/store";
import { Header } from "@/ui/components/header";
import { CONTAINER_PADDING_Y } from "@/styles/commonStyles";
import {
  goBack,
  goNext,
  setAnswer,
  addScreenToHistory,
} from "@/store/quizSlice";
import { useCallWithDelay } from "@/hooks/useCallWithDelay";
import { getCurrentSlide } from "@/utils/getCurrentSlide";
import { SlideInfo } from "@/ui/components/slides/slide-info";
import { useCallback, useEffect } from "react";
import { PAGES, SUPPORTED_SCREEN_TYPES } from "@/data/constants";
import { redirect } from "next/navigation";

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

export const QuizScreen = (props: Props) => {
  const { quiz } = props;
  const { slug: quizSlug, slides, start } = quiz;

  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.quiz.history);

  const currentSlideSlug =
    useSelector((state: RootState) => state.quiz.currentSlideSlug) || start;

  // TODO: handle error when there are no such slide
  const currentSlide = getCurrentSlide(slides, currentSlideSlug);

  // TODO: probably refactor complications
  const { isTransitioning, runWithDelay } = useCallWithDelay();

  const shouldShowBackButton = history.length > 0;

  // TODO: should we remove last answer if user went back? In result he will se all answers, but shouldn't
  const handleGoBack = () => {
    runWithDelay(() => {
      dispatch(goBack());
    });
  };

  const handleFinalScreen = () => {
    redirect(`${quizSlug}${PAGES.RESULTS}`);
  };

  const handleNextScreen = useCallback(
    (options: NextScreenOptions) => {
      const { currentSlideSlug, nextSlideSlug } = options;

      const isLastScreen = !nextSlideSlug;

      runWithDelay(() => {
        if (isLastScreen) {
          handleFinalScreen();

          return;
        }

        if (currentSlideSlug) {
          dispatch(addScreenToHistory(currentSlideSlug));
        }

        dispatch(goNext(nextSlideSlug));
      });
    },
    [dispatch, runWithDelay],
  );

  const handleAnswerClick = (options: AnswerOptions) => {
    const { currentSlideSlug, answerSlug, nextSlideSlug } = options;

    dispatch(setAnswer({ questionSlug: currentSlideSlug, answerSlug }));
    handleNextScreen({
      currentSlideSlug,
      nextSlideSlug,
    });
  };

  useEffect(() => {
    if (!SUPPORTED_SCREEN_TYPES.includes(currentSlide.type)) {
      // eslint-disable-next-line no-console
      console.error("Unsupported screen type:", currentSlide.type); // Implement logger to be notified

      handleNextScreen({
        nextSlideSlug: currentSlide.nextSlideSlug,
      });
    }
  }, [currentSlide, handleNextScreen]);

  const ScreenComponent = () => {
    switch (currentSlide.type) {
      case SlideType.SingleChoiceQuestion:
        return (
          <SlideSingleChoiceQuestion
            isTransitioning={isTransitioning}
            slideInfo={currentSlide}
            handleAnswerClick={handleAnswerClick}
          />
        );
      case SlideType.Info:
        return (
          <SlideInfo
            isTransitioning={isTransitioning}
            slideInfo={currentSlide}
            handleButtonClick={handleNextScreen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header
        isTransitioning={isTransitioning}
        shouldShowBackButton={shouldShowBackButton}
        handleGoBack={handleGoBack}
      />

      <section className={CONTAINER_PADDING_Y}>
        <ScreenComponent />
      </section>
    </>
  );
};
