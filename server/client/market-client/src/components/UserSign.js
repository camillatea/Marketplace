import React, { Component, Fragment, useEffect, useState} from 'react'
import './UserSign.css';

import sha256 from 'sha.js';

const UserSign = () => {
    const [listUsers, setUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");

    const activeUser = localStorage.getItem('user');

    const signOut = async() => {
        localStorage.setItem('user', 'user');
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
            alert("Doesn't exist... Signing you up now.")
            newUser();
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
            <div className="wrapper">
                {activeUser !== 'user' ? (
                    <div className="wrapper">
                    <div className="sign">
                        <p style={{fontSize: '10px', paddingTop: '13px'}}>Welcome back {activeUser}!</p>
                    </div>
                    <div className="sign">
                        <button onClick={() => signOut()} style={{width: '70px', height: '20px', fontSize: '10px'}}>Sign out.</button>
                    </div>
                    </div>
                ) : (
                    <div className="wrapper">

                <div className="sign">
                    <form className="d-flex" onSubmit={signIn}>
                        <input type="text" onChange={e => setEmail(e.target.value)} style={{width: '100px', height: '20px', fontSize: '10px'}}/>

                        <input type="password" onChange={e => setPass(e.target.value)} style={{width: '100px', height: '20px', fontSize: '10px'}}/>

                        <input type="submit" value="Sign In / Sign Up" style={{width: '100px', height: '20px', fontSize: '10px'}}/>
                    </form>
                </div>
                </div>
                )}
            </div>
    )
}
//<button onClick ={() => checker('zebgrand27@gmail.com')}>Click to create new User!</button> <button onClick={() => signOut()}>Sign out. </button>
//<button onClick={() => signOut()} style={{width: '70px', height: '20px', fontSize: '10px'}}>Sign out. </button>
/*                     <div className="sign">

                    <form className="d-flex" onSubmit={checker}>
                        <input type="text" onChange={e => setEmail(e.target.value)} style={{width: '100px', height: '20px', fontSize: '10px'}}/>
                        <input type="password" onChange={e => setPass(e.target.value)} style={{width: '100px', height: '20px', fontSize: '10px'}}/>
                        <input type="submit" value="Sign Up" style={{width: '50px', height: '20px', fontSize: '10px'}}/>
                    </form>
                </div>*/

export default UserSign
