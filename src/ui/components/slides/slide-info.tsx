import type { ISlideInfo } from "@/types/quiz";
import { Button } from "@/ui/components/button";
import type { NextScreenOptions } from "@/ui/components/screen-content";

interface Props {
  slideInfo: ISlideInfo;
  onClick: (options: NextScreenOptions) => void;
}

export const SlideInfo = (props: Props) => {
  const { slideInfo, onClick } = props;
  const { slug, title, description, button, nextSlideSlug } = slideInfo;

  const handleButtonClick = () => {
    onClick({
      currentSlideSlug: slug,
      nextSlideSlug,
    });
  };

  return (
    <div className="space-y-8 w-full">
      <h1 className="text-2xl font-bold text-center">{title}</h1>

      <p className="text-md text-gray-300 text-center">{description}</p>

      <Button key={button} label={button} onClick={handleButtonClick} />
    </div>
  );
};
