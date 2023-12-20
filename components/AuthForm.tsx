"use client";

import { auth } from "@/app/firebase/config";
import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Button } from "./ui/button";

interface AuthFormProps {
  mode: "signin" | "signup";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
    } else {
      const user = await setPersistence(auth, browserSessionPersistence).then(
        () => {
          return signInWithEmailAndPassword(email, password);
        }
      );

      if (user) {
        setEmail("");
        setPassword("");
        setError("");
        setLoading(false);
        router.push("/");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setLoading(false);
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setError(
        "Password should be alphanumeric and at least 8 characters long."
      );
      setLoading(false);
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          email,
          password
        );

        console.log(userCredential?.user?.email);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        setLoading(false);
        router.push("/sign-in");
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  const handleSubmit = mode === "signin" ? handleSignIn : handleSignUp;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-[90%] md:w-[40%]  gap-6 p-8 border rounded-md shadow-md z-50 bg-background"
    >
      <div className="flex justify-center items-center gap-4">
        <div className="w-10 h-10 relative">
          <Image
            src="/logo.png"
            fill
            className="object-contain"
            alt="My Giphy Logo"
          />
        </div>
        <span className="text-primary text-[25px] font-medium">My Giphy</span>
      </div>

      <div className="w-full flex flex-col gap-1">
        <label className="text-slate-500 text-sm">Email:</label>
        <input
          className="bg-[#f6f6f6] outline outline-black text-black px-2 py-1 rounded-sm"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <label className="text-slate-500 text-sm">Password:</label>
        <input
          className="bg-[#f6f6f6] outline outline-black text-black px-2 py-1 rounded-sm"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {mode === "signup" && (
        <div className="w-full flex flex-col gap-1">
          <label className="text-slate-500 text-sm">Confirm Password:</label>
          <input
            className="bg-[#f6f6f6] outline outline-black text-black px-2 py-1 rounded-sm"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      )}

      <div className="flex gap-2 justify-start items-center ">
        <input
          type="checkbox"
          id="show-password"
          checked={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
          className="cursor-pointer"
        />
        <label
          htmlFor="show-password"
          className="cursor-pointer text-slate-500 text-sm"
        >
          Show Password
        </label>
      </div>

      <Button
        type="submit"
        className="bg-primary text-white py-2 rounded-md flex justify-center items-center "
      >
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : mode === "signin" ? (
          "Sign In"
        ) : (
          "Sign Up"
        )}
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
      {
        <p className="text-sm text-slate-500">
          {mode === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <Link
            href={mode === "signin" ? "/sign-up" : "/sign-in"}
            className="text-primary underline"
          >
            {mode === "signin" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      }
    </form>
  );
};

export default AuthForm;
