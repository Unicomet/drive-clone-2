import { SignedOut, SignInButton } from "@clerk/nextjs";

export default function SingInPage() {
  return (
    <>
      <div className="mb-8 text-3xl">Sign In Page</div>
      <SignInButton forceRedirectUrl={"/drive"} />
      <footer className="mt-12">
        © {new Date().getFullYear()} Memo Drive. All rights reserved.
      </footer>
    </>
  );
}
