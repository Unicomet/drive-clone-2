import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import React from "react";
import { mockFolders } from "~/lib/mock-data";
import { db } from "~/server/db";
import { folders_table } from "~/server/db/schema";

export default async function SandboxPage() {
  return (
    <div className="flex flex-col gap-3">
      Seed Function
      <form
        action={async () => {
          "use server";

          const user = await auth();
          if (!user || !user.userId) {
            throw new Error("Unauthorized");
          }

          const rootFolder = await db
            .insert(folders_table)
            .values({
              name: "root",
              ownerId: user.userId,
            })
            .$returningId();

          const folderInsertions = await db.insert(folders_table).values(
            mockFolders.map((folder) => ({
              ...folder,
              ownerId: user.userId,
              parent: rootFolder[0]!.id,
            })),
          );

          const dbFolders = await db
            .select()
            .from(folders_table)
            .where(eq(folders_table.ownerId, user.userId));
          console.log(dbFolders);
        }}
      >
        {/* TODO: Implement form validation */}
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Seed Database
        </button>
      </form>
    </div>
  );
}
