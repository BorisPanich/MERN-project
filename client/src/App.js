import React from "react";
import "materialize-css";
import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {login, logout, token, userId} = useAuth();
    // определяет зарегестрирован ли token
    const isAuthenticated = !!token;
    // отображение routes
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated}}>
            <BrowserRouter>
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
