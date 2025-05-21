import React from "react";
import { ChevronLeftIcon } from "lucide-react";
import { Content } from "@/ui/wrappers/content";
import { NebulaSmallIcon } from "@/ui/icons/nebula-small";
import cn from "classnames";

interface Props {
  isTransitioning: boolean;
  shouldShowBackButton: boolean;
  handleGoBack: () => void;
}

export function Header(props: Props) {
  const { isTransitioning, shouldShowBackButton, handleGoBack } = props;

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
            disabled={isTransitioning}
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
