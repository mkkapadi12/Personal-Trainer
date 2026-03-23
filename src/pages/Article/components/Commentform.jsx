import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { commentSchema } from './commentSchema';
import { toast } from 'sonner';
import { addComment } from '@/Store/features/comments/comment.slice';
import { useDispatch } from 'react-redux';

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
      toast.success(result.msg || 'Comment added successfully!');
      form.reset();
    } catch (error) {
      toast.dismiss();
      toast.error(error || 'Comment failed');
    }
  };

  return (
    <div className="border p-4 md:p-8 bg-white">
      <h3 className="text-xl md:text-2xl font-semibold mb-6">Leave a Comment</h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          {/* <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Name"
                    {...field}
                    className="h-12 rounded-none border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Email */}
          {/* <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...field}
                    className="h-12 rounded-none border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Message */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Comment"
                    rows={5}
                    {...field}
                    className="rounded-none border-gray-300"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Button */}
          <Button
            type="submit"
            className="w-full bg-[#c7f000] text-black hover:bg-black hover:text-white rounded-none py-6 font-semibold"
          >
            POST COMMENT
          </Button>
        </form>
      </Form>
    </div>
  );
}
