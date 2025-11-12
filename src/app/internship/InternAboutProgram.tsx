"use client";

import { Container } from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text3, Title1, Title2 } from "@/components/helper/Titles";
import { AppIcon } from "@/components/ui/Icon";
import { aboutProgram } from "@/constant/staticInternship";

export function InternAboutProgram() {
  return (
    <Container>
      {/* Header Section */}
      <div
        className="text-center space-y-4 max-w-4xl mx-auto mb-16 md:mb-20"
        data-aos="fade-up"
      >
        <Title1>About the Program</Title1>
        <Title2>{aboutProgram.title}</Title2>
        <Text3>{aboutProgram.description}</Text3>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {/* Program Overview Card */}
        <Card
          data-aos="fade-right"
          data-aos-delay="100"
          className="group relative overflow-hidden border border-border/50 bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <CardHeader className="pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-all duration-300">
                <AppIcon name="briefcase" className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                Program Overview
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 relative z-10">
            {/* Duration */}
            <div className="flex items-start gap-3 p-4 rounded-lg border border-border/30 bg-muted/30 hover:bg-muted/50 hover:border-border/50 transition-all duration-200">
              <div className="p-2 rounded-md bg-blue-500/10 transition-colors shrink-0 mt-0.5">
                <AppIcon
                  name="clock"
                  className="w-4 h-4 text-blue-600 dark:text-blue-400"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
                  Duration
                </p>
                <p className="text-sm md:text-base font-semibold text-foreground">
                  {aboutProgram.duration}
                </p>
              </div>
            </div>

            {/* Type */}
            <div className="flex items-start gap-3 p-4 rounded-lg border border-border/30 bg-muted/30 hover:bg-muted/50 hover:border-border/50 transition-all duration-200">
              <div className="p-2 rounded-md bg-purple-500/10 transition-colors shrink-0 mt-0.5">
                <AppIcon
                  name="map-pin"
                  className="w-4 h-4 text-purple-600 dark:text-purple-400"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs text-muted-foreground uppercase tracking-wider mb-1.5">
                  Type
                </p>
                <p className="text-sm md:text-base font-semibold text-foreground">
                  {aboutProgram.type}
                </p>
              </div>
            </div>

            {/* Target Audience */}
            <div className="flex items-start gap-3 p-4 rounded-lg border border-border/30 bg-muted/30 hover:bg-muted/50 hover:border-border/50 transition-all duration-200">
              <div className="p-2 rounded-md bg-green-500/10 transition-colors shrink-0 mt-0.5">
                <AppIcon
                  name="users"
                  className="w-4 h-4 text-green-600 dark:text-green-400"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs text-muted-foreground uppercase tracking-wider mb-2.5">
                  Target Audience
                </p>
                <ul className="space-y-2">
                  {aboutProgram.targetAudience.map((audience, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-sm text-foreground font-medium">
                        {audience}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Culture Card */}
        <Card
          data-aos="fade-left"
          data-aos-delay="100"
          className="group relative overflow-hidden border border-border/50 bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <CardHeader className="pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-all duration-300">
                <AppIcon name="heart" className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                Company Culture
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-5 relative z-10">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {aboutProgram.companyCulture.description}
            </p>

            <div className="pt-1">
              <p className="font-medium text-xs text-muted-foreground uppercase tracking-wider mb-4">
                Our Values
              </p>
              <div className="space-y-2.5">
                {aboutProgram.companyCulture.values.map((value, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3.5 rounded-lg border border-border/30 bg-muted/30 hover:bg-muted/50 hover:border-border/50 transition-all duration-200"
                  >
                    <div className="p-1.5 rounded-md bg-green-500/10 transition-colors shrink-0">
                      <AppIcon
                        name="check-circle"
                        className="w-4 h-4 text-green-600 dark:text-green-400"
                      />
                    </div>
                    <span className="text-sm text-foreground font-medium flex-1">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
