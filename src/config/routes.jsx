import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Chatroom from '../views/chatroom';
import Explore from '../views/explore';
import Home from '../views/home';

const ROUTES = [
    {path: "/", key: "ROOT", exact: true, component: Chatroom },
    {
        path: "/fanclub",
        key: "APP",
        component: props =>  <RenderRoutes {...props} />,
        routes: [
            {
                path: "/fanclub/@me",
                key: "APP_ROOT",
                exact: true,
                component: Home,
            },
            {
                path: "/fanclub/:id",
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

