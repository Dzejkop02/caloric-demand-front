import React, {FormEvent, useState} from "react";
import { RegisterUserResponse } from "types";

import './LoginBox.css';

interface Props {
    loggedIn: boolean;
    onSetLogIn: (status: boolean) => void;
}

export const LoginBox = (props: Props) => {
    const [username, setUsername] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const register = async () => {
        if (username.length < 2 || username.length > 64) {
            setErrorMessage('Login must be from 2 to 64 characters');
            return;
        }

        if (pwd.length < 3) {
            setErrorMessage('Password must be at least 3 characters.');
            return;
        }

        const res = await fetch('http://localhost:3001/user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                pwd,
            }),
        });

        const data = await res.json() as RegisterUserResponse;

        if (data.ok === false) {
            setErrorMessage(data.error);
            setUsername('');
            return;
        }

        setSuccessMessage('Register successful. You can Log in now.');
        setUsername('');
        setPwd('')
    }

    const login = async (e: FormEvent) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3001/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                username,
                pwd,
            }),
        });

        const data = await res.json();

        if (data.ok === false) {
            setErrorMessage(data.error);
            return;
        }

        if (data.ok) {
            props.onSetLogIn(true);
            setUsername('');
            setPwd('')
        }
    };

    const logOut = async () => {
        await fetch('http://localhost:3001/auth/logout/', {
            credentials: 'include',
        });

        props.onSetLogIn(false);
    };

    return !props.loggedIn ?
        <div className="LoginBox">
            <form onSubmit={login}>
                <label htmlFor="username">Login: </label>
                <input
                    id="username"
                    type="string"
                    value={username}
                    onChange={e => {setUsername(e.target.value); setErrorMessage(''); setSuccessMessage('')}}
                />

                <label htmlFor="pwd">Password: </label>
                <input
                    id="pwd"
                    type="password"
                    value={pwd}
                    onChange={e => {setPwd(e.target.value); setErrorMessage(''); setSuccessMessage('')}}
                />

                {errorMessage && <p className="error">{errorMessage}</p>}
                {successMessage && <p className="success">{successMessage}</p>}

                <div className="buttons">
                    <button type="button" onClick={register}>Sign up</button>
                    <button>Log in</button>
                </div>
            </form>
        </div>
        :
        <div className="LoginBox">
            <button className="loggedIn" onClick={logOut}>Log out</button>
        </div>;
}