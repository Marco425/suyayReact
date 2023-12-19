import React from 'react';
import {Menu,Icon, MenuItem} from "semantic-ui-react";
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../../../hooks"
import "./SideMenu.scss";

export function SideMenu(props) {
    const {children} = props;
    const {pathname} = useLocation();
  return (
    <div className="side-menu-admin">
        <MenuLeft pathname={pathname}/>
        <div className="content">{children}</div>
    </div>
  );
}

function MenuLeft(props){
  const {pathname} = props;
  const {auth} = useAuth();
  return(
    <Menu fixed="left" borderless className="side" vertical>
      <MenuItem as={Link} to={"/admin"} active={pathname === "/admin"}>
        <Icon name="home"/>Pedidos
      </MenuItem>

      <MenuItem as={Link} to={"/admin/tables"} active={pathname === "/admin/tables"}>
        <Icon name="table"/>Mesas
      </MenuItem>

      <MenuItem as={Link} to={"/admin/payments-history"} active={pathname === "/admin/payments-history"}>
        <Icon name="history"/>Historial de Pagos
      </MenuItem>

      <MenuItem as={Link} to={"/admin/categories"} active={pathname === "/admin/categories"}>
        <Icon name="folder"/>Categorias
      </MenuItem>

      <MenuItem as={Link} to={"/admin/products"} active={pathname === "/admin/products"}>
        <Icon name="cart"/>Productos
      </MenuItem>

      {auth.me?.is_staff &&(
            <MenuItem as={Link} to={"/admin/users"} active={pathname === "/admin/users"}>
            <Icon name="users"/>Usuarios
            </MenuItem>
      )}

      <MenuItem as={Link} to={"/admin/reports"} active={pathname === "/admin/reports"}>
        <Icon name="chart bar"/>Reportes
      </MenuItem>

    </Menu>
  );
}
