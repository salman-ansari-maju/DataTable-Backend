const { MongoClient } = require('mongodb')

const uri =
    'mongodb+srv://sp19bscs0038:mongo321@cluster0.mgcjt2g.mongodb.net/jobs-dbretryWrites=true&w=majority'

async function connectToCluster() {
    let mongoClient

    try {
        mongoClient = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connecting to MongoDB Atlas cluster...')
        await mongoClient.connect()
        console.log('Successfully connected to MongoDB Atlas!')

        return mongoClient
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error)
        process.exit()
    }
}

module.exports = connectToCluster
