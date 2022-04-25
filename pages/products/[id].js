import { useEffect, useState } from "react";

//Router
import { useRouter } from "next/router";
// components
import Navbar from "../../components/Navbar";

import ProductService from "../../api/product.service";
import Card from "../../components/Card";

export default function ProductsById() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    await ProductService.getAllProduct().then(
      (response) => {
        const product = response?.data.find((item) => item.id === +id);
        setProduct(product);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12">
        <div className="max-w-xl mx-auto">
          <div className="flex -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
            {product && product?.rating?.rate && (
              <Card
                des={product?.description}
                category={product?.category}
                image={product?.image}
                price={product?.price}
                count={product?.rating?.count}
                rate={product?.rating?.rate}
                title={product?.title}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
