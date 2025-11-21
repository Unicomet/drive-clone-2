"use client";

import { useState } from "react";
import { useShareFileDialog } from "~/app/_providers/shareFileDialog/use-share-file-dialog";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { shareFileToUser } from "~/server/actions";

export function DialogShareFile() {
  const [emailAddress, setEmailAddress] = useState("");

  const { isOpen, setIsOpen, fileId } = useShareFileDialog();

  console.log("isOpen: ", isOpen, " fileId: ", fileId);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await shareFileToUser(fileId, emailAddress);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share with other people</DialogTitle>
          <DialogDescription>
            Enter the email address of the person you want to share with.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Email Address
              </Label>
              <Input
                placeholder="example@gmail.com"
                id="emailAddress"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start lg:justify-end">
            <DialogClose asChild>
              <Button type="submit" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button>Share</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
