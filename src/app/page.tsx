import Link from "next/link";
import { quizRepository } from "@/repositories";
import { NebulaFullIcon } from "@/ui/icons/nebula-full";
import { Content } from "@/components/wrappers/content";
import { CONTAINER_PADDING_Y, ELEMENTS_Y_SPACE } from "@/styles/commonStyles";
import cn from "classnames";

export const revalidate = 3600; // 1 hour

export default async function Home() {
  const quizzesSlugs = await quizRepository.getAllQuizzesSlugs();

  return (
    <main>
      <Content
        className={cn(
          CONTAINER_PADDING_Y,
          ELEMENTS_Y_SPACE,
          "flex flex-col items-center justify-center",
        )}
      >
        <NebulaFullIcon />

        <h1>Welcome to Nebula Quizzes!</h1>

        <p>Select any quiz to get started:</p>

        <ul>
          {quizzesSlugs.map((quizSlug) => (
            <li key={quizSlug}>
              <Link href={`/${quizSlug}`} prefetch>
                {quizSlug}
              </Link>
            </li>
          ))}
        </ul>

        <p>
          &#34;It&#39;s an intro page, that displays a list of available
          quizzes. In real life, users probably will go right to the correct
          quiz slug&#34;
        </p>
      </Content>
    </main>
  );
}
