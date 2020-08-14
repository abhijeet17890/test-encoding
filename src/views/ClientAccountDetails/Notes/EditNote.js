import React from 'react';
import * as S from './styles.js';
import CustomizedInput from './SharedComponents/Input/index';
import Divider from '../../../sharedComponents/Divider';
import { Button } from '../../../sharedComponents/button/index';
import {Row, Col, Space} from 'antd';


export default function EditNote(props){
    
    function handleChange(value) {
        console.log(`selected ${value}`);
      }
      
    return(
        <S.StyledMainDiv>
            <Row justify='center' gutter={[0,20]}>
                <Col span={12}>
                    <S.PageHeading>Edit Note</S.PageHeading>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,20]}>
                <Col span={12}>
                    <Divider/>
                </Col>
            </Row>
            <Row justify='center' gutter={[0,20]}>
                <Col span={11}>
                    <CustomizedInput placeholder={'Enter the title'} heading='Title' text onChange={handleChange} />
                </Col>
            </Row>
            <Row justify='center' gutter={[0,30]}>
                <Col span={11}>
                    <CustomizedInput placeholder={'Enter your note'} heading='Note'  textArea  onChange={handleChange}/>
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={6}>
                    <Space direction='horizontal'>
                        <Button size='md-1' outlined onClick={props.closeEdit}>Cancel</Button>
                        <Button size='md-1'>Save</Button>
                    </Space>
                </Col>
                
            </Row>
        </S.StyledMainDiv>
    );
}
