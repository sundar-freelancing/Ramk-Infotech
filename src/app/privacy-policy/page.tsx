"use client";

import React from "react";
import { DynamicPage } from "@/components/common/DynamicPage";
import { privacyPolicyData } from "@/constant/pageData";

export default function PrivacyPolicyPage() {
  return <DynamicPage pageData={privacyPolicyData} />;
}
