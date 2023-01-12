import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
    const authtoken = req.headers.authorization;
    if(authtoken && authtoken.length < 500) {
        const token=authtoken.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) {
                return res.status(403).json({message:'Token Is Not Valid'});
            }
            req.user = user;
            next();
        })
    }else{
        res.status(401).json({message:'You Are Not Authenticated'});
    }
}


const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(401).json({message:'You Are Not Allow To Do That!'});
        }
    })
}

export const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(401).json({message:'You Are Not Allow To Do That!'});
        }
    })
}
export default verifyTokenAndAuthorization