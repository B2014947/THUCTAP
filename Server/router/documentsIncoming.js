const express = require('express');
const db = require('../db'); // Đảm bảo đường dẫn đúng tới module kết nối cơ sở dữ liệu MySQL
const router = express.Router();

// Lấy danh sách các văn bản đến
router.get('/documentsIncoming', (req, res) => {
    const sql = 'SELECT * FROM documentsincoming';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

// Lấy thông tin một văn bản đến theo ID
router.get('/documentsIncoming/:id', (req, res) => {
    const documentId = req.params.id;
    const sql = 'SELECT * FROM documentsincoming WHERE id = ?';
    db.query(sql, [documentId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Document not found' });
            return;
        }
        res.json(results[0]);
    });
});

// Thêm một văn bản đến mới
router.post('/documentsIncoming', (req, res) => {
    const { code, name, recipient, priority, status, note, currentPosition, arrivalDate, attachedFiles } = req.body;
    const sql = 'INSERT INTO documentsincoming (code, name, recipient, priority, status, note, currentPosition, arrivalDate, attachedFiles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [code, name, recipient, priority, status, note, currentPosition, arrivalDate, attachedFiles], (err, result) => {
        if (err) {
            console.error('Error inserting into database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(201).json({ message: 'Document added successfully', id: result.insertId });
    });
});

// Sửa thông tin một văn bản đến
router.put('/documentsIncoming/:id', (req, res) => {
    const documentId = req.params.id;
    const { code, name, recipient, priority, status, note, currentPosition, arrivalDate, attachedFiles } = req.body;
    const sql = 'UPDATE documentsincoming SET code = ?, name = ?, recipient = ?, priority = ?, status = ?, note = ?, currentPosition = ?, arrivalDate = ?, attachedFiles = ? WHERE id = ?';
    db.query(sql, [code, name, recipient, priority, status, note, currentPosition, arrivalDate, attachedFiles, documentId], (err, result) => {
        if (err) {
            console.error('Error updating database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Document updated successfully' });
    });
});

// Xóa một văn bản đến
router.delete('/documentsIncoming/:id', (req, res) => {
    const documentId = req.params.id;
    const sql = 'DELETE FROM documentsincoming WHERE id = ?';
    db.query(sql, [documentId], (err, result) => {
        if (err) {
            console.error('Error deleting from database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Document deleted successfully' });
    });
});

module.exports = router;
