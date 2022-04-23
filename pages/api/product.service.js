import axios from "axios";

const API_URL = "/products";
const PRODUCT_API = "https://fakestoreapi.com/products";

const getAllProduct = () => {
  return axios.get(PRODUCT_API);
};

console.log("getAllProduct .. ",getAllProduct);

// const getProductById = () => {
//   return axios.get(API_URL + "/public");
// };

// const addProduct= () => {
//   return axios.get(API_URL + "/public");
// };

// const deleteProduct = () => {
//   return axios.get(API_URL + "/public");
// };

// const updateProduct = () => {
//   return axios.get(API_URL + "/public");
// };

// const getAllPrivatePosts = () => {
//   return axios.get(API_URL + "/private", { headers: authHeader() });
// };

const productService = {
  getAllProduct,
};

export default productService;