export enum ScreenType {
  SingleChoice = "single-choice",
  Info = "info",
}

export interface QuestionOption {
  label: string;
  next?: string;
}

export interface BaseScreen {
  slug: string;
  type: ScreenType;
  title: string;
  next?: string;
}

export interface SingleChoiceScreen extends BaseScreen {
  type: ScreenType.SingleChoice;
  options: QuestionOption[];
  note?: string;
}

export interface InfoScreen extends BaseScreen {
  type: ScreenType.Info;
  description: string;
  button: string;
}

export type Screen = SingleChoiceScreen | InfoScreen;

export interface Quiz {
  slug: string;
  start: string;
  screens: Screen[];
}
