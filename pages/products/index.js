import { useEffect, useState } from "react";

//Router
import { useRouter } from "next/router";
// components
import Navbar from "../../components/Navbar";

import ProductService from "../../api/product.service";
import Card from "../../components/Card";

export default function Products() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    ProductService.getAllProduct().then(
      (response) => {
        console.log(response);
        setPosts(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-5 gap-5 -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
            {posts.map((item, index) => {
              return (
                <>
                  <Card
                    key={index}
                    idProduct={item.id}
                    des={item.description}
                    category={item.category}
                    image={item.image}
                    price={item.price}
                    count={item?.rating?.count}
                    rate={item?.rating?.rate}
                    title={item.title}
                  />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
