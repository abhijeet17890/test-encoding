import React from 'react';
import * as S from './styles';
import {Modal } from '../../sharedComponents/Modal';
import { Row, Col } from 'antd';



const OutsideLrs = ({visible,closeOutsideLrs}) => {
    return(
        <Modal
                title="Message"
                visible={visible}
                centered
                width={468}
                footer={
                    <S.ModalButton  onClick={closeOutsideLrs}>Ok</S.ModalButton>
                }
         
            >
                <Row justify='center'>
                    <Col span={20}>
                        <S.ModalContent>
                            Please contact customer service for a remittance outside the LRS process.
                        </S.ModalContent>
                    </Col>
                </Row>
            </Modal>
    );
}
export default OutsideLrs;
