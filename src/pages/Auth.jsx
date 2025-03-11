import React from "react";
import { SignIn, SignInButton } from "@clerk/clerk-react";

const Auth = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome! Please Sign In</h2>
      <SignIn />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  heading: {
    marginBottom: "20px",
  },
};

export default Auth;
