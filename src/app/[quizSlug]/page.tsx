import { notFound } from "next/navigation";
import { ScreenType } from "@/types/quiz";
import { SingleChoiceScreen } from "@/app/components/single-choice/single-choice";
import { quizRepository } from "@/repositories";

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

  const firstScreenSlug = quiz?.start;
  const screen = quiz?.screens.find((s) => s.slug === firstScreenSlug);

  if (!screen) return notFound();
  // TODO: Handle the case where the screen is not found, sent logs

  // TODO: Get next value from current response

  // TODO: Conditionally check screen type and return different components

  const ScreenComponent = () => {
    switch (screen.type) {
      case ScreenType.SingleChoice:
        return <SingleChoiceScreen />;

      case ScreenType.Info:
        return <div>Info Component</div>;
      default:
        return <div>Default Component</div>;
    }
  };

  // TODO: Return some error if there are no such screen type (screen type invalid) and redirect next

  return (
    <div>
      <h1>{screen.title}</h1>

      <ScreenComponent />

      <button>Next</button>
    </div>
  );
}
