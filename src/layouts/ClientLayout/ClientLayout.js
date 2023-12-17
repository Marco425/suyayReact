import React, {useEffect} from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import {Container, Button, Icon} from "semantic-ui-react";
import {useTable} from "../../hooks";
import "./ClientLayout.scss";

export function ClientLayout(props) {
    const {children} = props;
    const {isExistTable} = useTable();
    const {tableNumber} = useParams();
    const navigate = useNavigate();

    // Con esto controlamos si es que el usuario quiere entrar a una mesa que no exista a traves del url
    useEffect(() => {
      (async ()=> {
        const exist = await isExistTable(tableNumber);
        if(!exist) closeTable();
      })();
    }, [tableNumber]);


    // Aqui se redirecciona al inicio
    const closeTable = () => {
      navigate("/");
    }

    //Aqui se redirecciona al carrito
    const goToCart = () => {
      navigate(`/client/${tableNumber}/cart`)
    }

    //Aqui se redirecciona a las ordenes
    const goToOrders = () => {
      navigate(`/client/${tableNumber}/orders`)
    }

  return (
    <div className="client-layout-bg">
      <Container className="client-layout">
        <div className="client-layout__header">
          <Link to={`/client/${tableNumber}`}>
            <h1>SUYAY</h1>
          </Link>
          <span>Mesa {tableNumber}</span>
          <div>
            <Button icon onClick={goToCart}>
              <Icon name="shop"/>
            </Button>
            <Button icon onClick={goToOrders}>
              <Icon name="list"/>
            </Button>
            <Button icon onClick={closeTable}>
              <Icon name="sign-out"/>
            </Button>
          </div>
        </div>
        <div className="client-layout__content">{children}</div>
      </Container>
    </div>
  );
}
