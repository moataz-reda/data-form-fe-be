import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 flex flex-col">
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>
      <main className="flex-1 flex items-center justify-center px-4 pb-8">
        {children}
      </main>
    </div>
  )
}
