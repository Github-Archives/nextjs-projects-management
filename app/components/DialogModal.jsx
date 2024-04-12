"use client";

import { useState, useEffect } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import * as Label from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
``;
import PropTypes from "prop-types";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Setup FormSchema rules/restrictions for validation
const FormSchema = z.object({
  // ! Notice textContent again...
  textContent: z
    .string()
    .min(10, "Text must be at least 10 characters.")
    .max(160, "Text must not be longer than 30 characters."),
});

function DialogModal({ task, deleteTask, updateTask, isOpen, onClose }) {
  const [taskName, setTaskName] = useState(task.taskName);

  // dropdown menu state
  const [position, setPosition] = useState("Story");

  // useEffect(() => {
  //   console.log(`position: ${position}`);
  //   updateTask(task.id, position);
  // }, [position]);

  // create toast variable
  const { toast } = useToast();

  // Create form using useForm hook and send in zodResolver(FormSchema)
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data) {
    // setContentText(data.textContent);
    updateTask(task.id, taskName);
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
  // useEffect(() => {
  //   updateTask(task.id, taskName);
  //   console.log(`\t Just lonely task: ${JSON.stringify(task, null, 2)}`);
  // }, [taskName, task.id]);

  // useEffect(() => {
  //   console.log(`task.taskType: ${task.taskType}`);
  //   updateTask(task.id, task.taskType);
  // }, [task.taskType]);

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

          <Form {...form}>
            <form
              // ! onSubmit form fields happens here
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                // ! Notice name="textContent" is the same as the key in the FormSchema object
                name="textContent"
                // ! Notice we're not using `field` at the moment
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel className="taskcard-title-label text-gray-500">
                        Issue type
                        {/* IssueType (Story, Task, Bug) checkbox/dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">{task.taskType}</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>
                              Select issue type
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                              value={position}
                              onValueChange={setPosition}
                            >
                              <DropdownMenuRadioItem value="story">
                                Story
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="task">
                                Task
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="bug">
                                Bug
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormLabel>
                    </FormItem>

                    <FormItem>
                      <FormLabel className="taskcard-summary-label text-gray-500">
                        Summary
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="summary resize-none text-purple-500"
                          placeholder="Summary is the brief descriptive title to the card"
                          // !! I think duplicating {...field} is a mistake because text duplicates too
                          {...field}
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem>
                      <FormLabel className="taskcard-description-label text-gray-500">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="description text-purple-500"
                          placeholder="Enter task description here"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
              <div className="flex gap-64">
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit">Create</Button>
                {/* Maybe delete won't within the modal. task delete will happen on the board */}
                {/* <Button onClick={() => deleteTask(task.id)}>Delete</Button> */}
              </div>
            </form>
          </Form>

          {/* Enable Toast button in form for testing */}
          {/* <Button
            onClick={() => {
              toast({
                title: "You submitted the following values:",
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(taskName, null, 2)}
                    </code>
                  </pre>
                ),
              });
            }}
          >
            Show Toast
          </Button> */}
        </DialogHeader>
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
