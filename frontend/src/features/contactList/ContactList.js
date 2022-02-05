import React, {useEffect} from 'react';
import {Button, FormControl, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    selectAllContacts,
    fetchContacts,
    selectCurPage,
    selectPagesCount,
    setCurPage,
    deleteContact,
    selectNameFilter,
    setNameFilter,
    selectLastNameFilter,
    setLastNameFilter,
    selectPhoneFilter,
    setPhoneFilter,
    setFilterOn
} from "./contactsSlice";
import Pagination from "../../utils/Pagination";
import style from "../modals/Modal.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons'
import { showModal} from "../modals/modalsSlice";
import {unwrapResult} from "@reduxjs/toolkit";


export default function ContactList(props){
    const dispatch = useDispatch()
    const contacts = useSelector(selectAllContacts)
    const error = useSelector(state => state.contacts.error)
    const contactsStatus = useSelector(state => state.contacts.status)
    const curPage = useSelector(selectCurPage);
    const pagesCount = useSelector(selectPagesCount);
    const nameFilter = useSelector(selectNameFilter);
    const lastNameFilter = useSelector(selectLastNameFilter);
    const phoneFilter = useSelector(selectPhoneFilter);

    useEffect(() => {
        if (contactsStatus === 'idle') {
            dispatch(fetchContacts({page:curPage, name: nameFilter, lastName: lastNameFilter, phone: phoneFilter}))
        }
    }, [contactsStatus, dispatch, curPage])


    const hanleChangePage = async(page)=>{
        dispatch(setCurPage(page))
    }

    const nameFilterChangeHandler = async (e)=> {
        const value = e.target.value;
        dispatch(setNameFilter(value));
    }

    const lastNameFilterChangeHandler = async (e)=> {
        const value = e.target.value;
        dispatch(setLastNameFilter(value));
    }

    const phoneFilterChangeHandler = async (e)=> {
        const value = e.target.value;
        dispatch(setPhoneFilter(value));
    }

    const openAddContactModal = ()=>{
        dispatch(showModal({type : 'ADD_CONTACT'}))
    }

    const searchButtonHandler = ()=>{
        dispatch(setFilterOn())
    }

    const clearFilters = ()=>{
        dispatch(setPhoneFilter(''));
        dispatch(setNameFilter(''));
        dispatch(setLastNameFilter(''));
        dispatch(setFilterOn());
    }

    const openEditForm = ({id, name, lastName, phone, dateOfBirth})=>{
        dispatch(showModal({type : 'ADD_CONTACT', props: {
                editing: true,
                id, name, lastName, phone, dateOfBirth
            }}))
    }

    const deleteContactHandler = async(data)=>{
        try {
            const resultAction = await dispatch(
                deleteContact(data)
            );
            let response = unwrapResult(resultAction);
            console.log(response)

        } catch (err) {
            console.error('Failed to delete the Contact: ', err)
        }
    }


    let content;
    if (contactsStatus === 'loading') {
        content = <div className="loader">Загрузка...</div>
    } else if (contactsStatus === 'succeeded') {
        content = <>
            <Table striped responsive>
                <thead>
                <tr>
                    <th>
                        <span>#</span>
                    </th>
                    <th>
                        <span>Имя</span>
                    </th>
                    <th>
                        <span>Фамилия</span>
                    </th>
                    <th style={{verticalAlign:'middle'}}>
                        <span>Телефон</span>
                    </th>
                    <th >
                        <span>Дата рождения</span>
                    </th>
                    <th >
                        <span>Редак</span>
                    </th>
                    <th >
                        <span>Удалить</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {contacts && contacts.map((contact, index)=>{
                    return (
                        <tr key={index}>
                            <td>{contact.id}</td>
                            <td>{contact.name}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.phone}</td>
                            <td>
                                {contact.dateOfBirth}
                            </td>
                            <td>
                                <Button onClick={()=>openEditForm(contact)} >
                                    <FontAwesomeIcon icon={faPen}/>
                                </Button>
                            </td>
                            <td>
                                <Button className={"btn btn-danger"} onClick={()=>deleteContactHandler(contact)} >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            <Pagination elemNumber={pagesCount}
                        hidden={contactsStatus==='loading'}
                        curPage={curPage}
                        shownElemNum={5}
                        showArrows={true}
                        changePage={hanleChangePage}/>
        </>
    } else if (contactsStatus === 'failed') {
        content = <tr><td>{error}</td></tr>
    }


    return (
        <div className={style.mainContainer}>
            <div className={style.contentContainer}>



                <div className="input-group">
                    <FormControl placeholder='Имя'
                                 value={nameFilter}
                                 onChange={nameFilterChangeHandler}
                                 style={{paddingTop: '10px'}}/>
                    <FormControl placeholder='Фамилия'
                                 value={lastNameFilter}
                                 onChange={lastNameFilterChangeHandler}
                                 style={{paddingTop: '10px'}}/>
                    <FormControl placeholder='Телефон'
                                 value={phoneFilter}
                                 onChange={phoneFilterChangeHandler}
                                 style={{paddingTop: '10px'}}/>

                    <Button onClick={searchButtonHandler}>
                        Искать
                    </Button>
                    <Button className={'btn btn-danger pr-4'} onClick={clearFilters}>
                        Очистить фильтры
                    </Button>
                </div>
                <Button className={'btn btn-success'} onClick={openAddContactModal}>
                    Добавить
                </Button>




                {content}

            </div>
        </div>



    )
}