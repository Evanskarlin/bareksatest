const News = require('../models/news')

class NewsController {
  static create(req, res, next){
    let {title, topic, tagId, status} = req.body
    News.create({
      title,
      topic,
      tagId,
      status
    })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(next)
  }
  static readAll(req, res, next){
    let condition = {}
    if(req.query.topic || req.query.status){
      condition = {
        $and:[]
      }
      if(req.query.topic){
        condition.$and.push({'topic': new RegExp(`${req.query.topic}`, 'gi')})
      }
      if(req.query.status){
        condition.$and.push({'status': new RegExp(`${req.query.status}`, 'gi')})
      }
    }
    News.find(condition)
      .populate('tagId')
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
  static readOne(req, res, next){
    News.findById(req.params.id)
      .populate('tagId')
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          next({status:404, message:'News Not Found'})
        }
      })
      .catch(next)
  }
  static updateAll(req, res, next){
    let {title, topic, tagId, status} = req.body
    News.findByIdAndUpdate({_id:req.params.id},
      {
        title,
        topic,
        tagId,
        status
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
          next({status:404, message:'News Not Found'})
        }
      })
      .catch(next)
  }
  static updateStatus(req, res, next){
    let {status} = req.body
    News.findByIdAndUpdate(
      {
        _id: req.params.id
      },
      {
        status
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
          next({status:404, message:'News Not Found'})
        }
      })
      .catch(next)
  }
  static delete(req, res, next){
    News.findByIdAndDelete({_id:req.params.id})
      .then(data => {
        if(data){
          res.status(200).json(data)
        }
        else{
          next({status:404, message:'News Not Found'})
        }
      })
      .catch(next)
  }
}

module.exports = NewsController