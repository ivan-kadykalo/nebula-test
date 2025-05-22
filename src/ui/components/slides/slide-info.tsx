import type { ISlideInfo } from "@/types/quiz";
import { Button } from "@/ui/components/button";
import type { HandleNextScreenOptions } from "@/ui/components/screen-content";
import cn from "classnames";
import { TEXT_HEADING, TEXT_SECONDARY, Y_SPACE_L } from "@/styles/commonStyles";
import { useSelector } from "react-redux";
import { selectDraftAnswers } from "@/store/quizSelectors";
import { parseDynamicTemplate } from "@/utils/templateParser";

interface Props {
  slideInfo: ISlideInfo;
  onClick: (options: HandleNextScreenOptions) => void;
}

export const SlideInfo = (props: Props) => {
  const { slideInfo, onClick } = props;
  const { slug, title, description, button, nextSlideSlug } = slideInfo;

  const userAnswers = useSelector(selectDraftAnswers(slug));

  const handleButtonClick = () => {
    onClick({
      currentSlideSlug: slug,
      nextSlideSlug,
    });
  };

  return (
    <div className={cn(Y_SPACE_L, "text-center w-full")}>
      <h1 className={TEXT_HEADING}>
        {parseDynamicTemplate(title, userAnswers)}
      </h1>

      <p className={TEXT_SECONDARY}>
        {parseDynamicTemplate(description, userAnswers)}
      </p>

      <Button key={button} label={button} onClick={handleButtonClick} />
    </div>
  );
};
