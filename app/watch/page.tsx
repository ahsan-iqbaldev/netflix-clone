import { AiOutlineArrowLeft } from "react-icons/ai";
import { movies } from "../../context/index";
import Link from "next/link";

const page = () => {
  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
      <Link href='/'>
        <AiOutlineArrowLeft className="text-white" size={40} />
        </Link>
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {movies[0]?.title}
        </p>
      </nav>
      <video autoPlay controls className="h-full w-full" src={movies[0]?.videoUrl}></video>
    </div>
  );
};

export default page;
