import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full p-6 justify-center flex-col gap-6 flex items-center bg-secondary">
      <span>@2023 My Giphy | All Rights Reserved</span>
      <div className="w-full flex justify-center gap-6 ">
        <Link href="https://www.github.com/sanjeevnode" target="_blank">
          <Github className="w-6 h-6 cursor-pointer" />
        </Link>
        <Link
          href="https://www.linkedin.com/in/sanjeev-singh-242122253"
          target="_blank"
        >
          <Linkedin className="w-6 h-6 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
