import React, { useState } from 'react';
import { ArrowLeft, Star, Share2, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddToCart from '@/pages/Cart/components/AddToCart';

const SingleProduct = ({ product }) => {
  const [activeImage, setActiveImage] = useState(product?.mainImage);
  const [zoomStyle, setZoomStyle] = useState({});
  const [qty, setQty] = useState(1);
  const images = [...product?.images];

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
        <div>
          {/* Main Image */}
          <div
            className="border relative overflow-hidden h-[450px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="w-full h-full bg-no-repeat"
              style={zoomStyle.backgroundImage ? zoomStyle : {}}
            >
              {!zoomStyle.backgroundImage && (
                <img
                  src={activeImage}
                  alt="product"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 items-center md:justify-evenly justify-center">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`md:w-20 md:h-20 w-16 h-16 border cursor-pointer ${
                  activeImage === img ? 'border-black' : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="space-y-5">
          {/* Back */}
          <button className="flex items-center gap-2 text-sm">
            <ArrowLeft size={16} /> Back to Home
          </button>

          {/* Brand */}
          <p className="text-sm text-gray-500">{product?.brand}</p>

          {/* Title */}
          <h1 className="text-4xl font-bold uppercase">{product?.name}</h1>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {product?.description}
          </p>

          {/* Rating */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="text-black" />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Scissors size={16} /> See Sizing Guide
            </div>
            <div className="flex items-center gap-2">
              <Share2 size={16} /> Share
            </div>
          </div>
          {/* Price */}
          <div className="text-2xl font-bold">
            Rs. {product.price.toLocaleString()} INR
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
