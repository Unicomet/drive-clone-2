import { db } from "~/server/db";
import DriveContent from "./drive-content";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone(params: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params.params;

  if (isNaN(parseInt(folderId))) {
    return <div>Invalid folder ID</div>;
  }

  const files = await db.select().from(filesSchema);
  const folders = await db.select().from(foldersSchema);
  async function getBreadCrumbs() {
    const breadCrumbs = [];
    // let currentFolder = await db.select().from(foldersSchema).where(foldersSchema.Id) find((folder) => folder.id === currentFolderId);
    let currentFolderId: number | null = parseInt(folderId);
    while (currentFolderId !== null) {
      const currentFolder = await db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentFolderId));
      console.log(currentFolder);
      if (!currentFolder[0]) {
        throw new Error("Parent folder not found");
      }
      breadCrumbs.unshift(currentFolder[0]);
      currentFolderId = currentFolder[0].parent;
      console.log(currentFolderId);
    }
    return breadCrumbs;
  }
  const breadCrumbs = await getBreadCrumbs();

  return (
    <DriveContent files={files} folders={folders} breadcrumbs={breadCrumbs} />
  );
}
