import React, {useState} from 'react';
import {CaloriesList} from "./components/Calories/CaloriesList";
import {LoginBox} from "./components/LoginBox/LoginBox";

import './App.css';

export const App = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(true);

    const checkLoginStatus = (code: number) => {
        if (code === 401) {
            setLoggedIn(false);
        } else {
            setLoggedIn(true);
        }
    }

    return (
        <div className="App">
            {loggedIn && <CaloriesList onSendStatus={checkLoginStatus}/>}
            <LoginBox loggedIn={loggedIn} onSetLogIn={setLoggedIn}/>
        </div>
    );
}

