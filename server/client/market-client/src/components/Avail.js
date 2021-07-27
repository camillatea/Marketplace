import React, { Fragment, useEffect, useState} from 'react'
import './Avail.css'

const Avail = () => {
    const [avails, setAvails] = useState([]);
    
    const activeUser = localStorage.getItem('user');

    const deleteAvail = async (id) => {
        try {
            const deleteAvail = await fetch(`http://localhost:5000/avail/${id}`, {
                method: "DELETE"
            });

            setAvails(avails.filter(available => available.avail_id !== id))
        } catch (err) {
            console.error(err.message);
        }
    }

    const buyAvail = async (id, name, description, imgpath) => {
        try {
            const body = {name, description, imgpath, activeUser};
            const response = await fetch("http://localhost:5000/owned", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            deleteAvail(id);
            window.location ="/";
        } catch (err) {
            console.error(err.message);
        }
    }

    const getAvails = async() => {
        try {
            const response = await fetch('http://localhost:5000/avail')
            const jsonData = await response.json()

            console.log(jsonData);
            setAvails(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getAvails();
    }, []);

    console.log(avails);

    return (
        <Fragment>
        <div className="container">
        <h1>Available:</h1>
            <div className="market-items-wrapper">
                {avails.map(available => (
                <div className="market-items">
                    <ul>
                        <li>{available.name}</li>
                        <li>{available.description}</li>
                        <li><img src ={require(`./images/${available.imgpath}.png`).default} alt="For the Item" style={{marginBottom: "10px"}}/></li>
                        <li><button className="btn btn-danger" onClick={() => 
                        buyAvail(available.avail_id, available.name, available.description, available.imgpath)}>Buy</button></li>
                    </ul>
                </div>    
                ))}
            </div>
        </div>
        
        </Fragment>
    )
}


export default Avail;