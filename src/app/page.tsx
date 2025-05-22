import Link from "next/link";
import { quizRepository } from "@/repositories";
import { SectionWrapper } from "@/ui/wrappers/section-wrapper";
import { HomeHeader } from "@/ui/components/home-header";
import {
  DISC_LIST,
  TEXT_BOLD,
  TEXT_HEADING,
  TEXT_QUOTE,
  TEXT_SUBHEADING,
  Y_SPACE_L,
  Y_SPACE_M,
  Y_SPACE_S,
} from "@/styles/commonStyles";
import cn from "classnames";

export const revalidate = 60;

export default async function Home() {
  const quizzes = await quizRepository.getQuizzesList();

  return (
    <>
      <HomeHeader />

      <main>
        <SectionWrapper className={Y_SPACE_L}>
          <div className={cn(Y_SPACE_S, "text-center")}>
            <h1 className={TEXT_HEADING}>Welcome to Nebula Quizzes!</h1>

            <p className={TEXT_SUBHEADING}>Select any quiz to get started:</p>
          </div>

          <ol className={cn(Y_SPACE_M, DISC_LIST)}>
            {quizzes.map(({ slug, name }) => (
              <li
                key={slug}
                className={cn(TEXT_BOLD, "list-item transition link")}
              >
                <Link href={`/${slug}`} prefetch>
                  {name}
                </Link>
              </li>
            ))}
          </ol>

          <p className={TEXT_QUOTE}>
            &#34;It&#39;s an intro page, that displays a list of available
            quizzes. In real life, users probably will go right to the correct
            quiz slug&#34;
          </p>
        </SectionWrapper>
      </main>
    </>
  );
}
