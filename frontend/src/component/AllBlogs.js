import React, { useState, useEffect } from 'react';
import getToken from '../utils/getToken';
import '../css/Blogs.css';

function AllBlogs() { 
    const [blogs, setBlogs] = useState([]);
    
    const apiPrefix = process.env.REACT_APP_API_PREFIX !== null ? process.env.REACT_APP_API_PREFIX : 'http://192.168.0.103:8080';
    const apiPostfix = process.env.REACT_APP_API_ALL_BLOGS !== null ? process.env.REACT_APP_API_ALL_BLOGS : '/api/blog/get';
    const api = apiPrefix + apiPostfix;

    const apiResponse = async(jwt) => {
        const token = 'Bearer '+jwt;
        const response = await fetch(api, {
            method: 'GET',
            headers: {
                'Content-Type'  : 'application/json',
                'Authorization' : token
            }
        });
        if(response.ok) {
            const data = await response.json();
            return data;
        }
        return {status:{success:false}};
    }

    const getAllBlogs = async() => {
        const jwt = getToken('jwt');
        if (jwt !== undefined) {
            const data = await apiResponse(jwt);
            if(data.status.success){
                const allBlogs = data.posts;
                setBlogs(allBlogs);
            }
            else setBlogs([]);
        } 
        else setBlogs([]);
    }

    useEffect( () => {
        getAllBlogs();
        console.log("I Fire Once")
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
      <div className="Blog">
        <header className="Blog-header">
            <h2>Our Blogs</h2>
        </header>
        <div className="content">
            <ul>
                {blogs.map(blog => (
                    <div key={blog.id}>
                        <h4 className=''><a href={'/blogs/'+blog.id}> { blog.title !== undefined ? blog.title : null} </a> </h4>
                        {/* <div dangerouslySetInnerHTML={{ __html: blog.body }} /> */}
                        <p dangerouslySetInnerHTML={{ __html: (blog.body !== undefined) ? blog.body : null }} />
                    </div>
                ))}
            </ul>
        </div>
      </div>
   );
  
}

export default AllBlogs;
