import styles from '../styles/Home.module.css'
// import test from '../pages/api/hello'
import { useEffect, useState } from 'react';
import ProductService from "../pages/api/product.service";
 
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    ProductService.getAllProduct().then(
      (response) => {
        setPosts(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  console.log("posts .. ",posts);

  return (
    <div className={`${styles.container} text-2xl`}>
      Home
    </div>
  )
}
