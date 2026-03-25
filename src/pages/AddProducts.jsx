import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from './product.schema';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Package,
  Tag,
  DollarSign,
  FileText,
  Image,
  Layers,
  Archive,
  Plus,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const fieldConfig = [
  {
    name: 'name',
    label: 'Product Name',
    type: 'text',
    placeholder: 'e.g. Whey Protein 2kg',
    icon: Package,
    span: 1,
  },
  {
    name: 'brand',
    label: 'Brand',
    type: 'text',
    placeholder: 'e.g. Optimum Nutrition',
    icon: Tag,
    span: 1,
  },
  {
    name: 'price',
    label: 'Price (₹)',
    type: 'number',
    placeholder: '0',
    icon: DollarSign,
    span: 1,
  },
  {
    name: 'stock',
    label: 'Stock',
    type: 'number',
    placeholder: '0',
    icon: Archive,
    span: 1,
  },
  {
    name: 'category',
    label: 'Category',
    type: 'text',
    placeholder: 'e.g. Supplements',
    icon: Layers,
    span: 1,
  },
  {
    name: 'mainImage',
    label: 'Main Image URL',
    type: 'text',
    placeholder: 'https://...',
    icon: Image,
    span: 1,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'text',
    placeholder: 'Short product description...',
    icon: FileText,
    span: 2,
  },
];

const AddProducts = () => {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      brand: '',
      price: '',
      description: '',
      mainImage: '',
      category: '',
      stock: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/products/add-product',
        data,
      );
      toast.success(response.data.msg);
      form.reset();
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Something went wrong');
      form.reset();
    }
  };

  return (
    <div className="min-h-screen bg-black py-14 md:py-20 px-4">
      {/* ── Page Header ── */}
      <div className="max-w-4xl mx-auto mb-10">
        <p className="text-xs font-semibold tracking-[0.25em] text-[#d7fb00] uppercase mb-2">
          Admin Panel
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          Add New <span className="text-[#d7fb00]">Product</span>
        </h1>
        <p className="mt-3 text-zinc-400 text-sm">
          Fill in the details below to list a new product in the store.
        </p>
        <div className="mt-6 h-px w-full bg-linear-to-r from-[#d7fb00]/60 via-zinc-700 to-transparent" />
      </div>

      {/* ── Form Card ── */}
      <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm shadow-2xl p-6 md:p-10">
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fieldConfig.map(
              ({ name, label, type, placeholder, icon: Icon, span }) => {
                const registerOpts =
                  name === 'price'
                    ? { setValueAs: (v) => (v === '' ? 0 : parseInt(v, 10)) }
                    : name === 'stock'
                      ? {
                          setValueAs: (v) =>
                            v === '' ? undefined : parseInt(v, 10),
                        }
                      : {};

                const error = form.formState.errors?.[name]?.message;

                return (
                  <div
                    key={name}
                    className={`flex flex-col gap-1.5 ${span === 2 ? 'md:col-span-2' : ''}`}
                  >
                    <Label
                      htmlFor={name}
                      className="text-xs font-semibold tracking-widest text-zinc-400 uppercase"
                    >
                      {label}
                    </Label>

                    <div className="relative group">
                      {/* Icon */}
                      <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#d7fb00] transition-colors duration-200">
                        <Icon size={16} strokeWidth={1.8} />
                      </span>

                      <Input
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        {...form.register(name, registerOpts)}
                        className="w-full pl-10 pr-4 py-6! rounded-xl text-sm text-white bg-white/5 border border-white/10 placeholder:text-zinc-600 outline-none focus:border-[#d7fb00]/70 focus:ring-2 focus:ring-[#d7fb00]/20 transition-all duration-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-red-400 mt-0.5 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                        {error}
                      </p>
                    )}
                  </div>
                );
              },
            )}
          </div>

          {/* ── Submit ── */}
          <div className="mt-10">
            <div className="h-px w-full bg-white/10 mb-8" />
            <button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 bg-[#d7fb00] hover:bg-[#c8ee00] active:scale-[0.98] text-black font-bold text-sm tracking-widest uppercase py-4 rounded-xl shadow-[0_0_24px_rgba(215,251,0,0.25)] hover:shadow-[0_0_36px_rgba(215,251,0,0.4)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {form.formState.isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Adding…
                </>
              ) : (
                <>
                  <Plus size={17} strokeWidth={2.5} />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
