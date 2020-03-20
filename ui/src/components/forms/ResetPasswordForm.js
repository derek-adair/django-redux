import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'

const ResetPasswordForm = ({ handleReset, uid, token }) => {
  console.log("!!!!!!!!!!!!!!")
  console.log(uid)
  console.log(token)
  return (
<div>
      <h1>Reset Password</h1>
      <Formik
        onSubmit={(values, actions) => {
          actions.setSubmitting(true)
          return handleReset(values).then(()=>actions.setSubmitting(false))
        }}
        initialValues={{ uid: uid, token: token}}
        render={({ errors, status, touched, handleSubmit, isSubmitting, setFieldValue }) => (
          <Form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label for="new_password">New Password:</label>
            <Field type="password" name="new_password" class="form-control" />
            <ErrorMessage name="new_password" />
          </div>
          <div className="form-group">
            <label for="re_new_password">Confirm New Password:</label>
            <Field type="password" name="re_new_password" class="form-control" />
            <ErrorMessage name="re_new_password" />
          </div>

          <Field type="hidden" name="uid" />
          <Field type="hidden" name="token" />
          <div className="form-group">
            <button className="btn btn-ar btn-primary" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          {isSubmitting && (
          <i className="fas fa-spinner fa-spin" />
          )}
          </div>

          </Form>
        )}
      />
</div>
  );
};

export default ResetPasswordForm
