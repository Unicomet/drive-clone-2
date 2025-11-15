import { createContext, useState } from "react";

export const DialogShareFileContext = createContext({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {},
  fileId: 0,
  setFileId: (fileId: number) => {},
});

export default function ShareFileDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [fileId, setFileId] = useState(0);

  return (
    <DialogShareFileContext.Provider
      value={{
        isOpen: isOpen,
        setIsOpen: (isOpen: boolean) => setIsOpen(isOpen),
        fileId: fileId,
        setFileId: (fileId: number) => setFileId(fileId),
      }}
    >
      {children}
    </DialogShareFileContext.Provider>
  );
}
