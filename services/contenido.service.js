const express = require('express');
const Comentario = require('../models/Comentario');
const Publicacion = require('../models/Publicacion');
const Contenido = require('../models/Contenido');

const crearContenido = async(req, res = response) => {

    const { publicacionId, nombre, texto, fechaLanzamiento, autores, generos, 
        urlDocumento, urlImagen, comentarios } = req.body;

    try {

        let publicacion = await Publicacion.findOne({ _id: publicacionId });
    
        if(publicacion) {

            let contenido = await Contenido.findOne({ nombre });
            if(contenido) return res.status(400).send({ ok: false, msg: 'El contenido ya existe'})
            contenido = new Contenido(req.body)
            await contenido.save()
            res.status(201).send({contenido})

        }else{
            return res.status(400).send({ ok: false, msg: 'La publicación no existe'})
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const actualizarContenido = async(req, res = response) => {

    const { _id, publicacionId, nombre, texto, fechaLanzamiento, autores, generos, 
        urlDocumento, urlImagen, comentarios } = req.body;

    try {

        let publicacion = await Publicacion.findOne({ _id: publicacionId });
    
        if(publicacion) {

            let contenido = await Contenido.findOne({ _id });
            if(!contenido) return res.status(400).send({ ok: false, msg: 'El contenido no existe'})
            contenidoActualizado = new Contenido(req.body)
            await contenido.updateOne(contenidoActualizado)
            res.status(200).send({contenidoActualizado})
            
        }else{
            return res.status(400).send({ ok: false, msg: 'La publicación no existe'})
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const eliminarContenido = async(req, res = response) => {

    const { _id } = req.params;

    try {

        let contenido = await Contenido.findOne({ _id });
        if(!contenido) return res.status(400).send({ ok: false, msg: 'El contenido no existe'})
        
        let comentarios = await Comentario.find();
        comentarios.forEach(async (comentario) => {
            if(comentario.publicacionId === _id) await Comentario.findByIdAndDelete(comentario._id);
        })
        
        await Contenido.findByIdAndDelete(_id);
        res.status(200).send({ ok: true, msg: 'El contenido y sus comentarios, han sido eliminados'})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

module.exports = {
    crearContenido,
    actualizarContenido,
    eliminarContenido
}