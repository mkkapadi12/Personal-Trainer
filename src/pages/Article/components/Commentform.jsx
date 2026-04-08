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
    <div className="relative overflow-hidden bg-white rounded-[2rem] p-6 md:p-10 border border-gray-100/80">
      <div className="relative z-10 flex items-center gap-4 mb-8">
        <div className="p-2.5 bg-[#c7f000]/20 rounded-2xl border border-[#c7f000]/30 shadow-sm">
          <PAGE_ICONS.MESSAGE className="w-5 h-5 text-[#8ba600]" />
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
          Leave a Comment
        </h3>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative z-10 space-y-7"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts about this article..."
                    rows={5}
                    {...field}
                    className="min-h-[140px] rounded-2xl border-gray-200 bg-gray-50/80 p-5 text-base focus:bg-white focus:ring-4 focus:ring-[#c7f000]/30 focus:border-[#c7f000] transition-all duration-300 resize-none shadow-inner"
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-medium ml-2" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full hover:text-white cursor-pointer relative overflow-hidden bg-[#c7f000] text-black rounded-xl py-5 font-bold text-lg tracking-wider uppercase"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Post Comment
            </span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
