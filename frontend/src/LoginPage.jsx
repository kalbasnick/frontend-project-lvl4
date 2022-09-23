import React, { useEffect, useState, useRef } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import cn from 'classnames';

import { useHistory } from 'react-router-dom';
import useAuth from './hooks/index.jsx';

const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const LoginPage = () => {
  const { push } = useHistory();
  const auth = useAuth();
  const [validation, setValidation] = useState(null);

  const invalidFeedbackClasses = cn("invalid-tooltip", { "d-block": validation === 'invalid' });
  const inputsClasses = cn("form-control", { "is-invalid": validation === 'invalid' });


  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const authData = {
        username: values.username,
        password: values.password,
      };

      await axios.post('/api/v1/login', authData).then((response) => {
        const userToken = JSON.stringify({ token: response.data.token });
        localStorage.setItem('userId', userToken);
        auth.logIn();
        setValidation('valid');
        push('/');
      })
      .catch((err) => {
        auth.logOut();
        setValidation('invalid');
        console.log(err);
      });
    },
  });

  return (
    <>
      <form onSubmit={f.handleSubmit}>
        <Form.Group className="form-floating mb-3">
          <input placeholder="Ваш ник" name="username" autoComplete="username" required id="username" className={inputsClasses} onChange={f.handleChange} value={f.values.username} />
        </Form.Group>
        <Form.Group className="form-floating mb-3">
          <input placeholder="Пароль" name="password" autoComplete="password" required id="password" className={inputsClasses} onChange={f.handleChange} value={f.values.password} />
          <div className={invalidFeedbackClasses}>Неверные имя пользователя или пароль</div>
        </Form.Group>
        <Button type="submit" className="w-100 mb-3">Войти</Button>
      </form>
    </>
  );
};

export default LoginPage;