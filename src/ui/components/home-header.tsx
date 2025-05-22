import React from "react";
import { NebulaFullIcon } from "@/ui/icons/nebula-full";
import { HeaderWrapper } from "@/ui/wrappers/header-wrapper";

export function HomeHeader() {
  return (
    <HeaderWrapper className="justify-center h-14">
      <NebulaFullIcon />
    </HeaderWrapper>
  );
}
