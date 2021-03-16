import React from "react";
import { Header } from "../../../Components/Header";
import { Footer } from "../../../Components/Footer";

//import "./RegistrationDone.scss";
import { Helmet } from "react-helmet";
import { useRouter } from "next/router";

export function RegistrationDone() {
  const router = useRouter();
  const { state } = router.query as { 
    state: any;
  };
  return (
    <>
      <Helmet>
        <title>Registration completed</title>
      </Helmet>
      <Header />
      <div className="content">
        {state === "success" ? (
          <div className="registration-done">
            Congratulations, your registration is done. We sent you an email so
            you can confirm your account
          </div>
        ) : (
          <div className="registration-done">
            We are sorry something went wrong, please try again.
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default RegistrationDone;
