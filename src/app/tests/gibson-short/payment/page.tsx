"use client";

import { AboutBlock } from "@/components/PaymentPage/AboutBlock";
import { PaymentSlide } from "@/components/PaymentPage/PaymentSlide";
import { SectionCard } from "@/components/SectionCard/SectionCard";

export default function Home() {
  return (
    <AboutBlock>
      <PaymentSlide />
    </AboutBlock>
  );
}
