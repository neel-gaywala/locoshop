import React, { useEffect, useState } from "react";
import axios from "axios";
import i18n from "../../i18n";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { ResultItems } from "../../Components/List/ResultItems";

//import "./Brand.scss";
import { PopularProduct } from "../../types/popularProduct";
import { PageTitle } from "../../Components/PageTitle";
import { PopularBrand } from "../../types";
import { PageLoading } from "../../Components/PageLoading";
import { Helmet } from "react-helmet";
import { useRouter } from "next/router";

export function Brand() {
  const [popularProductsByBrand, setPopularProductsByBrand] = useState(
    new Array<PopularProduct>()
  );
  const router = useRouter();
  const [popularBrand, setPopularBrand] = useState(new Array<PopularBrand>());
  const { name } = router.query as {
    name: string;
  };

  

    useEffect(() => {
      if(name) {
      const getPopularProductsByBrand = async () => {
        const result = await axios(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/popular/${name}`
        );
        await setPopularProductsByBrand(result.data);
      };
      const getPopularBrand = async () => {
        const result = await axios(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/brands/popular/${name}`
        );
        await setPopularBrand(result.data);
      };
      getPopularBrand();
      getPopularProductsByBrand();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    }, []);

  return (
    <div>
      <Helmet>
        <div>
          <title>
            {i18n.t("popular_product_by_brand.title")} - {name}
          </title>
          <meta name="description" content={name} />
        </div>
      </Helmet>
      <Header />
      <PageTitle
        title={i18n.t("popular_product_by_brand.title")}
        subtitle={name}
        imgSource=""
      ></PageTitle>
      {popularBrand.length === 0 ? (
        <PageLoading />
      ) : (
        popularBrand.map((brand: PopularBrand, index: number) => {
          // Some logo are in local folder, some others an url link
          const imageLink = brand.imgSrc.startsWith("http")
            ? brand.imgSrc
            : "../" + brand.imgSrc;
          return (
            <div className="brand-content" key={index}>
              <div className="brand">
                <img
                  src={imageLink}
                  alt={brand.name + " logo"}
                  className="img-logo"
                />
              </div>
              <div className="thin-border"></div>
              <div className="product">
                {popularProductsByBrand &&
                popularProductsByBrand.length === 0 ? (
                  <div className="no-product">
                    <h2>{i18n.t("no_product")}</h2>
                  </div>
                ) : (
                  <ResultItems
                    title="popular"
                    results={popularProductsByBrand}
                  />
                )}
              </div>
            </div>
          );
        })
      )}
      <Footer />
    </div>
  );
}

export default Brand;

// export default React.memo(PopularProductsByBrand);
