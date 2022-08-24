import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

export default function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'From 3 to 20 symbols')
    .max(20, 'From 3 to 20 symbols')
    .required('Required'),
  password: Yup.string()
    .min(6, 'At least 6 symbols')
    .max(50, 'Too Long!')
    .required('Required'),
});

function Login() {
  return <div>
  <h1>Войти</h1>
  <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    validationSchema={SignupSchema}
    onSubmit={values => {
      // same shape as initial values
      console.log(values);
    }}
  >
    {({ errors, touched }) => (
      <Form>
      <Field id="username" name="username" placeholder="Ваш ник" />
      {errors.username && touched.username ? (
             <div>{errors.username}</div>
           ) : null}
      <Field id="password" name="password" placeholder="Пароль" />
      {errors.password && touched.password ? (
             <div>{errors.password}</div>
           ) : null}
      <button type="submit">Войти</button>
    </Form>
    )}
  </Formik>
</div>;
}

function NoMatch() {
  return <h1>Error 404. Page not found</h1>
}
