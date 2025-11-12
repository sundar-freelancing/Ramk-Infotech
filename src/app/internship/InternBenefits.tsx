"use client";

import { Container } from "@/components/ui/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text3, Title1, Title2 } from "@/components/helper/Titles";
import { AppIcon } from "@/components/ui/Icon";
import { benefits } from "@/constant/staticInternship";

export function InternBenefits() {
  return (
    <Container>
      <div className="space-y-8">
        <div className="text-center space-y-4" data-aos="fade-up">
          <Title1>Why Join Us</Title1>
          <Title2>Benefits / Why Join Us</Title2>
          <Text3>
            Discover what makes our internship program unique and how it can
            accelerate your career growth.
          </Text3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={benefit.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <AppIcon
                    name={benefit.icon}
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  />
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
