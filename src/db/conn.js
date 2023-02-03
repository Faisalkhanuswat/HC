const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('DB Connected');
}).catch((e)=>{
    console.log(e);
})