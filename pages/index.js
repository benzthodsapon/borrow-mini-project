import styles from '../styles/Home.module.css'
// import test from '../pages/api/hello'
import { useEffect } from 'react';

export default function Home() {
  
  useEffect(() => {
  }, [])

  return (
    <div className={`${styles.container} text-2xl`}>
      Hello World
    </div>
  )
}
