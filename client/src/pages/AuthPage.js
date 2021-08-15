import React, {useEffect, useState} from "react";
import "materialize-css";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const AuthPage = () => {
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: "", password: ""
    });

    const message = useMessage()

    useEffect(() => {
        // console.log('Error', error)
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    // methode register
    const registerHandler = async () => {
        try {
            //    request with 3 parameters (url from auth.routes)
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }
    // methode logining
    const loginHandler = async () => {
        try {
            //    request with 3 parameters (url from auth.routes)
            const data = await request('/api/auth/login', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Auth Page</h1>
                <div className="card blue lighten-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Input email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                                <div className="input-field">
                                    <input
                                        placeholder="Input password"
                                        id="password"
                                        type="password"
                                        name="password"
                                        className="yellow-input"
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-3"
                            style={{marginRight: 10}}
                            onClick={loginHandler}
                            disabled={loading}
                        >Login
                        </button>
                        <button
                            className="btn grey lighten-4 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

