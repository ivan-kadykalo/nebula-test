import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { quizRepository } from "@/repositories";

export const revalidate = 3600; // 1 hour

export default async function Home() {
  const quizzesSlugs = await quizRepository.getAllQuizzesSlugs();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1 className={styles.title}>Welcome to Nebula Quizzes!</h1>

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
      </main>
    </div>
  );
}
