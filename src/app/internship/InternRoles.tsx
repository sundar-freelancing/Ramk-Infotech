"use client";
import { Container } from "@/components/ui/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PrimaryButton } from "@/components/ui/button";
import { Text3, Title1, Title2 } from "@/components/helper/Titles";
import { AppIcon } from "@/components/ui/Icon";
import { internshipRoles, InternshipRole } from "@/constant/staticInternship";
import { whatsappNumberData } from "@/constant/constant";

export function InternRoles() {
  const handleApplyNow = (role: InternshipRole) => {
    const requirementsList = role.requirements
      .map((req) => `• ${req}`)
      .join("\n");

    const message = `Hello! I'm interested in applying for the following internship position:

🎯 *Position:* ${role.name}
⏱️ *Duration:* ${role.duration}
📍 *Mode:* ${role.mode}
📝 *Description:* ${role.description}

*Requirements:*
${requirementsList}

Please provide me with more details about the application process and next steps.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${whatsappNumberData.link}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Container id="apply">
      <div className="space-y-8">
        <div className="text-center space-y-4" data-aos="fade-up">
          <Title1>Available Positions</Title1>
          <Title2>Available Internship Roles</Title2>
          <Text3>
            Explore our diverse range of internship opportunities across
            different domains.
          </Text3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internshipRoles.map((role, index) => (
            <Card
              key={role.id}
              className="transition-all hover:shadow-lg cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <AppIcon name={role.icon} className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      role.mode === "Remote"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : role.mode === "Hybrid"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {role.mode}
                  </span>
                </div>
                <CardTitle>{role.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <AppIcon name="clock" className="w-4 h-4" />
                  {role.duration}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>

                <div className="pt-4 border-t space-y-2">
                  <p className="text-sm font-semibold">Requirements:</p>
                  <ul className="space-y-1">
                    {role.requirements.map((req, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <AppIcon
                          name="check"
                          className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                        />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <PrimaryButton
                  className="mt-4"
                  size="sm"
                  onClick={() => handleApplyNow(role)}
                >
                  Apply Now
                </PrimaryButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
