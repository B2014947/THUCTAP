const express = require('express');
const cors = require('cors');
const membersRouter = require('./router/members');
const departmentsRouter = require('./router/departments');
const rolesRouter = require('./router/roles');
const documentTypesRouter = require('./router/documentTypes');
const documentsOutgoingRouter = require('./router/documentsOutgoing');
const documentsIncomingRouter = require('./router/documentsIncoming'); // Import router for documents incoming
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', rolesRouter);
app.use('/api', membersRouter);
app.use('/api', departmentsRouter);
app.use('/api', documentTypesRouter);
app.use('/api', documentsOutgoingRouter);
app.use('/api', documentsIncomingRouter); // Use router for documents incoming

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
