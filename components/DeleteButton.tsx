"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 left-2 z-10 hover:bg-destructive/10 hover:text-destructive"
      onClick={() => {
        console.log("Delete interview:", id);
      }}
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete interview</span>
    </Button>
  );
};

export default DeleteButton; 