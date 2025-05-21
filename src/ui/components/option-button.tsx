import cn from "classnames";

interface Props {
  label: string;
  handleAnswerClick: () => void;
  isActive?: boolean;
}
// TODO: add hover effects for gradient
// TODO: do something with important style!
export const OptionButton = (props: Props) => {
  const { label, handleAnswerClick, isActive } = props;

  return (
    <button
      className={cn(
        "w-full p-4 bg-gray-200 rounded-2xl text-gray-900 shadow-xs transition duration-200 cursor-pointer",
        "hover:bg-purple-600/50 hover:text-gray-100! active:bg-purple-700/50 active:text-gray-100! pressed:bg-purple-700/50 pressed:text-gray-100!",
        { "bg-purple-700/50 text-gray-100!": isActive },
      )}
      onClick={handleAnswerClick}
    >
      {label}
    </button>
  );
};
