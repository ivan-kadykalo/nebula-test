import { ReactNode } from "react";
import cn from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export const SectionWrapper = (props: Props) => {
  const { children, className } = props;

  return (
    <section className="flex justify-center w-full px-4 md:px-6">
      <div className={cn("container max-w-md py-4 md:py-6", className)}>
        {children}
      </div>
    </section>
  );
};
