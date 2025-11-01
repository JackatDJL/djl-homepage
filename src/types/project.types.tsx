import Image from "next/image";
import z from "zod";

export class Project {
  public GeneratorSchema = z.object({
    identifier: z
      .string()
      .min(2)
      .max(24)
      .describe("Identifier to register the Path of the Project to"),

    type: z
      .enum(["roadmap", "wip", "openbeta", "production"])
      .default("wip")
      .optional(),

    title: z.string().max(256),
    description: z.string().optional(),

    oss: z
      .boolean()
      .default(true)
      .optional()
      .describe("Is the project open source?"),
    private: z
      .boolean()
      .default(false)
      .optional()
      .describe("Should this project be shown on the site?"),
    featured: z
      .boolean()
      .default(false)
      .optional()
      .describe("Should this project be featured on the homepage?"),

    coverImage: z
      .string()
      .startsWith("/")
      .nullable()
      .optional()
      .describe("NextJs Path to cover image"),
    logoImage: z
      .string()
      .startsWith("/")
      .nullable()
      .optional()
      .describe("NextJs Path to logo image"),

    // contributorIds: z.array(z.string()).optional(),

    createdAt: z
      .date()
      .default(() => new Date())
      .optional(),
  });
  private identifier: ProjectGeneratorType["identifier"];
  private type: ProjectGeneratorType["type"];
  private title: ProjectGeneratorType["title"];
  private description: ProjectGeneratorType["description"];
  private oss: ProjectGeneratorType["oss"];
  private private: ProjectGeneratorType["private"];
  private featured: ProjectGeneratorType["featured"];
  private coverImage: ProjectGeneratorType["coverImage"];
  private logoImage: ProjectGeneratorType["logoImage"];
  // contributorIds: ProjectType["contributorIds"];
  private createdAt: ProjectGeneratorType["createdAt"];

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

const _test = new Project({
  identifier: "test-project",
  type: "wip",
  title: "Test Project",
  description: "This is a test project",
  oss: true,
  private: false,
  featured: false,
  createdAt: new Date(),
});

export type ProjectGeneratorType = z.infer<Project["GeneratorSchema"]>;

export type ProjectType = typeof Project;
