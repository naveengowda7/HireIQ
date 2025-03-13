import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import Auth from "./Auth";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/auth">SignIn</Link>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default Home;
