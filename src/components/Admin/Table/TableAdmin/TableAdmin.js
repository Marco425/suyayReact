import React, {useState, useEffect} from 'react';
import {size} from "lodash";
import classNames from 'classnames';
import {Link} from "react-router-dom";
import {ReactComponent as IconTable} from "../../../../assets/table.svg";
import {Label} from "semantic-ui-react";
import {ORDER_STATUS} from "../../../../utils/constants";
import {getOrdersByTableApi} from "../../../../api/order";
import {usePayment} from "../../../../hooks";
import "./TableAdmin.scss";

export function TableAdmin(props) {
  const {table, refresh} = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, setTableBusy ] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);
  const {getPaymentByTable} = usePayment();
  

  useEffect(()=> {
    (async () =>{
      const response = await getOrdersByTableApi(
        table.id,  
        ORDER_STATUS.PENDING
        );
        setOrders(response);
    })();
  }, [refresh]);

  useEffect(()=> {
    (async () =>{
      const response = await getOrdersByTableApi(
        table.id,  
        ORDER_STATUS.DELIVERED
        );
        if(size(response)> 0) setTableBusy(response);
        else setTableBusy(false);
    })();
  }, [refresh]);

  useEffect(()=> {
    (async () =>{
      const response = await getPaymentByTable(table.id);
        if(size(response)> 0) setPendingPayment(true);
        else setPendingPayment(false);
    })();
  }, [refresh]);

  return (
    <Link className="table-admin" to={`/admin/table/${table.id}`}>
      {size(orders) >0 ? <Label circular color="orange"> {size(orders)}</Label> : null}
      {pendingPayment && (
        <Label circular color="orange">
          Cuenta
        </Label>
      )}
      <IconTable className={classNames({
        pending: size(orders)>0,
        busy: tableBusy,
        "pending-payment":pendingPayment,
      })}/>
      <p>Mesa {table.number}</p>
    </Link>
  )
}
