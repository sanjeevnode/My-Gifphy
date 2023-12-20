"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, RefreshCcw, Search } from "lucide-react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import Image from "next/image";
import GifCard from "./GifCard";
import toast from "react-hot-toast";

const gf = new GiphyFetch("GlVGYHkr3WSBnllca54iNt0yFbjz7L65");

const DisplayBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const GIF_LIMIT = 18;

  const [gifs, setGifs] = useState<String[]>([]);

  const getGif = async () => {
    try {
      setLoading(true);
      await gf
        .search(searchTerm, {
          limit: GIF_LIMIT,
        })
        .then((res) => {
          setGifs(res.data.map((gif) => gif.images.original.url));
          setLoading(false);
        });
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!!searchTerm || searchTerm.length <= 0) {
      getGif();
    } else {
      setGifs([]);
    }
  }, [searchTerm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setGifs([]);

    if (!!searchTerm) {
      try {
        await gf
          .search(searchTerm, {
            limit: GIF_LIMIT,
          })
          .then((res) => {
            setGifs(res.data.map((gif) => gif.images.original.url));
            setLoading(false);
          });
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("Please enter a search term");
      setLoading(false);
    }
  };

  //   Pagination

  const nextPage = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <section className=" p-4 pt-10 md:pt-16 flex flex-col gap-10">
      {/*Search Bar  */}

      <form
        onSubmit={handleSubmit}
        className="w-full  md:px-10 flex justify-center gap-4 relative"
      >
        <Search
          className="absolute left-[5px] md:left-[46px] text-slate-500 top-[13px]"
          size={15}
        />
        <Input
          //   ref={inputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm((prev) => e.target.value)}
          placeholder="search gif here ..."
          type="text"
          className="px-7"
        />
        <Button>Search</Button>
      </form>

      {/* Display Board */}

      <div
        className={`grid grid-cols-1 ${
          gifs.length > 0 && "md:grid-cols-3"
        } gap-4 justify-items-center outline-dashed outline-gray-400 p-4`}
      >
        {gifs && gifs.length > 0 ? (
          gifs.map((gif, index) => {
            return <GifCard gif={gif as string} key={index} />;
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
      <div className="w-full flex p-2 justify-center items-center gap-3">
        <ArrowLeft className="w-5 h-5 text-slate-500 outline outline-slate-500 rounded-sm" />
        <span>1</span>
        <ArrowRight className="w-5 h-5 text-slate-500 outline outline-slate-500 rounded-sm" />
      </div>
    </section>
  );
};

export default DisplayBoard;
