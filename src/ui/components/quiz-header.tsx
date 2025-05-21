import React from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { Content } from "@/ui/wrappers/content";
import { NebulaSmallIcon } from "@/ui/icons/nebula-small";

export function QuizHeader() {
  return (
    <Content className="flex items-center justify-around w-full gap-4">
      <Link
        className="h-12 w-12 shrink-0 flex items-center justify-center"
        href="/public"
        aria-label="Back"
      >
        <ChevronLeftIcon />
      </Link>

      <div className="w-full flex items-center justify-center">
        <NebulaSmallIcon />
      </div>

      <div className="h-12 w-12 shrink-0" />
    </Content>
  );
}
