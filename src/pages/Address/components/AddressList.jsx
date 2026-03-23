import { useState } from 'react';
import AddressFormDialog from './AddressFormDialog';
import AddressCard from './AddressCard';
import { Button } from '@/components/ui/button';
import {
  createAddress,
  deleteAddress,
  editAddress,
} from '@/Store/features/address/address.slice';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { MapPin, Plus } from 'lucide-react';

export default function AddressList({ addresses }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [mode, setMode] = useState('add');
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setMode('edit');
    setOpen(true);
  };

  const handleAddAddress = () => {
    setSelectedAddress(null);
    setMode('add');
    setOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      const action =
        mode === 'edit'
          ? dispatch(editAddress({ id: selectedAddress._id, data })).unwrap()
          : dispatch(createAddress(data)).unwrap();

      const result = await toast
        .promise(action, {
          loading: mode === 'edit' ? 'Updating address...' : 'Adding address...',
          success: (res) =>
            res?.msg ||
            (mode === 'edit'
              ? 'Address updated successfully!'
              : 'Address added successfully!'),
          error: (err) =>
            err?.message ||
            (mode === 'edit'
              ? 'Failed to update address'
              : 'Failed to add address'),
        })
        .unwrap();

      if (result) {
        setOpen(false);
        setMode('add');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      {/* Page Header */}
      <div className="mb-10 text-center">
        <h1
          className="text-4xl font-black tracking-widest uppercase mb-2"
          style={{ color: '#d7fb00' }}
        >
          Addresses
        </h1>
        <div
          className="h-0.5 w-16 mx-auto rounded-full"
          style={{ background: '#d7fb00' }}
        />
        <p className="text-gray-400 text-sm mt-3">
          Manage your saved delivery addresses
        </p>
      </div>

      {/* Add Button */}
      <div className="flex justify-center mb-10">
        <Button
          onClick={handleAddAddress}
          className="flex items-center gap-2 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: '#d7fb00',
            color: '#000',
            border: 'none',
            boxShadow: '0 4px 20px rgba(215,251,0,0.35)',
          }}
        >
          <Plus size={15} />
          Add New Address
        </Button>
      </div>

      {/* Address Cards */}
      {addresses?.length > 0 ? (
        <div className="grid gap-5 grid-cols-1">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onEdit={() => handleEdit(address)}
              onDelete={() => dispatch(deleteAddress(address._id))}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          className="flex flex-col items-center justify-center py-20 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px dashed rgba(215,251,0,0.2)',
          }}
        >
          <div
            className="p-5 rounded-full mb-4"
            style={{ background: 'rgba(215,251,0,0.08)' }}
          >
            <MapPin size={32} style={{ color: '#d7fb00', opacity: 0.6 }} />
          </div>
          <p className="text-gray-400 text-sm font-medium">No addresses saved yet</p>
          <p className="text-gray-600 text-xs mt-1">Add your first delivery address above</p>
        </div>
      )}

      <AddressFormDialog
        open={open}
        setOpen={setOpen}
        onSubmit={handleSubmit}
        mode={mode}
        setMode={setMode}
        editData={selectedAddress}
      />
    </div>
  );
}
