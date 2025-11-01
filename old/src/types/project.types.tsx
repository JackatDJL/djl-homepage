import Image from "next/image";
import z from "zod";

export class Project {
  public GeneratorSchema = z.object({
    identifier: z.string().min(2).max(24),

    type: z.enum(["roadmap", "wip", "openbeta", "production"]),

    title: z.string().max(256),
    description: z.string().optional(),

    oss: z.boolean().default(true),
    private: z.boolean().default(false),
    featured: z.boolean().default(false),

    coverImage: z
      .string()
      .startsWith("/")
      .nullable()
      .describe("NextJs Path to cover image"),
    logoImage: z
      .string()
      .startsWith("/")
      .nullable()
      .describe("NextJs Path to logo image"),

    // contributorIds: z.array(z.string()).optional(),

    createdAt: z.date(),
  });
  private identifier: ProjectType["identifier"];
  private type: ProjectType["type"];
  private title: ProjectType["title"];
  private description: ProjectType["description"];
  private oss: ProjectType["oss"];
  private private: ProjectType["private"];
  private featured: ProjectType["featured"];
  private coverImage: ProjectType["coverImage"];
  private logoImage: ProjectType["logoImage"];
  // contributorIds: ProjectType["contributorIds"];
  private createdAt: ProjectType["createdAt"];

  constructor(request: z.infer<typeof this.GeneratorSchema>) {
    const data = this.GeneratorSchema.parse(request);

    this.identifier = data.identifier;
    this.type = data.type;
    this.title = data.title;
    this.description = data.description;
    this.oss = data.oss;
    this.private = data.private;
    this.featured = data.featured;
    this.coverImage = data.coverImage;
    this.logoImage = data.logoImage;
    // this.contributorIds = data.contributorIds;
    this.createdAt = data.createdAt;
  }

  public CoverImage() {
    return (
      <Image
        src={this.coverImage ?? "/images/default-cover.png"}
        alt={this.title}
        layout="responsive"
        width={500}
        height={300}
      />
    );
  }

  public LogoImage() {
    return (
      <Image
        src={this.logoImage ?? "/images/default-logo.png"}
        alt={this.title}
        width={100}
        height={100}
      />
    );
  }
}

export type ProjectType = z.infer<Project["GeneratorSchema"]>;
