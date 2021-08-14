import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {CreatePage} from "./pages/CreatePage";
import {LinksPage} from "./pages/LinksPage";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/create" exact><CreatePage/></Route>
                <Route path="/links" exact><LinksPage/></Route>
                <Route path="/detail/:id"><DetailPage/></Route>
                <Redirect to="/create"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/"><AuthPage/></Route>
            <Redirect to="/"/>
        </Switch>
    )

}

