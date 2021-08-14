import React, {useState} from "react";
import "materialize-css";

export const AuthPage = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
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
                        <button className="btn yellow darken-3" style={{marginRight: 10}}>Login</button>
                        <button className="btn grey lighten-4 black-text">Registration</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

