import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const LoginForm = ({ submitLogin }) => {
  return (
<div>
      <h1>Login</h1>
      <Formik
        onSubmit={(values, actions) => {
                return submitLogin(values).then(actions.setSubmitting(false))
            }
        }
        render={({ errors, status, touched, isSubmitting, setFieldValue }) => (
          <Form>
          <Field className="form-control" type="text" name="username" />
          <ul>
          {status && status.username && status.username.map(msg => (<li>{msg}</li>))}
          <ErrorMessage component="li" name="username" />
          </ul>

            <label htmlFor="password">Password</label>
            <Field className="form-control" type="password" name="password" />
          <ul>
          {status && status.password && status.password.map(msg => (<li>{msg}</li>))}
          <ErrorMessage component="li" name="password" />
          </ul>
            <button className="btn btn-ar btn-primary" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      />
    {/*<h3>Or Login With...</h3>
    <AuthBtn provider="google-oauth2" className="animated fadeIn animation-delay-5 google-plus">
        <i className="fa fa-google-plus"></i>
    </AuthBtn>*/}
</div>
  );
};

export default LoginForm
