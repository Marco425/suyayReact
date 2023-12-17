import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Button} from "semantic-ui-react";
import {useTable} from "../../../hooks";
import "./SelectTable.scss";

export function SelectTable(props) {

    const navigate = useNavigate();

    const [tableNum, setTableNum] = useState(null);
    const [error, setError] = useState(null);
    const {isExistTable} = useTable();

    const onSubmit = async () => {
        setError(null);
        if(!tableNum){
            setError("No has introducido ninguna mesa");
        }else{
            const exist = await isExistTable(tableNum);
            if (exist) navigate(`/client/${tableNum}`);
            else setError("El número de la mesa no existe");
        }
    }

    return (
        <div className="select-table">
            <div className="select-table__content">
                <h1>Bienvenido a SUYAY</h1>
                <h2>Por favor introduce el número de tu mesa</h2>

                <Form onSubmit={onSubmit}>
                    <Form.Input placeholder="Ejemplo: 2, 15, 20" 
                    type="Number"
                    onChange={(_,data) => setTableNum(data.value)}
                    />
                    <Button primary fluid>
                        Entrar
                    </Button>
                </Form>

                <p className="select-table__content-error">{error}</p>
            </div>
        </div>
    )
}
