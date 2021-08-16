import React from "react";
import "materialize-css";
import {useRoutes} from "./routes";
import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./component/Navbar";

function App() {
    const {login, logout, token, userId} = useAuth();
    // определяет зарегестрирован ли token
    const isAuthenticated = !!token;
    // корректное отображение routes
    const routes = useRoutes(isAuthenticated);

    return (
        <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated}}>
            {isAuthenticated && <Navbar/>}
            <BrowserRouter>
                {/*<Navbar/>*/}
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
