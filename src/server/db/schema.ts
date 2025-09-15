import {
  bigint,
  text,
  singlestoreTableCreator,
  index,
  timestamp,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`,
);

export const files_table = createTable(
  "files",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    fileType: text("file_type").notNull(),
    size: bigint("size", { mode: "number", unsigned: true }).notNull(),
    url: text("url").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    ownerId: text("owner_id").notNull(),
  },
  (t) => {
    return [
      index("parent_index").on(t.parent),
      index("owner_index").on(t.ownerId),
    ];
  },
);

export const folders_table = createTable(
  "folders",
  {
    id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    ownerId: text("owner_id").notNull(),
  },
  (t) => {
    return [
      index("parent_index").on(t.parent),
      index("owner_index").on(t.ownerId),
    ];
  },
);
