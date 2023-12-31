import {BASE_PATH, PAYMENT_STATUS} from "../utils/constants";
import { startOfMonth, endOfMonth } from 'date-fns';

export async function createPaymentApi(paymentData){
    try {
        const url = `${BASE_PATH}/api/payments/`;
        const params =  {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
        };
        const response =  await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getPaymentByTableApi(idTable){
    try {
        const tableFilter = `table=${idTable}`;
        const statusFilter = `statusPayment=${PAYMENT_STATUS.PENDING}`;

        const url = `${BASE_PATH}/api/payments/?${tableFilter}&${statusFilter}`;
        const params =  {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response =  await fetch(url, params);
        const result = await response.json();
        return result;        
    } catch (error) {
        throw error;
    }
}

export async function closePaymentApi(idPayment){
    try {
        const url = `${BASE_PATH}/api/payments/${idPayment}/`;
        const params =  {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                statusPayment: PAYMENT_STATUS.PAID,
            }),
        };
        await fetch(url, params);
    } catch (error) {
        throw error;
    }
}

export async function getPaymentsApi(){
    try {
        const paymentFilter = `statusPayment=${PAYMENT_STATUS.PAID}`;
        const orderingFilter ="ordering=created_at";

        const url = `${BASE_PATH}/api/payments/?${paymentFilter}&${orderingFilter}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}


export async function getReportsApi(startDate, endDate) {
    try {
        const paymentFilter = `statusPayment=${PAYMENT_STATUS.PAID}`;
        const orderingFilter = 'ordering=created_at';

        if (startDate && endDate) {
            const rangeFilter = `&created_at__range=${startDate}T00:00:00Z,${endDate}T23:59:59Z`;
            const url = `${BASE_PATH}/api/payments/?${paymentFilter}${rangeFilter}&${orderingFilter}`;
            const response = await fetch(url);
            const result = await response.json();
            return result;
        } else {
            throw new Error('Las fechas de inicio y fin son necesarias.');
        }
    } catch (error) {
        throw error;
    }
}

