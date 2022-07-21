import './env'
import cors from 'cors'
import express from 'express'
import router from './router'
import { logger } from './services/appLogger'
import { createLoggerMiddleware } from './services/loggerMiddleware'
import config from './config'
import { init } from './init'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.text())

app.use(createLoggerMiddleware('zp.log'))

app.use(router)

init().then(() => {
  app.listen(config.port, () => logger.info(`Started relayer on port ${config.port}`))
})
