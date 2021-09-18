const config = require('../infra/database')
const sql = require("mssql");


exports.listAll = async function listAll() {
    try {
        let poll = await sql.connect(config);
        const emails = (await poll.request().query('select * from email_message')).recordsets;
        return emails;
    } catch (err) {
        console.log('error .....', err);
    }
};

exports.insert = async function (email) {
    try {
        let pool = await sql.connect(config);
        const request = await pool.request();

        request.input("id", email.id);
        request.input("accountId", email.accountId);
        request.input("contentMessageObjectName", email.contentMessageObjectName);
        request.input("costCenterId", email.costCenterId);
        request.input("createdAt", email.createdAt);
        request.input("status", email.status);
        request.input("subject", email.subject);
        request.input("updatedAt", email.updatedAt);
        request.input("userId", email.userId);
        const result = await request.query( 'INSERT INTO email_message (id, account_id, content_message_object_name, cost_center_id, created_at, status, subject, updated_at, user_id) OUTPUT inserted.id VALUES(@id, @accountId, @contentMessageObjectName, @costCenterId, @createdAt, @status, @subject, @updatedAt, @userId)');
        return {
            ...email,
            id: parseInt(result.recordset[0].id)
        };
    } catch (err) {
        console.log('error ..... não foi possivel  inserir o message', err);
        throw new Error(err);
    }
};

exports.insertAttachment = async function (attachment) {
    try {
        let pool = await sql.connect(config);
        const request = await pool.request();

        request.input("fileName", attachment.fileName);
        request.input("link", attachment.link);
        request.input("objectName", attachment.objectName);
        request.input("emailMessageId", attachment.emailMessageId);

        const result = await request.query( 'INSERT INTO attachment (file_name, link, object_name, email_message_id) OUTPUT inserted.id VALUES(@fileName, @link, @objectName, @emailMessageId)');
        
        return {
            ...attachment,
            id: parseInt(result.recordset[0].id)
        };
    } catch (err) {
        console.log('error ..... não foi possivel  inserir o attachment', err);
        throw new Error(err);
    }
};
