export enum ScreenType {
  SingleChoiceQuestion = "single-choice-question",
  Info = "info",
}

export interface Answer {
  slug: string;
  label: string;
  next?: string;
}

export interface ScreenBase {
  slug: string;
  type: ScreenType;
  title: string;
  next?: string;
}

export interface ScreenSingleChoice extends ScreenBase {
  type: ScreenType.SingleChoiceQuestion;
  answers: Answer[];
  note?: string;
}

export interface ScreenInfo extends ScreenBase {
  type: ScreenType.Info;
  description: string;
  button: string;
}

export type Screen = ScreenSingleChoice | ScreenInfo;

export interface Quiz {
  slug: string;
  start: string;
  screens: Screen[];
}
