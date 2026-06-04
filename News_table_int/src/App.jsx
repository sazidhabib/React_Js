import React, { useState, useEffect } from 'react';
import { posts } from './data/posts';
import { Search, Menu, X, ArrowRight, Clock, User, Calendar, Github, Twitter, Linkedin, ChevronLeft } from 'lucide-react';

const App = () => {
  const [postsState, setPostsState] = useState(() => {
    const saved = localStorage.getItem('lumina_posts');
    return saved ? JSON.parse(saved) : posts;
  });
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000'
  });

  const categories = ['All', ...new Set(postsState.map(post => post.category))];

  useEffect(() => {
    localStorage.setItem('lumina_posts', JSON.stringify(postsState));
  }, [postsState]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPosts = postsState.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    const contentHtml = document.getElementById('content-editor').innerHTML;
    const postToAdd = {
      ...newPost,
      content: contentHtml,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: `${Math.ceil(contentHtml.replace(/<[^>]*>?/gm, '').length / 500) + 1} min read`
    };
    setPostsState([postToAdd, ...postsState]);
    setIsModalOpen(false);
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000'
    });
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <div className="logo" onClick={() => setSelectedPost(null)}>
            LUMINA<span>.</span>
          </div>

          <div className="nav-links">
            {categories.map(cat => (
              <button
                key={cat}
                className={`nav-item ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedPost(null);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button className="add-post-btn glass flex-auto flex-wrap  gap-1" onClick={() => setIsModalOpen(true)}>
              <span>+</span> Write Post
            </button>
            <div className="search-bar glass">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="content">
        {!selectedPost ? (
          <>
            {/* Hero Section */}
            <section className="hero fade-in">
              <div className="hero-badge">Featured Article</div>
              <h1>Discover the Intersection of <span>Design</span> & <span>Technology</span></h1>
              <p>Exploring the digital frontier through deep dives and premium insights.</p>
            </section>

            {/* Post Grid */}
            <div className="post-grid">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="post-card glass fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handlePostClick(post)}
                  >
                    <div className="post-image">
                      <img src={post.image} alt={post.title} />
                      <div className="post-category">{post.category}</div>
                    </div>
                    <div className="post-info">
                      <div className="post-meta">
                        <span><Clock size={14} /> {post.readTime}</span>
                        <span><Calendar size={14} /> {post.date}</span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <button className="read-more">
                        Read Story <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <h3>No articles found matching your criteria.</h3>
                  <button onClick={() => { setSearchQuery(''); setActiveCategory('All') }}>Clear Filters</button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Post Detail View */
          <article className="post-detail fade-in">
            <button className="back-btn" onClick={() => setSelectedPost(null)}>
              <ChevronLeft size={20} /> Back to Library
            </button>

            <header className="post-header">
              <div className="post-category-tag">{selectedPost.category}</div>
              <h1>{selectedPost.title}</h1>
              <div className="post-meta-detailed">
                <div className="author-info">
                  <div className="author-avatar glass">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="author-name">{selectedPost.author}</div>
                    <div className="post-date">{selectedPost.date} • {selectedPost.readTime}</div>
                  </div>
                </div>
              </div>
            </header>

            <div className="post-hero-image">
              <img src={selectedPost.image} alt={selectedPost.title} />
            </div>

            <div className="post-body glass">
              <p className="lead">{selectedPost.excerpt}</p>
              <div 
                className="post-content"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </div>
          </article>
        )}
      </main>

      {/* Footer */}
      <footer className="footer glass">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">LUMINA<span>.</span></div>
            <p>Elevating digital discourse since 2024.</p>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h4>Platform</h4>
              <ul>
                <li>Library</li>
                <li>Authors</li>
                <li>Archive</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Social</h4>
              <div className="social-icons">
                <Twitter size={20} />
                <Github size={20} />
                <Linkedin size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Lumina Media Group. All rights reserved.</p>
        </div>
      </footer>

      {/* Create Post Modal */}
      {isModalOpen && (
        <div className="modal-overlay fade-in">
          <div className="modal-content glass fade-in">
            <button className="modal-close" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            <h2>Create New <span>Post</span></h2>
            <form onSubmit={handleCreatePost}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter a catchy title..."
                    value={newPost.title}
                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={newPost.author}
                    onChange={e => setNewPost({ ...newPost, author: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newPost.category}
                    onChange={e => setNewPost({ ...newPost, category: e.target.value })}
                  >
                    <option>Technology</option>
                    <option>Design</option>
                    <option>Sustainability</option>
                    <option>Trends</option>
                    <option>Culture</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newPost.image}
                    onChange={e => setNewPost({ ...newPost, image: e.target.value })}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Short Excerpt</label>
                  <textarea
                    required
                    placeholder="Brief description of the post..."
                    value={newPost.excerpt}
                    onChange={e => setNewPost({ ...newPost, excerpt: e.target.value })}
                  ></textarea>
                </div>
                <div className="form-group full-width">
                  <label>Content (Supports Pasted Tables)</label>
                  <div 
                    id="content-editor"
                    className="content-editable-area"
                    contentEditable="true"
                    placeholder="Write your story here or paste a table..."
                    onInput={(e) => setNewPost({...newPost, content: e.currentTarget.innerHTML})}
                  ></div>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>Discard</button>
                <button type="submit" className="submit-btn">Publish Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
