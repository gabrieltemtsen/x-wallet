import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Link,
  BlockTitle,
} from 'konsta/react';
import { useConvexAuth } from "convex/react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900" onClick={() => loginWithRedirect()}>Log In or Sign up</button>;
};

export default LoginButton;