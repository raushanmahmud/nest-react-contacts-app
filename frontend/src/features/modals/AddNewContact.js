import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import style from './Modal.module.css';
import Modal from "react-bootstrap/Modal";
import {addNewContact, updateContact} from '../contactList/contactsSlice';
import {Alert, Button, FormControl, Form} from "react-bootstrap";
import {hideModal} from "./modalsSlice";

export default function AddEditContact(props) {
    const dispatch = useDispatch();

    const [editingExistingContact, setEditingExistingContact] = useState(false);
    const [id, setId] = useState(null);
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [alerts, setAlerts] = useState([])
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        lastName: '',
        phone: '',
        dateOfBirth: ''
    });

    useEffect(()=>{
        if (props.editing)
            setEditingExistingContact(true);
        else
            setEditingExistingContact(false);

    }, [props.editing])

    useEffect(()=>{
        if (props.id) {
            setId(props.id);
            setName(props.name);
            setLastName(props.lastName);
            setPhone(props.phone);
            setDateOfBirth(props.dateOfBirth);
        }
    }, [props.id])


    const canSave =
        [name, lastName, phone, dateOfBirth].every(Boolean) && !validationErrors.name && !validationErrors.lastName && !validationErrors.phone && !validationErrors.dateOfBirth;

    const nameChangeHandler = async (e)=>{
        const value = e.target.value;
        setName(value);
        if (!value)
            setValidationErrors({...validationErrors, 'name': 'Поле является обязательным для заполнения'})
        else {
            if (validName(value)){
                setValidationErrors({...validationErrors, 'name': ''})
            } else {
                setValidationErrors({...validationErrors, 'name': 'Неверный формат имени, длина должна быть больше 2'})
            }
        }
    }

    const validName = function(name){
        if (name.length >=2 ) {
            return true;
        } else {
            return false;
        }
    }

    const lastNameChangeHandler = async (e)=>{
        const value = e.target.value;
        setLastName(value);
        if (!value)
            setValidationErrors({...validationErrors, 'lastName': 'Поле является обязательным для заполнения'})
        else {
            if (validName(value)){
                setValidationErrors({...validationErrors, 'lastName': ''})
            } else {
                setValidationErrors({...validationErrors, 'lastName': 'Неверный формат фамилии, длина должна быть больше 2'})
            }
        }

    }

    const phoneChangeHandler = async (e)=>{
        const value = e.target.value;
        setPhone(value);
        if (!value)
            setValidationErrors({...validationErrors, 'phone': 'Поле является обязательным для заполнения'})
        else
            setValidationErrors({...validationErrors, 'phone': ''})
    }

    const dateOfBirthChangeHandler = async (e)=>{
        const value = e.target.value;
        setDateOfBirth(value);
        if (!value)
            setValidationErrors({...validationErrors, 'dateOfBirth': 'Поле является обязательным для заполнения'})
        else
            setValidationErrors({...validationErrors, 'dateOfBirth': ''})
    }

    const onSaveContactClicked = async () => {
        let validationErrorsObj ={};
        let containsErrors = false;
        if (!name) {
            containsErrors = true;
            validationErrorsObj = { 'name': 'Поле является обязательным для заполнения'};
        }
        if (!lastName) {
            containsErrors = true;
            validationErrorsObj = { ...validationErrorsObj, 'lastName': 'Поле является обязательным для заполнения'};
        }
        if (!phone) {
            containsErrors = true;
            validationErrorsObj = { ...validationErrorsObj, 'phone': 'Поле является обязательным для заполнения'};
        }
        if (!dateOfBirth) {
            containsErrors = true;
            validationErrorsObj = { ...validationErrorsObj, 'dateOfBirth': 'Поле является обязательным для заполнения'};
        }
        setValidationErrors(validationErrorsObj);
        if (canSave && !containsErrors) {
            try {
                if (!editingExistingContact) {
                    const data = {
                        "name": name,
                        "lastName": lastName,
                        "phone": phone,
                        "dateOfBirth": dateOfBirth
                    };
                    const resultAction = await dispatch(
                        addNewContact(data)
                    );
                    let response = unwrapResult(resultAction);
                    console.log(response)
                    if (response.status===200 || response.status===201) {
                        setAlerts([{variant: 'success', text: 'Контакт успешно добавлен'}])
                        setTimeout(async function () {
                            setName('')
                            setLastName('')
                            setPhone('')
                            setDateOfBirth('')
                            dispatch(hideModal())
                        }, 1000);
                    } else {
                        const alertMsgs = [];
                        if (resultAction?.payload?.response?.data) {
                            response = resultAction.payload.response.data;
                            if (Array.isArray(response.message)) {
                                for (const msg in response.message) {
                                    alertMsgs.push({variant: 'danger', text: response.message[msg]});
                                }
                            } else {
                                alertMsgs.push({variant: 'danger', text: response.message});
                            }
                        } else {
                            alertMsgs.push({variant: 'danger', text: response.message});
                        }

                        setAlerts(alertMsgs)
                    }


                } else {
                    const resultAction = await dispatch(updateContact({
                        id,
                        name,
                        lastName,
                        phone,
                        dateOfBirth
                    }));

                    let response = unwrapResult(resultAction);
                    if (response.status===200) {
                        setAlerts([{variant: 'success', text: 'Контакт успешно обновлен'}])
                        setTimeout(async function () {
                            dispatch(hideModal())
                        }, 1000);
                    } else {
                        const alertMsgs = [];
                        if (resultAction?.payload?.response?.data) {
                            response = resultAction.payload.response.data;
                            if (Array.isArray(response.message)) {
                                for (const msg in response.message) {
                                    alertMsgs.push({variant: 'danger', text: response.message[msg]});
                                }
                            } else {
                                alertMsgs.push({variant: 'danger', text: response.message});
                            }
                        } else {
                            alertMsgs.push({variant: 'danger', text: response.message});
                        }

                        setAlerts(alertMsgs)
                    }
                }
            } catch (err) {
                console.error('Failed to save the Contact: ', err)
            }
        }
    }

    return (
        <div className={style.modalWrapper}>
            <Modal.Dialog
                size='lg'
                style={{width: '100%'}}>
                <Modal.Header>
                    <Modal.Title> {(editingExistingContact) ? 'Редактировать' : 'Добавить '} контакт</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight: 'calc(100vh - 210px)', overflowY: 'auto'}}>
                    {alerts.map((alert, index) => {
                        return (
                            <Alert key={index} variant={alert.variant}>
                                {alert.text}
                            </Alert>
                        )
                    })}

                    <label>Имя</label>
                    <FormControl placeholder='Имя'
                                 value={name}
                                 onChange={nameChangeHandler}
                                 className={`mb-2 ${(validationErrors['name']) ? style.error : ''}`}
                                 style={{paddingTop: '10px'}}/>
                    {(validationErrors['name']) ? <small className={style.errorMsg}>{validationErrors['name']}</small> : null}


                    <label>Фамилия</label>
                    <FormControl placeholder='Фамилия'
                                 value={lastName}
                                 onChange={lastNameChangeHandler}
                                 className={`mb-2 ${(validationErrors['lastName']) ? style.error : ''}`}
                                 style={{paddingTop: '10px'}}/>
                    {(validationErrors['lastName']) ? <small className={style.errorMsg}>{validationErrors['lastName']}</small> : null}

                    <label>Телефон</label>
                    <FormControl placeholder='Телефон'
                                 value={phone}
                                 onChange={phoneChangeHandler}
                                 className={`mb-2 ${(validationErrors['phone']) ? style.error : ''}`}
                                 style={{paddingTop: '10px'}}/>
                    <small>Формат: +7 777 777 77 77</small><br/>
                    {(validationErrors['phone']) ? <small className={style.errorMsg}>{validationErrors['phone']}</small> : null}

                    <label className={"mt-2"}>Дата рождения</label>
                    <FormControl placeholder='Дата рождения'
                                 type={"date"}
                                 value={dateOfBirth}
                                 onChange={dateOfBirthChangeHandler}
                                 className={`mb-2 ${(validationErrors['dateOfBirth']) ? style.error : ''}`}
                                 style={{paddingTop: '10px'}}/>
                    {(validationErrors['dateOfBirth']) ? <small className={style.errorMsg}>{validationErrors['dateOfBirth']}</small> : null}

                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => dispatch(hideModal())}>Отмена</Button>
                        <Button variant='primary' onClick={onSaveContactClicked}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
}