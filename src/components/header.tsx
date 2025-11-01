"use client";
import { Project } from "§/project.types";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "~ui/button";
import { AnimatedLogo } from "./animated-logo";
import { AnimatedText } from "./discontinued/animated-text";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  isDropdownEnabled?: boolean;
}

export default function Header({
  isDropdownEnabled: _isDropdownEnabled,
}: HeaderProps) {
  const [_activeDropdown, setActiveDropdown] = useState<
    "projects" | "blog" | null
  >(null);

  const _userButtonAppearance = {
    elements: {
      userButtonBox: "h-10",
      userButtonAvatarBox: "h-10 w-10",
    },
  };

  // Test data for projects
  const _featuredProjects = [
    {
      identifier: "atlas",
      type: "production" as const,
      title: "Project Atlas",
      description:
        "A comprehensive mapping solution for enterprise applications",
      oss: true,
      private: false,
      featured: true,
      coverImage: null,
      logoImage: null,
      createdAt: new Date("2023-01-15"),
    },
    {
      identifier: "nexus",
      type: "openbeta" as const,
      title: "Nexus Platform",
      description: "Connecting disparate systems through a unified API gateway",
      oss: true,
      private: false,
      featured: true,
      coverImage: null,
      logoImage: null,
      createdAt: new Date("2023-03-10"),
    },
    {
      identifier: "quantum",
      type: "wip" as const,
      title: "Quantum Analytics",
      description:
        "Next-generation data analytics platform with AI capabilities",
      oss: false,
      private: true,
      featured: true,
      coverImage: null,
      logoImage: null,
      createdAt: new Date("2023-05-22"),
    },
  ].map((proj) => new Project(proj));

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
              className="-z-10 mx-2 text-xl font-semibold"
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
              className="mx-2 text-xl font-semibold"
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
              Team
            </Link>
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              onMouseEnter={() => setActiveDropdown("projects")}
              onMouseLeave={closeDropdown}
              onFocus={() => setActiveDropdown("projects")}
              onBlur={closeDropdown}
              asChild
            >
              <Link href="/projects" prefetch data-dropdown="projectsButton">
                Projects
              </Link>
            </Button>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/products" prefetch>
              Products
            </Link>
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              asChild
              onMouseEnter={() => setActiveDropdown("blog")}
              onMouseLeave={closeDropdown}
              onFocus={() => setActiveDropdown("blog")}
              onBlur={closeDropdown}
            >
              <Link href="/blog" prefetch data-dropdown="blogButton">
                Blog
              </Link>
            </Button>
          </div>
        </nav>
        <div className="flex h-10 items-center space-x-2 print:hidden">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
