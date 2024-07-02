const express = require('express');
const db = require('../db');
const router = express.Router();

//Danh sách phòng ban
router.get('/departments', (req, res) => {
    const sql = 'SELECT * FROM departments';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

//Danh sách phòng ban theo id
router.get('/departments/:id', (req, res) => {
    const departmentId = req.params.id;
    const sql = 'SELECT * FROM departments WHERE id = ?';
    db.query(sql, [departmentId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Department not found' });
            return;
        }
        res.json(results[0]);
    });
});

//Thêm phòng ban
router.post('/departments', (req, res) => {
    const { name, note } = req.body;
    const sql = 'INSERT INTO departments (name, note) VALUES (?, ?)';
    db.query(sql, [name, note], (err, result) => {
        if (err) {
            console.error('Error inserting into database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(201).json({ message: 'Department added successfully', id: result.insertId });
    });
});

//Sưả phòng ban
router.put('/departments/:id', (req, res) => {
    const departmentId = req.params.id;
    const { name, note } = req.body;
    const sql = 'UPDATE departments SET name = ?, note = ? WHERE id = ?';
    db.query(sql, [name, note, departmentId], (err, result) => {
        if (err) {
            console.error('Error updating database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Department updated successfully' });
    });
});

//Xoá phòng ban 
router.delete('/departments/:id', (req, res) => {
    const departmentId = req.params.id;
    const sql = 'DELETE FROM departments WHERE id = ?';
    db.query(sql, [departmentId], (err, result) => {
        if (err) {
            console.error('Error deleting from database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Department deleted successfully' });
    });
});

module.exports = router;

