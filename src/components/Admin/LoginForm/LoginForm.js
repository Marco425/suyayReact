import React from 'react';
import "./LoginForm.scss";
import {Button, Form} from "semantic-ui-react";
import {useFormik} from "formik";
import {toast} from "react-toastify"
import {LoginApi} from "../../../api/user"
import {useAuth} from "../../../hooks";
import * as Yup from "yup";

export function LoginForm() {
    const {login} = useAuth();    
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue)=>{
            try {
                const response = await LoginApi(formValue);
                const {access} = response;
                login(access);
            } catch (error) {

                toast.error(error.message)
            }
        }
    });
  return (
    <Form className='login-form-admin' onSubmit={formik.handleSubmit}>
        <Form.Input name="email" placeholder="Correo electronico" value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email}/>
        <Form.Input name="password" type="password" placeholder="Contraseña" value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password}/>
        <Button type="submit" content="Iniciar Sesion" primary fluid/>
    </Form>
  )
}

function initialValues(){
    return{
        email: "",
        password: ""
    }
}

function validationSchema(){
    return{
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
    }
}
