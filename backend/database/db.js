const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECT, {
    useNewUrlParser: true
})
.then(db => console.log("DB Conected!!"))
.catch(error => console.log(error))

module.exports = {
    db,
    pool,
    bcrypt
}
