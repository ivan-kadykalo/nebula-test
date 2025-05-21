import { ReactNode } from "react";
import cn from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}
export const Content = (props: Props) => {
  const { children, className } = props;

  return (
    <div className="flex justify-center w-full">
      <div className={cn("container", className)}>{children}</div>
    </div>
  );
};
