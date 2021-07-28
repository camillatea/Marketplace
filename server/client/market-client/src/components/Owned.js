import React, { Fragment, useEffect, useState} from 'react'
import './Avail.css'

const Owned = () => {
    const [owneds, setOwned] = useState([]);

    const activeUser = localStorage.getItem('user');

    const deleteOwned = async (id) => {
        try {
            const deleteOwned = await fetch(`http://localhost:5000/owned/${id}`, {
                method: "DELETE"
            });

            setOwned(owneds.filter(owned => owned.owned_id !== id))
        } catch (err) {
            console.error(err.message);
        }
    }

    const sellOwned= async (id, name, description, imgpath) => {
        try {
            const body = {name, description, imgpath};
            const response = await fetch("http://localhost:5000/avail", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            deleteOwned(id);
            window.location ="/";
        } catch (err) {
            console.error(err.message);
        }
    }

    const getOwned = async() => {
        try {
            if (activeUser !== '') {
                const response = await fetch(`http://localhost:5000/owned/${activeUser}`)
                const jsonData = await response.json()

                console.log(jsonData);
                setOwned(jsonData);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getOwned();
    }, []);

    console.log(owneds);

    return (
        <Fragment>
        <div className="container">
        <br/>
        {activeUser !== 'user' ? (
        <h3>Owned Cards:</h3>
        ) : (
            <h3>Sign up to view your Inventory!</h3>
        )}
            <div className="market-items-wrapper">
                {owneds.map(owned=> (
                <div className="market-items">
                    <div className="market-img-wrap">
                        <div className="market-img" style={{ background: `url(${require('./images/' + owned.imgpath + '.png').default}) no-repeat`}}>
                            <div className="item-name">
                                <h1>{owned.name}</h1>
                            </div>
                        </div>
                    </div>
                    <br/>
                        <p>{owned.description}</p>
                        <button className="btn btn-danger" onClick={() => 
                        sellOwned(owned.owned_id, owned.name, owned.description, owned.imgpath)}>Sell</button>
                </div>    
                ))}
            </div>
        </div>
        
        </Fragment>
    )
}


export default Owned;