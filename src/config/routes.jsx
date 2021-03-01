import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Chatroom from '../views/chatroom';
import Explore from '../views/explore';
import Registration from '../views/registration';

const ROUTES = [
    {path: "/", key: "ROOT", exact: true, component: Registration },
    {
        path: "/fanclub",
        key: "APP",
        component: props => {
        return  <RenderRoutes {...props} />
    },
        routes: [
            {
                path: "/fanclub/id",
                key: "CHAT_ROOM",
                exact: true, 
                component: Chatroom,
            },
            {
                path: "/fanclub/explore",
                key: "EXPLORE",
                exact: true,
                component: Explore,
            }
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

