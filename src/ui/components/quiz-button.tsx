import cn from "classnames";
import { ClickOptions } from "@/ui/components/screen-single-choice-question";

interface Props {
  slug: string;
  label: string;
  handleOptionClick: (option: ClickOptions) => void;
  next?: string;
}
// TODO: add hover effects for gradient
export const QuizButton = (props: Props) => {
  const { slug, label, next, handleOptionClick } = props;

  const handleClick = () => {
    handleOptionClick({ answerSlug: slug, next });
  };

  return (
    <button
      className={cn(
        "w-full p-4 mb-2 bg-gray-200 rounded-2xl text-gray-900 shadow-xs transition duration-200 cursor-pointer",
        "hover:bg-purple-600/50 hover:text-gray-100 active:bg-purple-700/50",
      )}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};
