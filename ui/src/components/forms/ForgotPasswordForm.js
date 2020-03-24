import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'

const ForgotPasswordForm = ({ handleReset }) => {
  return (
<div>
      <h1>Forgot Password?</h1>
      <Formik
        onSubmit={(values, actions) => {
          actions.setSubmitting(true)
          return handleReset(values).then((response)=>{actions.setSubmitting(false)})
        }}
        render={({ errors, status, touched, handleSubmit, isSubmitting, setFieldValue }) => ( <Form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label for="email">E-Mail:</label>
            <Field type="text" name="email" class="form-control" />
          <ErrorMessage name="email" />
          </div>
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

export default ForgotPasswordForm
