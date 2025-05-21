import { notFound } from "next/navigation";
import { ScreenType } from "@/types/quiz";
import { ScreenSingleChoiceQuestion } from "@/ui/components/screen-single-choice-question";
import { quizRepository } from "@/repositories";
import { QuizHeader } from "@/ui/components/quiz-header";
import { CONTAINER_PADDING_Y } from "@/styles/commonStyles";

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
      case ScreenType.SingleChoiceQuestion:
        return <ScreenSingleChoiceQuestion {...screen} />;

      case ScreenType.Info:
        return <div>Info Component</div>;
      default:
        return <div>Default Component</div>;
    }
  };

  // TODO: Return some error if there are no such screen type (screen type invalid) and redirect next

  return (
    <>
      <header className="py-2">
        <QuizHeader />
      </header>

      <section className={CONTAINER_PADDING_Y}>
        <ScreenComponent />
      </section>
    </>
  );
}
