const express = require('express');
const router = express.Router();
const emailRepository = require('../repository/EmailRepository');

router.get('/emails', async function(req, res) {
    console.log('controller');
    try {
        const emails = await emailRepository.listAll();
        res.json(emails);
    }catch (err){
        console.log('error no controller ..... ', err);
    }
});

router.post('/emails', async function(req, res) {
   const email = req.body;
   try {
    const newEmail = await emailRepository.insert(email);

    console.log('linhas afetadas.......', newEmail.rowsAffected)

    res.status(201).json(newEmail);
   } catch(err) {
    res.status(500).json(err.message);
   }
});

router.post('/attachments', async function(req, res) {
    const attachment = req.body;
    try {
     const newAttachment = await emailRepository.insertAttachment(attachment);
 
     console.log('newAttachment.......', newAttachment);
 
     res.status(201).json(newAttachment);
    } catch(err) {
     res.status(500).json(err.message);
    }
 });

router.put('/posts/:id', async function(req, res) {
    const post = req.body;
    const updatedPost = await postService.updatePost(req.params.id, post);
    res.json({});
});

router.get('/posts/:id', async function(req, res) {

});


module.exports = router;