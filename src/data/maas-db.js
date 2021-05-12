const mongoose = require('mongoose');

// connect to mongo db
const mongoUri = `mongodb+srv://dbSree:${process.env.MONGODB_PASSWORD}@startercluster.uhnfk.mongodb.net/maas-api?retryWrites=true&w=majority` || 'maas-api'
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(mongoUri, { useNewUrlParser: true })

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
})

module.exports = mongoose.connection