import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const ToolCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'tool_categories');
        const snapshot = await getDocs(categoriesRef);
        const categoriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ];

  if (loading) return <div className="text-center py-12">Loading categories...</div>;

  return (
    <div className="py-16 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">100+ Powerful Tools</h2>
        <p className="text-center text-gray-600 mb-12">
          Explore our wide range of AI-powered solutions
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="overflow-hidden rounded-lg shadow-lg"
            >
              <div className={`${colors[index % colors.length]} p-6 text-white text-center`}>
                <div className="text-2xl mb-2">⚡️</div>
                <h3 className="font-bold">{category.name}</h3>
              </div>
              <div className="bg-white p-4">
                <p className="text-gray-600 text-sm">
                  {category.count}+ tools
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolCategories;
