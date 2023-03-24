import React, { useState, useEffect } from 'react';
import getToken from '../utils/getToken'
import '../css/Blogs.css';

function Blogs() {   
    const [blogs, setBlogs] = useState([]);

    const getAllBlogs = async() => {
        const jwt = getToken('jwt');
        const token = 'Brarer '+jwt;
        const response = await fetch('http://localhost:8080/api/blog/get', {
            method: 'GET',
            headers: {
                'Content-Type'  : 'application/json',
                'Authorization' : token
            }
        });
        const data = await response.json();
        if (data.status.success) {
            const allBlogs = data.posts
            setBlogs(allBlogs)
        } 
        else {
            setBlogs([])
        }
    }

    useEffect( () => {
        getAllBlogs();
    }, [])
    
    return (
      <div className="Blog">
        <header className="Blog-header">
            <h2>Our Blogs</h2>
        </header>
        <div className="content">
            <ul>
                {blogs.map(blog => (
                    <div key={blog.id}>
                        <h4 className=''>{blog.title}</h4>
                        {/* <div dangerouslySetInnerHTML={{ __html: blog.body }} /> */}
                        <p dangerouslySetInnerHTML={{ __html: blog.body }} />
                    </div>
                ))}
            </ul>
        </div>
      </div>
   );
  
}

export default Blogs;
