import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDb from './config/db.js'
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

const app = express()

connectDb()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


// Routes

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)

app.get("/", (req,res)=> {
    res.send("Fuck")
})  

app.listen(process.env.PORT || 8000 , ()=> {
  console.log('Server running on ' + process.env.PORT ) ;
})