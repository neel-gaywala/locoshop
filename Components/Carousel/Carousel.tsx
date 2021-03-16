import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import i18n from "../../i18n";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import "./Carousel.scss";
import { PopularBrand } from "../../types";
import axios from "axios";
import slickCarouselSettings from "./carousel.settings.json";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { eventTracking } from "../../useTracking";

export function Carousel() {
  const [popularBrands, setPopularBrands] = useState<Array<PopularBrand>>(null);
  
  async function getPopularBrands() {
    
    return await axios(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/brands/popular`);
  }

  useEffect(() => {
    let isMounted = false;
    (async () => {
      const results = await getPopularBrands();
      if (!isMounted) {
        setPopularBrands(results.data);
      }
    })();
    return () => (isMounted = true);
  }, []);

  var settings = slickCarouselSettings;
  return (
    <div
      className={`carousel ${
        popularBrands && popularBrands.length == 0 ? "hide" : ""
      } `}
    >
      <Slider {...settings} className="slider-carousel">
        {!popularBrands ? (
          <div className="loader">
            <FontAwesomeIcon icon={faCircleNotch} spin />
          </div>
        ) : (
          popularBrands.map((brand: PopularBrand, key: number) => {
            if (brand.promoted === true) {
              return (
                <div key={key}>
                  <div
                    onClick={() => {
                      eventTracking({
                        category: "brand",
                        action: "click",
                        label: brand.name,
                      });
                    }}
                  >
                    <Link href={"/brand/" + brand.nameUpperCase}>
                      <div>
                      {" "}              
                      <img
                        src={brand.imgSrc}
                        alt={brand.name + " logo"}
                        title={i18n.t("popular_products_brand")}
                        className="img-logo white-filter"
                      />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })
        )}
      </Slider>
    </div>
  );
}

export default React.memo(Carousel);
