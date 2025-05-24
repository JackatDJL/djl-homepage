"use client";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { format } from "date-fns";
import { api } from "~/trpc/react";

export default function BlogPage() {
  const { data: posts, isLoading } = api.blog.getPosts.useQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Blog Posts
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts ? (
          posts
            .sort((a, b) => {
              if (!a.data.publishedDate || !b.data.publishedDate) return 0;
              return (
                new Date(b.data.publishedDate).getTime() -
                new Date(a.data.publishedDate).getTime()
              );
            })
            .map((post) => (
              <Link href={post.url} key={post.file.name} className="block">
                <Card className="h-full transform rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <CardHeader className="p-6">
                    <CardTitle className="mb-2 text-xl font-semibold">
                      {post.data.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-3">
                      {post.data.description ?? "No description available."}
                    </CardDescription>
                    {post.data.publishedDate && (
                      <p className="mt-4 text-sm text-gray-500">
                        Published:{" "}
                        {format(
                          new Date(post.data.publishedDate),
                          "MMM dd, yyyy",
                        )}
                      </p>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            ))
        ) : (
          <>
            {isLoading ? (
              <Card className="h-full transform rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <CardHeader className="p-6">
                  <CardTitle className="mb-2 text-xl font-semibold">
                    Loading
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Loading blog posts...
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <Card className="h-full transform rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <CardHeader className="p-6">
                  <CardTitle className="mb-2 text-xl font-semibold">
                    No Posts
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    No blog posts available.
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
