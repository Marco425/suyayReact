import {useState} from "react";
import {createPaymentApi, getPaymentByTableApi, closePaymentApi, getPaymentsApi, getReportsApi} from "../api/payment";

export function usePayment(){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [payments, setPayments] = useState(null);

    const createPayment = async (paymentData) =>{
        try {
            return await createPaymentApi(paymentData);
        } catch (error) {
            setError(error);
        }
    };

    const getPaymentByTable = async (idTable) =>{
        try {
            return await getPaymentByTableApi(idTable);
        } catch (error) {
            setError(error);
        }
    };

    const closePayment= async (idPayment) =>{
        try {
            await closePaymentApi(idPayment);
        } catch (error) {
            setError(error);
        }
    };

    const getPayments= async () =>{
        try {
            setLoading(true);
            const response = await getPaymentsApi();
            setLoading(false);
            setPayments(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const getReports= async (startDate, endDate) =>{
        try {
            return await getReportsApi(startDate, endDate);
        } catch (error) {
            setError(error);
        }
    };

    return{
        error,
        loading,
        payments,
        createPayment,
        getPaymentByTable,
        closePayment,
        getPayments,
        getReports
    };
}