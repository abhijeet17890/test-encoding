import React, { useState } from 'react';
import { Form, Row, Col, Space} from 'antd';
import { Input } from '../../sharedComponents/Input/index';
import { Modal } from '../../sharedComponents/Modal/index';
// import { Button } from '../../sharedComponents/button/index';


import {Link} from 'react-router-dom';
import {routes} from "../../constants/routes";

import * as S from './styles';


function ShowList({ list, index, current_item,
                    DelVisible, removeList, openDel, closeDel, 
                    EditVisible, editList, openEdit, closeEdit }) {
    const[new_list_name, setNewName]= useState('');
    
    const handleEdit = (e) => {
        setNewName(e.target.value);
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
        if(new_list_name===''){

        }
        else{editList(new_list_name);}
        
        setNewName('');
    }
    return (
        <React.Fragment>
            <Row justify='center'>
                <Col lg={{span:19}}>
                    <S.StyledList>
                        <div>
                            {list.list_name} 
                        </div>
                
                            <Space direction='horizontal' size={10}>
                            <S.StyledIcon >
                                <Link to={routes.authRoutes.myLists}>
                                    <S.StyledEyeOutlined />
                                </Link>
                            </S.StyledIcon>
                            <S.StyledIcon onClick={()=>openEdit(index)}>
                                <S.StyledEditOutlined />
                            </S.StyledIcon>
                            <S.StyledIcon onClick={()=>openDel(index)}>
                                <S.StyledDeleteOutlined />
                            </S.StyledIcon>
                            </Space>
                  
                    </S.StyledList>
                </Col>
            </Row>

            <Modal 
                name= "DeleteWatchlist"
                title="Confirmation"
                visible={DelVisible}
                onCancel={closeDel} 
                centered
                width={468}
                footer={[
                    <S.StyledButton size={'md-2'} modalbutton={true} outlined cancel={true} key="Cancel" onClick={closeDel}>
                        No
                    </S.StyledButton>,
                    <S.StyledButton size={'md-2'} modalbutton={true} key="Create" type="primary" onClick={removeList}>
                      Yes
                    </S.StyledButton>,
                  ]}
            >
                <p>Are you sure you want to delete the watchlist "{current_item}"</p>
              
            </Modal>
       
            <Modal
                name="EditWatchlist"
                title="Edit List Name"
                visible={EditVisible}
                onCancel={closeEdit}
                centered
                width={468}
                footer={[
                    <S.StyledButton size={'md-2'} modalbutton={true} outlined cancel={true} key="Cancel" onClick={closeEdit}>
                        Cancel
                    </S.StyledButton>,
               
                    <S.StyledButton size={'md-2'} modalbutton={true} key="Create" type="primary" onClick={e=>handleSubmit(e)} htmlTyepe='submit'>
                      OK
                    </S.StyledButton>,
                    
                  ]}
         
            >
                <Input 
                    value={new_list_name}
                    required={true}
                    placeholder='List'
                    type='text'
                    onChange={handleEdit}
                />                
               
            </Modal>
           

    </React.Fragment>
    );
}

export default ShowList;
