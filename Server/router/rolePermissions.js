const express = require('express');
const db = require('../db');
const router = express.Router();

// Lấy danh sách quyền của một vai trò
router.get('/roles/:roleId/permissions', (req, res) => {
    const roleId = req.params.roleId;
    const sql = `
        SELECT p.id, p.name
        FROM permissions p
        JOIN role_permissions rp ON p.id = rp.permission_id
        WHERE rp.role_id = ?
    `;
    db.query(sql, [roleId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

// Thêm quyền cho vai trò
router.post('/roles/:roleId/permissions', (req, res) => {
    const roleId = req.params.roleId;
    const { permissions } = req.body;

    // Xóa các quyền cũ của vai trò trước khi thêm mới
    const deleteSql = 'DELETE FROM role_permissions WHERE role_id = ?';
    db.query(deleteSql, [roleId], (err, result) => {
        if (err) {
            console.error('Error deleting from role_permissions: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // Thêm các quyền mới vào bảng role_permissions
        const insertSql = 'INSERT INTO role_permissions (role_id, permission_id) VALUES ?';
        const values = permissions.map(permissionId => [roleId, permissionId]);
        db.query(insertSql, [values], (err, result) => {
            if (err) {
                console.error('Error inserting into role_permissions: ' + err.stack);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.status(201).json({ message: 'Permissions added successfully' });
        });
    });
});

// Xóa quyền của vai trò
router.delete('/roles/:roleId/permissions/:permissionId', (req, res) => {
    const { roleId, permissionId } = req.params;

    const sql = 'DELETE FROM role_permissions WHERE role_id = ? AND permission_id = ?';
    db.query(sql, [roleId, permissionId], (err, result) => {
        if (err) {
            console.error('Error deleting from role_permissions: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json({ message: 'Permission deleted successfully' });
    });
});

module.exports = router;
