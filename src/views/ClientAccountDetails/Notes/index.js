import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Col} from 'antd';

import NotesTable from './NotesTable';
import AddNote from './AddNote';
import EditNote from './EditNote';

import { StyledMainDiv,PageHeading } from './styles';
import {Button} from '../../../sharedComponents/button/index';




function Notes() {
   
    const[openAdd, setopenAdd] = useState(false);
    const[openEdit, setOpenEdit] = useState(false);

    const addNote =()=>{
        setopenAdd(true);

    }
    const closeAdd = () =>{
        setopenAdd(false);

    }
    const editNote = () => {
        setOpenEdit(true);
    }
    const closeEdit = ()=>{
        setOpenEdit(false);
    }
  return (
    <StyledMainDiv>
        {openAdd?<AddNote closeAdd={closeAdd}/>:
        <div>
        {openEdit?<EditNote closeEdit={closeEdit}/>:
            <div>
            <Row justify='center' gutter={[0,20]}>
                <Col span={10}>
                    <PageHeading>
                        Notes
                    </PageHeading>
                </Col>
                <Col span={2}>
                    <Button size={'sm-1'} onClick={addNote}> +Note</Button>
                </Col>
            </Row>
            
            <Row gutter={[0,20]} justify='center'>
                <Col span={12}>
                    <NotesTable editNote={editNote}/>
                </Col>
            </Row>
            </div>
            
    }</div>
    }
    
    
    
    </StyledMainDiv>
  )
}

export default Notes;
