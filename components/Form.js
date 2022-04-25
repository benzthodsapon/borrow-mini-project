import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Upload, message, Button, Rate } from "antd";
import BorrowService from "../api/product.service";
import axios from "axios";


async function postImage({ image }) {
  const formData = new FormData();
  await formData.append("image", image)
  console.log(formData);
  const result = await axios.post('http://localhost:3000/upload/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}

async function getImage({ key }) {
  const result = await axios.get(`http://localhost:3000/upload/images/${key}`);
  return result;
}


const FormBorrow = ({ onSubmit }) => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rate, setRating] = useState(0);
  const [count, setCount] = useState(0);
  const [file, setFile] = useState()
  const [imagesPreview, setImagePreview] = useState("")

  const fileSelected = event => {
    const file = event.target.files[0]
    if(file) {
      setFile(file)
      submit(event, file);
    }
	}
  
  const submit = async (event, files)=> {
    event.preventDefault();
    const result = await postImage({ image: files });
    setImagePreview(result?.location)
    setImage([result.image, ...image])
  }

  const handleSubmit = async (e) => {
    // create borrow
    e.preventDefault();
    try {
      await BorrowService.createBorrow(
        title,
        category,
        imagesPreview,
        description,
        price,
        rate,
        count
      ).then(
        (response) => {
          if (response) {
            console.log("response 2 : ", response);
            message.success(response.data.message);
            setTimeout(() => {
              window.location.reload();
            }, 500)
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

  const onCLickRating = async (value) => {
    setRating(value);
  };

  return (
    <div className="max-w-xl m-5 p-5 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="relative bg-transparent border-none leading-none flex flex-col items-center items-top justify-start">
        <p className="xl:text-2xl mt-3 lg:text-3xl sm:text-xl font-mono text-white text-indigo-100 animate-bounce">
          Create Borrow
        </p>
      </div>
      <div className="flex flex-col items-center pb-10">
        <div className="px-20 py-6 text-left">
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <div>
                <label className="block text-white font-mono" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  placeholder="Title"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-white font-mono">Category</label>
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-white font-mono">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  onChange={fileSelected}
                />
              </div>
              <div className="mt-4">
                <label className="block text-white font-mono">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-white font-mono">Price</label>
                <input
                  type="text"
                  placeholder="Price"
                  value={price}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block text-white font-mono">Rating</label>
                <Rate allowHalf defaultValue={0} onChange={onCLickRating} />
              </div>
              <div className="mt-4">
                <label className="block text-white font-mono">Count</label>
                <input
                  type="text"
                  placeholder="Count"
                  value={count}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
              <div className="flex items-baseline justify-between">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormBorrow;
