"use client";

import cn from "classnames";

interface Props {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}
export const Button = (props: Props) => {
  const { label, onClick, isActive } = props;

  return (
    <button
      className={cn(
        "button w-full p-4 rounded-2xl transition duration-300 ease-in-out cursor-pointer shadow-lg hover:inset-shadow-sm",
        { "button-active inset-shadow-sm": isActive },
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
