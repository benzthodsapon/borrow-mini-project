import axios from "axios";

const API_URL = "http://localhost:3000/borrow";
const PRODUCT_API = "https://fakestoreapi.com/products";

const getAllProduct = () => {
  return axios.get(PRODUCT_API);
};

const createBorrow = (
  title,
  category,
  image,
  description,
  price,
  rating,
  count
) => {
  return axios.post(API_URL + "/new", {
    title,
    category,
    image,
    description,
    price,
    rating,
    count,
  }).then((response) => {
    if(response) {
      console.log("response : ",response);
    }
    return response;
  })
};

const productService = {
  getAllProduct,
  createBorrow
};

export default productService;
