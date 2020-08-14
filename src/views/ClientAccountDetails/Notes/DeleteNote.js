import React from 'react';
import { Modal } from '../../../sharedComponents/Modal/index';
import * as S from './styles';
export default function DeleteNode(props){
    return(
        <Modal 
            name= "DeleteNote"
            title="Delete Note"
            visible={props.visible}
            onCancel={props.closeDel} 
            centered
            width={468}
            footer={[
                <S.StyledButton size={'md-2'} modalbutton={true} outlined cancel={true} key="Cancel" onClick={props.closeDel}>
                    Cancel
                </S.StyledButton>,
                <S.StyledButton size={'md-2'} modalbutton={true} key="Create" type="primary" >
                  Delete
                </S.StyledButton>,
              ]}
        >
            <p>Are you sure you want to delete this note </p>
          
        </Modal>
    );
}
            