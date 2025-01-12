'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { ReloadIcon } from '@radix-ui/react-icons';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useRef, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import ROUTES from '@/constants/routes';
import { toast } from '@/hooks/use-toast';
import { createQuestion, editQuestion } from '@/lib/actions/question.action';
import { AskQuestionSchema } from '@/lib/validations';
import { Question } from '@/types/global';

import TagCard from '../cards/TagCard';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

interface Params {
  question?: Question;
  isEdit?: boolean;
}

const QuestionForm = ({ question, isEdit = false }: Params) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || '',
      content: question?.content || '',
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  });

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.currentTarget.value.trim();

      if (value && value.length < 15 && !field.value.includes(value)) {
        form.setValue('tags', [...field.value, value]);
        e.currentTarget.value = '';
        form.clearErrors('tags');
      } else if (value.length > 15) {
        form.setError('tags', {
          type: 'manual',
          message: 'Tag length should be less than 15 characters',
        });
      } else if (field.value.includes(value)) {
        form.setError('tags', {
          type: 'manual',
          message: 'Tag already exists',
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const filteredTags = field.value.filter((t) => t !== tag);

    form.setValue('tags', filteredTags);

    if (filteredTags.length === 0) {
      form.setError('tags', {
        type: 'manual',
        message: 'At least one tag is required',
      });
    }
  };

  const saveQuestion = async (data: z.infer<typeof AskQuestionSchema>) => {
    const result = await createQuestion(data);

    if (result.success) {
      toast({
        title: 'Success',
        description: 'Question created successfully!',
      });

      if (result.data) router.push(ROUTES.QUESTION(result.data?._id));
    } else {
      toast({
        title: `Error ${result.status}`,
        description: result.error?.message || 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  const updateQuestion = async (data: z.infer<typeof AskQuestionSchema>) => {
    const result = await editQuestion({
      questionId: question!._id!,
      ...data,
    });

    if (result.success) {
      toast({
        title: 'Success',
        description: 'Question updated successfully!',
      });

      if (result.data) router.push(ROUTES.QUESTION(result.data?._id));
    } else {
      toast({
        title: `Error ${result.status}`,
        description: result.error?.message || 'Something went wrong',
        variant: 'destructive',
      });

      return;
    }
  };

  const handleFormSubmit = async (data: z.infer<typeof AskQuestionSchema>) => {
    startTransition(async () => {
      if (isEdit && question) {
        await updateQuestion(data);
      } else {
        await saveQuestion(data);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleFormSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light700 capitalize">
                Question Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="paragraph-regular no-focus background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you&apos;re asking a question to another
                person
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light700 capitalize">
                Detailed explanation of your problem{' '}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you&apos;ve put in the
                title
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light700 capitalize">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div>
                  <Input
                    type="text"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    className="paragraph-regular no-focus background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 flex-wrap gap-2">
                      {field?.value?.map((tag: string) => (
                        <TagCard
                          key={tag}
                          _id={tag}
                          name={tag}
                          compact
                          remove
                          isButton
                          handleRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. Press
                enter to add a tag
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
          >
            {isPending ? (
              <>
                <ReloadIcon className="mr-2 size-4 animate-spin"></ReloadIcon>
                <span>Submitting</span>
              </>
            ) : (
              <>{isEdit ? 'Update Question' : 'Ask A Question'}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionForm;
