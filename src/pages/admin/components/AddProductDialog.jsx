import React, { useState, useRef } from 'react';
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

import { categoryOptions, emptyForm, inputClass } from '../constants';
import { addProduct } from '../../../Store/features/product/product.slice';

const AddProductDialog = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ ...emptyForm, images: [] });
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);

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
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...droppedFiles],
      }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }));
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddProduct = async () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.description
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    if (formData.images.length === 0) {
      toast.error('Please add at least one image');
      return;
    }

    try {
      const productData = new FormData();
      productData.append('name', formData.name);
      productData.append('price', Number(formData.price));
      productData.append('category', formData.category);
      productData.append('description', formData.description);

      if (formData.brand) productData.append('brand', formData.brand);
      if (formData.stock)
        productData.append('stock', Number(formData.stock) || 0);

      formData.images.forEach((img) => {
        productData.append('images', img);
      });

      console.log('productData:', productData);

      await dispatch(addProduct(productData)).unwrap();

      toast.success('Product created successfully');
      setFormData({ ...emptyForm, images: [] });
      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err || 'Failed to create product');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-lime-400 hover:bg-lime-300 text-zinc-900 font-semibold gap-2 h-9">
          <ADMIN_ICONS.PLUS className="h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">Add New Product</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Fill in the details to add a new product to your store.
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
              value={formData.name || ''}
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
                value={formData.brand || ''}
                onChange={(e) => handleFormChange('brand', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">
                Category <span className="text-red-400">*</span>
              </Label>
              <Select
                value={formData.category || ''}
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
                value={formData.price || ''}
                onChange={(e) => handleFormChange('price', e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Stock</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.stock || ''}
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
              placeholder="Product description..."
              rows={3}
              value={formData.description || ''}
              onChange={(e) => handleFormChange('description', e.target.value)}
              className={cn(inputClass, 'min-h-[80px]')}
            />
          </div>

          {/* Image Upload Drag & Drop */}
          <div className="space-y-2">
            <Label className="text-zinc-300">
              Images <span className="text-red-400">*</span>
            </Label>
            <div
              className={cn(
                'border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors',
                dragActive
                  ? 'border-lime-400 bg-lime-400/5'
                  : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900',
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <ADMIN_ICONS.IMAGEPLUS className="h-8 w-8 text-zinc-500 mb-2" />
              <p className="text-sm font-medium text-zinc-300">
                Click or drag images here
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Upload up to 4 images (PNG, JPG)
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

            {/* Image Previews */}
            {formData.images?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden border border-zinc-800 h-20 w-20 group"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ADMIN_ICONS.X className="h-3 w-3" />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-lime-400 text-zinc-900 text-[10px] font-bold text-center py-0.5">
                        Main
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
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
            onClick={handleAddProduct}
            disabled={loading}
            className="bg-lime-400 hover:bg-lime-300 text-zinc-900 font-semibold gap-2"
          >
            {loading ? (
              <ADMIN_ICONS.LOADER2 className="h-4 w-4 animate-spin" />
            ) : (
              <ADMIN_ICONS.PLUS className="h-4 w-4" />
            )}
            Create Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
