require('dotenv').config()
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db.js')
const schema = require('./schema/schema.js')

const port = process.env.PORT || 5000

const app = express()

connectDB()
app.use(cors())
app.use('/graphql',graphqlHTTP({
  schema,
  graphiql:process.env.NODE_ENV === 'development'
}))

app.listen(port,console.log(`server running:${port}`))