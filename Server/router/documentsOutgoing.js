const express = require('express');
const db = require('../db'); // Đảm bảo đường dẫn đúng tới module kết nối cơ sở dữ liệu MySQL
const router = express.Router();

// Lấy danh sách các văn bản gửi đi
router.get('/documentsOutgoing', (req, res) => {
    const sql = `
        SELECT 
            doc.id,
            doc.name,
            doc.documentType,
            dt.name AS documentTypeName,
            doc.sender,
            mem.fullName AS senderName,
            doc.priority,
            doc.status,
            doc.note,
            doc.currentPosition,
            doc.createdDate,
            doc.endDate,
            doc.attachedFile
        FROM 
            documentsOutgoing doc
        LEFT JOIN 
            documentTypes dt ON doc.documentType = dt.id
        LEFT JOIN 
            members mem ON doc.sender = mem.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});


// Lấy thông tin một văn bản gửi đi theo ID
router.get('/documentsOutgoing/:id', (req, res) => {
    const documentId = req.params.id;
    const sql = 'SELECT * FROM documentsOutgoing WHERE id = ?';
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

// Thêm một văn bản gửi đi mới
router.post('/documentsOutgoing', (req, res) => {
    const { name, documentType, sender, priority, status, note, currentPosition, attachedFile, createdDate, endDate } = req.body;
    const sql = 'INSERT INTO documentsOutgoing (name, documentType, sender, priority, status, note, currentPosition, attachedFile, createdDate, endDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, documentType, sender, priority, status, note, currentPosition, attachedFile, createdDate, endDate], (err, result) => {
        if (err) {
            console.error('Error inserting into database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(201).json({ message: 'Document added successfully', id: result.insertId });
    });
});

// Sửa thông tin một văn bản gửi đi
router.put('/documentsOutgoing/:id', (req, res) => {
    const documentId = req.params.id;
    const { name, documentType, sender, priority, status, note, currentPosition, attachedFile, createdDate, endDate } = req.body;
    const sql = 'UPDATE documentsOutgoing SET name = ?, documentType = ?, sender = ?, priority = ?, status = ?, note = ?, currentPosition = ?, attachedFile = ?, createdDate = ?, endDate = ? WHERE id = ?';
    db.query(sql, [name, documentType, sender, priority, status, note, currentPosition, attachedFile, createdDate, endDate, documentId], (err, result) => {
        if (err) {
            console.error('Error updating database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Document updated successfully' });
    });
});

// Xóa một văn bản gửi đi
router.delete('/documentsOutgoing/:id', (req, res) => {
    const documentId = req.params.id;
    const sql = 'DELETE FROM documentsOutgoing WHERE id = ?';
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
