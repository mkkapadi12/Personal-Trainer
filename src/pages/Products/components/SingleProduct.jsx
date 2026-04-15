import React, { useState } from 'react';
import AddToCart from '@/pages/Cart/components/AddToCart';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

const SingleProduct = ({ product }) => {
  const [activeImage, setActiveImage] = useState(
    product?.images.find((img) => img.isPrimary)?.url,
  );
  const [zoomStyle, setZoomStyle] = useState({});
  const images = [...product?.images.map((img) => img.url)];

  // 🔍 Zoom Handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${activeImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  return (
    <section className="py-12">
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT: IMAGE */}
        <div className="space-y-4">
          {/* Main Image */}
          <div
            className="border border-zinc-800 rounded-sm bg-white/5 relative overflow-hidden h-[450px] shadow-sm"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="w-full h-full bg-no-repeat transition-transform duration-200"
              style={zoomStyle.backgroundImage ? zoomStyle : {}}
            >
              {!zoomStyle.backgroundImage && (
                <img
                  src={activeImage}
                  alt="product"
                  className="w-full h-full object-contain p-4 mix-blend-screen"
                />
              )}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 justify-center md:justify-start">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 md:w-20 md:h-20 border rounded-sm overflow-hidden bg-white/5 cursor-pointer transition-all ${
                  activeImage === img
                    ? 'border-[#d7fb00] shadow-[0_0_10px_rgba(215,251,0,0.3)]'
                    : 'border-zinc-800 hover:border-zinc-600'
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-contain p-1 mix-blend-screen"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="space-y-6">
          {/* Back */}
          <button className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#d7fb00] font-medium transition-colors group tracking-wider uppercase">
            <PAGE_ICONS.ARROWLEFT
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />{' '}
            Back to Home
          </button>

          <div>
            {/* Brand */}
            <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest mb-1.5">
              {product?.brand}
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-100">
              {product?.name}
            </h1>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold tabular-nums text-[#d7fb00] drop-shadow-sm">
            ₹{product.price.toLocaleString()} INR
          </div>

          {/* Rating */}
          <div className="flex gap-1 items-center bg-zinc-900 border border-zinc-800 w-fit px-3 py-1.5 rounded-sm">
            <span className="text-xs font-bold text-zinc-300 mr-2">4.8</span>
            {[...Array(5)].map((_, i) => (
              <PAGE_ICONS.STAR
                key={i}
                size={14}
                className="text-[#d7fb00] fill-[#d7fb00]"
              />
            ))}
            <span className="text-xs text-zinc-500 ml-2">(128 reviews)</span>
          </div>

          {/* Description */}
          <div className="prose prose-zinc prose-invert">
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
              {product?.description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 text-sm text-zinc-400 border-y border-zinc-800/60 py-4">
            <button className="flex items-center gap-2 hover:text-zinc-100 transition-colors">
              <PAGE_ICONS.SCISSORS size={16} /> Sizing Guide
            </button>
            <button className="flex items-center gap-2 hover:text-zinc-100 transition-colors">
              <PAGE_ICONS.SHARE2 size={16} /> Share
            </button>
          </div>

          <AddToCart product={product} />
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
