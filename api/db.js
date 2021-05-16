let mongoose = require('mongoose')

module.exports = {
    connect:DB_URL=>{
            mongoose.set('useNewUrlParser', true);
            mongoose.set('useFindAndModify', false);
            mongoose.set('useCreateIndex', true);
            mongoose.set('useUnifiedTopology', true);
            mongoose.connect(DB_URL)

            mongoose.connection.on('error',err=>{
                console.log(err)
                console.log(`MongoDB connection error on ${DB_URL}`)
                process.exit()
            })

            mongoose.connection.on('connected',()=>{
                console.log('MongoDB connected successfully')
            })
    },
    close: ()=>{
        mongoose.connection.close()
    }
}