// index.js
const express = require('express');
const cors = require('cors');
const membersRouter = require('./router/members');
const transferDocument = require('./router/transferDocument');
const departmentsRouter = require('./router/departments');
const rolesRouter = require('./router/roles');
const permissionsRouter = require('./router/permissions');
const rolePermissionsRouter = require('./router/rolePermissions');
const documentTypesRouter = require('./router/documentTypes');
const documentsOutgoingRouter = require('./router/documentsOutgoing');
const documentsIncomingRouter = require('./router/documentsIncoming');
const authRouter = require('./router/auth');
const statusRouter = require('./router/status');
const priorityRouter = require('./router/priority');
const authenticateToken = require('./authenticateToken');

const app = express();

app.use(cors());
app.use('/protected', authenticateToken);
app.get('/protected', (req, res) => {
    res.json({ message: 'Route bảo vệ đã được truy cập thành công' });
});
app.get('/public', (req, res) => {
    res.json({ message: 'Route public' });
});

app.use(express.json());


app.use('/api/', transferDocument);
app.use('/api/', priorityRouter);
app.use('/api/', statusRouter);
app.use('/api/', rolesRouter);
app.use('/api/', permissionsRouter);
app.use('/api/', rolePermissionsRouter);
app.use('/api/', membersRouter);
app.use('/api/', departmentsRouter);
app.use('/api/', documentTypesRouter);
app.use('/api/', documentsOutgoingRouter);
app.use('/api/', documentsIncomingRouter);
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
