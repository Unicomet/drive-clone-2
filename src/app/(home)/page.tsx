import { Button } from "../../components/ui/button";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default function HomePage() {
  return (
    <>
      <header className="mb-12 text-center">
        <h1 className="mb-6 font-sans text-6xl font-bold text-balance text-white md:text-7xl">
          Memo Drive
        </h1>
        <p className="text-secondary mx-auto max-w-2xl text-xl leading-relaxed text-pretty md:text-2xl">
          Your digital memory companion. Store, organize, and access your
          thoughts effortlessly.
        </p>
      </header>

      <main className="mb-16 text-center">
        <form
          action={async () => {
            "use server";
            const session = await auth();

            if (!session.userId) {
              redirect("/sign-in");
            }

            redirect("/drive");
          }}
        >
          <Button
            size="lg"
            type="submit"
            className="bg-accent pointer text-accent-foreground hover:bg-accent/90 transform rounded-lg px-8 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            Get Started
          </Button>
        </form>
      </main>

      {/* Footer */}
      <footer className="text-muted-foreground text-center text-sm">
        <p>&copy; 2024 Memo Drive. All rights reserved.</p>
      </footer>
    </>
  );
}
