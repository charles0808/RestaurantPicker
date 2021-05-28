var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors')

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  origin: "*",
  credentials: true,
}));
const mongoose = require("mongoose");
const Restaurant = require("./schema/RestaurantSchema");

let mongoDB =
  "mongodb+srv://admin:19950808@splitwise-cluster.2tnzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 50,
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

app.get('/list', async (req, res) => {
  try{
    let docs = await Restaurant.find({}).select('name tag url')
    res.status(200).send(docs)
  } catch(error) {
    res.status(400).send();
  }
  
})

app.post("/add", async (req, res) => {
  try {
    let newRest = new Restaurant({
      name: req.body.name,
      tag: req.body.tag,
      url: req.body.url,
    });

    let result = await newRest.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send();
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
