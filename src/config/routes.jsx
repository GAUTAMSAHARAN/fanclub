import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Chatroom from '../views/chatroom';
import Explore from '../views/explore';
import Registration from '../views/registration';
import Cookies from 'js-cookie';

export const createId =
  (window.uuid && typeof window.uuid.v4 === 'function' && window.uuid.v4) ||
  function b(a) {
    return a
      ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
      : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b)
}

const ROUTES = [
    {path: "/", key: "ROOT", exact: true, component: Registration },
    {
        path: "/fanclub",
        key: "APP",
        component:  props => {
            if (!Cookies.get('token')){
              return <Redirect to={"/"} />;
            }
            return <RenderRoutes {...props} />;
        },
        routes: [
            {
                path: "/fanclub/groups/:id",
                key: createId(),
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

