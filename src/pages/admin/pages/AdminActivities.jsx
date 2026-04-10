import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecentActivity } from '@/Store/features/activity/activity.slice';
import { cn, timeAgo } from '@/lib/utils';
import { actionLabel, iconMap, inputClass } from '../constants';
import { ADMIN_ICONS } from '@/lib/icons/admin.icons';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const AdminActivities = () => {
  const dispatch = useDispatch();
  const { recentActivity, loading, error } = useSelector(
    (state) => state.activity,
  );

  //Local State
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [activityType, setActivityType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    dispatch(fetchRecentActivity({ limit }));
  }, [dispatch, limit]);

  const filteredActivities = useMemo(() => {
    let result = [...(recentActivity || [])];

    // Filter by type
    if (activityType !== 'all') {
      result = result.filter((item) => item.type === activityType);
    }

    // Filter by search term
    if (searchTerm) {
      const lowerQuery = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.userName?.toLowerCase().includes(lowerQuery) ||
          item.detail?.toLowerCase().includes(lowerQuery) ||
          actionLabel[item.type]?.toLowerCase().includes(lowerQuery),
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [recentActivity, activityType, searchTerm, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          System Activity Log
        </h1>
        <p className="text-zinc-400 mt-1">
          Track all recent actions and events across the platform
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-zinc-900 border border-zinc-800/60 rounded-xl overflow-hidden shadow-sm">
        {/* Controls / Filter header */}
        <div className="p-5 border-b border-zinc-800/60 bg-zinc-900/50 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <ADMIN_ICONS.SEARCH className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search users, actions, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none ${inputClass}`}
            />
          </div>

          {/* Filters */}

          <div className="flex items-center gap-2.5">
            {/* Filter by Type */}
            <div className="relative flex items-center">
              <Select
                value={activityType}
                onValueChange={(val) => setActivityType(val)}
              >
                <SelectTrigger
                  className={cn(
                    'min-w-[200px] h-9',
                    'bg-zinc-900 border-zinc-800 text-zinc-300',
                    'focus:ring-lime-400/30 focus:border-lime-400/50',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <ADMIN_ICONS.FILTER className="h-3.5 w-3.5 text-zinc-500" />
                    <SelectValue placeholder="All Types" />
                  </div>{' '}
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="purchased">Purchased</SelectItem>
                  <SelectItem value="signed up">Signed Up</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort Order */}
            <div className="relative flex items-center">
              <Select value={sortBy} onValueChange={(val) => setSortBy(val)}>
                <SelectTrigger
                  className={cn(
                    'min-w-[200px] h-9',
                    'bg-zinc-900 border-zinc-800 text-zinc-300',
                    'focus:ring-lime-400/30 focus:border-lime-400/50',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <ADMIN_ICONS.ARROWUPDOWN className="h-3.5 w-3.5 text-zinc-500" />
                    <SelectValue placeholder="Newest First" />
                  </div>{' '}
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200">
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="p-5 border-b border-zinc-800/60 flex items-center justify-between bg-zinc-900">
          <h3 className="text-sm font-semibold text-white">Activities</h3>
          <span className="text-xs font-semibold px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md tabular-nums">
            Showing {filteredActivities.length}{' '}
            {filteredActivities.length === 1 ? 'activity' : 'activities'}
          </span>
        </div>

        <div className="p-0">
          {loading && recentActivity.length === 0 && (
            <div className="space-y-1 px-6 py-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-16 w-full bg-white/5 rounded-md"
                />
              ))}
            </div>
          )}

          {error && (
            <p className="px-6 py-4 text-red-500 text-sm bg-red-500/10 border-b border-red-500/20">
              {error}
            </p>
          )}

          {!loading && !error && filteredActivities.length === 0 && (
            <div className="px-6 py-16 text-center">
              <ADMIN_ICONS.ACTIVITY className="mx-auto h-12 w-12 text-zinc-700 mb-3" />
              <p className="text-zinc-400 text-sm font-medium">
                No activities found.
              </p>
              <p className="text-zinc-500 text-xs mt-1">
                Try adjusting your search or filter settings.
              </p>
            </div>
          )}

          <div className="divide-y divide-zinc-800/40">
            {filteredActivities.map((item) => {
              const { icon: Icon, color } =
                iconMap[item.type] || iconMap.purchased;
              return (
                <div
                  key={item.id}
                  className="flex items-start sm:items-center gap-4 px-6 py-4 hover:bg-zinc-800/30 transition-colors group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center shrink-0 group-hover:border-zinc-600 transition-colors`}
                  >
                    <Icon size={18} className={color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-300">
                      <span className="font-semibold text-white">
                        {item.userName}
                      </span>{' '}
                      <span className="text-zinc-400">
                        {actionLabel[item.type]}
                      </span>{' '}
                      <span className="text-zinc-200 font-medium">
                        {item.detail}
                      </span>
                    </p>
                    <p className="text-xs text-zinc-500 mt-1.5 sm:hidden flex items-center gap-1">
                      <ADMIN_ICONS.CLOCK size={10} /> {timeAgo(item.createdAt)}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 whitespace-nowrap bg-zinc-800/50 px-2.5 py-1 rounded-md">
                    <ADMIN_ICONS.CLOCK size={12} />
                    {new Date(item.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {!loading &&
            filteredActivities.length > 0 &&
            limit <= recentActivity.length && (
              <div className="p-4 border-t border-zinc-800/60 text-center bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors">
                <button
                  onClick={() => setLimit((prev) => prev + 50)}
                  className="text-sm text-lime-400 hover:text-lime-300 font-medium transition-colors w-full py-2"
                  disabled={loading}
                >
                  {loading
                    ? 'Loading more activities...'
                    : 'Load More Activities'}
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminActivities;
