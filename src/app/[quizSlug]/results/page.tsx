import { quizRepository } from "@/repositories";
import { notFound } from "next/navigation";
import { ResultData } from "@/ui/components/result-data";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ quizSlug: string }>;
}) {
  const { quizSlug } = await params;

  const quiz = await quizRepository.getQuizBySlug(quizSlug);
  // TODO: get user results from redux state and display them on this screen

  if (!quiz) return notFound();
  // TODO: Handle the case where the screen is not found, sent logs

  return <ResultData quiz={quiz} />;
}
