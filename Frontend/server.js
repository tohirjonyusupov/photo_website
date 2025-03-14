const express = require("express");
const app = express();
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const photoRouter = require("./routes/photoRoutes");
const likeRouter = require("./routes/likeRoutes");

app.use(express.json());
app.use(cors());



app.use('/user', userRouter)
app.use('/photos', photoRouter)
app.use('/like', likeRouter)
app.use('/uploads', express.static('uploads'))


app.listen(3030, () => {
  console.log("Serverimiz ishga tushdi");
});
