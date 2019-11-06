const db = require('../../connection');
require('dotenv').config();
let jwt = require('jsonwebtoken');

const userGet = (req, res, next)=>{
    res.status(200).json({
        message: "User Get Found"
    })
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const userRegister = (req, res, next)=>{
    try{
        let {user_name, user_email, user_password} =req.body;
        if(!validateEmail(user_email)){
            res.status(400).json({
                message: "please Insert Valid Email"
            })
        }else{
            if(user_name == "" || user_email == "" || user_password==""){
                res.status(400).json({
                    message: "please Insert All Information"
                })
            }
            else{
                let userDetails = {
                    user_name : user_name,
                    user_email: user_email,
                    user_password: user_password
                } 
                let sql1 = 'select user_email from users where user_email = ?';
                db.query (sql1,user_email ,(err, result) =>{
                if(err) throw err;
                if(result == ''){
                    let sql = 'INSERT INTO users SET ?';
                    db.query(sql, userDetails,(err, result) => {
                    if(err) throw err;
                    //console.log('Result', result);
                    //console.log(result.insertId);
                    let userId = {
                        user_id : result.insertId
                    }
        
                    let token = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                    
                    res.status(200).json({
                        message : "User registered Successfully",
                        token : token
                    });
                    });
                }else{
                    res.status(400).json({
                        message : "User Email Already Registered"
                    });
                }
                
                });
            }
        }
        
        
    }catch(err){
        throw err;
    }
    
}

const userLogin = (req, res, next) =>{
    let {user_email, user_password } = req.body;
    if(user_email == "" || user_password == ""){
        res.status(400).json({
            message : "Please Insert Email and Password"
        })
    }else{
        let sql = 'select user_email from users where user_email = ?'
        db.query(sql,user_email,(err,result) => {
            if(err) throw err;
            if(result == ""){
                res.status(400).json({
                    message : "Please Register"
                })
            }else{
                let sql1 = 'select * from users where user_email = ?'
                let query =db.query(sql1, user_email,(err, result) =>{
                    if(err) throw err;
                    if(result[0].user_password == user_password){
                        let userId = {
                            user_id : result[0].user_id
                        }
            
                        let token = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                        return res.status(200).json({
                            message: "Login Successful",
                            token: token
                        })
                    }
                    
                })
                console.log(query);
                
            }
        })
    }
}

const userDelete = (req,res,next)=>{
    let user_id = req.params.user_id;
    let sql = 'delete from users where user_id = ?';
    db.query(sql, user_id, (err, result)=>{
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

module.exports ={
    userGet: userGet,
    userRegister: userRegister,
    userLogin: userLogin,
    userDelete: userDelete
}