import { useContext } from "react";
import { DialogShareFileContext } from "./share-file-dialog-provider";

export function useShareFileDialog() {
  const context = useContext(DialogShareFileContext);
  if (!context) {
    throw new Error(
      "useShareFileDialog must be used within a ShareFileDialogProvider",
    );
  }
  return context;
}
