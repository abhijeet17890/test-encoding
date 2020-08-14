import React, { useState } from 'react';
import { Row, Col} from 'antd';
// import { Button } from '../../sharedComponents/button/index';
import Divider from '../../sharedComponents/Divider/index';
import { PageHeading, SubHeading } from '../../sharedComponents/Heading/index';

import CreateWatchlist from './CreateWatchlist';
import ShowList from './ShowList';


import * as S from './styles.js';
import 'antd/dist/antd.css';

function Watchlists(){
    const[visible,setVisible] = useState(false);
    const[DelVisible, setDelVisible] = useState(false);
    const[index, setIndex] = useState('');
    const[current_item,setCurrentItem]=useState('');
    const[EditVisible, setEditVisible] = useState(false); 
    const[list,setList] = useState(
        [
            { list_name:'List A' },
            { list_name: 'List B'},
            { list_name:'List C' }
        ]);

     const addList = (list_name) => {
        const list_new= [...list, { list_name }];
        setList(list_new);
        console.log(list)
        setVisible(false);
    }    
    const removeList = () => {
        const newList = [...list];
        newList.splice(index, 1);
        setList(newList);
        setDelVisible(false)
      };
    
    const showCreate = (e) =>{
        setVisible(true);
    }
    const closeCreate = (e) => {
        setVisible(false);
    }
    const openDel = (index) =>{
        setIndex(index);
        setCurrentItem(list[index].list_name);
        setDelVisible(true)
    }
    const closeDel = (e) =>{
        setDelVisible(false);

    }
    const openEdit =(index)=>{
        setIndex(index);
        setEditVisible(true);

    }
    const closeEdit=(e)=>{
        setEditVisible(false);
    }
    const editList = (new_list_name) => {
        const newList = [...list];
        newList[index].list_name=new_list_name;
        setList(newList);
        setEditVisible(false);
    }

    return(
        <React.Fragment>
            
            <Row justify='center' gutter={[0,20]}>
                <Col xs={{ span: 23, offset: 0 }} lg={{ span: 19, offset: 0 }}>
                    <PageHeading>Watchlists</PageHeading>
                    <Divider/>
                </Col>
            </Row>
            <Row justify='center' gutter={[40,10]}>
                <Col xs={{ span: 23, offset: 0 }} lg={{ span: 18, offset: 0 }} push={1}>
                    <SubHeading> My Watchlists</SubHeading>
                </Col>

                <Col xs={{ span: 23, offset: 0 }} lg={{ span: 2, offset: 0 }} pull={2} >
                    
                        
                        <S.StyledButton 
                            type='primary' 
                            size={'md-2'}
                            onClick={showCreate}
                        >
                            Create a new list
                        </S.StyledButton>
                        <CreateWatchlist visible={visible} closeCreate={closeCreate} addList={addList}/>
                 
                </Col>
                
                <Col xs={{ span: 23, offset: 0 }} lg={{ span: 19, offset: 0 }}>
                    <Divider/>
                </Col>
            </Row>

            {list.map((list_item,index)=>(                
            <ShowList
                    key={index}
                    index={index}
                    list={list_item}
                    removeList={removeList}
                    DelVisible={DelVisible}
                    openDel={openDel}
                    closeDel={closeDel}
                    current_item={current_item}
                    openEdit={openEdit}
                    closeEdit={closeEdit}
                    EditVisible={EditVisible}
                    editList = {editList}
                />))}


        </React.Fragment>
    );
};
export default Watchlists;