import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { MapPin, Pencil, Trash2, Building2, Phone } from 'lucide-react';

export default function AddressCard({ address, onEdit, onDelete }) {
  const { user } = useSelector((state) => state.user);

  return (
    <div
      className="relative rounded-2xl p-6 transition-all duration-300 group"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = '1px solid rgba(215,251,0,0.2)';
        e.currentTarget.style.boxShadow = '0 4px 30px rgba(215,251,0,0.07)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
      }}
    >
      {/* Default Badge */}
      {address?.isDefault && (
        <span
          className="absolute top-4 right-4 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ background: 'rgba(215,251,0,0.15)', color: '#d7fb00' }}
        >
          Default
        </span>
      )}

      {/* Name + Icon */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="p-2 rounded-full mt-0.5 shrink-0"
          style={{ background: 'rgba(215,251,0,0.08)' }}
        >
          <MapPin size={16} style={{ color: '#d7fb00' }} />
        </div>
        <div>
          <p className="text-white font-semibold text-sm">
            {user?.firstName} {user?.lastName}
          </p>
          {address?.company && (
            <div className="flex items-center gap-1 mt-0.5">
              <Building2 size={11} className="text-gray-500" />
              <p className="text-gray-500 text-xs">{address.company}</p>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div
        className="mb-4"
        style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
      />

      {/* Address Lines */}
      <div className="space-y-1 mb-4">
        {address?.address1 && (
          <p className="text-gray-300 text-sm">{address.address1}</p>
        )}
        {address?.address2 && (
          <p className="text-gray-400 text-sm">{address.address2}</p>
        )}
        <p className="text-gray-300 text-sm">
          {[address?.city, address?.postalCode].filter(Boolean).join(', ')}
        </p>
        {address?.country && (
          <p className="text-gray-400 text-sm">{address.country}</p>
        )}
        {address?.phone && (
          <div className="flex items-center gap-1.5 mt-2">
            <Phone size={12} className="text-gray-500" />
            <p className="text-gray-500 text-xs">{address.phone}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-5">
        <Button
          size="sm"
          onClick={() => onEdit(address)}
          className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: '#d7fb00',
            color: '#000',
            border: 'none',
            boxShadow: '0 3px 12px rgba(215,251,0,0.25)',
          }}
        >
          <Pencil size={12} />
          Edit
        </Button>

        <Button
          size="sm"
          onClick={() => onDelete(address?._id)}
          className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'transparent',
            color: '#ff6b6b',
            border: '1.5px solid rgba(255,107,107,0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,107,107,0.08)';
            e.currentTarget.style.borderColor = '#ff6b6b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,107,107,0.4)';
          }}
        >
          <Trash2 size={12} />
          Delete
        </Button>
      </div>
    </div>
  );
}
