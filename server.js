require('dotenv/config');//loads env variables
const mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(process.env.MONGODB_URL_LOCAL,{
    useNewUrlParser: true,
    //useFindAndModify: true,
    useUnifiedTopology: true
}).then(()=>console.log("DB connected sucessfully!"))
.catch((err)=>console.log("connection failed!"));

const port = process.env.PORT||3000

app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}/`);
});