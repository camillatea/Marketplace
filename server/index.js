const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors())
app.use(express.json()); //req.body

//ROUTES//

//ROUTES FOR AVAILABLE MARKET
app.post("/avail", async(req, res) => {
    try {
        const {name, description, imgpath} = req.body;
        const newAvail = await pool.query(
            "INSERT INTO available (name, description, imgpath) VALUES ($1, $2, $3) RETURNING *", 
            [name, description, imgpath]
        );
        res.json(newAvail.rows[0]);
        console.log(req.body);
    } catch (err) {
        console.error("Failed to add new Available item.")
        console.error(err.message);
    }
})

app.get("/avail", async(req, res) => {
    try {
        const allAvail = await pool.query(
            "SELECT * FROM available"
        );
        res.json(allAvail.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.get("/avail/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const available = await pool.query(
            'SELECT FROM available WHERE avail_id = $1',
            [id]
        );
        res.json(available.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.delete("/avail/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteAvail = await pool.query(
            "DELETE FROM available WHERE avail_id = $1", 
            [id]
        );
        res.json("Avail was deleted");
    } catch (err) {
        console.error("Couldn't delete Available.")
        console.error(err.message);
    }
})

//ROUTES FOR OWNED ITEMS
app.post("/owned", async(req, res) => {
    try {
        const {name, description, imgpath} = req.body;
        const newOwned = await pool.query(
            "INSERT INTO owned (name, description, imgpath) VALUES ($1, $2, $3) RETURNING *", 
            [name, description, imgpath]
        );
        res.json(newOwned.rows[0]);
        console.log(req.body);
    } catch (err) {
        console.error("Failed to add Owned Item.")
        console.error(err.message);
    }
})

app.get("/owned", async(req, res) => {
    try {
        const allOwned= await pool.query(
            "SELECT * FROM owned"
        );
        res.json(allOwned.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.delete("/owned/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteOwned = await pool.query(
            "DELETE FROM owned WHERE owned_id = $1", 
            [id]
        );
        res.json("Owned was deleted");
    } catch (err) {
        console.error("Couldn't delete Owned.")
        console.error(err.message);
    }
})

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});