import React, {useEffect, useState, useCallback} from 'react';
import {Form, Button} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useTable} from "../../../../hooks";
import "./AddEditTableForm.scss";

export function AddEditTableForm(props) {
    const {onClose, onRefetch, table} = props;
    const {addTable, updateTable} = useTable();

    const formik = useFormik({
        initialValues: initialValues(table),
        validationSchema: Yup.object(table ? updateSchema() : newSchema()),
        validationOnChange: false,
        onSubmit: async (formValue) =>{
            try {
                if(table) await updateTable(table.id, formValue);
                else await addTable(formValue);
                onRefetch();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    });
    

    return (
        <Form className="add-edit-table-form" onSubmit={formik.handleSubmit}>
            <Form.Input type="number" name="number" placeholder="Numero de la mesa" value={formik.values.number} onChange={formik.handleChange} error={formik.errors.number}/>            
            <Button type="submit" primary fluid content={table ? "Actualizar" : "Crear"}/>
        </Form>
    )
    }

function initialValues(data){
    return{
        number:data?.number|| "",
    };
}

function newSchema(){
    return{
        number:Yup.number().required(true),
    };
}

function updateSchema(){
    return{
        number:Yup.number().required(true),
    };
}