export enum SlideType {
  SingleChoiceQuestion = "single-choice-question",
  Info = "info",
}

export interface IAnswer {
  slug: string;
  label: string;
  nextSlideSlug?: string;
}

export interface ISlideBase {
  slug: string;
  type: SlideType;
  title: string;
  nextSlideSlug: string | null;
}

export interface ISlideSingleChoice extends ISlideBase {
  type: SlideType.SingleChoiceQuestion;
  answers: IAnswer[];
  note?: string;
}

export interface ISlideInfo extends ISlideBase {
  type: SlideType.Info;
  description: string;
  button: string;
}

export type ISlide = ISlideSingleChoice | ISlideInfo;

export interface IQuiz {
  slug: string;
  start: string;
  slides: ISlide[];
}
