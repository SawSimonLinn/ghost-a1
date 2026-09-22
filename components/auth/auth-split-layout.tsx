import { Ghost } from "lucide-react"

const FEATURES = [
  "Describe a system in plain English and watch it take shape.",
  "Refine the architecture together on a shared live canvas.",
  "Turn the finished design into a technical spec.",
]

interface AuthSplitLayoutProps {
  children: React.ReactNode
}

export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-screen bg-base">
      <div className="hidden w-1/2 flex-col justify-center border-r border-surface-border bg-elevated px-16 lg:flex">
        <div className="flex items-center gap-2">
          <Ghost className="size-6 text-brand" />
          <span className="text-lg font-medium text-copy-primary">
            Ghost AI
          </span>
        </div>
        <p className="mt-3 text-sm text-copy-muted">
          A collaborative system design workspace.
        </p>
        <ul className="mt-10 space-y-3">
          {FEATURES.map((feature) => (
            <li
              key={feature}
              className="text-sm text-copy-secondary"
            >
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        {children}
      </div>
    </div>
  )
}
