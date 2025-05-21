export enum ScreenType {
  SingleChoice = "single-choice",
  Info = "info",
}

export interface QuestionOption {
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
  type: ScreenType.SingleChoice;
  options: QuestionOption[];
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
