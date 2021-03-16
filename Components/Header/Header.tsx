/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect, useContext } from "react";
import i18n from "../../i18n";
//import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faBars,
  faUser,
  faSignOutAlt,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { ToggleLanguage } from "../Toggle/Language";
import Link from "next/link";
import { useRouter } from "next/router";
import { MenuBurger } from "../MenuBurger";
import { UserContext } from "../../Contexts/UserContext";
import { getFirestoreAuth } from "../../Helpers/Firebase";

const WIDTH_CHANGING = 1024;

export function Header() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  React.useEffect(() => {
    setWidth(window.innerWidth);
  });

  useLayoutEffect(() => {
    if (localStorage.getItem("token")) setUserLogged(true);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logOut = async () => {
    localStorage.removeItem("token");
    getFirestoreAuth().signOut();
    setUser(null);
    router.push("/");
  };

  return (
    <header>
      <div className="nav-left">
        <div className="locoshop-logo logo">
          <Link href="/home">
            <img
              className="logo-header"
              src="../../images/Locoshop_logo_white.svg"
              alt=""
            />
          </Link>
        </div>
        {width <= WIDTH_CHANGING ? (
          <MenuBurger open={open} setOpen={setOpen} />
        ) : (
          <div className="links">
            <div className={ router.pathname === '/about' ? "link active" : "link"}>
              <Link href="/about">
                <a>{i18n.t("header.about_us")}</a>
              </Link>
            </div>

            <div className={ router.pathname === '/stores' ? "link active" : "link"}>
              <Link href="/stores">{i18n.t("header.stores")}</Link>
            </div>

            <div
              className={ router.pathname === '/signin' ? `active link login ${userLogged.valueOf()}` : `link login ${userLogged.valueOf()}`}
            >
              <Link href="/signin">{i18n.t("header.sign_in")}</Link>
            </div>
          </div>
        )}
      </div>
      <div className="nav-right">
        {width <= WIDTH_CHANGING ? (
          <>
            <div className="lang-switch">
              <ToggleLanguage />
            </div>

            <button
              id="burger"
              onClick={() => setOpen(true)}
              className="burger"
            >
              <FontAwesomeIcon icon={faBars} className="burger-icon" />
            </button>
          </>
        ) : (
          <>
            <div className="nav-right-buttons-wrap">
              <div 
                className={ router.pathname === '/store-registration' ? `active nav-right-button store-add-button link-get-loco connected-${userLogged.valueOf()}` : `nav-right-button store-add-button link-get-loco connected-${userLogged.valueOf()}`} >
              <Link
                href="/store-registration"
              >
                <div>
                <FontAwesomeIcon
                  icon={faStore}
                  className="nav-right-button-icon"
                />
                {"  "}
                <span className="nav-right-button-text">
                  {i18n.t("header.get_store_loco")}
                </span>
                </div>
              </Link>
              </div>
              <div 
                className={ router.pathname === '/my-account' ? `active nav-right-button user-button connected-${userLogged.valueOf()}` : `nav-right-button user-button connected-${userLogged.valueOf()}`}>
              <Link
                href="/my-account"
              >
                <div>
                <FontAwesomeIcon
                  icon={faStore}
                  className="nav-right-button-icon"
                />
                {"  "}
                <span className="nav-right-button-text">
                  {i18n.t("header.my_store")}
                </span>
                </div>
              </Link>
              </div>
              <div
                className={`nav-right-button log-out connected-${userLogged.valueOf()}`}
                onClick={logOut}
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="nav-right-button-icon"
                />{" "}
                <span className="nav-right-button-text">
                  {i18n.t("header.log_out")}
                </span>
              </div>
            </div>
            <div className="lang-switch">
              <ToggleLanguage />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
