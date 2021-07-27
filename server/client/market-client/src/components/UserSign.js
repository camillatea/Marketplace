import React, { Component, Fragment, useEffect, useState} from 'react'
import './UserSign.css';

import sha256 from 'sha.js';

const UserSign = () => {
    const [listUsers, setUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");

    const activeUser = localStorage.getItem('user');

    const signOut = async() => {
        localStorage.setItem('user', '');
        window.location= "/"
    }

    const newUser = async() => {
        try {
            const body = {email, password};
                const response = await fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
                localStorage.setItem('user', email);
                window.location ="/";
        } catch (err) {
            console.error(err.message);
        }
    }

    const getUsers = async() => {
        try {
            const response = await fetch('http://localhost:5000/users');
            const jsonData = await response.json();
            setUsers(jsonData);
        } catch (err) {
            console.error(err.message);
        } 
    }

    useEffect(() => {
        getUsers();
    }, []);


    const strCompare = async(str1, str2) => {
        return str1 === str2;
    }

    //Check if Password is correct...
    const signIn = async e => {
        e.preventDefault();
        const v = (element) => element.email === email;
        const exists = listUsers.some(v);
        if (exists) {
            const finder = listUsers.filter((e) => e.email === email);
            const passComp = finder[0].passHash;
            const passSalt = finder[0].salt;
            var hash = await sha256('sha256').update(password + passSalt).digest('hex');   
            
            if (strCompare(hash, passComp)) {
                localStorage.setItem('user', email);
                alert("User is now logged in.")
                window.location="/";
            }

        } else {
            alert("Doesn't exist... Sign up?")
        }
    }
    //Check if Username Exists...
    const checker = async e => {
        e.preventDefault();

        const v = (element) => element.email === email;
        const exists = listUsers.some(v);

        if (!exists) {
                newUser();
                alert("User created successfully!")
        } else {
                alert("User already exists...");
        }
    }



    console.log(listUsers);
    return (
        <div className="container">
        <h1>Zeb's Marketplace</h1>
            <div className="wrapper">
            
                <div className="sign">
                    <form className="d-flex mt-5" onSubmit={checker}>
                        <input type="text" onChange={e => setEmail(e.target.value)}/>
                        <input type="password" onChange={e => setPass(e.target.value)}/>
                        <input type="submit" value="Sign Up"/>
                    </form>
                </div>
                <div className="sign">
                    <form className="d-flex mt-5" onSubmit={signIn}>
                        <input type="text" onChange={e => setEmail(e.target.value)}/>
                        <input type="password" onChange={e => setPass(e.target.value)}/>
                        <input type="submit" value="Sign In"/>
                    </form>
                </div>
            </div>
        </div>
    )
}
//<button onClick ={() => checker('zebgrand27@gmail.com')}>Click to create new User!</button> <button onClick={() => signOut()}>Sign out. </button>

export default UserSign
