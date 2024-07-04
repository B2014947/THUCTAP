const express = require('express');
const db = require('../db'); 
const router = express.Router();

// Lấy danh sách các loại tài liệu
router.get('/documentTypes', (req, res) => {
    const sql = 'SELECT * FROM documentTypes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

// Lấy thông tin một loại tài liệu theo ID
router.get('/documentTypes/:id', (req, res) => {
    const typeId = req.params.id;
    const sql = 'SELECT * FROM documentTypes WHERE id = ?';
    db.query(sql, [typeId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Document type not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Thêm một loại tài liệu mới
router.post('/documentTypes', (req, res) => {
    const { code, name } = req.body;
    const sql = 'INSERT INTO documentTypes (code, name) VALUES (?, ?)';
    db.query(sql, [code, name], (err, result) => {
        if (err) {
            console.error('Error inserting into database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(201).json({ message: 'Document type added successfully', id: result.insertId });
    });
});

// Sửa thông tin một loại tài liệu
router.put('/documentTypes/:id', (req, res) => {
    const typeId = req.params.id;
    const { code, name } = req.body;
    const sql = 'UPDATE documentTypes SET code = ?, name = ? WHERE id = ?';
    db.query(sql, [code, name, typeId], (err, result) => {
        if (err) {
            console.error('Error updating database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Document type updated successfully' });
    });
});

// Xóa một loại tài liệu
router.delete('/documentTypes/:id', (req, res) => {
    const typeId = req.params.id;
    const sql = 'DELETE FROM documentTypes WHERE id = ?';
    db.query(sql, [typeId], (err, result) => {
        if (err) {
            console.error('Error deleting from database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Document type deleted successfully' });
    });
});

module.exports = router;
