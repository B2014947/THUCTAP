const express = require('express');
const db = require('../db');
const router = express.Router();

// Lấy danh sách tất cả vai trò
router.get('/roles', (req, res) => {
    const sql = 'SELECT * FROM roles';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

// Lấy thông tin của một vai trò theo ID
router.get('/roles/:id', (req, res) => {
    const roleId = req.params.id;
    const sql = 'SELECT * FROM roles WHERE id = ?';
    db.query(sql, [roleId], (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Role not found' });
            return;
        }

        // Lấy danh sách quyền của vai trò từ bảng role_permissions và permissions
        const permissionSql = `
            SELECT rp.permission_id, p.name 
            FROM role_permissions rp 
            JOIN permissions p ON rp.permission_id = p.id 
            WHERE rp.role_id = ?`;

        db.query(permissionSql, [roleId], (err, permissionResults) => {
            if (err) {
                console.error('Error querying role_permissions: ' + err.stack);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            const role = results[0];
            role.permissions = permissionResults.map(row => ({
                id: row.permission_id,
                name: row.name
            }));

            res.json(role);
        });
    });
});

// Thêm mới một vai trò
router.post('/roles', (req, res) => {
    const { name, description, permissions } = req.body;
    const sql = 'INSERT INTO roles (name, description) VALUES (?, ?)';
    db.query(sql, [name, description], (err, result) => {
        if (err) {
            console.error('Error inserting into database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        const roleId = result.insertId;

        // Thêm các quyền của vai trò vào bảng role_permissions
        const insertPermissionsSql = 'INSERT INTO role_permissions (role_id, permission_id) VALUES ?';
        const values = permissions.map(permissionId => [roleId, permissionId]);
        db.query(insertPermissionsSql, [values], (err, result) => {
            if (err) {
                console.error('Error inserting into role_permissions: ' + err.stack);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            // Lấy tên của các quyền từ bảng permissions
            const permissionNamesSql = 'SELECT name FROM permissions WHERE id IN (?)';
            db.query(permissionNamesSql, [permissions], (err, rows) => {
                if (err) {
                    console.error('Error fetching permission names: ' + err.stack);
                    res.status(500).json({ error: 'Database error' });
                    return;
                }

                const permissionNames = rows.map(row => row.name);
                res.status(201).json({ message: 'Role added successfully', id: roleId, permissions: permissionNames });
            });
        });
    });
});

// Cập nhật thông tin của một vai trò
// Cập nhật thông tin của một vai trò theo ID
router.put('/roles/:id', (req, res) => {
    const roleId = req.params.id;
    const { name, description, permissions } = req.body;

    // Cập nhật thông tin của vai trò trong bảng roles
    const updateSql = 'UPDATE roles SET name = ?, description = ? WHERE id = ?';
    db.query(updateSql, [name, description, roleId], (err, result) => {
        if (err) {
            console.error('Error updating roles table: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // Xóa các quyền cũ của vai trò trong bảng role_permissions
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

                // Lấy tên của các quyền từ bảng permissions
                const permissionNamesSql = 'SELECT name FROM permissions WHERE id IN (?)';
                db.query(permissionNamesSql, [permissions], (err, rows) => {
                    if (err) {
                        console.error('Error fetching permission names: ' + err.stack);
                        res.status(500).json({ error: 'Database error' });
                        return;
                    }

                    const permissionNames = rows.map(row => row.name);
                    const updatedRole = { id: roleId, name, description, permissions: permissionNames };

                    res.json({ message: 'Role updated successfully', role: updatedRole });
                });
            });
        });
    });
});


// Xóa một vai trò theo ID
router.delete('/roles/:id', (req, res) => {
    const roleId = req.params.id;
    const sql = 'DELETE FROM roles WHERE id = ?';
    db.query(sql, [roleId], (err, result) => {
        if (err) {
            console.error('Error deleting from database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        // Xóa các quyền của vai trò trong bảng role_permissions
        const deletePermissionsSql = 'DELETE FROM role_permissions WHERE role_id = ?';
        db.query(deletePermissionsSql, [roleId], (err, result) => {
            if (err) {
                console.error('Error deleting permissions: ' + err.stack);
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ message: 'Role deleted successfully' });
        });
    });
});

module.exports = router;
