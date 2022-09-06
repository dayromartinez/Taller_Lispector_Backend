const { response } = require('express');
const Comentario = require('../models/Comentario');
const Contenido = require('../models/Contenido');
const Publicacion = require("../models/Publicacion");
const Usuario = require("../models/Usuario");

const getAllPublicaciones = async(req, res = response)=>{

    try {

        let publicaciones = (await Publicacion.find()).reverse() || [];

        if(publicaciones) return res.status(200).send({publicaciones})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const getPublicacion = async(req, res = response)=>{

    const { _id } = req.params;

    try {

        let publicacion = await Publicacion.findOne({ _id });
        if(publicacion) {
            
            let comentarios = await Comentario.find();
            let comentariosPublicacion = comentarios.filter((comentario) => {
                return comentario.publicacionId === publicacion.id
            })
            
            if(comentariosPublicacion.length > 0) publicacion.comentarios = comentariosPublicacion;

            let contenidos = await Contenido.find()
            let contenidoPublicacion = contenidos.filter((contenido) =>{
                return contenido.publicacionId === publicacion.id
            })

            if(contenidoPublicacion.length > 0) {

                let comentariosContenido;
                contenidoPublicacion.forEach(async (contenido) => {
                    comentariosContenido = comentarios.filter((comentario) => {
                        return comentario.publicacionId === contenido._id.toString()
                    })
                    if(comentariosContenido.length > 0) contenido.comentarios = comentariosContenido;
                })
                publicacion.contenido = contenidoPublicacion;

            }
            
            return res.status(200).send({publicacion})

        }else{
            return res.status(404).send({ ok: false, msg: 'La publicación no existe'})
        }
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const crearPublicacion = async(req, res = response)=>{

    const { nombre, descripcion, numeroPaginas, anoLanzamiento, autores, generos, 
        urlDocumento, urlImagen, comentarios, codigosPublicacion, contenido } = req.body;

    try {

        let publicacion = await Publicacion.findOne({ nombre });
    
        if(publicacion) return res.status(400).send({ ok: false, msg: 'La publicación ya existe'})
    
        publicacion = new Publicacion(req.body)
        await publicacion.save()

        res.status(201).send({publicacion})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const actualizarPublicacion = async(req, res = response)=>{

    const { _id, nombre, descripcion, numeroPaginas, anoLanzamiento, autores, generos, 
        urlDocumento, urlImagen, comentarios, codigosPublicacion, contenido } = req.body;

    try {

        let publicacion = await Publicacion.findOne({ _id });
    
        if(publicacion) {
            publicacionActualizada = new Publicacion(req.body)
            await publicacion.updateOne(publicacionActualizada)
            res.status(200).send({publicacionActualizada})
        }else{
            return res.status(400).send({ ok: false, msg: 'La publicación no existe'})
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const deletePublication = async(req, res = response)=>{

    const { id } = req.params;

    try {

        let publicacion = await Publicacion.findOne({ id });
        if(!publicacion) return res.status(400).send({ ok: false, msg: 'La publicación no existe'})
        
        let comentarios = await Comentario.find();
        comentarios.forEach(async (comentario) => {
            if(comentario.publicacionId === id) await Comentario.findByIdAndDelete(comentario._id);
        })
        
        let contenidos = await Contenido.find();
        contenidos.forEach(async (contenido) => {
            if(contenido.publicacionId === id) await Contenido.findByIdAndDelete(contenido._id);
        })
        
        await Publicacion.findByIdAndDelete(id);
        res.status(200).send({ ok: true, msg: 'La publicación, sus contenidos y comentarios, han sido eliminados'})

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

const reservarCodigoPublicacion = async(req, res = response)=>{

    const { _id, uid, nombre, codigoPublicacion } = req.body;
    let match = false;
    let codigoUsado = false;
    let codigoUsadoEnMismaPublicacion = false;


    try {

        let publicacion = await Publicacion.findOne({ _id });
        let usuario = await Usuario.findOne({ _id: uid });
    
        if(publicacion && usuario) {

            
            if(nombre !== publicacion.nombre){
                return res.status(400).send({ ok: false, msg: 'El nombre de la publicación no coincide'})
            }
            

            if(usuario.publicationsCode.includes(nombre)){
                codigoUsadoEnMismaPublicacion = true;
            }

            if(codigoUsadoEnMismaPublicacion){
                return res.status(400).send({ ok: false, msg: 'Este usuario ya tiene un código asignado para esta publicación'})
            }

            publicacion.codigosPublicacion.forEach((codigo, index) => {
                if(nombre === codigo.publicacion && codigo.codigoPublicacion === codigoPublicacion && codigo.enUso === true) {
                    
                    codigoUsado = true;
                    return;

                }else if(nombre === codigo.publicacion && codigo.codigoPublicacion === codigoPublicacion && codigo.enUso === false) {

                    codigo.enUso = true;
                    usuario.publicationsCode.push(codigo.publicacion);
                    match = true;
                    return;
                }
            });

            if(codigoUsado){
                return res.status(400).send({ ok: false, msg: 'Este código de publicación ya está en uso'})
            }

            if(!match) {
                return res.status(400).send({ ok: false, msg: 'El código de publicación ingresado no existe'})
            }

            publicacionActualizada = new Publicacion(publicacion)
            await publicacion.updateOne(publicacionActualizada)
            usuarioActualizado = new Usuario(usuario)
            await usuario.updateOne(usuarioActualizado)
            res.status(200).send({msg: "La reserva del código de la publicación ha sido realizada con éxito"});

        }else{
            return res.status(400).send({ ok: false, msg: 'La publicación o el usuario no existen'})
        }

    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

module.exports = {
    getAllPublicaciones,
    getPublicacion,
    crearPublicacion,
    actualizarPublicacion,
    deletePublication,
    reservarCodigoPublicacion
}