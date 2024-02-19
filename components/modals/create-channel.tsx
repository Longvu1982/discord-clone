"use client";
import useModalStore from "@/hooks/store/use-modal-store";
import { useRouter } from "@/hooks/use-p-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ServerImageUploader from "../custom/server-image-uploader";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ChannelType } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required!",
    })
    .refine((value) => value !== "general", {
      message: "Channel name cannot be 'general'",
    })
    .refine((value) => /^[a-z\-]+$/.test(value) && !/\s/.test(value), {
      message: "Channel name can only be lowercase and no space between.",
    }),
  type: z.string(),
});

const CreateChannel = () => {
  const open = useModalStore((state) => state.isOpen);
  const type = useModalStore((state) => state.type);
  const closeModal = useModalStore((state) => state.closeModal);
  const server = useModalStore((state) => state.data);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelType.TEXT,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    await axios.patch("/api/server/create-channel", {
      ...values,
      id: server.id,
    });
    router.refresh();
    form.reset();
    closeModal();
  };

  return (
    <div>
      <Dialog
        open={open && type === "create-channel"}
        onOpenChange={() => {
          closeModal();
          form.reset();
        }}
      >
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Create a channel
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Create a channel in type of text, audio or video.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cs uppercase font-bold text-zinc-500 dark:text-secondary/70">
                        Channel Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Ex: new-text-channel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cs uppercase font-bold text-zinc-500 dark:text-secondary/70">
                        Channel Type
                      </FormLabel>
                      <Select
                        defaultValue={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0">
                            <SelectValue placeholder="Channel type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-200 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0">
                          <SelectItem value={ChannelType.TEXT}>Text</SelectItem>
                          <SelectItem value={ChannelType.AUDIO}>
                            Audio
                          </SelectItem>
                          <SelectItem value={ChannelType.VIDEO}>
                            Video
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button variant="primary" disabled={isLoading}>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateChannel;
