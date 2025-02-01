"use client";

import { AboutBlock } from "@/components/PaymentPage/AboutBlock";
import { PaymentSlide } from "@/components/PaymentPage/PaymentSlide";
import { SectionCard } from "@/components/SectionCard/SectionCard";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/store/hooks";
import { authSuccess } from "@/lib/features/user/slice";

export default function Home() {
  return (
    <>
      <AboutBlock>
        <PaymentSlide />
      </AboutBlock>
    </>
  );
}
