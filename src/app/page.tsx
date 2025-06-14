import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Auth.js with Drizzle Demo</h1>
      {session ? (
        <div className="text-center">
          <p className="text-xl mb-4">Welcome back, {session.user?.name}!</p>
          <Button asChild>
            <Link href="/welcome">Go to Welcome Page</Link>
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
