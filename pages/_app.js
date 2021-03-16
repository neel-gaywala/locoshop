import React, {useEffect} from 'react';
import '../styles/styles.scss';
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if(router.pathname === '/') {
      router.push('/home', '/home');
    }
  }, [])
  // 
  // router.push('/home');

  return <Component {...pageProps} />
}

export default MyApp
