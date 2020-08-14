import React, { useState } from "react";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import { routes } from '../../constants/routes'
import {useAuth} from "../../contextProviders/authProvider";


const RouteParent = () => {
    let history = useHistory();
    const { loggedInUser } = useAuth();

    const userType =
        loggedInUser && loggedInUser.groups
            ? loggedInUser.groups[0].name.toLowerCase().replace(/ /g, "_")
            : "";

    return(
            <React.Fragment>
                {(userType === 'customer') &&  <Redirect to={routes.authRoutes.customerDashboard} />}
                {(userType === 'advisor') &&  <Redirect to={routes.authRoutes.advisorDashboard} />}
                {(userType === 'relationship_manager') &&  <Redirect to={routes.authRoutes.rmDashboard} />}
            </React.Fragment>
    );
};

export default RouteParent;
