
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Không có token xác thực, vui lòng đăng nhập' });
    }

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) {
            console.error('Lỗi xác thực token:', err);
            return res.status(403).json({ error: 'Token không hợp lệ' });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
