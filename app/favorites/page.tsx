"use client";
import GifCard from "@/components/GifCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { useAuthContext } from "@/context/AuthContextProvider";
import { useUser } from "@/context/UserProvider";
import { getFavorites } from "@/lib/actions/user.actions";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
interface User {
  userId: string;
  gifs: string[];
}
const page = () => {
  const { currentUser, setCurrentUser } = useUser() || {};
  const gifs = currentUser?.gifs;
  const [loading, setLoading] = React.useState(false);
  const { user } = useAuthContext() || {};
  const router = useRouter();

  const getGif = async () => {
    try {
      getFavorites(user?.uid!).then((gifs) => {
        setCurrentUser((currentUser: User | null) => ({
          ...currentUser!,
          gifs: gifs || [],
        }));
        setLoading(false);
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    } else {
      getGif();
    }
  }, [user]);

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
