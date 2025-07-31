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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        // Convert string dates to Date objects
        const postsWithDates = data.map(post => ({
          ...post,
          createdAt: new Date(post.created_at),
          updatedAt: new Date(post.updated_at)
        }));
        setPosts(postsWithDates);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async (postData) => {
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: postData.title,
          content: postData.content,
          imageUrl: postData.imageUrl
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await response.json();
      // Convert string dates to Date objects
      const postWithDates = {
        ...newPost,
        createdAt: new Date(newPost.created_at),
        updatedAt: new Date(newPost.updated_at)
      };
      setPosts(prev => [postWithDates, ...prev]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpdatePost = async (postData) => {
    if (!editingPost) return;

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: postData.title,
          content: postData.content,
          imageUrl: postData.imageUrl
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await response.json();
      // Convert string dates to Date objects
      const postWithDates = {
        ...updatedPost,
        createdAt: new Date(editingPost.createdAt),
        updatedAt: new Date(updatedPost.updated_at)
      };

      setPosts(prev => prev.map(post =>
        post.id === editingPost.id ? postWithDates : post
      ));
      setEditingPost(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">Loading posts...</div>
          </div>
        ) : filteredPosts.length === 0 ? (
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