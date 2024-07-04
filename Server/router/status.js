const express = require('express');
const db = require('../db');
const router = express.Router();

// Lấy danh sách tất cả các trạng thái từ bảng `status`
router.get('/statuses', (req, res) => {
    const sql = 'SELECT * FROM status';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results); 
    });
});

// Lấy thông tin của một trạng thái theo ID
router.get('/statuses/:id', (req, res) => {
    const statusId = req.params.id;
    const sql = 'SELECT * FROM status WHERE id = ?';
    db.query(sql, [statusId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Status not found' });
            return;
        }
        res.json(results[0]); // Trả về thông tin của trạng thái dưới dạng JSON
    });
});

// Thêm mới một trạng thái
router.post('/statuses', (req, res) => {
    const { name } = req.body;
    const sql = 'INSERT INTO status (name) VALUES (?)';
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error('Error inserting into database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        const statusId = result.insertId;
        res.status(201).json({ message: 'Status added successfully', id: statusId });
    });
});

// Cập nhật thông tin của một trạng thái
router.put('/statuses/:id', (req, res) => {
    const statusId = req.params.id;
    const { name } = req.body;
    const sql = 'UPDATE status SET name = ? WHERE id = ?';
    db.query(sql, [name, statusId], (err, result) => {
        if (err) {
            console.error('Error updating database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Status updated successfully', id: statusId });
    });
});

// Xóa một trạng thái theo ID
router.delete('/statuses/:id', (req, res) => {
    const statusId = req.params.id;
    const sql = 'DELETE FROM status WHERE id = ?';
    db.query(sql, [statusId], (err, result) => {
        if (err) {
            console.error('Error deleting from database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Status deleted successfully' });
    });
});

module.exports = router;
