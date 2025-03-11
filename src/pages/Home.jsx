import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";

const Home = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="redirect" redirectUrl="/auth" />
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Home;
