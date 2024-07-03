const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route for user login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Vui lòng điền đầy đủ tên đăng nhập và mật khẩu' });
    }

    const sql = 'SELECT * FROM members WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn cơ sở dữ liệu: ' + err.stack);
            return res.status(500).json({ error: 'Lỗi cơ sở dữ liệu' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Tên đăng nhập không tồn tại' });
        }

        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Mật khẩu không chính xác' });
        }

        // Tạo token JWT
        const expiresIn = '1h'; // Thời gian sống của token là 1 giờ
        const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn });

        // Cập nhật token vào cơ sở dữ liệu
        const updateTokenSql = 'UPDATE members SET token = ? WHERE id = ?';
        db.query(updateTokenSql, [token, user.id], (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Lỗi khi cập nhật token:', updateErr);
                return res.status(500).json({ error: 'Lỗi cập nhật token' });
            }
            res.json({ message: 'Đăng nhập thành công', token });
        });
    });
});

// Route for user logout
// router/auth.js
router.post('/logout', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token không được cung cấp' });
    }

    // Xác thực và giải mã token
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token không hợp lệ' });
        }

        // Kiểm tra và xóa token khỏi cơ sở dữ liệu
        const checkTokenSql = 'SELECT * FROM members WHERE id = ? AND token = ?';
        db.query(checkTokenSql, [decoded.id, token], (checkErr, checkResult) => {
            if (checkErr) {
                console.error('Lỗi khi kiểm tra token:', checkErr);
                return res.status(500).json({ error: 'Lỗi khi kiểm tra token' });
            }

            if (checkResult.length === 0) {
                return res.status(401).json({ error: 'Token không hợp lệ' });
            }

            // Xóa token trong cơ sở dữ liệu
            const updateTokenSql = 'UPDATE members SET token = NULL WHERE id = ?';
            db.query(updateTokenSql, [decoded.id], (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Lỗi khi xóa token:', updateErr);
                    return res.status(500).json({ error: 'Lỗi khi xóa token' });
                }
                res.json({ message: 'Đăng xuất thành công' });
            });
        });
    });
});

module.exports = router;


module.exports = router;
