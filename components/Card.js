import React from "react";
import { Rate } from "antd";
import { useRouter } from "next/router";
import BorrowService from "../api/product.service";

const Card = ({
  idProduct,
  des,
  image,
  category,
  count,
  price,
  rate,
  title,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const handleCreateBorrow = async (e) => {
    e.preventDefault();
    try {
      await BorrowService.createBorrow(
        title,
        category,
        image,
        des,
        222,
        rate,
        count
      ).then(
        (response) => {
          if (response) {
            console.log("response 2 : ", response);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-xl m-5 p-5 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 w-20 h-20 m-3 p-1 rounded-lg shadow-lg"
          src={image}
          alt={title}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {category}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          COUNT: {count}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          PRICE: {price} THB
        </span>
        {id && (
          <span className="text-sm m-7 text-gray-500 dark:text-gray-400">
            {des}
          </span>
        )}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          <Rate allowHalf disabled defaultValue={rate} />
        </span>
        <div className="flex mt-4 space-x-3 lg:mt-6">
          <a
            type="submit"
            onClick={handleCreateBorrow}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Borrow
          </a>
          <a
            onClick={() => router.push(`/products/${idProduct}`)}
            href="#"
            className="inline-flex items-center py-2 px-4 text-sm text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View Detail
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
