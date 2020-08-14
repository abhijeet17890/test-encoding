import React from 'react';

import { Modal } from '../../../sharedComponents/Modal/index';
import { Button } from '../../../sharedComponents/button/index';

import Check from '../../../assets/check.png';

import 'antd/dist/antd.css';
import * as S from './styles';

function ModalPassValidation({visible, closeModal}){
    const PassErrors = ['Atleast 8 characters','A lower case letter','An upper case letter','A special character','A number' ];

    return(
        <Modal
            title="Your Password must contain"
            visible={visible}
            onCancel={closeModal}
            width={339}
            centered={true}
            footer={<Button 
                        size={'md-1'}
                        onClick={closeModal}>
                        OK
                    </Button>}
        > 
          {PassErrors.map(item=>
            <S.StyleList>
                <img src={Check} alt={'check'}/>
                <S.Span>{item}</S.Span>
            </S.StyleList>)}
        </Modal>
    );
}
export default ModalPassValidation;


