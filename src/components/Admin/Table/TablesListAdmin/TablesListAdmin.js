import React, {useState, useEffect} from 'react';
import {Button, Icon, Checkbox} from "semantic-ui-react";
import {map} from "lodash";
import {TableAdmin} from "../";
import "./TablesListAdmin.scss";

export function TablesListAdmin(props) {
    const {tables} = props;
    const [refresh, setRefresh] = useState(false);
    const [autoRefresh, setAutoRefresh] = useState(false);

    useEffect(() => {
      if(autoRefresh){
        const autoRefreshAction = () =>{
            onRefresh();
            setTimeout(()=>{
                autoRefreshAction();
            },5000);
            // 5000 equivale a 5 segundos, es decir se recargará la pagina cada 5 segundos
        };
        autoRefreshAction();
      }
    }, [autoRefresh])

    const onCheckAutoRefresh = (check) => {
        if (check){
            setAutoRefresh(check);
        }else{
            window.location.reload();
        }
    }
    

    const onRefresh = () => setRefresh((prev) => !prev);
  return (
    <div className="tables-list-admin">
        <Button primary icon className="tables-list-admin__reload" onClick={onRefresh}>
            <Icon name="refresh"/>
        </Button>

        <div className="tables-list-admin__reload-toggle">
            <span>Reload Automatico</span>
            <Checkbox toggle checked={autoRefresh} onChange={(_, data) => onCheckAutoRefresh(data.checked)}/>
        </div>

        {map(tables, (table) =>( 
            <TableAdmin key={table.number} table={table} refresh={refresh}/>
        ))}

    </div>
  )
}
