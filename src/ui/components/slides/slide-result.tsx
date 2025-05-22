"use client";

import { useSelector } from "react-redux";
import { IQuiz } from "@/types/quiz";
import { parseQuizResults } from "@/utils/parseQuizResults";
import { Button } from "@/ui/components/button";
import { resetQuiz } from "@/store/quizSlice";
import { selectAnswers } from "@/store/quizSelectors";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  DECIMAL_LIST,
  TEXT_BOLD,
  TEXT_HEADING,
  TEXT_SECONDARY,
  TEXT_SUBHEADING,
  Y_SPACE_L,
  Y_SPACE_M,
  Y_SPACE_S,
  Y_SPACE_XS,
} from "@/styles/commonStyles";
import cn from "classnames";
import Link from "next/link";

interface Props {
  quiz: IQuiz;
}

export const SlideResult = (props: Props) => {
  const { quiz } = props;
  const { slug: quizSlug } = quiz;

  const response = useSelector(selectAnswers(quizSlug));
  const dispatch = useAppDispatch();

  const parsedData = parseQuizResults({
    quiz,
    response,
  });

  const handleReset = () => {
    dispatch(resetQuiz({ quizSlug }));
  };

  return (
    <div className={cn(Y_SPACE_L, "w-full")}>
      <div className={cn(Y_SPACE_S, "text-center")}>
        <h1 className={TEXT_HEADING}>Thanks for your time</h1>

        <p className={TEXT_SUBHEADING}>Here are your answers:</p>
      </div>

      <ol className={cn(Y_SPACE_M, DECIMAL_LIST)}>
        {parsedData.map((item, index) => (
          <li key={index} className={cn(Y_SPACE_XS, "list-item")}>
            <p className={TEXT_BOLD}>{item.question}</p>
            <p className={TEXT_SECONDARY}>{item.answer}</p>
          </li>
        ))}
      </ol>

      <div className="grid grid-cols-2 gap-4 ">
        <Button label="Try again" onClick={handleReset} />

        <Link href="/" prefetch>
          <Button label="Go home" />
        </Link>
      </div>
    </div>
  );
};
