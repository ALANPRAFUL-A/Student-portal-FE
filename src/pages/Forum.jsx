import { useState, useEffect } from "react";
import "../styles/Forum.css";   

const Forum = ({ student }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await fetch("https://student-portal-1-571f.onrender.com/api/forum");
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
      setError("Could not load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
  try {
    const res = await fetch(`https://student-portal-1-571f.onrender.com/api/forum/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message || "Delete failed");
    }

    setPosts((prev) => prev.filter((post) => post._id !== id));
  } catch (error) {
    console.error("Failed to delete post", error);
    setError(error.message || "Delete failed");
  }
};


  return (
    <div>
      <h1>Forum Posts</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {Array.isArray(posts) && posts.length > 0 ? (
  posts.map((post) => (
    <div key={post._id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p><strong>Posted by:</strong> <span>{post.authorName}</span></p>

      {/* ✅ Always show delete button */}
      <button onClick={() => handleDelete(post._id)}>Delete</button>
    </div>
  ))
) : (
  <p>No posts available.</p>
)}
    </div>
  );
};

export default Forum;
