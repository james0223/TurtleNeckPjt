import React, { useContext } from "react";
import Layout from "../../Layout/MyDash/Dashboard";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
const Page404 = () => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return <Redirect to="/" />;
  } else {
    return (
      <Layout>
        <h1>고객님은 잘못이 없습니다. 주현이한테 전화하세요!</h1>
      </Layout>
    );
  }
};

export default Page404;
