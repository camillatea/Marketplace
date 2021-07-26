import React, { Fragment, useEffect, useState} from 'react'

const UserSign = () => {
    const [listUsers, setUsers] = useState([]);

    const newUser = async (email, password) => {
        try {
            const body = {email, password};
                const response = await fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
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

    const checker = async(email, password) => {
        var bool = false;
        for (var x = 0; x < listUsers.length; x++) {
            if (x = email)
            bool = true;
        }

        if (!bool) {
            newUser(email, password);
            alert("User created successfully!")
        } else {
            alert("User already exists...");
        }
    }

    console.log(listUsers);
    return (
        <Fragment>
            <button onClick ={() => checker('zebgrand27@gmail.com')}>Click to create new User!</button>
        </Fragment>
    )
}

export default UserSign
