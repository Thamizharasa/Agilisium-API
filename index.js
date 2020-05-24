var express = require('express'),
	bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    middleware = require('./Middleware');
  cors = require('cors');
    


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

var mongoUri = 'mongodb+srv://thamizh:thamizh_5051@cluster0-jmh67.mongodb.net/Agile?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
	useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err, res) {

	if (err) {
		return console.error('Error connecting to "%s":', mongoUri, err);
    }
  	console.log('Connected successfully to "%s"', mongoUri);
});

app.all('/', function (req, res,next) {
    
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/getWallet',async(req,res)=>
{   

  res.send(JSON.stringify({Wallets:await middleware.getWallet()}));
  res.status(200);
  res.end();

})
app.post('/addwallet',async(req,res)=>
{
    let {id} = await middleware.AddWallet(req);
  	res.status(200);
	res.send(JSON.stringify({Data:id!=undefined ? await middleware.getWallet():" Something Went Wrong please try again"}));
	res.end();
})       

app.post("/deleteWallet",async(req,res)=>
{
   let {deletedCount} = await middleware.deleteWallets(req);
   res.status(200);
   res.send(JSON.stringify(deletedCount >= 1 ? await middleware.getWallet() : " Something Went Wrong please try again"));
   res.end();

})


app.post('/editWallet',async(req,res)=>
{
    let {id} = await middleware.EditWallet(req);
  	res.status(200);
	res.send(JSON.stringify({Data:id!=undefined ? await middleware.getWallet():" Something Went Wrong please try again"}));
	res.end();
})   

app.listen(process.env.PORT||8000);
