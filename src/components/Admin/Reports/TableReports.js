import React, {useState} from 'react';
import {Button, Input, Select} from "semantic-ui-react";
import {usePayment} from "../../../hooks";
import "./TableReports.scss";

export function TableReports(props) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const {getReports} = usePayment();
    const { payments } = props;

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

    const generateGraph = async () => {
      try {

        const result = await getReports(startDate, endDate);

        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };


  return (
    <div className='table-reports'>
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
    
  </div>
  )
}
