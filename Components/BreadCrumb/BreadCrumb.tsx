import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCaretRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
//import "./BreadCrumb.scss";
import { BreadCrumbType } from "../../types/breadCrumb";
import i18n from "../../i18n";

export function BreadCrumb({ itens }: any) {
  const router = useRouter();

  let query = new URLSearchParams(router.search);
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");

  useEffect(() => {
    setBrand(query.get("brand"));
    setProduct(query.get("product"));
  }, [query]);

  function Arrow() {
    return (
      <li className="breadcrumb-item-arrow">
        <FontAwesomeIcon icon={faCaretRight} />
      </li>
    );
  }

  return (
    <nav>
      <ul className="breadcrumb">
        <li key="home" className="breadcrumb-item">
          {" "}
          <Link href="/">
            <div>
              {" "}
              <FontAwesomeIcon icon={faHome} /> {i18n.t("home")}{" "}
            {" "}
            </div>
          </Link>{" "}
        </li>
        {Arrow()}

        {product ? (
          <>
            <li key="search" className="breadcrumb-item">
              {" "}
              <Link href={`/home?brand=${brand || ""}&product=${product}`}>
                <div>
                  {" "}
                  <FontAwesomeIcon icon={faSearch} /> {i18n.t("search.label")}{" "}
                {" "}
                </div>
              </Link>{" "}
            </li>
            {Arrow()}
          </>
        ) : (
          <></>
        )}

        {itens.map((item: BreadCrumbType, index: number) => {
          return (
            <React.Fragment key={index}>
              <li
                title={item.label}
                className={`breadcrumb-item ${item.isActive ? "active" : ""}`}
              >
                {item.isActive ? (
                  item.label
                ) : (
                  <Link href={item.route || "/"}> {item.label} </Link>
                )}
              </li>
              {index < itens.length - 1 ? Arrow() : <></>}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
}
