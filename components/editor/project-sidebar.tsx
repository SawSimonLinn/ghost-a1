"use client"

import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-1 items-center justify-center py-12 text-center text-sm text-copy-muted">
      {message}
    </div>
  )
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      aria-hidden={!isOpen}
      className={cn(
        "fixed top-16 bottom-4 left-4 z-40 flex w-80 flex-col rounded-2xl border border-surface-border bg-elevated/95 shadow-xl backdrop-blur-sm transition-transform duration-200 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]"
      )}
    >
      <div className="flex items-center justify-between border-b border-surface-border-subtle px-4 py-3">
        <h2 className="text-sm font-medium text-copy-primary">Projects</h2>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Close sidebar"
          onClick={onClose}
        >
          <X className="size-4" />
        </Button>
      </div>

      <Tabs defaultValue="my-projects" className="flex flex-1 flex-col overflow-hidden px-4 pt-3">
        <TabsList className="w-full">
          <TabsTrigger value="my-projects" className="flex-1">
            My Projects
          </TabsTrigger>
          <TabsTrigger value="shared" className="flex-1">
            Shared
          </TabsTrigger>
        </TabsList>
        <TabsContent value="my-projects" className="flex flex-1 flex-col">
          <EmptyState message="No projects yet." />
        </TabsContent>
        <TabsContent value="shared" className="flex flex-1 flex-col">
          <EmptyState message="Nothing has been shared with you yet." />
        </TabsContent>
      </Tabs>

      <div className="border-t border-surface-border-subtle p-4">
        <Button className="w-full">
          <Plus className="size-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}
