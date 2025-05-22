import { ISlide } from "@/types/quiz";
import { logError } from "@/utils/logger";

export const getCurrentSlide = (
  slides: ISlide[],
  slug: string,
): ISlide | undefined => {
  const currentSlide = slides.find((slide) => slide.slug === slug);

  if (!currentSlide) {
    logError(`Slide with slug "${slug}" not found`);
  }

  return currentSlide;
};
