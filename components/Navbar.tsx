"use client";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthContext } from "@/context/AuthContextProvider";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { user } = useAuthContext() || {};
  const pathname = usePathname();
  const isFavorites = pathname === "/favorites";

  return (
    <nav className="w-full p-4 flex justify-between items-center">
      <Link href="/" className="flex justify-center items-center gap-4">
        <div className="w-10 h-10 relative">
          <Image
            src="/logo.png"
            fill
            className="object-contain"
            alt="My Giphy Logo"
          />
        </div>
        <span className="text-primary text-[25px] font-medium">My Giphy</span>
      </Link>

      <div className="hidden md:flex justify-between items-center gap-10 ">
        <Link href="/favorites" className="group">
          <p className="flex cursor-pointer">
            <Star
              className={`w-5 h-5 mr-1 text-slate-500${
                isFavorites && "text-yellow-500"
              }  group-hover:text-yellow-500`}
            />
            <span className="text-[16px] text-slate-500"> Favorites</span>
          </p>
        </Link>

        <span className="text-blue-400 p-1  rounded-sm">{user?.email}</span>

        <Button variant="outline" onClick={() => signOut(auth)}>
          Sign Out
        </Button>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <Image
              src="/menu.svg"
              alt="menu"
              width={30}
              height={30}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-10 bg-white md:hidden">
            <div className="flex justify-start items-center gap-4">
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo.png"
                  fill
                  className="object-contain"
                  alt="My Giphy Logo"
                />
              </div>
              <span className="text-primary text-[25px] font-medium">
                My Giphy
              </span>
            </div>

            <div className="flex flex-col gap-8 ">
              <span className="text-blue-400 p-1  rounded-sm">
                {user?.email}
              </span>
              <Link href="/favorites" className="group">
                <p className="flex cursor-pointer">
                  <Star className="w-5 h-5 mr-1 text-slate-500 group-hover:text-yellow-500" />
                  <span className="text-[16px] text-slate-500"> Favorites</span>
                </p>
              </Link>

              <Button variant="outline" onClick={() => signOut(auth)}>
                Sign Out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
