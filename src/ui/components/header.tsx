"use client";

import React from "react";
import { ChevronLeftIcon } from "lucide-react";
import { Content } from "@/ui/wrappers/content";
import { NebulaSmallIcon } from "@/ui/icons/nebula-small";
import cn from "classnames";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectHistory, selectIsCompleted } from "@/store/quizSelectors";
import { goBack } from "@/store/quizSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

interface Props {
  quizSlug: string;
}

export function Header(props: Props) {
  const { quizSlug } = props;
  const dispatch = useAppDispatch();

  const isCompleted = useAppSelector(selectIsCompleted(quizSlug));
  const history = useAppSelector(selectHistory(quizSlug));
  const shouldShowBackButton = history.length > 0 && !isCompleted;

  const handleGoBack = () => {
    dispatch(goBack({ quizSlug }));
  };

  return (
    <header className="py-2">
      <Content className="flex items-center justify-around w-full gap-4 md:px-4">
        {shouldShowBackButton ? (
          <button
            className={cn(
              "h-12 w-12 shrink-0 flex items-center justify-center",
              "rounded-lg hover:bg-gray-100/10 transition cursor-pointer",
            )}
            onClick={handleGoBack}
          >
            <ChevronLeftIcon />
          </button>
        ) : (
          <div className="h-12 w-12 shrink-0" />
        )}

        <div className="w-full flex items-center justify-center">
          <NebulaSmallIcon />
        </div>

        <div className="h-12 w-12 shrink-0" />
      </Content>
    </header>
  );
}
