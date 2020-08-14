import React, { useState, useEffect } from 'react';
import {Modal} from '../../sharedComponents/Modal';
import { Input } from '../../sharedComponents/Input';
import {Form} from 'antd';


import 'antd/dist/antd.css';
import * as S from './styles';
import { useInsideAuthApi } from '../../contextProviders/apiProvider';

export default function ConfirmTransfer({visible, closeConfirm, id,confirmAmount, confirmBankName, cancel }){
    const [form] = Form.useForm();

    return(
        <React.Fragment>
             <Modal
                visible={visible}
                title="Confirm Transaction"
                width={468}
                onOk={()=>
                    {
                        form
                          .validateFields()
                          .then(values => {
                            closeConfirm(id, values.confirmRemittanceAmount, values.confirmRemittanceBankName);
                            form.setFields({
                                confirmRemittanceAmount:'',
                                confirmRemittanceBankName:''
                            })
                          })
                          .catch(info => {
                            console.log('Validate Failed:', info);
                          });
                      }}
                onCancel={()=>cancel()}
                centered
                    footer={<S.ModalButton size={'md-1'} 
                    onClick={()=>
                    {
                        form
                          .validateFields()
                          .then(values => {
                            
                            closeConfirm(id, values.confirmRemittanceAmount, values.confirmremittanceBankName);
                            form.setFields({
                                confirmRemittanceAmount:'',
                                confirmRemittanceBankName:''
                            })
                          })
                          .catch(info => {
                            console.log('Validate Failed:', info);
                          });
                      }}
                    >Confirm</S.ModalButton>}
                >
                <Form
                    form={form}
                    layout="vertical"
                    name="confirmTransaction"
                    hideRequiredMark={true}
                >
                    <Form.Item
                        name="confirmRemittanceBankName"
                        label="Remittance Bank Name"
                        initialValue={confirmBankName}
                        rules={[
                            {
                            required: true,
                            message: 'Please input the title of collection!',
                            },
                        ]}
                    >
                        <Input placeholder={'Enter the Bank Name'}/>
                    </Form.Item>

                    <Form.Item 
                        name="confirmRemittanceAmount" 
                        label="Remittance Amount"
                        initialValue={confirmAmount}
                    >
                        <Input placeholder={'Enter the Amount'}  />
                    </Form.Item>
                        
                </Form>
            </Modal>
        </React.Fragment>
    );
}
