import express from 'express';
import cors from 'cors';

import db from './db/index.js'
import movieRouter from './routes/movie.js'

const app = express()
const apiPort = 3000

app.use(cors())
app.use(express.json())

db.sync()
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected to DB'))
  // eslint-disable-next-line no-console
  .catch((e) => console.log(e))

app.use('/api', movieRouter)


// eslint-disable-next-line no-console
app.listen(apiPort, () => console.log(`Server running on port ${ apiPort }`))
