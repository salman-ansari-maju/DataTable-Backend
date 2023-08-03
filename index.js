const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const connectToCluster = require('./database/mongodb')

app.get('/job', async (req, res) => {
    try {
        let mongoClient = await connectToCluster()
        let db = mongoClient.db('jobs-db')
        let collection = db.collection('job-scores')
        const data = await collection.find({}).toArray()

        // Create an array of objects with unique job_ids using reduce
        const jobIdsArray = data.reduce((acc, job) => {
            const existingJob = acc.find((item) => item.a === job.Job_Title)
            if (existingJob) {
                existingJob.count += 1
            } else {
                acc.push({ id: acc.length + 1, a: job.Job_Title, count: 1 })
            }
            return acc
        }, [])
        // Modify the jobIdsArray to add the 'title' property
        const modifiedJobIdsArray = jobIdsArray.map((job) => ({
            ...job,
            title: job.a
                .replace(/_/g, ' ')
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (match) => match.toUpperCase()),
        }))

        res.json(modifiedJobIdsArray)
        // console.log(modifiedJobIdsArray)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch jobs' })
    }
})

app.get('/score', async (req, res) => {
    try {
        let mongoClient = await connectToCluster()
        let db = mongoClient.db('jobs-db')
        let collection = db.collection('job-scores')
        const data = await collection.find({}).toArray()

        // Create an array of objects with unique job_ids using reduce
        const jobIdsArray = data.reduce((acc, job) => {
            const existingJob = acc.find((item) => item.a === job.Job_Title)
            if (existingJob) {
                existingJob.count += 1
            } else {
                acc.push({ id: acc.length + 1, a: job.Job_Title, count: 1 })
            }
            return acc
        }, [])
        // Modify the jobIdsArray to add the 'title' property

        res.json(data)
        console.log(data)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch jobs' })
    }
})
app.post('/api/postdata', (req, res) => {
    const data = req.body // Assuming the client sends JSON data in the request body
    console.log('Received data:', data)

    // You can process the data or store it in the database here
    // ...

    res.status(200).json({ message: 'Data received successfully' })
})

app.listen(5000, () => console.log('server is running on 5000'))
