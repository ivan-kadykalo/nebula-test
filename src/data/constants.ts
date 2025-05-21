import { SlideType } from "@/types/quiz";

export const PAGES = {
  RESULTS: "/results",
};

// TODO: rename screen to something different
export const SUPPORTED_SCREEN_TYPES = [
  SlideType.SingleChoiceQuestion,
  SlideType.Info,
];
