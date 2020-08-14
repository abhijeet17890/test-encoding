import React, { useState } from 'react';
import { Input } from '../../sharedComponents/Input/index';
import { Modal } from '../../sharedComponents/Modal/index';
// import { Button } from '../../sharedComponents/button/index';
import * as S from './styles';

function CreateWatchlist({visible, closeCreate, addList}){
    const[new_list, setNewList] = useState('');

    const handleChange = (e) =>{
        setNewList(e.target.value);
    }
    const handleSubmit = e =>{
        e.preventDefault();
        if(new_list!==''){
            addList(new_list);
            setNewList('');
        }
    }

    return(
        <React.Fragment>
            <Modal
                title="Enter Watchlist Name"
                visible={visible}
                onCancel={closeCreate}
                centered
                width={468}
                
                footer={[
                    <S.StyledButton size={'md-2'} modalbutton={true} outlined cancel={true} key="Cancel" onClick={closeCreate}>
                        Cancel
                    </S.StyledButton>,
                    <S.StyledButton size={'md-2'} modalbutton={true} key="Create" type="primary" onClick={e=>handleSubmit(e)}>
                      Create
                    </S.StyledButton>,
                  ]}
         
            >
                <Input 
                    placeholder='List'
                    type='text'
                    onChange={e=>handleChange(e)}
                    value={new_list}
                />
               
            </Modal>
        </React.Fragment>

    );
}
export default CreateWatchlist;
