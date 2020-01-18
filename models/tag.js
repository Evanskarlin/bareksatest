const mongoose = require('mongoose')

let Schema = mongoose.Schema

let tagSchema = new Schema({
  name: {
    type:String,
    required: [true, 'Name is required']
  }
}, 
{
  timestamps:true, 
  versionKey: false
})

let Tag = mongoose.model('Tag',tagSchema)

module.exports = Tag
