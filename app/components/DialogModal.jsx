"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Setup FormSchema rules/restrictions for validation
const FormSchema = z.object({
  textContent: z
    .string()
    .min(10, "Text must be at least 10 characters.")
    .max(160, "Text must not be longer than 30 characters."),
});

function DialogModal({ task, deleteTask, updateTask, isOpen, onClose }) {
  const [contentText, setContentText] = useState(task.content);

  // create toast variable
  const { toast } = useToast();

  // Create form using useForm hook and send in zodResolver(FormSchema)
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data) {
    // console.log(
    //   `onSubmit(data) Pressed. data: ${JSON.stringify(data, null, 2)}`,
    // );
    setContentText(data.textContent);
    updateTask(task.id, contentText);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  // This may be redundant
  useEffect(() => {
    updateTask(task.id, contentText);
  }, [contentText]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger>{task.content}</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>{task.content}</DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="textContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text Context</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Task Description Here"
                        className="resize-none text-gray-900"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can <span>@mention</span> other users and
                      organizations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <Button onClick={onClose}>Cancel</Button>
          <DialogDescription>{contentText}</DialogDescription>
          <Button
            onClick={() => {
              toast({
                title: "You submitted the following values:",
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(contentText, null, 2)}
                    </code>
                  </pre>
                ),
              });
            }}
          >
            Show Toast
          </Button>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => deleteTask(task.id)}>Delete</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogModal;
