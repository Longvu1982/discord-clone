"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBoolean } from "@/hooks/use-boolean";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import EmojiPicker from "../custom/emoji-picker/emoji-picker";
import ServerImageUploader from "../custom/server-image-uploader";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "direct";
}

const formSchema = z.object({
  content: z.string().min(1),
  fileURL: z.string(),
});

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const [isShowUpload, , hideUpload, toggleShowUpload] = useBoolean(false);
  const ref = useRef<A>();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      fileURL: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });
      await axios.post(url, values);

      form.reset();
      hideUpload();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoading) form.setFocus("content");
    ref.current?.focus();
  }, [isLoading]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(isShowUpload && "bg-zinc-200/90 dark:bg-zinc-700/75")}
      >
        {isShowUpload && (
          <FormField
            control={form.control}
            name="fileURL"
            render={({ field }) => (
              <FormItem className="px-4 pt-2">
                <FormControl>
                  <ServerImageUploader
                    className="w-40 h-40 rounded-sm ml-2"
                    imgClass="rounded-sm"
                    endPoint="messageFile"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={toggleShowUpload}
                    className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    {isShowUpload ? (
                      <Minus className="text-white dark:text-[#313338]" />
                    ) : (
                      <Plus className="text-white dark:text-[#313338]" />
                    )}
                  </button>
                  <Input
                    autoFocus
                    disabled={isLoading}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === "direct" ? `@${name}` : `#${name}`
                    }`}
                    {...field}
                    ref={ref}
                  />
                  <div className="absolute top-7 right-8">
                    <EmojiPicker
                      onChange={(emoji: string) => {
                        console.log(emoji);
                        field.onChange(`${field.value} ${emoji}`);
                      }}
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
