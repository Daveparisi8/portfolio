import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import posts from '../../data/posts';
import './BlogSection.css';

function BlogSection() {
  const [selectedPost, setSelectedPost] = useState(null); // { meta, content } | null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function openPost(meta) {
    setLoading(true);
    setError(null);
    fetch(`${process.env.PUBLIC_URL}/posts/${meta.slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error('Post not found.');
        return res.text();
      })
      .then((content) => {
        setSelectedPost({ meta, content });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  function closePost() {
    setSelectedPost(null);
    setError(null);
  }

  if (loading) {
    return <div className="blog-status">Loading...</div>;
  }

  if (error) {
    return (
      <div className="blog-status">
        <p>Error: {error}</p>
        <button className="hero-button" onClick={closePost}>Back to Blog</button>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="blog-post-view">
        <button className="hero-button blog-back-button" onClick={closePost}>
          ← Back to Blog
        </button>
        <div className="blog-post-meta">
          <span className="blog-post-date">{selectedPost.meta.date}</span>
        </div>
        <div className="blog-post-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {selectedPost.content}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-list">
      {posts.length === 0 ? (
        <p className="blog-empty">No posts yet. Check back soon.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.slug}
            className="blog-card"
            onClick={() => openPost(post)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openPost(post)}
          >
            <div className="blog-card-date">{post.date}</div>
            <h3 className="blog-card-title">{post.title}</h3>
            <p className="blog-card-description">{post.description}</p>
            <span className="blog-card-read">Read →</span>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogSection;
