import React from "react";
import { Space } from "antd";
import { Button } from "../../sharedComponents/button";
import {routes} from '../../constants/routes'
import { useHistory } from "react-router-dom";

const ButtonWrape=(props)=>{
  const history = useHistory();

  return (
    <Space size="large" align="end">
      <Button outlined size={'sm-2'}  onClick={()=>{console.log('props',props);
      history.push({
        pathname: routes.authRoutes.invest,
        state: {
          symbol: props.symbol,
          name: props.name,
          id: props.id
        }
      })
    }}
    >
        Sell
      </Button>
      <Button size={'sm-2'} onClick={()=>{history.push({
      pathname: routes.authRoutes.invest,
      state: {
        symbol: props.symbol,
        name: props.name,
        id: props.id
      }
      })}}>
        Buy
      </Button>
    </Space>
  );
};

export default ButtonWrape;
