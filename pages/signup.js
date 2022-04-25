import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { message } from "antd";
//api
import authService from "../api/auth.service";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { type } = router.query;

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(name, email, password, type).then(
        (response) => {
          if (response.accessToken) {
            if (type === "borrow") {
              message.success("Register Borrow Success !");
              router.push("/borrow");
            } else {
              message.success("Register Success !");
              router.push("/products");
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
            <div className="flex items-center flex-col justify-center min-h-screen">
              <div className="relative bg-transparent border-none leading-none flex flex-col items-center items-top justify-start">
                <p className="xl:text-2xl mt-5 lg:text-3xl sm:text-xl font-mono text-white text-indigo-100 animate-bounce">
                  The Borrowing System
                </p>
                <p className="xl:text-2xl rounded-md animate-pulse lg:text-3xl sm:text-xl font-mono text-white">
                  That can borrow everything
                </p>
              </div>
              <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
                <form onSubmit={handleSignup}>
                  <div className="mt-4">
                    <div>
                      <label className="block" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="text"
                        placeholder="Email"
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex items-baseline justify-center">
                      <button
                        type="submit"
                        className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
