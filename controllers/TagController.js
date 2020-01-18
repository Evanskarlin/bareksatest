const Tag = require('../models/tag')

class TagController {
  static create(req, res, next){
    let {name} = req.body
    Tag.create({
      name
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }
  static readAll(req, res, next){
    Tag.find()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
  static readOne(req, res, next){
    Tag.findById(req.params.id)
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          next({status:404, message:'Tag Not Found'})
        }
      })
      .catch(next)
  }
  static update(req, res, next){
    let {name} = req.body
    Tag.findByIdAndUpdate({_id:req.params.id},
      {
        name
      }, 
      { 
        runValidators: true,
        new: true
      }
    )
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          next({status:404, message:'Tag Not Found'})
        }
      })
      .catch(next)
  }
  static delete(req, res, next){
    Tag.findByIdAndDelete({_id:req.params.id})
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          next({status:404, message:'Tag Not Found'})
        }
      })
      .catch(next)
  }
}

module.exports = TagController