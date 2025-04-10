"use client";

import { useState, useEffect } from "react";
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
import { format } from "date-fns";
import type { blogPosts } from "~/server/db/schema/blog";

interface BlogDropdownProps {
  isOpen: boolean;
  posts: (typeof blogPosts.$inferSelect)[];
}

export function BlogDropdown({ isOpen, posts }: BlogDropdownProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen && posts.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % posts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen, posts.length]);

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
            {posts.map((post, index) => (
              <AnimatePresence mode="wait" key={post.id}>
                {(index === activeIndex || posts.length <= 3) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="block">
                      <Card className="h-full transition-shadow hover:shadow-md">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-lg">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {post.subtitle ?? ""}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="relative h-32 w-full overflow-hidden rounded-md">
                            <Image
                              src={
                                post.coverImageId
                                  ? `/api/images/${post.coverImageId}`
                                  : "/placeholder.svg?height=128&width=384"
                              }
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </CardContent>
                        <CardFooter className="text-muted-foreground p-4 pt-0 text-sm">
                          {post.publishedAt && (
                            <span>
                              Published:{" "}
                              {format(
                                new Date(post.publishedAt),
                                "MMM dd, yyyy",
                              )}
                            </span>
                          )}
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/blog" className="text-primary hover:underline">
              View all blog posts →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
