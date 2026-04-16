import { toast } from 'sonner';
import { updateOrderStatus } from '@/Store/features/orders/order.slice';
import { useDispatch } from 'react-redux';

const STATUS_FLOW = {
  pending: { next: 'shipped', action: 'Mark Shipped' },
  shipped: { next: 'out_for_delivery', action: 'Mark Out for Delivery' },
  out_for_delivery: { next: 'delivered', action: 'Mark Delivered' },
  delivered: { next: null, action: null },
};

export const useOrderStatus = ({ onStatusUpdate }) => {
  const dispatch = useDispatch();

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await dispatch(
        updateOrderStatus({ id: orderId, status: newStatus }),
      ).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
      onStatusUpdate();
    } catch (err) {
      toast.error(err || 'Failed to update order status');
    }
  };

  const getNextStatus = (currentStatus) => STATUS_FLOW[currentStatus];

  const canCancel = (status) =>
    status !== 'delivered' && status !== 'cancelled';

  return { handleStatusUpdate, getNextStatus, canCancel };
};
