import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getToken from '../utils/getToken';
import '../css/Blogs.css';

function SingleBlog() {   
    const [blogs, setBlogs] = useState([]);

    const apiPrefix = process.env.REACT_APP_API_PREFIX !== null ? process.env.REACT_APP_API_PREFIX : 'http://192.168.0.103:8080';
    const apiPostfix = process.env.REACT_APP_API_SINGLE_BLOG !== null ? process.env.REACT_APP_API_SINGLE_BLOG : '/api/blog/get?id=';
    const { id } = useParams();
    const api = apiPrefix + apiPostfix + id;
    console.log(process.env.REACT_APP_API_SINGLE_BLOG);
    console.log(api);

    const apiResponse = async(jwt) => {
        const token = 'Brarer '+jwt;
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
        return {status:{success:false}}
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    return (
      <div className="Blog">
        <div>
            <a href='/blogs'>Go Back</a>
        </div>
        <div className="content">
            <ul>
                {blogs.map(blog => (
                    <div key={blog.id}>
                        <header className="Blog-header">
                            <h2>{ blog.title !== undefined ? blog.title : null}</h2>
                        </header>
                        <h4 className=''>  </h4>
                        {/* <div dangerouslySetInnerHTML={{ __html: blog.body }} /> */}
                        <p dangerouslySetInnerHTML={{ __html: (blog.body !== undefined) ? blog.body : null }} />
                    </div>
                ))}
            </ul>
        </div>
      </div>
   );
  
}

export default SingleBlog;
