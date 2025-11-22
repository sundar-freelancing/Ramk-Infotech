"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Search, Filter, Reply, Archive, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
          <p className="text-muted-foreground">
            Manage and respond to contact form submissions
          </p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages..." className="pl-8" />
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((message) => (
          <Card key={message} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">
                        John Doe {message}
                      </CardTitle>
                      <Badge variant="secondary">New</Badge>
                    </div>
                    <CardDescription>
                      john.doe{message}@example.com
                    </CardDescription>
                    <p className="text-sm text-muted-foreground mt-2">
                      Subject: Inquiry about Course {message}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {message} hours ago
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                This is a sample contact message. The actual message content
                will be displayed here when integrated with your contact form
                backend.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="default">
                  <Reply className="mr-2 h-4 w-4" />
                  Reply
                </Button>
                <Button size="sm" variant="outline">
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

