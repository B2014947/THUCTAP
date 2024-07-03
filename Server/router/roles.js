const express = require('express');
const db = require('../db');
const router = express.Router();


router.get('/roles', (req, res) => {
    const sql = 'SELECT * FROM roles';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});


router.get('/roles/:id', (req, res) => {
    const roleId = req.params.id;
    const sql = 'SELECT * FROM roles WHERE id = ?';
    db.query(sql, [roleId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Role not found' });
            return;
        }
        res.json(results[0]);
    });
});


router.post('/roles', (req, res) => {
    const { name, description } = req.body;
    const sql = 'INSERT INTO roles (name, description) VALUES (?, ?)';
    db.query(sql, [name, description], (err, result) => {
        if (err) {
            console.error('Error inserting into database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(201).json({ message: 'Role added successfully', id: result.insertId });
    });
});


router.put('/roles/:id', (req, res) => {
    const roleId = req.params.id;
    const { name, description } = req.body;
    const sql = 'UPDATE roles SET name = ?, description = ? WHERE id = ?';
    db.query(sql, [name, description, roleId], (err, result) => {
        if (err) {
            console.error('Error updating database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Role updated successfully' });
    });
});


router.delete('/roles/:id', (req, res) => {
    const roleId = req.params.id;
    const sql = 'DELETE FROM roles WHERE id = ?';
    db.query(sql, [roleId], (err, result) => {
        if (err) {
            console.error('Error deleting from database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Role deleted successfully' });
    });
});


module.exports = router;