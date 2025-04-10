import { UserProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <UserProfile />
      </div>
    </main>
  );
}
