//CORRER ARCHIVO CON EL COMANDO: 'node utils/generadorCodigosPublicacion.js'

let codigos = [
    "",
]

let arregloCodigos = codigos.map(codigo => (
    {
        publicacion : "El tiempo en que no nos vimos",
        codigoPublicacion : codigo,
        enUso: false
    }
))

arregloCodigos.forEach(codigo => (
    console.log(`{ "publicacion": "${codigo.publicacion}", "codigoPublicacion": "${codigo.codigoPublicacion}", "enUso": ${codigo.enUso}},`)
))