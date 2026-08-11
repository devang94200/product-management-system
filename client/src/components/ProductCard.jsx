import React from 'react';
import { Tag, Edit3, Trash2, ShieldAlert, Eye, DollarSign, Layers } from 'lucide-react';

const ProductCard = ({ product, userRole, onEdit, onDelete, onViewDetails }) => {
  const isAdmin = userRole === 'Admin';

  return (
    <div className="glass-card rounded-3xl overflow-hidden flex flex-col group relative" data-aos="fade-up">
      
      {/* Product Image Container */}
      <div className="relative h-56 overflow-hidden bg-slate-100 p-2">
        <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-sm border border-black/5">
          <img
            src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
        </div>
        
        {/* Category Pill */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center space-x-1 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-white/90 text-slate-800 backdrop-blur-md shadow-sm border border-white">
            <span>{product.category}</span>
          </span>
        </div>

        {/* SKU Badge */}
        <div className="absolute top-4 right-4">
          <span className="text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-xl bg-slate-900/80 text-white backdrop-blur-md">
            {product.sku}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div>
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-semibold text-lg text-slate-900 leading-tight line-clamp-2">
              {product.name}
            </h3>
            <span className="text-xl font-light text-slate-900 tracking-tight shrink-0">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <div className="mt-3 flex items-center space-x-2 text-xs text-slate-500">
            <Layers className="w-3.5 h-3.5" />
            <span>Variant: <strong className="text-slate-700 font-medium">{product.variant || 'Standard'}</strong></span>
          </div>
        </div>

        {/* Action Buttons & Permissions */}
        <div className="pt-4 border-t border-slate-200/50 flex items-center justify-between">
          <button
            onClick={() => onViewDetails(product)}
            className="flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white/50 hover:bg-white px-4 py-2 rounded-xl border border-slate-200/80 transition-all shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          {isAdmin ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(product)}
                className="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-indigo-600 bg-white/50 hover:bg-white rounded-xl border border-slate-200/80 transition-all shadow-sm"
                title="Edit Product"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDelete(product)}
                className="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-rose-600 bg-white/50 hover:bg-white rounded-xl border border-slate-200/80 transition-all shadow-sm"
                title="Delete Product"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-slate-400">
              <ShieldAlert className="w-3 h-3" />
              <span>Read Only</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
