import React, { useState, useEffect } from 'react';
import { X, Save, Package, DollarSign, Tag, Layers, Calendar, Barcode, FileText, Edit3, ShieldAlert, Sparkles } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, onSave, product, mode = 'create', onSwitchToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: '',
    category: 'Electronics',
    description: '',
    image: '',
    variant: 'Standard',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product && (mode === 'edit' || mode === 'view')) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        price: product.price !== undefined ? product.price : '',
        category: product.category || 'Electronics',
        description: product.description || '',
        image: product.image || '',
        variant: product.variant || 'Standard',
      });
    } else {
      setFormData({
        name: '',
        sku: '',
        price: '',
        category: 'Electronics',
        description: '',
        image: '',
        variant: 'Standard',
      });
    }
    setErrors({});
  }, [product, mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product Name is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    if (formData.price === '' || isNaN(formData.price) || Number(formData.price) < 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.category.trim()) newErrors.category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  // Dedicated Rich Glassmorphic Product Detail View Mode
  if (mode === 'view' && product) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md overflow-y-auto transition-opacity duration-200">
        <div className="relative w-full max-w-3xl bg-white/90 backdrop-blur-2xl border border-white/80 rounded-3xl shadow-2xl overflow-hidden my-8 transition-all transform scale-100">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200/60 bg-white/60">
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                Product Details
              </span>
              <span className="text-xs font-mono font-medium text-slate-400">SKU: {product.sku}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
            
            {/* Top Grid: Hero Image & Main Overview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Product Image */}
              <div className="md:col-span-5 relative group">
                <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md relative">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-40" />
                </div>
              </div>

              {/* Product Key Info */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full text-xs text-indigo-600 font-semibold mb-3">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{product.category}</span>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                    {product.name}
                  </h2>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-baseline justify-between shadow-lg shadow-slate-900/10">
                  <span className="text-xs uppercase font-semibold tracking-wider text-slate-400">Unit Price</span>
                  <span className="text-3xl font-light tracking-tight">
                    ${Number(product.price).toFixed(2)}
                  </span>
                </div>

                {/* Quick Specs Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/70 shadow-sm space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                      <Barcode className="w-3.5 h-3.5 text-indigo-500" />
                      <span>SKU Code</span>
                    </div>
                    <p className="font-mono text-sm font-bold text-slate-800">{product.sku}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/70 border border-slate-200/70 shadow-sm space-y-1">
                    <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                      <Layers className="w-3.5 h-3.5 text-violet-500" />
                      <span>Variant</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 truncate">{product.variant || 'Standard'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="p-6 rounded-3xl bg-white/60 border border-slate-200/60 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                <span>Description & Overview</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-light whitespace-pre-line">
                {product.description || 'No description provided for this product.'}
              </p>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="px-8 py-5 border-t border-slate-200/60 bg-white/60 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {product.createdAt ? `Added on ${new Date(product.createdAt).toLocaleDateString()}` : ''}
            </span>

            <div className="flex items-center space-x-3">
              {onSwitchToEdit && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSwitchToEdit(product);
                  }}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Product</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Create & Edit Form Modal
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md overflow-y-auto transition-opacity duration-200">
      <div className="relative w-full max-w-2xl bg-white/90 backdrop-blur-2xl border border-white/80 rounded-3xl shadow-2xl overflow-hidden my-8 transition-all transform scale-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200/50 bg-white/50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100/50">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-medium text-slate-800">
                {mode === 'create' ? 'New Product' : 'Edit Specifications'}
              </h2>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                {mode === 'create' ? 'Add an item to your inventory catalog' : 'Modify existing specifications'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            
            {/* Product Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Minimalist Desk Lamp"
                className={`w-full bg-white/50 border ${
                  errors.name ? 'border-rose-300 focus:ring-rose-500/20' : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/10'
                } rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all`}
              />
              {errors.name && <p className="mt-1.5 text-[11px] text-rose-500 ml-1">{errors.name}</p>}
            </div>

            {/* SKU */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">
                SKU Code <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g. LAMP-01-WHT"
                className={`w-full bg-white/50 border ${
                  errors.sku ? 'border-rose-300 focus:ring-rose-500/20' : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/10'
                } rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 uppercase focus:outline-none focus:ring-4 transition-all`}
              />
              {errors.sku && <p className="mt-1.5 text-[11px] text-rose-500 ml-1">{errors.sku}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">
                Price <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <DollarSign className="w-4 h-4" />
                </span>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="89.99"
                  className={`w-full bg-white/50 border ${
                    errors.price ? 'border-rose-300 focus:ring-rose-500/20' : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/10'
                  } rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all`}
                />
              </div>
              {errors.price && <p className="mt-1.5 text-[11px] text-rose-500 ml-1">{errors.price}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white/50 border border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/10 rounded-2xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-4 transition-all appearance-none cursor-pointer"
              >
                <option value="Electronics">Electronics</option>
                <option value="Audio">Audio</option>
                <option value="Monitors">Monitors</option>
                <option value="Accessories">Accessories</option>
                <option value="Wearables">Wearables</option>
                <option value="Home">Home</option>
              </select>
            </div>

            {/* Variant */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">
                Variant
              </label>
              <input
                type="text"
                name="variant"
                value={formData.variant}
                onChange={handleChange}
                placeholder="e.g. Matte White"
                className="w-full bg-white/50 border border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/10 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all"
              />
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-white/50 border border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/10 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a brief description..."
                className="w-full bg-white/50 border border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/10 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 transition-all resize-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-slate-200/50 flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl transition-all shadow-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-2xl shadow-xl shadow-slate-900/10 transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{mode === 'create' ? 'Create Product' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
