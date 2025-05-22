import { ReactNode } from "react";
import cn from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export const HeaderWrapper = (props: Props) => {
  const { children, className } = props;

  return (
    <header className="flex justify-center w-full md:px-6 py-2 md:py-4">
      <div className={cn("container flex items-center", className)}>
        {children}
      </div>
    </header>
  );
};
