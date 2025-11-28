import { createContext, useState } from "react";

interface DialogShareFileContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  fileId: number;
  setFileId: (fileId: number) => void;
  invitedUsersIds: number[];
  setInvitedUsersIds: (userIds: number[]) => void;
  invitedUsersEmails: string[];
  setInvitedUsersEmails: (userEmails: string[]) => void;
}

export const DialogShareFileContext =
  createContext<DialogShareFileContextType | null>(null);

export default function ShareFileDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [fileId, setFileId] = useState(0);
  const [invitedUsersIds, setInvitedUsersIds] = useState<number[]>([]);
  const [invitedUsersEmails, setInvitedUsersEmails] = useState<string[]>([]);

  return (
    <DialogShareFileContext.Provider
      value={{
        isOpen: isOpen,
        setIsOpen: (isOpen: boolean) => setIsOpen(isOpen),
        fileId: fileId,
        setFileId: (fileId: number) => setFileId(fileId),
        invitedUsersIds: invitedUsersIds,
        setInvitedUsersIds: (userIds: number[]) => setInvitedUsersIds(userIds),
        invitedUsersEmails: invitedUsersEmails,
        setInvitedUsersEmails: (userEmails: string[]) =>
          setInvitedUsersEmails(userEmails),
      }}
    >
      {children}
    </DialogShareFileContext.Provider>
  );
}
