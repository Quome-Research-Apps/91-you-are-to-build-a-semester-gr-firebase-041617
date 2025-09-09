import { Logo } from '@/components/icons/Logo';

export function Header() {
  return (
    <header className="py-4 px-4 md:px-8 border-b border-border/50 bg-card">
      <div className="container mx-auto flex items-center gap-3">
        <Logo className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-headline font-bold text-foreground">
          GradePilot
        </h1>
      </div>
    </header>
  );
}
