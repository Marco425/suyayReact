import React, {useEffect} from 'react';
import {Loader} from "semantic-ui-react";
import {HeaderPage, TableReports} from "../../components/Admin";
import {usePayment} from "../../hooks";

export function ReportsAdmin() {
    const {loading, payments, getPayments} = usePayment();

    useEffect(() => {getPayments()}, []);

  return (
    <>
        <HeaderPage title="Reportes"/>
        {loading ? (
            <Loader active inline="centered">
                Cargando...
            </Loader>
        ) :(
            <TableReports payments={payments}/>
        )}
    </>
  );
}
