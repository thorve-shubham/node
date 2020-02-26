function admin(req,res,next){
    if(!req.user.isAdmin) return res.status(403).send("You do not have Admin rights");

    next();
}

module.exports.admin = admin;