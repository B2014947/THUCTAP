// file: routes/members.js
const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const router = express.Router();

// Lấy danh sách thành viên
router.get('/members', (req, res) => {
    const sql = `
        SELECT 
            members.id,
            members.username,
            members.fullName,
            members.email,
            members.phone,
            departments.name AS department,
            roles.name AS role,
            members.status
        FROM 
            members
        LEFT JOIN 
            departments ON members.departmentId = departments.id
        LEFT JOIN 
            roles ON members.roleId = roles.id
    `;

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
router.get('/members/member-details/:id', (req, res) => {
    const memberId = req.params.id;
    const sql = `
        SELECT
            m.*,
            d.name AS departmentName,
            r.name AS roleName
        FROM
            members m
        LEFT JOIN
            departments d ON m.departmentId = d.id
        LEFT JOIN
            roles r ON m.roleId = r.id
        WHERE
            m.id = ?
    `;
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
router.post('/members', async (req, res) => {
    const {
        username,
        password,
        fullName,
        email,
        phone,
        internalNumber,
        cmnd,
        address,
        startDate,
        education,
        qualification,
        experience,
        skills,
        bio,
        departmentId,
        roleId,
        status,
        avatarUrl
    } = req.body;

    // Kiểm tra xem username đã tồn tại trong CSDL chưa
    const checkUsernameQuery = 'SELECT COUNT(*) AS count FROM members WHERE username = ?';
    db.query(checkUsernameQuery, [username], async (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err.stack);
            return res.status(500).json({ error: 'Lỗi cơ sở dữ liệu' });
        }

        const usernameCount = results[0].count;
        if (usernameCount > 0) {
            return res.status(400).json({ error: 'Tên người dùng đã tồn tại' });
        }

        // Nếu username chưa tồn tại, tiến hành băm mật khẩu và thêm vào CSDL
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        const sql = `
            INSERT INTO members 
            (username, password, password_hash, fullName, email, phone, internalNumber, cmnd, address, startDate, education, qualification, experience, skills, bio, departmentId, roleId, status, avatarUrl) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [
            username,
            password,
            password_hash,
            fullName,
            email,
            phone,
            internalNumber,
            cmnd,
            address,
            startDate,
            education,
            qualification,
            experience,
            skills,
            bio,
            departmentId,
            roleId,
            status,
            avatarUrl
        ], (err, result) => {
            if (err) {
                console.error('Lỗi thêm vào cơ sở dữ liệu: ' + err.stack);
                return res.status(500).json({ error: 'Lỗi cơ sở dữ liệu' });
            }
            res.status(201).json({ message: 'Thêm thành viên thành công', id: result.insertId });
        });
    });
});

// Sửa thông tin thành viên
router.put('/members/member-details/:id', (req, res) => {
    const memberId = req.params.id;
    const {
        username,
        fullName,
        email,
        phone,
        internalNumber,
        cmnd,
        address,
        startDate,
        education,
        qualification,
        experience,
        skills,
        bio,
        departmentId,
        roleId,
        status,
        avatarUrl
    } = req.body;

    const sqlUpdate = `
        UPDATE members 
        SET username = ?, fullName = ?, email = ?, phone = ?, internalNumber = ?, cmnd = ?, address = ?, startDate = ?, education = ?, qualification = ?, experience = ?, skills = ?, bio = ?, departmentId = ?, roleId = ?, status = ?, avatarUrl = ?
        WHERE id = ?
    `;

    const params = [
        username,
        fullName,
        email,
        phone,
        internalNumber,
        cmnd,
        address,
        startDate,
        education,
        qualification,
        experience,
        skills,
        bio,
        departmentId,
        roleId,
        status,
        avatarUrl,
        memberId
    ];

    db.query(sqlUpdate, params, (err, result) => {
        if (err) {
            console.error('Lỗi cập nhật cơ sở dữ liệu: ' + err.stack);
            res.status(500).json({ error: 'Lỗi cơ sở dữ liệu' });
            return;
        }
        res.json({ message: 'Cập nhật thông tin thành viên thành công' });
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
