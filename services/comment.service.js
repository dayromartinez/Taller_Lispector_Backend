const express = require('express');
const Comment = require('../models/Comentario');
const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');

const getAllCommentsOfPublicationID = async (req, res = response) => {

    const { _id } = req.params;

    try {

        const publication = await Publicacion.findOne({ _id });
        if (!publication) return res.status(404).send({ ok: false, msg: 'La publicación no existe' });

        if(publication) return res.status(200).send( publication.comentarios ); 
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const getAllCommentsByUserID = async (req, res = response) => {

    const { _id } = req.params;

    try {
    
        const user = await Usuario.findOne({ _id });
        if (!user) return res.status(404).send({ ok: false, msg: 'El usuario no existe' });

        if(user) return res.status(200).send( user.comments ); //TODO: revisar si esto es correcto

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const createComments = async (req, res = response) => {

    const { publicacionId, userId, comentario, valoracion } = req.body;

    try {
        
        const publication = await Publicacion.findOne({ _id: publicacionId });

        if (!publication) return res.status(404).send({ ok: false, msg: 'La publicación no existe' });

        const user = await Usuario.findOne({ _id: userId });

        if (!user) return res.status(404).send({ ok: false, msg: 'El usuario no existe' });

        const createComment = new Comment({publicacionId, userId, comentario, valoracion})

        const commentCreated = await createComment.save();

        user.comments.push(commentCreated);
        publication.comentarios.push(commentCreated);
        user.save();
        publication.save();

        res.status(201).send({commentCreated});

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const updateComment = async (req, res = response) => {

    const { publicacionId, userId, comentario, valoracion, comentarioId } = req.body;

    try {

        const publication = await Publicacion.findOne({ _id: publicacionId });

        if (!publication) return res.status(404).send({ ok: false, msg: 'La publicación no existe' });

        const user = await Usuario.findOne({ _id: userId });

        if (!user) return res.status(404).send({ ok: false, msg: 'El usuario no existe' });

        const comment = await Comment.findOne({ _id: comentarioId });

        if (!comment) return res.status(404).send({ ok: false, msg: 'El comentario no existe' });

        comment.comentario = comentario;
        comment.valoracion = valoracion;

        const commentUpdated = await comment.save();

        user.comments.forEach(comentario => {
            const { _id: { ObjectId } } = comment;
            if(comentario._id.toString() === commentUpdated._id.toString()) {
                comentario.comentario = commentUpdated.comentario;
                comentario.valoracion = commentUpdated.valoracion;
            }
        })

        const userUpdated = user
        await user.updateOne(userUpdated);

        publication.comentarios.forEach(comentario => {
            if(comentario._id.toString() === commentUpdated._id.toString()) {
                comentario.comentario = commentUpdated.comentario;
                comentario.valoracion = commentUpdated.valoracion;
            }
        })

        const publicationUpdated = publication
        await publication.updateOne(publicationUpdated);

        res.status(200).send({commentUpdated});
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    } 

}

const deleteComment = async (req, res = response) => {

    const { _id } = req.params;

    try {

        const comment = await Comment.findOne({ _id: _id });

        if (!comment) return res.status(404).send({ ok: false, msg: 'El comentario no existe' });

        const user = await Usuario.findOne({ _id: comment.userId });

        let filtroDeleteComentarioUser = user.comments.filter(comentario => {
            if(comentario._id.toString() !== comment._id.toString()) {
                return comentario;
            }
        })

        user.comments = filtroDeleteComentarioUser;

        const userUpdated = user
        await user.updateOne(userUpdated);

        const publicacion = await Publicacion.findOne({ _id: comment.publicacionId });

        let filtroDeleteComentarioPub = publicacion.comentarios.filter(comentario => {
            if(comentario._id.toString() !== comment._id.toString()) {
                return comentario;
            }
        })

        publicacion.comentarios = filtroDeleteComentarioPub;
        const publicationUpdated = publicacion
        await publicacion.updateOne(publicationUpdated);

        await Comment.findByIdAndDelete(_id);

        res.status(200).send('Comentario eliminado');

    } catch(error) {
        console.log(error)
        res.sendStatus(500)
    }
}

module.exports = {
    getAllCommentsOfPublicationID,
    getAllCommentsByUserID,
    createComments,
    updateComment,
    deleteComment
}