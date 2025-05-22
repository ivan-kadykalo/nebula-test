"use client";

import { useSelector } from "react-redux";
import { IQuiz } from "@/types/quiz";
import { parseQuizResults } from "@/utils/parseQuizResults";
import { Button } from "@/ui/components/button";
import { resetQuiz } from "@/store/quizSlice";
import { selectAnswers } from "@/store/quizSelectors";
import { useAppDispatch } from "@/hooks/useAppDispatch";

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
    <div className="space-y-8 w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Thanks for your time</h1>

        <p className="text-md text-gray-100">Here are your answers:</p>
      </div>

      <ol className="list-decimal list-outside space-y-4">
        {parsedData.map((item, index) => (
          <li key={index} className="list-item space-y-1 text-gray-100">
            <h3 className="text-md font-bold">{item.question}</h3>
            <p className="text-md text-muted-foreground">{item.answer}</p>
          </li>
        ))}
      </ol>

      <Button label="Reset" onClick={handleReset} />
    </div>
  );
};
