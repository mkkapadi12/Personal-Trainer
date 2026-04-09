import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { commentSchema } from './commentSchema';
import { toast } from 'sonner';
import { addComment } from '@/Store/features/comments/comment.slice';
import { useDispatch } from 'react-redux';
import { PAGE_ICONS } from '@/lib/icons/page.icons';

export default function CommentForm({ id }) {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: '',
      articleId: id,
    },
  });

  const onSubmit = async (data) => {
    try {
      toast.loading('Adding Comment...');

      const result = await dispatch(
        addComment({ comment: data.comment, articleId: id }),
      ).unwrap();

      toast.dismiss();
      toast.success(result?.msg || 'Comment added successfully!');
      form.reset();
    } catch (error) {
      toast.dismiss();
      toast.error(error || 'Comment failed');
    }
  };

  return (
    <div className="relative overflow-hidden bg-white/3 rounded-xl p-5 sm:p-6 border border-white/6">
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#d7fb00] rounded-full blur-[80px] opacity-[0.03] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-5">
        <div className="p-2 bg-[#d7fb00]/10 rounded-lg border border-[#d7fb00]/15">
          <PAGE_ICONS.MESSAGE className="w-4 h-4 text-[#d7fb00]" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-[-0.01em]">
          Leave a Comment
        </h3>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative z-10 space-y-4"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts about this article..."
                    rows={4}
                    {...field}
                    className="min-h-[120px] rounded-lg border-white/8 bg-white/3 text-white text-[14px] leading-relaxed placeholder:text-gray-600 p-4 focus:bg-white/5 focus:ring-2 focus:ring-[#d7fb00]/20 focus:border-[#d7fb00]/40 transition-all duration-300 resize-none"
                  />
                </FormControl>
                <FormMessage className="text-red-400 text-[13px] font-medium ml-1" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#d7fb00] text-black hover:bg-[#e4ff5a] rounded-lg py-2.5 font-bold text-[13px] tracking-[0.05em] uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(215,251,0,0.2)] hover:shadow-[0_8px_24px_rgba(215,251,0,0.3)] active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              <PAGE_ICONS.MESSAGE className="w-4 h-4" />
              Post Comment
            </span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
