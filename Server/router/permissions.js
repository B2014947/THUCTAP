const express = require('express');
const db = require('../db');
const router = express.Router();

// Endpoint để lấy danh sách quyền
router.get('/permissions', (req, res) => {
    const sql = 'SELECT * FROM permissions';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;
