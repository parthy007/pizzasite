"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCreatingUser(true);
    await signIn("credentials", { email, password });
    setCreatingUser(false);
  };

  return (
    <section className="mt-16">
      <h1 className="text-primary font-bold text-4xl text-center mb-4">
        Login
      </h1>
      {userCreated && (
        <div className="text-center text-green-700">
          User successfully created.&nbsp;
          <Link href={"/login"} className="underline">
            Login
          </Link>{" "}
          &raquo;
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 underline">
          Error has occured.&nbsp; Please try again
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          disabled={creatingUser}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          disabled={creatingUser}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Login
        </button>
        <div className="text-center text-gray-500 my-4">
          or login with provider
        </div>
        <button className="flex gap-4 justify-center ">
          <Image src={"/google.png"} width={24} height={24} alt="googlelogo" />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500">
          Create new account.{" "}
          <Link className="underline" href={"/register"}>
            Register
          </Link>
          &raquo;
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
