"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import type { projects } from "~/server/db/schema/projects";

interface ProjectDropdownProps {
  isOpen: boolean;
  projects: (typeof projects.$inferSelect)[];
}

export function ProjectDropdown({ isOpen, projects }: ProjectDropdownProps) {
  const getTypeColor = (type: (typeof projects)[number]["type"]) => {
    switch (type) {
      case "roadmap":
        return "bg-yellow-500";
      case "wip":
        return "bg-blue-500";
      case "openbeta":
        return "bg-purple-500";
      case "production":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-background absolute right-0 left-0 z-50 mt-2 rounded-lg border p-4 shadow-lg"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className="block"
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between">
                      <div className="relative mr-2 h-8 w-8">
                        <Image
                          src={
                            project.logoImageId
                              ? `/api/images/${project.logoImageId}`
                              : "/placeholder.svg?height=32&width=32"
                          }
                          alt={project.title}
                          fill
                          className="rounded-md object-contain"
                        />
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-white ${getTypeColor(project.type)}`}
                      >
                        {project.type}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2 text-lg">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description || "No description available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="relative h-32 w-full overflow-hidden rounded-md">
                      <Image
                        src={
                          project.coverImageId
                            ? `/api/images/${project.coverImageId}`
                            : "/placeholder.svg?height=128&width=384"
                        }
                        alt={`${project.title} cover`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="text-muted-foreground p-4 pt-0 text-sm">
                    {project.oss && (
                      <Badge variant="outline" className="mr-2">
                        OSS
                      </Badge>
                    )}
                    {project.private && (
                      <Badge variant="outline">Private</Badge>
                    )}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/projects" className="text-primary hover:underline">
              View all projects →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
