import { useEffect, useState } from "react";

//Router
import { useRouter } from 'next/router'

// components
import Navbar from "../components/Navbar";
import FormBorrow from "../components/Form";
import { message } from "antd";

//api
import ProductService from "../api/product.service";
import AuthService from "../api/auth.service";

export default function Borrow() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(undefined);
      router.push("/");
      message.warning("Pleas Login Borrow !", 1.5)
    }
  }, [currentUser]);

  // get my borrow profuct 
  useEffect(() => {
    ProductService.getAllProduct().then(
      (response) => {
        setPosts(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [])

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
            <FormBorrow />
          </div>
        </div>
      </div>
    </>
  );
}
