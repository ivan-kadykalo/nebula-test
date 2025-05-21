import { ISlide } from "@/types/quiz";

export const getCurrentSlide = (screens: ISlide[], slug: string): ISlide => {
  const slide = screens.find((s) => s.slug === slug);

  if (!slide) {
    throw new Error(`Slide with slug "${slug}" not found`);
  }

  return slide;
};
