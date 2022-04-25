import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { message } from "antd";

// components
import Navbar from "../components/Navbar";
import Card from "../components/Card";

//api
import AuthService from "../api/auth.service";
import ProductService from "../api/product.service";

export default function Order() {
  const [borrow, setBorrow] = useState([{}])
  const [currentUser, setCurrentUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(undefined);
      router.push("/");
    }
  },[]);

   // get my order borrow profuct 
   useEffect(() => {
    ProductService.getAllBorrow().then(
      (response) => {
        setBorrow(response.data.response);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center relative overflow-hidden sm:py-12">
        <div className="max-w-7xl mx-auto">
        <p className="xl:text-2xl lg:text-3xl sm:text-xl font-mono text-white text-indigo-100 animate-bounce">
          My Order Borrow
        </p>
          <div className="grid grid-cols-5 gap-5 -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
            {borrow && borrow.map((item, index) => {
              return (
                <>
                  <Card
                    key={index}
                    idProduct={item.id}
                    des={item.description}
                    category={item.category}
                    image={item.image}
                    price={item.price}
                    count={item.count}
                    rate={item.rate}
                    title={item.title}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}
