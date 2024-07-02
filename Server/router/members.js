// file: routes/members.js

const express = require('express');
const db = require('../db');
const router = express.Router();

// Lấy danh sách thành viên
router.get('/members', (req, res) => {
    const sql = 'SELECT * FROM members';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err.stack);
            res.status(500).json({ error: 'Lỗi cơ sở dữ liệu' });
            return;
        }
        res.json(results);
    });
});

// Lấy thông tin thành viên theo ID
router.get('/members/:id', (req, res) => {
    const memberId = req.params.id;
    const sql = 'SELECT * FROM members WHERE id = ?';
    db.query(sql, [memberId], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err.stack);
            res.status(500).json({ error: 'Lỗi cơ sở dữ liệu' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Thành viên không tồn tại' });
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
            console.error('Lỗi thêm vào cơ sở dữ liệu: ' + err.stack);
            res.status(500).json({ error: 'Lỗi cơ sở dữ liệu' });
            return;
        }
        res.status(201).json({ message: 'Thêm thành viên thành công', id: result.insertId });
    });
});

// Sửa thông tin thành viên
router.put('/members/:id', (req, res) => {
    const memberId = req.params.id;
    const { username, fullName, email, phone, departmentId, roleId, status } = req.body;
    const sql = 'UPDATE members SET username = ?, fullName = ?, email = ?, phone = ?, departmentId = ?, roleId = ?, status = ? WHERE id = ?';
    db.query(sql, [username, fullName, email, phone, departmentId, roleId, status, memberId], (err, result) => {
        if (err) {
            console.error('Lỗi cập nhật cơ sở dữ liệu: ' + err.stack);
            res.status(500).json({ error: 'Lỗi cơ sở dữ liệu' });
            return;
        }
        res.json({ message: 'Cập nhật thành viên thành công' });
    });
});

// Xóa thành viên
router.delete('/members/:id', (req, res) => {
    const memberId = req.params.id;
    const sql = 'DELETE FROM members WHERE id = ?';
    db.query(sql, [memberId], (err, result) => {
        if (err) {
            console.error('Lỗi xóa từ cơ sở dữ liệu: ' + err.stack);
            res.status(500).json({ error: 'Lỗi cơ sở dữ liệu' });
            return;
        }
        res.json({ message: 'Xóa thành viên thành công' });
    });
});

module.exports = router;
