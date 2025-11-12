"use client";

import { Container } from "@/components/ui/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppIcon } from "@/components/ui/Icon";
import { Separator } from "@/components/ui/separator";
import { contactInfo } from "@/constant/staticInternship";
import Link from "next/link";

export function InternContact() {
  return (
    <Container>
      <Card data-aos="fade-right">
        <CardHeader>
          <CardTitle>Contact / Support</CardTitle>
          <CardDescription>
            Have questions? Reach out to us through any of these channels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <AppIcon name="mail" className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-semibold">Email</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-sm text-muted-foreground hover:text-blue-600"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AppIcon name="phone" className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-semibold">Phone</p>
              <a
                href={`tel:${contactInfo.phone}`}
                className="text-sm text-muted-foreground hover:text-blue-600"
              >
                {contactInfo.phone}
              </a>
            </div>
          </div>

          {contactInfo.address && (
            <div className="flex items-center gap-3">
              <AppIcon name="map-pin" className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-sm text-muted-foreground">
                  {contactInfo.address}
                </p>
              </div>
            </div>
          )}

          <Separator className="my-4" />

          <div>
            <p className="font-semibold mb-3">Follow Us</p>
            <div className="flex gap-4">
              {contactInfo.socialMedia.facebook && (
                <Link
                  href={contactInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AppIcon
                    name="facebook"
                    className="w-5 h-5 text-blue-600 hover:text-blue-700"
                  />
                </Link>
              )}
              {contactInfo.socialMedia.twitter && (
                <Link
                  href={contactInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AppIcon
                    name="twitter"
                    className="w-5 h-5 text-blue-400 hover:text-blue-500"
                  />
                </Link>
              )}
              {contactInfo.socialMedia.instagram && (
                <Link
                  href={contactInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AppIcon
                    name="instagram"
                    className="w-5 h-5 text-pink-600 hover:text-pink-700"
                  />
                </Link>
              )}
              {contactInfo.socialMedia.linkedin && (
                <Link
                  href={contactInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AppIcon
                    name="linkedin"
                    className="w-5 h-5 text-blue-700 hover:text-blue-800"
                  />
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

