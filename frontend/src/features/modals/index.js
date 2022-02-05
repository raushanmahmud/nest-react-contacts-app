import React from "react";
import {useSelector} from "react-redux";
import {getModal} from "./modalsSlice";
import AddEditContact from "./AddNewContact";

const MODAL_COMPONENTS = {
    'ADD_CONTACT': AddEditContact,
}

export default function Modals () {
    const modal = useSelector(getModal);
    if (!modal)
        return null;
    const Modal = MODAL_COMPONENTS[modal.type];
    return <Modal {...modal.props}/>
}