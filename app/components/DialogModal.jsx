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
import * as Label from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import PropTypes from "prop-types";

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
  const [contentText, setContentText] = useState(task.taskContent);

  // create toast variable
  const { toast } = useToast();

  // Create form using useForm hook and send in zodResolver(FormSchema)
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data) {
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

  // ? Consider using "useCallback" instead of useEffect if `updateTask` is a function that changes frequently, it could lead to unnecessary renders. "useCallback" will prevent change on every render and ensure `updateTask` has a stable identity across renders, not triggering unncesary effects or renders.
  useEffect(() => {
    updateTask(task.id, contentText);
    // console.log(`\n\ttask.id: ${task.id}`);

    console.log(
      `Another way to view 'contentText': ${JSON.stringify(
        contentText,
        null,
        2,
      )}`,
    );
    // console.log(`\n\tcontentText: ${contentText}`);
    console.log(`\t Just lonely task: ${JSON.stringify(task, null, 2)}`);
    // console.log(`\n\tupdateTask: ${updateTask}`);
    // console.log(`\n\tdata.contentText: ${data.contentText}`);
    // console.log(
    //   `data.contentText.textContent: ${data.contentText.textContent}`,
    // );
  }, [contentText, task.id]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger>{task.taskContent}</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="taskcard-label text-gray-500">
            <div className="flex gap-64">
              <div>Create issue</div>
              <div>{task.taskName}</div>
            </div>
          </DialogTitle>
          <DialogDescription></DialogDescription>

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
                    <FormLabel className="taskcard-label text-gray-500">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="description text-purple-500"
                        placeholder="Enter task description here"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>ffff{task.taskName}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>

          <DialogDescription>
            Dialog Description: {contentText}
          </DialogDescription>
          {/* Enable Toast button in form for testing */}
          {/* <Button
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
          </Button> */}
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

DialogModal.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    taskContent: PropTypes.string.isRequired,
  }),
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
