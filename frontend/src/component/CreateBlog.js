import React, { useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

function CreateBlog(){
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        const quill = new Quill('#editor', {
            theme: 'snow'
        });
        
        quill.on('text-change', () => {
            setTitle(quill.getText(0, 50)); // Get the first 50 characters of the text as the title
            setBody(quill.root.innerHTML);
        });
    }, []);

    return (
        <div>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          <div id="editor"></div>
          <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Content"></textarea>
          {/* <button onClick={handleBlogSubmit}>Submit</button> */}
        </div>
      );
         
}

export default CreateBlog;