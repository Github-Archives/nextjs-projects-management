import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function DialogModal({ task, deleteTask, updateTask, isOpen, onClose }) {
  // ! not used for input text `task.content`
  const [contentText, setContentText] = useState(task.content);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger>{task.content}</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>{task.content}</DialogDescription>
          {/* Add ability to enter text. Import Label and Input */}
          {/* <Button onClick={() => updateTask(task.id, task.content)}>
            Update
          </Button> */}
          {/* <Button onClick={onClose}>Cancel</Button> */}
          <DialogDescription>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </DialogDescription>
        </DialogHeader>
        {/* Add buttons or other controls for deleting or updating the task */}
        <DialogFooter>
          <Button onClick={() => deleteTask(task.id)}>Delete</Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogModal;
