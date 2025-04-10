"use client";

import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { AnimatedText } from "./animated-text";
import { AnimatedLogo } from "./animated-logo";
import { ProjectDropdown } from "./project-dropdown";
import { BlogDropdown } from "./blog-dropdown";
import type { projects } from "~/server/db/schema/projects";
import type { blogPosts } from "~/server/db/schema/blog";

interface HeaderProps {
  isDropdownEnabled?: boolean;
}

export default function Header({ isDropdownEnabled }: HeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<
    "projects" | "blog" | null
  >(null);

  const userButtonAppearance = {
    elements: {
      userButtonBox: "h-10",
      userButtonAvatarBox: "h-10 w-10",
    },
  };

  // Test data for projects
  const featuredProjects: (typeof projects.$inferSelect)[][number][] = [
    {
      id: "1",
      shortname: "atlas",
      type: "production",
      title: "Project Atlas",
      description:
        "A comprehensive mapping solution for enterprise applications",
      oss: true,
      private: false,
      featured: true,
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date("2023-06-20"),
      coverImageId: null,
      logoImageId: null,
      contributorIds: ["user1", "user2"],
    },
    {
      id: "2",
      shortname: "nexus",
      type: "openbeta",
      title: "Nexus Platform",
      description: "Connecting disparate systems through a unified API gateway",
      oss: true,
      private: false,
      featured: true,
      createdAt: new Date("2023-03-10"),
      updatedAt: new Date("2023-07-05"),
      coverImageId: null,
      logoImageId: null,
      contributorIds: ["user3", "user4", "user5"],
    },
    {
      id: "3",
      shortname: "quantum",
      type: "wip",
      title: "Quantum Analytics",
      description:
        "Next-generation data analytics platform with AI capabilities",
      oss: false,
      private: true,
      featured: true,
      createdAt: new Date("2023-05-22"),
      updatedAt: new Date("2023-08-15"),
      coverImageId: null,
      logoImageId: null,
      contributorIds: ["user1", "user6"],
    },
  ];

  // Test data for blog posts
  const featuredBlogPosts: (typeof blogPosts.$inferSelect)[][number][] = [
    {
      id: "1",
      slug: "introducing-atlas",
      title: "Introducing Project Atlas",
      subtitle: "A new way to visualize complex data relationships",
      content: "Lorem ipsum dolor sit amet...",
      status: "published",
      featured: true,
      projectId: "1",
      authorId: "user1",
      coverImageId: null,
      attachmentIds: null,
      publishedAt: new Date("2023-06-25"),
      createdAt: new Date("2023-06-20"),
      updatedAt: new Date("2023-06-25"),
    },
    {
      id: "2",
      slug: "nexus-platform-beta",
      title: "Nexus Platform Enters Open Beta",
      subtitle: "Join us in testing the future of API gateways",
      content: "Lorem ipsum dolor sit amet...",
      status: "published",
      featured: true,
      projectId: "2",
      authorId: "user3",
      coverImageId: null,
      attachmentIds: null,
      publishedAt: new Date("2023-07-10"),
      createdAt: new Date("2023-07-05"),
      updatedAt: new Date("2023-07-10"),
    },
    {
      id: "3",
      slug: "quantum-analytics-preview",
      title: "A Sneak Peek at Quantum Analytics",
      subtitle: "How we're revolutionizing data analysis with AI",
      content: "Lorem ipsum dolor sit amet...",
      status: "published",
      featured: true,
      projectId: "3",
      authorId: "user6",
      coverImageId: null,
      attachmentIds: null,
      publishedAt: new Date("2023-08-20"),
      createdAt: new Date("2023-08-15"),
      updatedAt: new Date("2023-08-20"),
    },
  ];

  function handleLeave() {
    setTimeout(() => {
      const projectsDropdown = document.querySelector(
        '[data-dropdown="projects"]',
      );
      const projectsButton = document.querySelector(
        '[data-dropdown="projectsButton"]',
      );
      const blogDropdown = document.querySelector('[data-dropdown="blog"]');
      const blogButton = document.querySelector('[data-dropdown="blogButton"]');
      if (
        activeDropdown === "projects" &&
        projectsButton &&
        !projectsButton.matches(":hover") &&
        projectsDropdown &&
        !projectsDropdown.matches(":hover") &&
        blogButton &&
        !blogButton.matches(":hover") &&
        blogDropdown &&
        !blogDropdown.matches(":hover")
      ) {
        setActiveDropdown(null);
      }
    }, 500);
  }

  return (
    <header className="bg-background relative border-b print:border-none">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" prefetch className="flex items-center space-x-4">
          <div className="relative">
            <AnimatedLogo />
          </div>

          <motion.div
            className="flex items-center"
            initial={{ x: "-3rem" }}
            animate={{ x: "0rem" }}
            transition={{
              delay: 2,
              duration: 1.5,
              // Custom bezier curve with fast initial acceleration and slow, clean deceleration
              ease: [0.25, 0.1, 0.25, 1.0],
              // Alternative: ease: [0.3, 0, 0.2, 1] for a more pronounced effect
            }}
          >
            <AnimatedText
              text="The"
              className="-z-10 mx-[0.5rem] text-xl font-semibold"
              delayStart={2}
              staggerChildren={0.2}
              durationPerChar={0.5}
              direction="left"
            />
            <AnimatedText
              text="D"
              className="text-xl font-semibold"
              delayStart={0.2}
              direction="down"
            />
            <AnimatedText
              text="J"
              className="mx-[1/8rem] text-xl font-semibold"
              delayStart={0.4}
              direction="down"
            />
            <AnimatedText
              text="L"
              className="text-xl font-semibold"
              delayStart={0.6}
              direction="down"
            />
            <AnimatedText
              text="Foundation"
              className="mx-[0.5rem] text-xl font-semibold"
              delayStart={0.8}
              staggerChildren={0.1}
              durationPerChar={0.15}
              direction="left"
            />
          </motion.div>

          <span className="hidden font-semibold print:block print:text-xl">
            by DJL
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 transform items-center space-x-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/team" prefetch>
              Team
            </Link>
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              onMouseEnter={() => setActiveDropdown("projects")}
              onMouseLeave={handleLeave}
              data-dropdown="projects"
            >
              <Link href="/projects" prefetch>
                Projects
              </Link>
            </Button>
            {isDropdownEnabled && (
              <div
                className="absolute left-1/2 w-[800px] -translate-x-1/2 translate-y-[0.75rem] transform"
                onMouseEnter={() => setActiveDropdown("projects")}
                onMouseLeave={handleLeave}
                data-dropdown="projectsButton"
              >
                <ProjectDropdown
                  isOpen={activeDropdown === "projects"}
                  projects={featuredProjects}
                />
              </div>
            )}
          </div>

          <Button variant="ghost" asChild>
            <Link href="/products" prefetch>
              Products
            </Link>
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              onMouseEnter={() => setActiveDropdown("blog")}
              onMouseLeave={handleLeave}
              data-dropdown="blogButton"
            >
              <Link href="/blog" prefetch>
                Blog
              </Link>
            </Button>
            {isDropdownEnabled && (
              <div
                className="absolute left-1/2 w-[800px] -translate-x-1/2 translate-y-[0.75rem] transform"
                onMouseEnter={() => setActiveDropdown("blog")}
                onMouseLeave={handleLeave}
                data-dropdown="blog"
              >
                <BlogDropdown
                  isOpen={activeDropdown === "blog"}
                  posts={featuredBlogPosts}
                />
              </div>
            )}
          </div>
        </nav>

        <div className="flex h-10 items-center space-x-2 print:hidden">
          <ThemeToggle />

          <div className="relative h-10">
            <SignedIn>
              <UserButton
                showName
                appearance={userButtonAppearance}
                userProfileMode="navigation"
                userProfileUrl="/profile"
              />
            </SignedIn>
            <SignedOut>
              <Button className="flex h-10 items-center space-x-4" asChild>
                <SignInButton />
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
