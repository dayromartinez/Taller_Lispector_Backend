const mongoose = require("mongoose");

(async () => {
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log('La base de datos está conectada a: ', db.connection.name)
    }catch(error){
        console.error(error)
    }
})();