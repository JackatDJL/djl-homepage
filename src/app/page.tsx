import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to The DJL Foundation
        </h1>
        <p className="text-lg mb-8">
          Test page transitions by navigating between pages.
        </p>
        <div className="flex gap-4">
          <Link
            href="/curve"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Go to Curve Page
          </Link>
        </div>
      </main>
    </div>
  );
}
