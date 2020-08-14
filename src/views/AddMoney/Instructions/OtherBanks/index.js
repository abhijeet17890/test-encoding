import React from 'react';
import { TransferInstructions } from './TransferInstructions';
import { Row, Col, List, Space } from 'antd';
import { PageHeading, SubHeading } from '../../../../sharedComponents/Heading/index';
import Divider from '../../../../sharedComponents/Divider/index';

import * as S from './styles';
import 'antd/dist/antd.css';

export default function OtherBanks({handleCancel, handleConfirm,payloadDetails, transferDetails, status}){
    return(
        <React.Fragment>
           
            <Row justify='center' gutter={[0,10]}>
                <Col lg={{span:17}}>
                    <SubHeading>Instructions for transfer:</SubHeading>
                </Col>
                <Col lg={{span:17}}>
                    <S.Content>Please follow the instructions below to initiate a wire transfer from your bank account to your Globalise account.</S.Content>
                </Col>
            </Row>
            <Row justify='center'>
                <Col lg={{span:17}} >
                    <List
                        size="small"                  
                        dataSource={TransferInstructions}
                        renderItem={(item, index) => 
                        <S.CustomListItem>
                            <S.Content>
                                {item.content}
                            </S.Content>
                        
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
                                    <Col lg={{span:24}}pull={1}>
                                        <Divider/>
                                    </Col>
                                </Row>
                                
                                <Row justify='left' gutter={[0,20]}>
                               
                                    <Col lg={{span:17}}>
                                        
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

                                 
                                </Row>

                                <Row justify='center'>
                                    <Col lg={{span:24}} pull={1}>
                                        <Divider/>
                                    </Col>
                                </Row>
                                
                            </S.StyledDiv> 
                            :'' }
                        
                            <Col span={24}>
                                <S.Content>{item.subcontent? item.subcontent:''}</S.Content>
                            </Col>
                        
                        </S.CustomListItem>}
                    />
                </Col>
            </Row>
          


        </React.Fragment>
    );
};