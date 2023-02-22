import "react-app-polyfill/ie11";
import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";

interface Values {
  userName: string;
  password: string;
}
interface LoginProps {
  handleLogin: Function;
}

export const Login: React.FC<LoginProps> = ({ handleLogin }) => {
  const [userStatus, setUserStatus] = React.useState<string>("ok");

  const checkLogin = async (userName: string, password: string) => {
    try {
      console.log(userName, password);
      let str = "/user/" + userName + "/" + password;
      const response = await fetch(str, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result === "success") handleLogin();
      else setUserStatus("notOk");
    } catch (err) {
      setUserStatus("server");
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome Back</h1>
      <Formik
        initialValues={{
          userName: "",
          password: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            checkLogin(values.userName, values.password);
            // handleLogin();
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form className="login-section">
          <label htmlFor="userName">User Name</label>
          <Field id="userName" name="userName" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" />
          {userStatus === "notOk" ? <p>username or password is wrong</p> : null}
          {userStatus === "server" ? (
            <p>server is having problems, try again later</p>
          ) : null}

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};
