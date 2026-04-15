import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import { categoryOptions, inputClass } from '../constants';
import { updateProduct } from '../../../Store/features/product/product.slice';

const EditProductDialog = ({ product, onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    existingImages: [],
    images: [],
  });
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);

  // Initialize form when dialog opens
  useEffect(() => {
    if (open && product) {
      setFormData({
        name: product.name || '',
        brand: product.brand || '',
        category: product.category || '',
        price: product.price || '',
        stock: product.stock !== undefined ? product.stock : '',
        description: product.description || '',
        existingImages: product.images || [],
        images: [],
      });
    }
  }, [open, product]);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const totalImages = formData.existingImages.length + formData.images.length + droppedFiles.length;
      if (totalImages > 4) {
        toast.error('You can only have up to 4 images total');
        return;
      }
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...droppedFiles] }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      const totalImages = formData.existingImages.length + formData.images.length + newFiles.length;
      if (totalImages > 4) {
        toast.error('You can only have up to 4 images total');
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...newFiles] }));
    }
  };

  const removeExistingImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.filter((_, i) => i !== index),
    }));
  };

  const removeNewImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateProduct = async () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.description
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    const totalImages = formData.existingImages.length + formData.images.length;
    if (totalImages === 0) {
      toast.error('Please add or keep at least one image');
      return;
    }
    if (totalImages > 4) {
      toast.error('Maximum 4 images allowed');
      return;
    }

    try {
      const productData = new FormData();
      productData.append('name', formData.name);
      productData.append('price', Number(formData.price));
      productData.append('category', formData.category);
      productData.append('description', formData.description);

      if (formData.brand) productData.append('brand', formData.brand);
      if (formData.stock !== '') productData.append('stock', Number(formData.stock));

      productData.append('existingImages', JSON.stringify(formData.existingImages));

      formData.images.forEach((img) => {
        productData.append('images', img);
      });

      await dispatch(updateProduct({ id: product._id, productData })).unwrap();

      toast.success('Product updated successfully');
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err || 'Failed to update product');
    }
  };

  const currentTotalImages = formData.existingImages.length + formData.images.length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="p-1.5 rounded-md text-zinc-500 hover:text-lime-400 hover:bg-lime-400/10 transition-colors"
          title="Edit Details"
        >
          <ADMIN_ICONS.EDIT className="h-4 w-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Product</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Update the details for {product?.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* Name */}
          <div className="space-y-2">
            <Label className="text-zinc-300">
              Name <span className="text-red-400">*</span>
            </Label>
            <Input
              placeholder="e.g. Premium Whey Protein"
              value={formData.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Brand + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-zinc-300">Brand</Label>
              <Input
                placeholder="e.g. Optimum Nutrition"
                value={formData.brand}
                onChange={(e) => handleFormChange('brand', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">
                Category <span className="text-red-400">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(v) => handleFormChange('category', v)}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-300 focus:ring-lime-400/30 focus:border-lime-400/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                  {categoryOptions.map((cat) => (
                    <SelectItem key={cat} value={cat} className="capitalize">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-zinc-300">
                Price (₹) <span className="text-red-400">*</span>
              </Label>
              <Input
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleFormChange('price', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Stock</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={(e) => handleFormChange('stock', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-zinc-300">
              Description <span className="text-red-400">*</span>
            </Label>
            <Textarea
              placeholder="Product description... "
              rows={3}
              value={formData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              className={cn(inputClass, 'min-h-[80px]')}
            />
          </div>

          {/* Image Upload Drag & Drop */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-zinc-300">
                Images <span className="text-red-400">*</span>
              </Label>
              <span className="text-xs text-zinc-500">{currentTotalImages}/4</span>
            </div>
            
            {currentTotalImages < 4 && (
              <div
                className={cn(
                  'border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors',
                  dragActive
                    ? 'border-lime-400 bg-lime-400/5'
                    : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900'
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <ADMIN_ICONS.IMAGEPLUS className="h-6 w-6 text-zinc-500 mb-2" />
                <p className="text-xs font-medium text-zinc-300">
                  Click or drag new images here
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            )}

            {/* Existing and New Image Previews */}
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.existingImages.map((img, index) => (
                <div
                  key={'existing-' + index}
                  className="relative rounded-lg overflow-hidden border border-zinc-700 h-20 w-20 group"
                  title="Existing Image"
                >
                  <img
                    src={img.url}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ADMIN_ICONS.X className="h-3 w-3" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-zinc-800 text-zinc-300 text-[10px] font-bold text-center py-0.5">
                      Saved
                    </div>
                  )}
                </div>
              ))}
              {formData.images.map((img, index) => (
                <div
                  key={'new-' + index}
                  className="relative rounded-lg overflow-hidden border border-lime-500/50 h-20 w-20 group"
                  title="New Image"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={() => removeNewImage(index)}
                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ADMIN_ICONS.X className="h-3 w-3" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-lime-400 text-zinc-900 text-[10px] font-bold text-center py-0.5">
                    New
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateProduct}
            disabled={loading || currentTotalImages === 0}
            className="bg-lime-400 hover:bg-lime-300 text-zinc-900 font-semibold gap-2"
          >
            {loading ? (
              <ADMIN_ICONS.LOADER2 className="h-4 w-4 animate-spin" />
            ) : (
              <ADMIN_ICONS.CHECKCIRCLE2 className="h-4 w-4" />
            )}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
