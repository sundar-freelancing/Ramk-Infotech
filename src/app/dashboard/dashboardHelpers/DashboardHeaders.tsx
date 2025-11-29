"use client";

import { Text1, Title3 } from "@/components/helper/Titles";
import { cn } from "@/lib/utils";

export const DashboardHeaders = (props: {
  title: string;
  description: string | React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("", props.className)}>
      <Title3 aos={false}>{props.title}</Title3>
      <Text1 aos={false}>{props.description}</Text1>
    </div>
  );
};
