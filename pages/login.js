import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { message } from 'antd';

//api
import authService from "../api/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [user, setUser] = useState({});
  const { type } = router.query;

  useEffect(() => {}, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password).then(
        (response) => {
          if (response.data) {
            if (type === "borrow" && response.data.role === "borrow") {
              router.push("/borrow");
            } else {
              router.push("/products");
            }
          }
        },
        (error) => {
          message.error(error.response.data.errors[0].msg, 1.5)
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
                <form onSubmit={handleLogin}>
                  <div className="mt-4">
                    <div>
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
                    <div className="flex items-baseline justify-between">
                      <button
                        type="submit"
                        className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                      >
                        Login
                      </button>
                      <a
                        href={`/signup?type=${type}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Sign Up
                      </a>
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
