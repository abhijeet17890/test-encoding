import React, { useState } from 'react';
import { PageHeading } from '../../sharedComponents/Heading/index';
import Divider from '../../sharedComponents/Divider/index';
import {Row, Col, Menu, Tabs} from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { Link, useHistory } from "react-router-dom";
import { routes } from "../../constants/routes";

import Accounts from './Accounts/index';
import PortfolioOverview from './PortfolioOverview/index';
import PersonalInformation from './PersonalInformation';
import InvestmentProfile from './InvestmentProfile/index.js';
import TransactionHistory from './TransactionHistory/index';
import Dashboard from './Dashboard/index';
import OrderHistory from './OrderHistory/index';
import Notes from './Notes/index';
import Reports from './Reports/index';
import PortfolioAnalytics from './PotfolioAnalytics/index';

import * as S from './styles';
import 'antd/dist/antd.css';



const { SubMenu } = Menu;


function ClientAccountDetails({clientName,clientId}) {
    const [current, setCurrent] = useState('Dashboard');
    const [currentMenu, setCurrentMenu] = useState();

    const viewPortfolio=(e)=>{
        setCurrent('Portfolio Overview');
    }
    const handleClick = (e) => {
        setCurrent(e.key);
        setCurrentMenu(e.keyPath[1]);
    };
    const handleMenuClick = (e) => {
       
        setCurrent();
        setCurrentMenu(e.key);
    };
    const renderTitle = ()=>{
        return(
            <span>Profile <DownOutlined style={{color:'#1997fc'}}/></span>
        );
    }
    return(
        <React.Fragment>
            <Row justify='center'>
                <Col lg={20}>
                    <PageHeading>
                        Client: {clientName}
                    </PageHeading>
                    <Divider/>
                </Col>
            </Row>

            <Row justify='center' gutter={[0,10]}>
                <Col span={20}>
                    <S.StyledMenu 
                        mode="horizontal"
                        selectedKeys={[current]}
                        onClick={handleClick}
                    >
                        <Menu.Item 
                            key="Dashboard"
                        >
                            <span>
                                Dashboard
                                </span>
                        
                        </Menu.Item>

                        <Menu.Item  
                            key="Portfolio Overview"
                        >
                            <span>
                            Portfolio Overview
                            </span>
                        </Menu.Item>

                        <Menu.Item  
                            key="Portfolio Analytics"
                        >
                            <span>
                            Portfolio Analytics
                            </span>
                        </Menu.Item>

                        <Menu.Item  
                            key="Order History"
                        >
                            <span>
                            Order History
                            </span>
                        </Menu.Item>

                        <Menu.Item  
                            key="Transaction History"
                        >
                            <span>
                            Transaction History
                            </span>
                        </Menu.Item>

                        <SubMenu 
                            
                            title={renderTitle()}
                            currentmenu={currentMenu}
                            onTitleClick={handleMenuClick}
                            className='profile'
                        >
                            <Menu.Item key='Personal Information'>
                                <span>
                                Personal Information
                                </span>
                            </Menu.Item>

                            <Menu.Item key ='Investment Profile'>
                                <span>
                                Investment Profile
                                </span>
                            </Menu.Item>

                            <Menu.Item key='Accounts'>
                                Accounts
                            </Menu.Item>

                            <Menu.Item key='Reports'>
                                Reports
                            </Menu.Item>
                        </SubMenu>

                        <Menu.Item  key="Notes">
                            <span>
                            Notes
                            </span>
                        </Menu.Item>

                    </S.StyledMenu>

                </Col>
            </Row>
            <Row justify='center' gutter={[0,10]}>
                <Col lg={21}>
                    {current==='Dashboard'?
                        
                            <Dashboard 
                                clientId={clientId} 
                                clientName={clientName} 
                                viewPortfolio={viewPortfolio}/>
                        :
                        current==='Portfolio Overview'?
                            <PortfolioOverview/>
                        :
                        current==='Portfolio Analytics'?
                            <PortfolioAnalytics/>
                        : 
                        current==='Order History'?
                            <OrderHistory clientId={clientId}/>
                        : 
                        current==='Transaction History'?
                            <TransactionHistory clientId={clientId}/>
                        : 
                        current==='Accounts'?
                            <Accounts/>
                        : 
                        current==='Reports'?
                            <Reports/>
                        : 

                        current==='Personal Information'?
                            <PersonalInformation clientId={clientId}/>
                        :
                        current==='Investment Profile'?
                            <InvestmentProfile clientId={clientId}/>
                        : 
                        current==='Notes'?
                            <Notes/>
                        :
                        current==='Investment Profile'?
                                <InvestmentProfile/>
                        : ''
                        
                    }
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default ClientAccountDetails;