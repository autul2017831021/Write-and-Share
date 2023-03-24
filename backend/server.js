const http = require('http')
const express = require('express')
const url = require('url')
const cors = require('cors')
const app = express()
const {StringDecoder} = require('string_decoder')
const { db }= require('./database/dbConnection.js')
const { getAllPosts,getPostById,createPost, updatePostById, deletePostById } = require('./controllers/postController.js')
const { getApiReqResTime } = require('./api-request-response-time/apiReqResTime.js')
const { register,login } = require('./controllers/authController.js')
const { verifyJwt } = require('./middleware/auth/verifyJwt.js')
const { notFound, forbidden, invalidToken } = require('./controllers/errorHandleController.js')
const { base64decode } = require('./helpers/utility.js')
const { getUserProfile, updateUserProfile } = require('./controllers/userController.js')
const { updateProfileAuth } = require('./helpers/role.js')
const { validateJwt } = require('./middleware/auth/validateJwt.js')
const blogRoutes = require('./routes/blogRoutes')

const port = 8080

app.use(cors())

function getDate(dateObj){
    return 'Request Time : '+getApiReqResTime(dateObj)
}
function getEndpointName(endpoint){
    return 'Endpoint : http://localhost:'+port+endpoint
}
function commonCallBack(path){
    console.log( getEndpointName(path) )
    console.log( getDate(new Date()) )
}

// Blog Routes
app.get('/api/blog/get', verifyJwt, validateJwt, (request,response)=>{
    const path = request.url
    const id = request.query.id
    commonCallBack(path)
    if(id) getPostById(request,response,db,id)
    else getAllPosts(request,response,db)
})
app.post('/api/blog/create', verifyJwt, validateJwt, (request,response)=>{
    const path = request.url
    const payload = request.headers.authorization.split(' ')[1].split('.')[1]
    const userInfo = JSON.parse(base64decode(payload))
    commonCallBack(path)
    createPost(request,response,db,userInfo)
})


app.listen(port,()=>{
    console.log("Server running on http://localhost:%i",port)
})
