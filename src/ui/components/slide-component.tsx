import { SlideResult } from "@/ui/components/slides/slide-result";
import { type IQuiz, type ISlide, SlideType } from "@/types/quiz";
import { SlideInfo } from "@/ui/components/slides/slide-info";
import { SlideSingleChoiceQuestion } from "@/ui/components/slides/slide-single-choice-question";
import {
  HandleAnswerOptions,
  HandleNextScreenOptions,
} from "@/ui/components/screen-content";
import cn from "classnames";
import { TEXT_HEADING } from "@/styles/commonStyles";

interface Props {
  quiz: IQuiz;
  isCompleted: boolean;
  currentSlide?: ISlide;
  handleNextScreen: (options: HandleNextScreenOptions) => void;
  handleSaveAnswer: (options: HandleAnswerOptions) => void;
}

export const SlideComponent = (props: Props) => {
  const {
    quiz,
    isCompleted,
    currentSlide,
    handleNextScreen,
    handleSaveAnswer,
  } = props;

  if (isCompleted) {
    return <SlideResult quiz={quiz} />;
  }

  if (!currentSlide) {
    return <p className={cn(TEXT_HEADING, "text-center")}>Slide not found</p>;
  }

  if (currentSlide.type === SlideType.Info) {
    return <SlideInfo slideInfo={currentSlide} onClick={handleNextScreen} />;
  }

  if (currentSlide.type === SlideType.SingleChoiceQuestion) {
    return (
      <SlideSingleChoiceQuestion
        quizSlug={quiz.slug}
        slideInfo={currentSlide}
        onClick={handleSaveAnswer}
      />
    );
  }

  return (
    <p className={cn(TEXT_HEADING, "text-center")}>Unsupported screen type</p>
  );
};
