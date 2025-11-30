import  express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import userRouter from "./routes/userRoutes.js"
import imageRouter from "./routes/imageRoute.js"




const PORT =process.env.PORT || 4000
const app=express()
app.use(express.json())
app.use(cors())
await connectDB()


app.use("/api/user",userRouter)
app.use("/api/image",imageRouter)


app.get("/",(req,res)=>res.send("API Working "))
app.post('/debug/echo', (req, res) => {
  console.log('CT =>', req.headers['content-type']);
  console.log('BODY =>', req.body);
  return res.json({ headers: req.headers, body: req.body });
});



app.listen(PORT ,()=>console.log("server running on port" + PORT))