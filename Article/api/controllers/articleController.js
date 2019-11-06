const db = require('../../connection');
require('dotenv').config();
let jwt = require('jsonwebtoken');

const articleGet = (req, res, next)=>{
    try {
        let tokenId = req.userData; 
        let sql2 = 'select * from articles where user_id = ?';
        db.query(sql2,tokenId, (err,result) => {
            if(err) throw err;
            return res.status(200).json({
                result
            })
        })
        
    } catch (error) {
        if(error) throw error;
    }
}

const articleCreate = (req, res, next)=>{
    try {
        let tokenId = req.userData; 
        let {article_title, article_description, category_id} = req.body;
        let sql2 = 'select category_id from categories where category_id = ?'
        db.query(sql2, category_id , (err, result)=>{
            if(err) throw err;
            // console.log(result);
            if(result == ""){
                return res.status(400).json({
                    message: "Category Doesn't Exist"
                })
            }else{
                let articleDetails = {
                    article_title : article_title,
                    article_description: article_description,
                    category_id: category_id,
                    user_id: tokenId
                }
                let sql1 = `insert into articles set ?`
                db.query(sql1,articleDetails,(err,result) => {
                    if(err) throw err;
                    return res.status(200).json({
                        message: "Article Created Successfully"
                    })
                })
            }
        })
    } catch (error) {
        if(error) throw error;
    }
    
}

const articleUpdate = (req,res, next) =>{
    try {
        let tokenId = req.userData;
        let article_id = req.params.article_id;
        let sql = `select * from articles where article_id = ? and user_id = ${ tokenId }`;
        db.query(sql,article_id,(err,result)=>{
            if(err) throw err;
            if(result == ""){
                return res.status(400).json({
                    message: "No Article Found"
                })
            }else{
                let {article_title, article_description, category_id} = req.body;
                let articleDetails = {
                    article_title : article_title,
                    article_description: article_description,
                    category_id: category_id
                }
                let sql2 = `update articles set ? where article_id = ${ article_id }` 
                db.query(sql2, articleDetails , (err, result) =>{
                    if(err) throw err;
                    return res.status(200).json({
                        message: "Article Successfully Updated"
                    })
                    
                })
            }
        })
    } catch (error) {
        if(error) throw error;
    }
}

const articleDelete = (req,res,next)=>{
    try {
        let tokenId = req.userData;
        let article_id = req.params.article_id;
        let sql = `delete from articles where article_id = ? and user_id = ${ tokenId }`;
        db.query(sql, article_id, (err, result)=>{
            if(err) throw err;
            // console.log(result.affectedRows);
            if(result.affectedRows != 0){
                return res.status(200).json({
                    message: 'Article Deleted Successfully',
                    result : result
                })
            }else{
                return res.status(200).json({
                    message: 'Article Already Deleted'
                })
            }
        })
    } catch (error) {
        if(error) throw error;
    }
}



module.exports ={
    articleGet: articleGet,
    articleCreate: articleCreate,
    articleUpdate: articleUpdate,
    articleDelete: articleDelete
}