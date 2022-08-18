const express = require('express');
const Comment = require('../models/Comentario');
const Contenido = require('../models/Contenido');
const Publicacion = require('../models/Publicacion');
const Usuario = require('../models/Usuario');

const createComments = async (req, res = response) => {

    const { publicacionId, userId, comentario, valoracion } = req.body;

    try {
        
        const publication = await Publicacion.findOne({ _id: publicacionId });
        const contenido = await Contenido.findOne({ _id: publicacionId });

        if (!publication && !contenido) return res.status(404).send({ ok: false, msg: 'La publicación no existe' });

        const user = await Usuario.findOne({ _id: userId });

        if (!user) return res.status(404).send({ ok: false, msg: 'El usuario no existe' });

        const createComment = new Comment({publicacionId, userId, comentario, valoracion, nombreUsuario: user.name});

        const commentCreated = await createComment.save();

        res.status(201).send({commentCreated});

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const updateComment = async (req, res = response) => {

    const { comentario, valoracion, comentarioId } = req.body;

    try {

        const comment = await Comment.findOne({ _id: comentarioId });

        if (!comment) return res.status(404).send({ ok: false, msg: 'El comentario no existe' });

        comment.comentario = comentario;
        comment.valoracion = valoracion;
        const commentUpdated = await comment.save();

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

        await Comment.findByIdAndDelete(_id);

        res.status(200).send({ msg: 'Comentario eliminado'});

    } catch(error) {
        console.log(error)
        res.sendStatus(500)
    }
}

module.exports = {
    createComments,
    updateComment,
    deleteComment
}