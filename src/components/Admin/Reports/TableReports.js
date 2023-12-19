import React, {useState} from 'react';
import {Button, Input, Select} from "semantic-ui-react";
import {usePayment} from "../../../hooks";
import moment from 'moment';
import "./TableReports.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,2,3],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [4,5,6],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const options = {
  maintainAspectRatio: false, // Permite ajustar el tamaño del gráfico al contenedor
  responsive: true,
  scales: {
    x: {
      stacked: true, // Apilar barras en el eje x si es necesario
    },
    y: {
      stacked: true, // Apilar barras en el eje y si es necesario
    },
  },
};


export function TableReports(props) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const {getReports} = usePayment();
    const [data, setData] = useState({
      labels: [],
      datasets: [
        {
          label: 'Ganancia Total',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    });
  
    //const { payments } = props;
  

    const handleStartDateChange = (event, { value }) => {
        setStartDate(value);
    };
    
    const handleEndDateChange = (event, { value }) => {
        setEndDate(value);
    };
    
    const isButtonDisabled = () => {
      // Deshabilitar el botón si no hay ninguna fecha seleccionada
      return !startDate || !endDate;
    };

    let chartComponent = null;

    const generateGraph = async () => {
      try {

        const result = await getReports(startDate, endDate);
        const groupedPayments = result.reduce((acc, report) => {
          const date = moment(report.created_at).format('YYYY-MM-DD');
          acc[date] = (acc[date] || 0) + parseFloat(report.totalPayment);
          return acc;
        }, {});

        const formattedDates = Object.keys(groupedPayments);
        const totalPayments = Object.values(groupedPayments);

        setData({
          labels: formattedDates,
          datasets: [
            {
              label: 'Ganancia Total',
              data: totalPayments,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };


  return (
    <div className='table-reports' >
    <div>
      <label>
        Selecciona el rango de fechas
      </label>
    </div>
        <div>
          <label>
            Desde:
            <Input type='date' onChange={handleStartDateChange}  />
          </label>
          <label>
            Hasta:
            <Input type='date'  onChange={handleEndDateChange} />
          </label>
        </div>
    <div>
      <Button positive onClick={generateGraph} disabled={isButtonDisabled()}>Generar Gráfico</Button>
    </div>
    <div className='table-reports__graph'>
      <Bar 
      data={data} 
      options={options}
      height={400} 
      width={600}
      />
    </div>

  </div>
  )
}
