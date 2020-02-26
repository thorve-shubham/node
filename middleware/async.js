module.exports = function (operation){
    return async function (req,res,next){
        try{
            await operation(req,res);
        }
        catch(err){
            next(err);
        }
    }
};