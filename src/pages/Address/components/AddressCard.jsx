import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';

export default function AddressCard({ address, onEdit, onDelete }) {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="p-6 border rounded-md bg-gray-50">
      {address?.isDefault && <p className="mb-2 font-semibold">Default</p>}
      <p>
        {user?.firstName} {user?.lastName}
      </p>
      <p>{address?.company}</p>
      <p>{address?.address1}</p>
      <p>{address?.address2}</p>
      <p>
        {address?.city} {address?.postalCode}
      </p>
      <p>{address?.country}</p>

      <div className="flex gap-3 mt-4">
        <Button
          size="lg"
          onClick={() => onEdit(address)}
          className="bg-brand text-black hover:bg-transparent border uppercase rounded-none border-brand hover:border-black transition-all duration-300"
        >
          Edit
        </Button>

        <Button
          size="lg"
          onClick={() => onDelete(address?._id)}
          className="bg-brand text-black hover:bg-transparent border uppercase rounded-none border-brand hover:border-black transition-all duration-300"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
