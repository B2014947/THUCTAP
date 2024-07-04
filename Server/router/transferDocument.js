const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route để chuyển văn bản
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Route để chuyển văn bản
router.post('/transferDocument', authenticateToken, (req, res) => {
    const { documentId, newRecipientId } = req.body;

    // Kiểm tra tính hợp lệ của request
    if (!documentId || !newRecipientId) {
        return res.status(400).json({ error: 'Vui lòng cung cấp đủ thông tin: documentId và newRecipientId' });
    }

    // Kiểm tra xem người dùng hiện tại có phải là người gửi văn bản không
    const checkSenderSql = 'SELECT sender FROM documentsoutgoing WHERE id = ?';
    db.query(checkSenderSql, [documentId], (err, results) => {
        if (err) {
            console.error('Lỗi khi kiểm tra người gửi:', err);
            return res.status(500).json({ error: 'Lỗi khi kiểm tra người gửi' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy văn bản với ID này' });
        }

        const senderId = results[0].sender;
        if (senderId !== req.user.id) {
            return res.status(403).json({ error: 'Bạn không có quyền chuyển văn bản này' });
        }

        // Cập nhật người nhận mới trong cơ sở dữ liệu
        const sql = 'UPDATE documentsoutgoing SET recipient = ? WHERE id = ?';
        db.query(sql, [newRecipientId, documentId], (err, result) => {
            if (err) {
                console.error('Lỗi khi cập nhật người nhận:', err);
                return res.status(500).json({ error: 'Lỗi khi cập nhật người nhận' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Không tìm thấy văn bản với ID này' });
            }
            res.json({ message: 'Chuyển văn bản thành công' });
        });
    });
});
module.exports = router;
