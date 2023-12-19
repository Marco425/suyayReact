import React, {useState, useEffect} from 'react';
import {Loader} from "semantic-ui-react";
import {HeaderPage, TableUsers, AddEditUserForm} from "../../components/Admin";
import {ModalBasic} from "../../components/Common"
import {useUser} from "../../hooks";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export function UsersAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const {loading, users, getUsers, deleteUser} = useUser();


    useEffect(() => {getUsers()}, [refetch]);
    
    const openCloseModal = () => setShowModal((prev)=> !prev);
    const onRefetch = () => setRefetch((prev)=> !prev); 

    const addUser = () => {
      setTitleModal("Nuevo Usuario");
      setContentModal(<AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch}/>);
      openCloseModal();
    }

    const updateUser = (data) =>{
      setTitleModal("Actualizar Usuario");
      setContentModal(<AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} user={data}/>);
      openCloseModal();
    }

    const onDeleteUser = async (data) =>{
      const result = window.confirm(`¿Eliminar usuario ${data.email}?`);
      if (result){
        try {
          await deleteUser(data.id);  
          onRefetch();
            } catch (error) {          
        }
      }
    }

    const ondeleteUser = async (info) => {
      const message = `¿Estás seguro de eliminar el usuario ${info.username}?`;
    
      return new Promise((resolve) => {
        confirmAlert({
          customUI: ({ onClose }) => (
            <div className="custom-ui">
              <h1>Confirmación</h1>
              <p>{message}</p>
              <button className='buttonCancelar' onClick={() => onClose()}>Cancelar</button>
              <button className='buttonAceptar'  onClick={async () => { 
                await deleteUser(info.id);
                onRefetch();
                onClose();
                resolve(true);
              }}>
                Confirmar
              </button>
            </div>
          ),
        });
      });
    };

  return (
    <>
        <HeaderPage title="Usuarios" btnTitle="Nuevo Usuario" btnClick={addUser}/>
        {loading ?(
          <Loader active inline="centered">
            Cargando...
          </Loader>
        ) : (
          <TableUsers users={users} updateUser={updateUser} onDeleteUser={ondeleteUser}/>
        )}

        <ModalBasic show={showModal} onClose={openCloseModal} title={titleModal} children={contentModal}/>
    </>
  );
}
