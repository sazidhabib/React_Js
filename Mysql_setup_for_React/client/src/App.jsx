import React, { useState, useEffect } from 'react';
import BlogCard from './components/BlogCard';
import BlogForm from './components/BlogForm';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';
import { Plus } from 'lucide-react';

function App() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  useEffect(() => {
    const mockPosts = [
      {
        id: '1',
        title: 'Getting Started with React',
        content: 'React is a powerful JavaScript library for building user interfaces. In this post, we\'ll explore the fundamentals of React and how to create your first component.',
        imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: '2',
        title: 'Modern CSS Techniques',
        content: 'CSS has evolved significantly over the years. Learn about CSS Grid, Flexbox, and other modern techniques that will improve your web development workflow.',
        imageUrl: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-12')
      },
      {
        id: '3',
        title: 'Database Design Best Practices',
        content: 'A well-designed database is crucial for any application. This post covers normalization, indexing, and other best practices for database design.',
        imageUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05')
      }
    ];
    setPosts(mockPosts);
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePost = (postData) => {
    const newPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setPosts(prev => [newPost, ...prev]);
    setIsModalOpen(false);
  };

  const handleUpdatePost = (postData) => {
    if (!editingPost) return;

    const updatedPost = {
      ...postData,
      id: editingPost.id,
      createdAt: editingPost.createdAt,
      updatedAt: new Date()
    };

    setPosts(prev => prev.map(post =>
      post.id === editingPost.id ? updatedPost : post
    ));
    setEditingPost(null);
    setIsModalOpen(false);
  };

  const handleDeletePost = (id) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Post
          </button>
        </div>

        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {searchTerm ? 'No posts found matching your search.' : 'No blog posts yet. Create your first post!'}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <BlogCard
                key={post.id}
                post={post}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        )}
      </main>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <BlogForm
          post={editingPost}
          onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default App;
