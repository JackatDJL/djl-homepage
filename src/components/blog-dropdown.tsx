"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { format } from "date-fns";
import type { RouterOutput } from "~/trpc/server";
import { Bouncy } from "ldrs/react";
import "ldrs/react/Bouncy.css";

interface BlogDropdownProps {
  isOpen: boolean;
  loading: boolean;
  posts: RouterOutput["blog"]["getPages"] | undefined;
  onClose: () => void; // Add onClose prop
}

export function BlogDropdown({
  isOpen,
  posts,
  loading,
  onClose,
}: BlogDropdownProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen && posts && posts.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % posts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen, posts]);

  if (loading || !posts) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-background absolute right-0 left-0 z-50 mt-2 flex items-center justify-center rounded-lg border p-4 shadow-lg"
          >
            <Bouncy size="45" speed="1.75" color="black" />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const activePosts = posts
    .filter((post) => post.data?.featured)
    .slice(activeIndex, activeIndex + 3);

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
            {activePosts.map((post) => (
              <AnimatePresence mode="wait" key={post.file.name}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={post.url} className="block" onClick={onClose}>
                    {" "}
                    {/* Add onClick to close dropdown */}
                    <Card className="h-full transition-shadow hover:shadow-md">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-lg">
                          {post.data.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {post.data.description ?? ""}
                        </CardDescription>
                      </CardHeader>
                      {/* <CardContent className="p-4 pt-0">
                        <div className="relative h-32 w-full overflow-hidden rounded-md">
                          <Image src={
                            post.data. ? `/api/images/${post.coverImageId}` : "/placeholder.svg?height=128&width=384"
                          } alt={post.title} fill className="object-cover" />
                        </div>
                      </CardContent> */}
                      <CardFooter className="text-muted-foreground p-4 pt-0 text-sm">
                        {post.data.publishedDate && (
                          <span>
                            Published:{" "}
                            {format(
                              new Date(post.data.publishedDate),
                              "MMM dd, yyyy",
                            )}
                          </span>
                        )}
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/blog"
              className="text-primary hover:underline"
              onClick={onClose}
            >
              {" "}
              {/* Add onClick to close dropdown */}
              View all blog posts →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
