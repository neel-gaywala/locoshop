/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useLayoutEffect } from "react";
import cx from "classnames";
import Link from 'next/link';
import { useRouter } from "next/router";
import i18n from "../../i18n";

//import "./MenuBurger.scss";

interface IMenuBurgerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function MenuBurger({ open, setOpen }: IMenuBurgerProps) {
  const router = useRouter();
  const [userLogged, setUserLogged] = useState(false);

  useLayoutEffect(() => {
    if (localStorage.getItem("token")) setUserLogged(true);
  }, []);

  function close(e: React.MouseEvent) {
    e.preventDefault();
    setOpen(false);
  }

  return (
    <div className={cx("overlay", open && "open")}>
      {open && (
        <>
          <a href="" className="closebtn" onClick={(e) => close(e)}>
            &times;
          </a>
          {/** todo */}
          <div className="overlay-content">
            <div className={ router.pathname === '/about' ? "link active" : "link"}>
            <Link  href="/about">
              {i18n.t("header.about_us")}
            </Link>
            </div>

            <div className={ router.pathname === '/stores' ? "link active" : "link"}>
            <Link href="/stores">
              {i18n.t("header.stores")}
            </Link>
            </div>

            <div className={ router.pathname === '/my-account' ? "link active" : "link"}>
            <Link href="/my-account">
              { userLogged ? i18n.t("header.my_store") : i18n.t("header.sign_in")}
            </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
