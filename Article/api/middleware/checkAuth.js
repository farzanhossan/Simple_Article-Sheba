let jwt = require('jsonwebtoken');
const db = require('../../connection');

module.exports = (req,res,next)=>{
    try {
        const accesstoken = req.headers['authorization'];
        if (accesstoken == null) {
            return res.status(403).json({
            message: "Token Not Exist"
            })
        }
        const token = accesstoken.split(' ')[1];
        // console.log(token);
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err, result) =>{
            // console.log(err);
            if(err) throw err;
            // console.log(result.user_id);
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
                    req.userData = tokenId;
                    next();
                }
                
            })
        })    
        
    } catch (error) {
        if(error) throw error;
    }
}