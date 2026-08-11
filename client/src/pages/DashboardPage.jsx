import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import {
  Plus,
  Search,
  Filter,
  AlertTriangle,
  RefreshCw,
  PackageCheck,
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error loading products:', err);
      setApiError(err.response?.data?.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (product) => {
    setModalMode('view');
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (formData) => {
    setApiError(null);
    try {
      if (modalMode === 'create') {
        const res = await axios.post('/api/products', formData);
        setProducts((prev) => [res.data, ...prev]);
      } else if (modalMode === 'edit' && selectedProduct) {
        const res = await axios.put(`/api/products/${selectedProduct._id}`, formData);
        setProducts((prev) =>
          prev.map((p) => (p._id === selectedProduct._id ? res.data : p))
        );
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Save product error:', err);
      setApiError(err.response?.data?.message || 'Failed to save product.');
    }
  };

  const handleDeleteProduct = async (productOrId) => {
    const productId = typeof productOrId === 'object' ? productOrId._id : productOrId;
    const productName = typeof productOrId === 'object' ? productOrId.name : 'this product';

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete "${productName}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48', // Rose 600
      cancelButtonColor: '#64748b',  // Slate 500
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-3xl shadow-2xl border border-slate-100 font-sans',
        confirmButton: 'px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-md',
        cancelButton: 'px-5 py-2.5 rounded-2xl text-sm font-semibold',
      },
    });

    if (result.isConfirmed) {
      setApiError(null);
      try {
        await axios.delete(`/api/products/${productId}`);
        setProducts((prev) => prev.filter((p) => p._id !== productId));
        
        Swal.fire({
          title: 'Deleted!',
          text: `"${productName}" has been removed from inventory.`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-3xl shadow-2xl border border-slate-100 font-sans',
          },
        });
      } catch (err) {
        console.error('Delete product error:', err);
        const msg = err.response?.data?.message || 'Failed to delete product.';
        setApiError(msg);

        Swal.fire({
          title: 'Delete Failed',
          text: msg,
          icon: 'error',
          confirmButtonColor: '#0f172a',
          customClass: {
            popup: 'rounded-3xl shadow-2xl border border-slate-100 font-sans',
          },
        });
      }
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const isAdmin = user?.role === 'Admin';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      
      {/* Soft background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[-10%] w-[35rem] h-[35rem] bg-violet-100/30 rounded-full blur-[100px] pointer-events-none -z-10" />

      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 z-10">
        
        {apiError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-between text-rose-600 text-sm font-medium shadow-sm">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0" />
              <span>{apiError}</span>
            </div>
            <button
              onClick={() => setApiError(null)}
              className="text-rose-400 hover:text-rose-700 underline ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6" data-aos="fade-up">
          <div className="space-y-2">
            <h1 className="text-3xl font-light text-slate-900 tracking-tight">Inventory</h1>
            <p className="text-sm text-slate-500 font-light max-w-md">
              {isAdmin
                ? 'Manage your product catalog. Add, edit, or remove items.'
                : 'Browse the product catalog. Contact an admin for changes.'}
            </p>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              onClick={fetchProducts}
              className="p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-slate-200 shadow-sm hover:bg-white text-slate-500 hover:text-slate-900 transition-all"
              title="Refresh Products"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-500' : ''}`} />
            </button>

            {isAdmin && (
              <button
                onClick={handleOpenCreateModal}
                className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters (Glassmorphism) */}
        <div className="glass-panel p-2 rounded-3xl flex flex-col sm:flex-row gap-2" data-aos="fade-up" data-aos-delay="100">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent border-none rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <div className="w-px bg-slate-200 hidden sm:block mx-1 my-2"></div>

          <div className="relative sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
              <Filter className="w-4 h-4" />
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-transparent border-none rounded-2xl pl-11 pr-10 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-400 font-light">Loading catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4" data-aos="fade-in">
            <div className="w-16 h-16 rounded-full bg-white/60 flex items-center justify-center shadow-sm border border-slate-100">
              <PackageCheck className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-700">No products found</h3>
            <p className="text-sm text-slate-500 font-light max-w-sm text-center">
              {isAdmin
                ? 'Your catalog is empty. Click "Add Product" to get started.'
                : 'No products match your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                userRole={user.role}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteProduct}
                onViewDetails={handleOpenViewModal}
              />
            ))}
          </div>
        )}
      </main>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
        mode={modalMode}
        onSwitchToEdit={isAdmin ? handleOpenEditModal : null}
      />
    </div>
  );
};

export default DashboardPage;
