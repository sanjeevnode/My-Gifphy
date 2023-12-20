"use client";

import { useAuthContext } from "@/context/AuthContextProvider";
import {
  addToFavorites,
  removeFromFavorites,
} from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const GifCard = ({ gif, isFav }: { gif: string; isFav?: boolean }) => {
  const [fav, setFav] = useState(false);
  const { user } = useAuthContext() || {};

  useEffect(() => {
    if (isFav) setFav(isFav as boolean);
  }, [isFav]);

  const handleAddToFav = async () => {
    if (isFav) {
      await removeFromFavorites(user?.uid as string, gif);
      setFav(!fav);
      toast.success("Removed from favorites");
    } else {
      setFav(!fav);
      try {
        await addToFavorites(user?.uid as string, gif);
        toast.success("Added to favorites");
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="w-[300px] h-[300px] p-2 bg-stone-300 rounded-sm cursor-pointer group relative">
      <div
        onClick={handleAddToFav}
        style={{
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        className={`w-6 h-6 absolute top-4 right-4  group-hover:block transition-all duration-300 hover:scale-150 ${
          fav ? "bg-yellow-500" : "bg-white  outline-slate-500"
        }`}
      />
      <img src={gif as string} alt="" className="w-full h-full rounded-sm" />
    </div>
  );
};

export default GifCard;
