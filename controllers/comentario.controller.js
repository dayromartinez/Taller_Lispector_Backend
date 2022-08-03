const { /*getAllCommentsOfPublicationID, getAllCommentsByUserID,*/ createComments, updateComment, deleteComment } = require('../services/comment.service');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// router.get('/getAllCommentsOfPublication/:_id', getAllCommentsOfPublicationID);

// router.get('/getAllCommentsByUser/:_id', getAllCommentsByUserID);

router.post('/createComment', [
    check('publicacionId','El id de la publicación es requerido').not().isEmpty(),
    check('userId','El id del usuario es requerido').not().isEmpty(),
    check('comentario','El comentario es requerido').not().isEmpty(),
    check('valoracion','La valoración es requerida').not().isEmpty(),
], createComments);

router.put('/updateComment', [
    check('comentarioId','El id del comentario es requerido').not().isEmpty(),
    check('comentario','El comentario es requerido').not().isEmpty(),
    check('valoracion','La valoración es requerida').not().isEmpty(),
], updateComment);

router.delete('/deleteComment/:_id', [
    check('_id','El id del comentario es requerido').not().isEmpty(),
], deleteComment);

module.exports = router;