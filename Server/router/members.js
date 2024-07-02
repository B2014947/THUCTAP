const express = require('express');
const db = require('../db');
const router = express.Router();

// Lấy danh sách thành viên
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

router.get('/members/:id', (req, res) => {
    const memberId = req.params.id;
    const sql = 'SELECT * FROM members WHERE id = ?';
    db.query(sql, [memberId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Member not found' });
            return;
        }
        res.json(results[0]);
    });
});




// Thêm thành viên mới
router.post('/members', (req, res) => {
    const { username, fullName, email, phone, departmentId, roleId, status } = req.body;
    const sql = 'INSERT INTO members (username, fullName, email, phone, departmentId, roleId, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [username, fullName, email, phone, departmentId, roleId, status], (err, result) => {
        if (err) {
            console.error('Error inserting into database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.status(201).json({ message: 'Member added successfully', id: result.insertId });
    });
});

// Sửa thông tin thành viên
router.put('/members/:id', (req, res) => {
    const memberId = req.params.id;
    const { username, fullName, email, phone, departmentId, roleId, status } = req.body;
    const sql = 'UPDATE members SET username = ?, fullName = ?, email = ?, phone = ?, departmentId = ?, roleId = ?, status = ? WHERE id = ?';
    db.query(sql, [username, fullName, email, phone, departmentId, roleId, status, memberId], (err, result) => {
        if (err) {
            console.error('Error updating database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Member updated successfully' });
    });
});

// Xóa thành viên
router.delete('/members/:id', (req, res) => {
    const memberId = req.params.id;
    const sql = 'DELETE FROM members WHERE id = ?';
    db.query(sql, [memberId], (err, result) => {
        if (err) {
            console.error('Error deleting from database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Member deleted successfully' });
    });
});

module.exports = router;
