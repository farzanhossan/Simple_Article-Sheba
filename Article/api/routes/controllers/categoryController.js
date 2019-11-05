const db = require('../../../connection');
require('dotenv').config();
let jwt = require('jsonwebtoken');

const categoryGet = (req, res, next)=>{
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (token == null) {
            return res.status(403).json({
            message: "Token not valid"
            })
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, result) =>{
            if(err) throw err;
            //console.log(result.user_id);
            let tokenId = result.user_id;
            let sql1 = 'select * from users where user_id = ?'
            db.query(sql1, tokenId, (err, result)=>{
                if(err) throw err;
                if(result == ""){
                    return res.status(403).json({
                        message: 'User Not Found. Please Register Or Login',
                        // result : result
                    })
                }else{
                    let sql2 = 'select * from categories';
                    db.query(sql2,(err,result) => {
                        if(err) throw err;
                        return res.status(200).json({
                            result
                        })
                    })

                }
            })
        })    
        
    } catch (error) {
        if(error) throw error;
    }
}

const categoryCreate = (req, res, next)=>{
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (token == null) {
            return res.status(403).json({
            message: "Token not valid"
            })
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, result) =>{
            if(err) throw err;
            //console.log(result.user_id);
            let tokenId = result.user_id;
            let sql1 = 'select * from users where user_id = ?'
            db.query(sql1, tokenId, (err, result)=>{
                if(err) throw err;
                if(result == ""){
                    return res.status(403).json({
                        message: 'User Not Found. Please Register Or Login',
                        // result : result
                    })
                }else{
                    let {category_name} = req.body;
                    let sql2 = 'select category_name from categories where category_name = ?'
                    db.query(sql2, category_name , (err, result)=>{
                        if(err) throw err;
                        // console.log(result);
                        if(result == ""){
                            let categoryName = {
                                category_name : category_name
                            }
                            let sql3 = 'insert into categories set ?';
                            db.query(sql3, categoryName , (err, result) =>{
                                if(err) throw err;
                                return res.status(200).json({
                                    message: "Category Created Successfully"
                                })
                            })
                        }else{
                            return res.status(400).json({
                                message: "Category Already Created"
                            })
                        }
                    })

                }
            })
        })    
        
    } catch (error) {
        if(error) throw error;
    }
    
}

categoryUpdate = (req,res, next) =>{
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (token == null) {
            return res.status(403).json({
            message: "Token not valid"
            })
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, result) =>{
            if(err) throw err;
            //console.log(result.user_id);
            let tokenId = result.user_id;
            let sql1 = 'select * from users where user_id = ?'
            db.query(sql1, tokenId, (err, result)=>{
                if(err) throw err;
                if(result == ""){
                    return res.status(403).json({
                        message: 'User Not Found. Please Register Or Login',
                        // result : result
                    })
                }else{
                    let category_id = req.params.category_id;
                    let sql = 'select * from categories where category_id = ?';
                    db.query(sql,category_id,(err,result)=>{
                        if(err) throw err;
                        if(result == ""){
                            return res.status(400).json({
                                message: "No Category Found"
                            })
                        }else{
                            let {category_name} = req.body;
                            let sql2 = `select category_name from categories where category_name = ?`;
                            db.query(sql2, category_name , (err, result) =>{
                                if(err) throw err;
                                if(result == ""){
                                    let sql1 = `update categories set category_name = ? where category_id = ${ category_id }`;
                                    db.query(sql1,category_name ,(err , result)=>{
                                        if(err) throw err;
                                        res.status(200).json({
                                            message: "Category Update Successfully"
                                        })
                                    })
                                }else{
                                    res.status(400).json({
                                        message: "Category Already Exist"
                                    })
                                }
                                
                            })
                        }
                    })
                    

                }
            })
        })    
        
    } catch (error) {
        if(error) throw error;
    }
}

const categoryDelete = (req,res,next)=>{
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (token == null) {
            return res.status(403).json({
            message: "Token not valid"
            })
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, result) =>{
            if(err) throw err;
            //console.log(result.user_id);
            let tokenId = result.user_id;
            let sql1 = 'select * from users where user_id = ?'
            db.query(sql1, tokenId, (err, result)=>{
                if(err) throw err;
                if(result == ""){
                    return res.status(403).json({
                        message: 'User Not Found. Please Register Or Login',
                        // result : result
                    })
                }else{
                    let category_id = req.params.category_id;
                    let sql = 'delete from categories where category_id = ?';
                    db.query(sql, category_id, (err, result)=>{
                        if(err) throw err;
                        // console.log(result.affectedRows);
                        if(result.affectedRows != 0){
                            return res.status(200).json({
                                message: 'Deleted Successfully',
                                result : result
                            })
                        }else{
                            return res.status(200).json({
                                message: 'Already Deleted'
                            })
                        }
                    })

                }
            })
        })    
        
    } catch (error) {
        if(error) throw error;
    }
}

const categoryArticleSearch = (req,res,next)=>{
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if (token == null) {
            return res.status(403).json({
            message: "Token not valid"
            })
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, result) =>{
            if(err) throw err;
            //console.log(result.user_id);
            let tokenId = result.user_id;
            let sql1 = 'select * from users where user_id = ?'
            db.query(sql1, tokenId, (err, result)=>{
                if(err) throw err;
                if(result == ""){
                    return res.status(403).json({
                        message: 'User Not Found. Please Register Or Login',
                        // result : result
                    })
                }else{
                    let category_name = req.params.category_name;
                    let sql3 = 'select * from categories where category_name = ?';
                    db.query(sql3, category_name,(err,result) =>{
                        if(err) throw err;
                        if(result == ""){
                            return res.status(400).json({
                                message: "Category Doesn't Exist"
                            })
                        }else{
                            let category_id = result[0].category_id;
                            // console.log(category_id);
                            let sql2 = `select * from articles where category_id = ? and user_id = ${ tokenId }`;
                            db.query(sql2,category_id,(err,result)=>{
                                if(err) throw err;
                                return res.status(200).json({
                                    result
                                })
                            })
                        }

                    })

                }
            })
        })    
        
    } catch (error) {
        if(error) throw error;
    }
}


module.exports ={
    categoryGet: categoryGet,
    categoryCreate: categoryCreate,
    categoryUpdate: categoryUpdate,
    categoryDelete: categoryDelete,
    categoryArticleSearch: categoryArticleSearch
}