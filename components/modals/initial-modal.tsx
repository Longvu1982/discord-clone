"use client";
import useModalStore from "@/hooks/store/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
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
import { useRouter } from "@/hooks/use-p-router";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required!",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required!",
  }),
});

const InitialModal = ({ isOpen }: { isOpen?: boolean }) => {
  const open = useModalStore((state) => state.isOpen);
  const type = useModalStore((state) => state.type);
  const closeModal = useModalStore((state) => state.closeModal);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await axios.post("/api/server/create", values);
    router.refresh();
    form.reset();
    closeModal();
  };

  console.log(type);
  console.log(open);

  return (
    <div>
      <Dialog
        open={isOpen ?? (open && type === "create server")}
        onOpenChange={closeModal}
      >
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Create a server
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Give your server identification by adding a name and an image. You
              can always change that later.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8 px-6">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cs uppercase font-bold text-zinc-500 dark:text-secondary/70">
                        Upload an Image
                      </FormLabel>
                      <FormControl>
                        <ServerImageUploader
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cs uppercase font-bold text-zinc-500 dark:text-secondary/70">
                        Server Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder="Enter server name"
                          {...field}
                        />
                      </FormControl>
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

export default InitialModal;
