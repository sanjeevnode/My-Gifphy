"use client";
import GifCard from "@/components/GifCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { useUser } from "@/context/UserProvider";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  const { currentUser } = useUser() || {};
  const gifs = currentUser?.gifs;
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Navbar />
      <main className=" p-4 pt-10 md:pt-16 flex flex-col gap-10 border">
        <span className="text-[28px] text-slate-500 underline underline-offset-2 w-full text-center">
          Favorites
        </span>
        <div
          className={`grid grid-cols-1 ${
            gifs && gifs.length > 0 && "md:grid-cols-3"
          } gap-4 justify-items-center outline-dashed outline-gray-400 p-4`}
        >
          {gifs && gifs.length > 0 ? (
            gifs.map((gif, index) => {
              return <GifCard gif={gif as string} key={index} isFav={true} />;
            })
          ) : (
            <>
              <div className="w-[250px] h-[250px] relative">
                <Image src="/gif.png" alt="gif" fill className="object-fill" />
              </div>
              {loading ? (
                <span className="mb-4 flex gap-2 text-slate-500 text-[20px] items-center">
                  Loading{" "}
                  <RefreshCcw className="ml-4 w-5 h-5 animate-spin duration-700 transition-all" />{" "}
                </span>
              ) : (
                <span className="text-slate-500 text-[18px]">
                  No Gif to show !
                </span>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
