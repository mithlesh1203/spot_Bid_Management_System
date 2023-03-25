const express = require('express');
var cors = require('cors')
const conn = require('./db/conn')
const app = express();
const SpotBidSchema = require('./models/spotBidSchema');
const PORT = (process.env.PORT || 5000);
const { request } = require('express');
const multer = require('multer')
const cron = require('node-cron')

app.use(express.json());
app.use(cors())

cron.schedule('* * * * *', () => {
  spotBidDataFetch()
})

const spotBidDataFetch = async () => {
  try {
    const spotBidData = await SpotBidSchema.aggregate([
      { $sort: { name: 1 } },
    ]);
    spotBidData.map((product) => {
      const pickupTimeS = product.pickupTime;
      const bidEndTimeE = product.bidEndTime;
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const pickupTime = new Date(currentTime);
      const bidEndTime = new Date(bidEndTimeE);

      (bidEndTime - pickupTime < 0) && UpdateSpotBidStatus(product._id)
      
    });
  } catch (e) {

    console.log(e)
  }
}

const UpdateSpotBidStatus = async (id) => {
  try {
    let result = await SpotBidSchema.updateMany(
      { _id: id },
      { $set: { status: 'EXPIRED' } }
    );
  } catch (err) {
    console.log(`Something went wrong while fetching and changing the status spot bids ERROR: ${err}`);
  }

};


app.post('/spot-bid-registation', async (req, res) => {
  let spotBid = new SpotBidSchema(req.body);
  let result = await spotBid.save();
  result = result.toObject();
  res.send(result);
});


app.get('/spot-bid-active-details', async (req, res) => {
  try {
    const productData = await SpotBidSchema.aggregate([
      { $sort: { name: 1 } },
      { $match: { status: 'LIVE' } }
    ]);
    if (productData.length) {
      res.send(productData)
    }
  } catch (err) {
    console.log(`Something went wrong while fetching active spot bids ERROR: ${err}`);
  }
});

app.get('/spot-bid-expire-details', async (req, res) => {
  try {
    const productData = await SpotBidSchema.aggregate([
      { $sort: { name: 1 } },
      { $match: { status: 'EXPIRED' } },
    ]);
    if (productData.length) {
      res.send(productData)
    }
  } catch (err) {
    console.log(`Something went wrong while fetching compleated spot bids ERROR: ${err}`);
  }
});






app.get('/spot-bid-upcomming-details', async (req, res) => {
  try {
    const productData = await SpotBidSchema.aggregate([
      { $sort: { name: 1 } },
      { $match: { status: 'UPCOMMING' } }
    ]);
    if (productData.length) {
      res.send(productData)
    }
  } catch (err) {
    console.log(`Something went wrong while fetching compleated spot bids ERROR: ${err}`);
  }
});


app.post('/place-spot-bid', async (req, res) => {
  const {bidId, bidderNmae, biddingPrice}=req.body
  if(!bidId || !bidderNmae || !biddingPrice){
    return console.error('');
  }
  try {
    let result = await SpotBidSchema.updateOne(
      { _id: bidId },
      {
        $push: {
          placeBidDetails:{
            bidderNmae, 
            biddingPrice
          }
        }
      }
    );
  } catch (err) {
    console.log(`Something went wrong while fetching and changing the status spot bids ERROR: ${err}`);
  }
});




app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})