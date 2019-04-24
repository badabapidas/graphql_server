const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const port = process.env.PORT || 9000
const app = express()
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

app.use(bodyParser.json(), cors())

// Adding type definition
const typeDefinition = `
type Query  {
   greeting: String
}`

// Adding resolver
const resolverObject = {
    Query: {
        greeting: () => 'Hello there !!'
    }
}

// bind the schema and resolver using makeExecutableSchema.
const schema = makeExecutableSchema({ typeDefs: typeDefinition, resolvers: resolverObject })


// Define Routes to Fetch Data from ReactJS/GraphiQL Application
app.use('/graphql', graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
app.listen(port, () => console.log(`server 1 is up and running ${port}`))