import { Wallet } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-card border-b sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Wallet className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground font-headline">TrackWise</h1>
      </div>
    </header>
  );
}
