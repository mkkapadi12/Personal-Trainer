import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, UserPlus, Calendar } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchRecentActivity } from '@/Store/features/activity/activity.slice';
import { timeAgo } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { actionLabel, iconMap } from '../constants';

export default function RecentActivity() {
  const dispatch = useDispatch();
  const { recentActivity, loading, error } = useSelector(
    (state) => state.activity,
  );

  useEffect(() => {
    dispatch(fetchRecentActivity({ limit: 5 }));
  }, [dispatch]);

  return (
    <Card className="bg-[#111] border border-white/10 text-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-bold">Recent Activity</CardTitle>
          <p className="text-sm text-gray-400">
            Latest actions on the platform
          </p>
        </div>
        <Link to="/admin/activities">
          <button className="text-sm text-[#faa432] hover:underline font-medium cursor-pointer">
            View All
          </button>
        </Link>
      </CardHeader>

      <CardContent className="p-0">
        {loading && (
          <div className="space-y-1 px-6 pb-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-14 w-full bg-white/5 rounded-md" />
            ))}
          </div>
        )}

        {error && <p className="px-6 py-4 text-red-400 text-sm">{error}</p>}

        {!loading && !error && recentActivity.length === 0 && (
          <p className="px-6 py-4 text-gray-500 text-sm">No recent activity.</p>
        )}

        {!loading &&
          recentActivity.map((item, index) => {
            const { icon: Icon, color } =
              iconMap[item.type] || iconMap.purchased;
            return (
              <div
                key={item.id}
                className={`flex items-center gap-4 px-6 py-4 ${
                  index !== recentActivity.length - 1
                    ? 'border-b border-white/5'
                    : ''
                }`}
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                  <Icon size={16} className={color} />
                </div>

                {/* Text */}
                <p className="text-sm flex-1">
                  <span className="font-semibold text-white">
                    {item.userName}
                  </span>{' '}
                  <span className="text-gray-400">
                    {actionLabel[item.type]}
                  </span>{' '}
                  <span className="text-white">{item.detail}</span>
                </p>

                {/* Time */}
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {timeAgo(item.createdAt)}
                </span>
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
}
