"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { TrainersCards } from "@/components/common/TrainersCards";
import { TrainerInterface, trainers } from "@/constant/staticTrainers";
import { pageLink } from "@/constant/pageURL";
import { Text2, Title2 } from "@/components/helper/Titles";

// Function to shuffle array and get random items
const getRandomInstructors = (
  instructorsList: TrainerInterface[],
  count: number
) => {
  const shuffled = [...instructorsList].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const MentorConnect = () => {
  // Get 6 random instructors on component mount
  const displayedInstructors = useMemo(() => {
    const allInstructors = trainers;
    return getRandomInstructors(allInstructors, 6);
  }, []);
  return (
    <Container id="mentor-connect">
      <div className="text-center space-y-4 mb-12">
        <Title2>Connect with Mentors</Title2>
        <Text2>
          Our mentors are not just trainers — they&apos;re your career partners.
        </Text2>
      </div>

      <TrainersCards
        trainers={displayedInstructors}
        className="mb-8"
        freeToConnect={true}
      />

      <div className="text-center">
        <Link href={pageLink.trainers}>
          <Button
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
          >
            Load More
          </Button>
        </Link>
      </div>
    </Container>
  );
};
