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

  // Function to close any active dropdown
  const closeDropdown = () => {
    setActiveDropdown(null);
  };

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
            {" "}
            by DJL{" "}
          </span>
        </Link>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 transform items-center space-x-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/team" prefetch>
              {" "}
              Team{" "}
            </Link>
          </Button>
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("projects")}
            onMouseLeave={closeDropdown} // Use closeDropdown here
          >
            <Button variant="ghost" data-dropdown="projectsButton">
              <Link href="/projects" prefetch>
                {" "}
                Projects{" "}
              </Link>
            </Button>
            {isDropdownEnabled && (
              <div
                className="absolute left-1/2 w-[800px] -translate-x-1/2 translate-y-[0.75rem] transform"
                data-dropdown="projects"
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
              {" "}
              Products{" "}
            </Link>
          </Button>
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("blog")}
            onMouseLeave={closeDropdown} // Use closeDropdown here
          >
            <Button variant="ghost" data-dropdown="blogButton">
              <Link href="/blog" prefetch>
                {" "}
                Blog{" "}
              </Link>
            </Button>
            {isDropdownEnabled && (
              <div
                className="absolute left-1/2 w-[800px] -translate-x-1/2 translate-y-[0.75rem] transform"
                data-dropdown="blog"
              >
                <BlogDropdown
                  isOpen={activeDropdown === "blog"}
                  onClose={closeDropdown} // Pass the closeDropdown function
                />
              </div>
            )}
          </div>
        </nav>
        <div className="flex h-10 items-center space-x-2 print:hidden">
          <ThemeToggle />
          <div className="relative h-10">
            <SignedIn>
              <UserButton showName appearance={{ ...userButtonAppearance }} />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
