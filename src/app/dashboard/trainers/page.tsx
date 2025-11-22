"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Search, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TrainersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trainers</h1>
          <p className="text-muted-foreground">
            Manage your trainers and instructors
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Trainer
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search trainers..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((trainer) => (
          <Card key={trainer} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" alt={`Trainer ${trainer}`} />
                  <AvatarFallback>
                    <Users className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">Trainer {trainer}</CardTitle>
                  <CardDescription>Senior Instructor</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>trainer{trainer}@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 000-000{trainer}</span>
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium mb-1">Courses: 5</p>
                  <p className="text-sm text-muted-foreground">
                    Students: {120 + trainer * 10}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

