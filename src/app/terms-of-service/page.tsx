"use client";

import React from "react";
import { DynamicPage } from "@/components/common/DynamicPage";
import { termsOfServiceData } from "@/constant/pageData";

export default function TermsOfServicePage() {
  return <DynamicPage pageData={termsOfServiceData} />;
}
