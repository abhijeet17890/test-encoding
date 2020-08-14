import React, { useState } from "react";
import { useInsideAuthApi } from "../../contextProviders/apiProvider";

import Trade from "./Trade";
import OrderReview from "./OrderReview";

function Invest(props) {
  const [counter, setCounter] = useState(0);
  const [details, setDetails] = useState(0);

  return (
   <>
      <Trade data={props.location.state} />
   </>
  );
}

export default Invest;