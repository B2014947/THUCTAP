const express = require('express');
const db = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/documentsOutgoing', (req, res) => {
    const sql = `
        SELECT 
            doc.id,
            doc.name,
            doc.documentType,
            dt.name AS documentTypeName,
            dt.code AS documentTypeCode, -- Lấy cột code từ documentTypes
            doc.sender,
            mem.fullName AS senderName,
            p.name AS priorityName,
            s.name AS statusName,
            doc.note,
            doc.createdDate,
            doc.endDate,
            doc.attachedFile,
            dep.code AS departmentCode -- Lấy cột code từ departments
        FROM 
            documentsOutgoing doc
        LEFT JOIN 
            documentTypes dt ON doc.documentType = dt.id
        LEFT JOIN 
            members mem ON doc.sender = mem.id
        LEFT JOIN
            priority p ON doc.priority = p.id
        LEFT JOIN
            status s ON doc.status = s.id
        LEFT JOIN
            departments dep ON mem.departmentId = dep.id
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


router.post('/documentsOutgoing', (req, res) => {
    const { name, documentType, priority, status, note, attachedFile, createdDate, endDate, departmentId } = req.body;


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'your_secret_key', (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: 'Token không hợp lệ' });
            }
            const sql = `
                INSERT INTO documentsOutgoing 
                    (name, documentType, sender, priority, status, note, attachedFile, createdDate, endDate, departmentId) 
                VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;


            db.query(sql, [name, documentType, decodedToken.id, priority, status, note, attachedFile, createdDate, endDate, departmentId], (err, result) => {
                if (err) {
                    console.error('Lỗi khi thêm vào cơ sở dữ liệu: ' + err.stack);
                    res.status(500).json({ error: 'Lỗi cơ sở dữ liệu' });
                    return;
                }
                res.status(201).json({ message: 'Văn bản đi được thêm thành công', id: result.insertId });
            });
        });
    } else {
        res.status(401).json({ error: 'Không có thông tin xác thực' });
    }
});




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
