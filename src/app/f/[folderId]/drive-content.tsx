"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Upload, Search, ChevronRight, Moon, Sun } from "lucide-react";
import { cn } from "~/lib/utils";
import { FileRow, FolderRow } from "./file-row";
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";

export default function DriveContent(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  breadcrumbs: (typeof folders_table.$inferSelect)[];
}) {
  const { files, folders, breadcrumbs } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <header className="border-border bg-card/50 border-b px-8 py-6 shadow-sm backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-primary text-2xl font-bold tracking-tight">
              Drive Clone
            </h1>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 py-2.5 font-medium shadow-md transition-all duration-200 hover:shadow-lg">
              <Upload className="mr-2 h-4 w-4" />
              New Upload
            </Button>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search in Drive"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background border-border focus:border-primary h-11 w-96 pl-12 transition-colors duration-200"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="border-border hover:bg-muted h-11 w-11 bg-transparent transition-colors duration-200"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-8">
        <nav className="border-border mt-6 flex items-center space-x-3 border-t py-6 text-sm">
          <Button
            variant="ghost"
            className="mr-2 cursor-pointer font-medium hover:text-white"
            asChild
          >
            <Link href="/f/0">My Drive</Link>
          </Button>
          {breadcrumbs.map((folder, index) => (
            <div key={index} className="flex items-center">
              <ChevronRight className="text-muted-foreground mx-2 h-4 w-4" />
              <button
                className={cn(
                  "rounded-md px-3 py-2 font-medium transition-colors duration-200",
                  index === breadcrumbs.length - 1
                    ? "text-accent-foreground bg-accent font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <Link href={`/f/${folder.id}`}>{folder.name}</Link>
              </button>
            </div>
          ))}
        </nav>
        <div className="space-y-2">
          {files.map((file) => (
            <FileRow key={file.id} file={file} />
          ))}
          {folders.map((folder) => (
            <FolderRow key={folder.id} folder={folder} />
          ))}
        </div>
      </main>
    </div>
  );
}
