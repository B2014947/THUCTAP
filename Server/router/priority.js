const express = require('express');
const db = require('../db');
const router = express.Router();

// Lấy danh sách tất cả các mức độ ưu tiên từ bảng `priority`
router.get('/priorities', (req, res) => {
    const sql = 'SELECT * FROM priority';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results); 
    });
});

// Lấy thông tin của một mức độ ưu tiên theo ID
router.get('/priorities/:id', (req, res) => {
    const priorityId = req.params.id;
    const sql = 'SELECT * FROM priority WHERE id = ?';
    db.query(sql, [priorityId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Priority not found' });
            return;
        }
        res.json(results[0]); 
    });
});

// Thêm mới một mức độ ưu tiên
router.post('/priorities', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO priority (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error inserting into database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        const priorityId = result.insertId;
        res.status(201).json({ message: 'Priority added successfully', id: priorityId });
    });
});

// Cập nhật thông tin của một mức độ ưu tiên
router.put('/priorities/:id', (req, res) => {
    const priorityId = req.params.id;
    const { name } = req.body;
    const sql = 'UPDATE priority SET name = ? WHERE id = ?';
    db.query(sql, [name, priorityId], (err, result) => {
        if (err) {
            console.error('Error updating database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Priority updated successfully', id: priorityId });
    });
});

// Xóa một mức độ ưu tiên theo ID
router.delete('/priorities/:id', (req, res) => {
    const priorityId = req.params.id;
    const sql = 'DELETE FROM priority WHERE id = ?';
    db.query(sql, [priorityId], (err, result) => {
        if (err) {
            console.error('Error deleting from database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Priority deleted successfully' });
    });
});

module.exports = router;
