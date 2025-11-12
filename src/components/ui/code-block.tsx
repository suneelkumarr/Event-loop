import { cn } from "@/lib/utils"

interface CodeBlockProps {
  language: string
  code: string
  className?: string
}

export function CodeBlock({ language, code, className }: CodeBlockProps) {
  return (
    <div className={cn("relative rounded-lg bg-muted p-4", className)}>
      <div className="mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase">
          {language}
        </span>
      </div>
      <pre className="text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}