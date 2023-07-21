const server = require('./src/app')
const { database } = require('./src/db')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3030

server.listen(PORT, async () => {
  await database.sync({ force: true })
    .then(() => console.log(`server listening on port ${PORT}`))
    .catch(err => console.log(err.message))
})

