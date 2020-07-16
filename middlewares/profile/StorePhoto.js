module.exports = function(req, res, next) {
    let photo = req.file;
    if(photo)
        next()
    else
        res.status(422).send({
            message: "Photo has not been saved!"
        });
}