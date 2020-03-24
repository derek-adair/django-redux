import * as yup from 'yup'
import React from 'react';
import { Formik,} from 'formik';
import { Form, Button } from 'react-bootstrap';

const schema = yup.object({
  username: yup.string().required(),
	password: yup.string().required(),
	email: yup.string().email().required()
});

const RegisterForm = ({submitRegister, errors}) => {
  return (
    <div>
    <h2>Register</h2>
    <Formik
      validationSchema={schema}
      errors={errors}
			onSubmit={(values, actions)=>{
            return submitRegister(values).then(actions.setSubmitting(false))
        }
			}
      render={({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
				isSubmitting,
        errors,
      }) => {
        return (
        <Form noValidate onSubmit={handleSubmit}>
						<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								aria-describedby="inputGroupPrepend"
								name="username"
								value={values.username}
								onChange={handleChange}
								isValid={!isSubmitting && touched.username && !errors.username}
								isInvalid={!!errors.username}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.username}
							</Form.Control.Feedback>
						<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								name="password"
								value={values.password}
								onChange={handleChange}
								isValid={!isSubmitting && touched.password && !errors.password}
								isInvalid={!!errors.password}
							/>
								<Form.Control.Feedback type="invalid">
									{errors.password}
								</Form.Control.Feedback>

						<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								name="email"
								value={values.email}
								onChange={handleChange}
								isValid={!isSubmitting && touched.email && !errors.email}
								isInvalid={!!errors.email}
							/>
								<Form.Control.Feedback type="invalid">
									{errors.email}
							</Form.Control.Feedback>
          <Button type="submit">Submit form</Button>
        </Form>
      )}}
    />
    </div>
  );
}

export default RegisterForm
