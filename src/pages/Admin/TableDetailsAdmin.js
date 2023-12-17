import React, { useState, useEffect } from 'react';
import {Loader} from "semantic-ui-react";
import {useParams} from "react-router-dom";
import {HeaderPage, AddOrderForm} from "../../components/Admin";
import {forEach, size} from "lodash";
import {ModalBasic} from "../../components/Common";
import {ListOrderAdmin, PaymentDetail} from "../../components/Admin/TableDetails";
import {useOrder, useTable, usePayment} from "../../hooks";

export function TableDetailsAdmin() {
  const [refreshOrders, setRefreshOrders] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const {id} = useParams();
  const {loading, orders, getOrdersByTable, addPaymentToOrder} = useOrder();
  const {table, getTable} = useTable();
  const {createPayment, getPaymentByTable} = usePayment();

  const [showModal, setShowModal] = useState(false);


  console.log(table);

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, refreshOrders]);

  useEffect(() => {getTable(id)}, [id]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id);
      if (size(response)>0) setPaymentData(response[0]);
    })();
  }, [refreshOrders]);

  const onRefreshOrders = () => setRefreshOrders((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const onCreatePayment = async () => {
    const result = window.confirm('Estás seguro de generar la cuenta de la mesa?');
    if(result){

      let totalPayment = 0;
      forEach(orders, (order)=>{
        totalPayment += Number(order.product_data.price);
      })

      const resultTypePayment = window.confirm(
        "Pago con tarjeta pulsa ACEPTAR, pago con efectivo pulsa CANCELAR"
      );


      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(2),
        paymentType: resultTypePayment ? "CARD" : "CASH",
        statusPayment: "PENDING",
      };

      const payment = await createPayment(paymentData);
      
      for await (const order of orders){
        await addPaymentToOrder(order.id, payment.id);
      }
      onRefreshOrders();
    }
  };
  


  return (
    <>
        <HeaderPage title={`Mesa ${table?.number || ""}`} 
        btnTitle={paymentData ? "Ver Cuenta" : "Añadir Pedido"}
        btnClick={openCloseModal}
        btnTitle2={!paymentData ? "Generar Cuenta" : null}
        btnClick2={onCreatePayment}
        />
        {loading ? (
          <Loader active inline="centered">
            Cargando...
          </Loader>
        ) : (
          <ListOrderAdmin orders={orders} onRefreshOrders={onRefreshOrders}/>
        )}

        <ModalBasic show={showModal} onClose={openCloseModal} title="Generar Pedido">
          {paymentData ? (
            <PaymentDetail payment={paymentData} orders={orders} openCloseModal={openCloseModal} onRefreshOrders={onRefreshOrders}/>
          ):(
            <AddOrderForm idTable={id} openCloseModal={openCloseModal} onRefreshOrders={onRefreshOrders}/>
          )}
        </ModalBasic>
    </>
  );
}
