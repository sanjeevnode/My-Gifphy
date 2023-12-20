"use client";
import DisplayBoard from "@/components/DisplayBoard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { useAuthContext } from "@/context/AuthContextProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuthContext() || {};
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user]);

  return (
    <main>
      <Navbar />
      <DisplayBoard />
      <Footer />
    </main>
  );
}
