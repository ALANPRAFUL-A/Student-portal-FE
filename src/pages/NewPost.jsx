import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../styles/NewPost.css"

const NewPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a post.");
      return;
    }

    try {
      await axios.post(
        'https://student-portal-1-571f.onrender.com/api/forum',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Post created successfully!');
      navigate("/forum");
    } catch (error) {
      console.error('Error creating post', error);
      alert("Failed to create post");
    }
  };

  return (<div className='postform'>
    <h2 className='postheading'>Create a New Post</h2>
    <form onSubmit={handleSubmit} className="post-form">
      <input
        className='postinput'
        type="text"
        name="title"
        placeholder="Title"
        onChange={handleChange}
        required
      />
      <textarea
        className='postinput'
        name="content"
        placeholder="Content..."
        onChange={handleChange}
        required
      />
      <button type="submit" className='submitbutton'>Create Post</button>
    </form></div>
    
  );
};

export default NewPost;
