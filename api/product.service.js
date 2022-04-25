import axios from "axios";

const API_URL = "http://localhost:3000/borrow";
const PRODUCT_API = "https://fakestoreapi.com/products";

const getAllProduct = () => {
  return axios.get(PRODUCT_API);
};

// create borrow
const createBorrow = (
  title,
  category,
  image,
  description,
  price,
  rate,
  count
) => {
  return axios.post(API_URL + "/new", {
    title,
    category,
    image,
    description,
    price,
    rate,
    count,
  }).then((response) => {
    if(response) {
      console.log("response : ",response);
    }
    return response;
  })
};

// get all borrow 
const getAllBorrow = () => {
  return axios.get(API_URL + "/all").then((response) => {
    if(response) {
      return response;
    }
  })
};

const productService = {
  getAllProduct,
  createBorrow,
  getAllBorrow
};

export default productService;
