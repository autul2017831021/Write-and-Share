const http = require('http')
const express = require('express')
require('dotenv').config();
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
const { hasBlogId, hasUsername } = require('./middleware/queryParam/hasParam')

const host = process.env.HOST !== null ? process.env.HOST : '192.168.0.103';
const port = process.env.PORT !== null ? process.env.PORT : 8080;

app.use(cors())

function getDate(dateObj){
    return 'Request Time : '+getApiReqResTime(dateObj)
}
function getEndpointName(endpoint){
    //return 'Endpoint : http://localhost:'+port+endpoint
    return 'Endpoint : '+ host +':'+port+endpoint;
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
app.put('/api/blog/update', hasBlogId, verifyJwt, validateJwt, (request,response)=>{
    const path = request.url
    const id = request.query.id
    const payload = request.headers.authorization.split(' ')[1].split('.')[1]
    const userInfo = JSON.parse(base64decode(payload))
    commonCallBack(path)
    updatePostById(request,response,db,userInfo,id)
})
app.delete('/api/blog/delete', hasBlogId, verifyJwt, validateJwt, (request,response)=>{
    const path = request.url
    const id = request.query.id
    const payload = request.headers.authorization.split(' ')[1].split('.')[1]
    const userInfo = JSON.parse(base64decode(payload))
    commonCallBack(path)
    deletePostById(request,response,db,userInfo,id)
})

// User Routes
app.get('/api/profile/get', hasUsername, verifyJwt, validateJwt, (request,response)=>{
    const path = request.url
    const username = request.query.username
    commonCallBack(path)
    getUserProfile(request,response,db,username)
})
app.put('/api/profile/update', verifyJwt, validateJwt, (request,response)=>{
    const path = request.url
    const payload = request.headers.authorization.split(' ')[1].split('.')[1]
    const userInfo = JSON.parse(base64decode(payload))
    commonCallBack(path)
    updateUserProfile(request,response,db,userInfo,request.headers.authorization.split(' ')[1])
})

// Login & Registration Routes
app.post('/api/login', (request, response)=>{
    const path = request.url
    commonCallBack(path)
    login(request,response,db)
})
app.post('/api/register', (request, response)=>{
    const path = request.url
    commonCallBack(path)
    register(request,response,db)
})
app.use('*', (request,response) =>{
    const path = request.url
    commonCallBack(path)
    notFound(request,response)
})

app.listen(port,host,()=>{
    console.log("Server running on %s:%i",host,port)
})
