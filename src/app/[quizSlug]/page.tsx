import { notFound } from "next/navigation";
import { quizRepository } from "@/repositories";
import { Header } from "@/ui/components/header";
import { ScreenContent } from "@/ui/components/screen-content";

export const revalidate = 3600; // 1 hour
export const dynamicParams = true;

export async function generateStaticParams() {
  const quizzesSlugs = await quizRepository.getAllQuizzesSlugs();

  return quizzesSlugs.map((slug) => ({
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

  if (!quiz) return notFound();
  // TODO: Handle the case where the screen is not found, sent logs

  return (
    <>
      <Header quizSlug={quizSlug} />

      <ScreenContent quiz={quiz} />
    </>
  );
}
