// import test from '../pages/api/hello'
import { useEffect } from "react";
// components
import Navbar from "../../components/Navbar";

export default function Products() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
            Products
          </div>
        </div>
      </div>
    </>
  );
}
