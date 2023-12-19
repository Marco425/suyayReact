import React from 'react';
import {Image} from "semantic-ui-react";
import {LoginForm} from "../../../components/Admin";
import logo from "../../../assets/logo.png";
import "./LoginAdmin.scss";

export function LoginAdmin() {
  return (
    <div className='login-admin'>
        <div className='login-admin__content'>
          <div className='login-admin__content__logo'>
            <Image src={logo}/>
          </div>
            <h1>Entrar al panel</h1>
            <LoginForm/>
        </div>
    </div>
  )
}
