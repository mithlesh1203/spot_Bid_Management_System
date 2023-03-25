const mongoose = require('mongoose');
const SpotBidSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
      phoneNo: {
        type: Number,
        require: true,
      },
      distance: {
        type: Number,
        require: true,
      },
      charge: {
        type: Number,
        require: true,
      },
      from: {
        type: String,
        require: true,
      },
      destination: {
        type: String,
        require: true,
      },
      pickupTime: {
        type: String,
        require: true,
      },
      bidEndTime: {
        type: String,
        require: true,
      },
      bidStatus:{
        type: Boolean,
        // require: true,
      },
      status:{
        type: String,
        // require: true,
      },
      placeBidDetails:{
        type: Object,
        
      }
  

},{
    collection: 'spotBid'
  })


const SpotBid = mongoose.model('spotBid', SpotBidSchema);

module.exports = SpotBid;