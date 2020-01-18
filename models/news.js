const mongoose = require('mongoose')

let Schema = mongoose.Schema

let newsSchema = new Schema({
  title: {
    type:String,
    required: [true, 'Title is required']
  },
  topic: {
    type:String,
    required: [true, 'Topic is required']
  },
  status: {
    type:String,
    required: [true, 'Status is required']
  },
  tagId: [{
    type: Schema.Types.ObjectId, 
    ref: "Tag"
  }]
}, 
{
  timestamps:true, 
  versionKey: false
})

let News = mongoose.model('News',newsSchema)

module.exports = News
