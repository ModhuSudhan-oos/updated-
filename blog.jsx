import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import BlogPost from '../components/blog/BlogPost';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'blog_posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setPosts(postsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-12">Loading posts...</div>;

  return (
    <div className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent 
          bg-gradient-to-r from-purple-600 to-pink-600">
          Our Latest Insights
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {posts.map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BlogPost post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
