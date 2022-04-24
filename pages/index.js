import styles from "../styles/Home.module.css";
// import test from '../pages/api/hello'
import { useEffect, useState } from "react";
import ProductService from "../pages/api/product.service";

//Router 
import { useRouter } from 'next/router'

// components
import Navbar from "../components/Navbar";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter()

  useEffect(() => {
    ProductService.getAllProduct().then(
      (response) => {
        setPosts(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12">
      <div className="max-w-7xl mx-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg"></div>
        <div className="flex flex-col">
          <div className="relative bg-transparent border-none leading-none flex flex-col items-center items-top justify-start">
            <p className="xl:text-2xl lg:text-3xl sm:text-xl font-mono text-white text-indigo-100 animate-bounce">
              The Borrowing System
            </p>
            <p className="xl:text-2xl rounded-md animate-pulse lg:text-3xl sm:text-xl font-mono text-white">
              That can borrow everything
            </p>
          </div>
          <div className="relative m-3 mt-5 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 cursor-pointer px-3 py-3 bg-white ring-1 ring-gray-900/5 rounded-full leading-none flex items-center justify-start" onClick={() => router.push("/login?type=customer")}>
            <img
              src="/assets/search.png"
              className="h-10 w-10 lg:h-20 lg:w-20 ml-4"
            />
            <span className="lg:text-2xl ml-4 lg:ml-7  hover:text-white font-mono font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              CUSTOMER
            </span>
          </div>
          <div className="relative cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 m-3 px-3 py-3 bg-white ring-1 ring-gray-900/5 rounded-full leading-none flex items-center justify-start" onClick={() => router.push("/login?type=borrow")}>
            <img
              src="/assets/team.png"
              className="h-10 w-10 lg:h-20 lg:w-20 ml-4"
            />
            <span className="lg:text-2xl ml-5 lg:ml-7  hover:text-white font-mono font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              BORROW
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
