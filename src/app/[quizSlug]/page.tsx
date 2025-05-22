import { notFound } from "next/navigation";
import { quizRepository } from "@/repositories";
import { QuizHeader } from "@/ui/components/quiz-header";
import { ScreenContent } from "@/ui/components/screen-content";
import { logError } from "@/utils/logger";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const quizzesInfo = await quizRepository.getQuizzesList();

  return quizzesInfo.map(({ slug }) => ({
    quizSlug: slug,
  }));
}

export default async function QuizScreenPage({
  params,
}: {
  params: Promise<{ quizSlug: string }>;
}) {
  const { quizSlug } = await params;

  const quiz = await quizRepository.getQuizBySlug(quizSlug);

  if (!quiz) {
    logError(`Quiz with slug "${quizSlug}" not found`);

    return notFound();
  }

  return (
    <>
      <QuizHeader quizSlug={quizSlug} />

      <main>
        <ScreenContent quiz={quiz} />
      </main>
    </>
  );
}
