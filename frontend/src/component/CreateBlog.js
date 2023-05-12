import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CreateBlog.css';
import getToken from '../utils/getToken';

function CreateBlog(){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const navigate = useNavigate();

    const apiPrefix = process.env.REACT_APP_API_PREFIX !== null ? process.env.REACT_APP_API_PREFIX : 'http://192.168.0.103:8080';
    const apiPostfix = process.env.REACT_APP_API_CREATE_A_BLOG !== null ? process.env.REACT_APP_API_CREATE_A_BLOG : '/api/blog/create';
    const api = apiPrefix + apiPostfix;

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };

    const apiResponse = async(jwt) => {
        const token = 'Bearer '+jwt;
        const response = await fetch(api, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body : body
            }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : token
            }
        });
        if(response.ok) {
            const data = await response.json();
            return data;
        }
        return {status:{success:false}};
    }

    const handleBlogSubmit = async (event) => {
        event.preventDefault();

        const jwt = getToken('jwt');
        if (jwt !== undefined && jwt !== null) {
            const data = await apiResponse(jwt);
            if(data.status.success){
                const postId = data.post.id;
                navigate('/blogs/'+postId);
            }
            else {
                navigate('/create');
            }
        }
        else{
            navigate('/login');
        }
        
    }
    return (
        <div >
          <h2>Create a Blog</h2>
          <form onSubmit={handleBlogSubmit}>
            <div>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} required/>
            </div>
            <div className="form-group">
              <label htmlFor="body" >Body</label>
              <textarea id="body" name="body" value={body} onChange={handleBodyChange} required></textarea>
            </div>
            <button type="submit">Post</button>
          </form>
        </div>
      );
         
}

export default CreateBlog;