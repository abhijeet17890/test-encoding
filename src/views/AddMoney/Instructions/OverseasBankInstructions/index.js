import React from 'react';
import { TransferInstructions } from './TransferInstructions';
import { Row, Col, List, Space } from 'antd';
import { PageHeading, SubHeading } from '../../../../sharedComponents/Heading/index';
import Divider from '../../../../sharedComponents/Divider/index';

import * as S from './styles';
import 'antd/dist/antd.css';

export default function OverseasBankInstructions({handleCancel, handleConfirm, payloadDetails, transferDetails, status}){
    return(
        <React.Fragment>
            <Row justify='center' gutter={[0,0]}>
                <Col lg={{span:17}} md={{span:17}} sm={{span:24}} xs={{span:24}}>
                    <SubHeading>Instructions for transfer:</SubHeading>
                </Col>
                <Col lg={{span:17}} md={{span:17}} sm={{span:24}} xs={{span:24}}>
                    <List
                        size="small"                  
                        dataSource={TransferInstructions}
                        renderItem={(item, index) => 
                        <S.CustomListItem>
                            {/* {status?<div className='new'>
                            {item.title==='details'? 
                            <S.Content>
                                {item.content + ' ' +  (payloadDetails.account_info.account_type.description ?<b>{payloadDetails.account_info.account_type.description}</b>:'')
                        + '/' + (payloadDetails.account_info.dw_account_number?<b>{payloadDetails.account_info.dw_account_number}</b>:'') + ' in that section.'}
                            </S.Content>:
                            <S.Content>{item.content}</S.Content>}
                            </div>
                            : */}
                            <div className='pending'>
                                {item.title==='details'? 
                            <S.Content>
                                {item.content + ' ' +  (transferDetails.account_info.nick_name)
                        + '/' + (transferDetails.account_info.dw_account_number) + 
                        ' in that section.'}
                            </S.Content>:
                            <S.Content>{item.content}</S.Content>}
                            </div>
                            

                        
                            {item.description? 
                                <List
                                    size='small'
                                    dataSource={item.description}
                                    renderItem={(desc)=>
                                        <S.CustomListItem nestedList>
                                            <S.ListItem>{desc}</S.ListItem>
                                        </S.CustomListItem>}
                                />
                            :''}

                            {item.table?
                            <S.StyledDiv>
                                <Row justify='center' gutter={[0,20]}>
                                    <Col lg={{span:24}} md={{span:24}} >
                                        <Divider/>
                                    </Col>
                                </Row>
                                
                                <Row justify='left' gutter={[0,20]}>
                               
                                    <Col lg={{span:9}} md={{span:9}} sm={{span:24}} xs={{span:24}}>
                                        
                                        <SubHeading>{item.title_one}</SubHeading>
                                        <List
                                            size='small'
                                            dataSource={item.description_one}
                                            renderItem={(desc)=>
                                                <S.CustomListItem nestedList table>
                                                    <S.ListItem>{desc}</S.ListItem>
                                                </S.CustomListItem>
                                            }
                                        />
                                    </Col>

                                    <Col lg={{span:9, push:4}}>
                                    <SubHeading>{item.title_two}</SubHeading>
                                        <List
                                            size='small'
                                            dataSource={item.description_two}
                                            renderItem={(desc)=>
                                                <S.CustomListItem nestedList table>
                                                    <S.ListItem>{desc}</S.ListItem>
                                                </S.CustomListItem>
                                                }
                                        />
                                       
                                    </Col>
                                 
                                </Row>

                                <Row justify='center'>
                                    <Col lg={{span:24}}>
                                        <Divider/>
                                    </Col>
                                </Row>

                            </S.StyledDiv> 
                            :'' }
                        
                        </S.CustomListItem>}
                    />
                </Col>
            </Row>

        </React.Fragment>
    );
};