const { notFound } = require('../../controllers/errorHandleController')

function hasBlogId(request, response, next){
    const id = request.query.id
    if(id) next()
    else return notFound(request, response)
}

module.exports = {
    hasBlogId
}