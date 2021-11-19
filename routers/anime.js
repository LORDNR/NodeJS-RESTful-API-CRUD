const express = require('express');
const { add } = require('nodemon/lib/rules');
const router = express.Router();
const dbCon = require('../dbcon');
const app = require('../server');

//GET read
router.get('/' , (req , res)=>{
    dbCon.query('SELECT * FROM anime',(err, results, fields) => {
        if(err) throw err;

        let msg = ""
        if(results === undefined || results.length == 0) {
            msg = "Anime table is empty";
        } else {
            msg = "Successfully retrieved all Anime";
        }
        return res.send({ err: false, data: results, msg: msg})
    })
})
//GET by id || read 1
router.get('/:id' , (req , res)=>{
    let id = req.body.id;

    if(!id) {
        return res.status(400).send({ err: true, msg: "Please provide anime id"});
    } else {
        dbCon.query('SELECT * FROM anime WHERE id = ?', [id], (err, results, fields) => {
            if(err) throw err;
    
            let msg = ""
            if(results === undefined || results.length == 0) {
                msg = "Anime not found";
            } else {
                msg = "Successfully retrieved Anime data";
            }
            return res.send({ err: false, data: results[0], msg: msg})
        })
    }
})

//POST Insert
router.post('/' , (req , res)=>{
    let name = req.body.name;
    let author = req.body.author;

    //validation
    if(!name || !author) {
        return res.status(400).send({ err: true, msg: "Please provide anime name and author"});
    } else {
        dbCon.query('INSERT INTO anime (name, author) VALUES(?, ?)', [name, author], (err, results, fields) => {
            if(err) throw err;
            return res.send({ err: false, data: results, msg: "Anime Successfully added"})
        })
    }
});

//Put Update
router.put('/', (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let author = req.body.author;

    //validation
    if(!id || !name || !author) {
        return res.status(400).send({ err: true, msg: "Please provide anime id, name and author"});
    } else {
        dbCon.query('UPDATE anime SET name = ?, author = ? WHERE id = ?', [name, author, id], (err, results, fields) => {
            if(err) throw err;
            
            let msg = "";
            if(results.changedRows === 0) {
                msg = "Anime not found or data are same";
            } else {
                msg = "Anime Successfully Updated";
            }
            return res.send({ err: false, data: results, msg: msg});
        })
    }
})

//Delete by id
router.delete('/:id' , (req , res)=>{
    let id = req.body.id;

    if(!id) {
        return res.status(400).send({ err: true, msg: "Please provide anime id"});
    } else {
        dbCon.query('DELETE FROM anime WHERE id = ?', [id], (err, results, fields) => {
            if(err) throw err;
    
            let msg = ""
            if(results.affectedRows === 0) {
                msg = "Anime not found";
            } else {
                msg = "Anime Successfully deleted";
            }
            return res.send({ err: false, data: results[0], msg: msg})
        })
    }

    
})

module.exports = router;