import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import configureStore from '../store/store';


const ROUTES = [
    {path: "/", key: "ROOT", exact: true, component: LogIn },
    {
        path: "/app",
        key: "APP",
        component:  <RenderRoutes {...props} />,
        routes: [
            {
                path: "/app",
                key: "APP_ROOT",
                exact: true,
                component: Home,
            },
        ],
    },
];

export default ROUTES;


function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={props => <route.component {...props} routes={route.routes} />}
        />
    );
}
export function RenderRoutes({ routes }) {
    return (
        <Switch>
            {routes.map((route, i) => {
                return <RouteWithSubRoutes key={route.key} {...route} />;
            })}
            <Route component={() => <h1>Not Found!</h1>} />
        </Switch>
    );
}



// code for login chekc
// props => {
//     if (!localStorage.getItem('token')){
//       return <Redirect to={"/"} />;
//     }
//     return <RenderRoutes {...props} />;
//   },