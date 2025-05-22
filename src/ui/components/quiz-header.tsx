"use client";

import React from "react";
import { ChevronLeftIcon } from "lucide-react";
import { NebulaSmallIcon } from "@/ui/icons/nebula-small";
import cn from "classnames";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectHistory, selectIsCompleted } from "@/store/quizSelectors";
import { goBack } from "@/store/quizSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { HeaderWrapper } from "@/ui/wrappers/header-wrapper";
import {
  FLEX_CENTER,
  HEADER_BUTTON_SIZE,
  HEADER_BUTTON_STYLES,
} from "@/styles/commonStyles";

interface Props {
  quizSlug: string;
}

export function QuizHeader(props: Props) {
  const { quizSlug } = props;
  const dispatch = useAppDispatch();

  const isCompleted = useAppSelector(selectIsCompleted(quizSlug));
  const history = useAppSelector(selectHistory(quizSlug));
  const shouldShowBackButton = history.length > 0 && !isCompleted;

  const handleGoBack = () => {
    dispatch(goBack({ quizSlug }));
  };

  return (
    <HeaderWrapper className="justify-around gap-4">
      {shouldShowBackButton ? (
        <button
          className={cn(HEADER_BUTTON_SIZE, FLEX_CENTER, HEADER_BUTTON_STYLES)}
          onClick={handleGoBack}
        >
          <ChevronLeftIcon />
        </button>
      ) : (
        <div className={HEADER_BUTTON_SIZE} />
      )}

      <div className={cn(FLEX_CENTER, "w-full")}>
        <NebulaSmallIcon />
      </div>

      <div className={HEADER_BUTTON_SIZE} />
    </HeaderWrapper>
  );
}
