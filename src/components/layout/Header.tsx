import Link from 'next/link';
import { Calculator, BookOpen, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                        <Calculator className="h-5 w-5" />
                    </div>
                    <span className="hidden sm:inline-block">DirectorTax</span>
                </Link>

                <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="hover:text-foreground transition-colors">Calculator</Link>
                    <Link href="/guides" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" /> Guides
                    </Link>
                    <Link href="/about" className="hover:text-foreground transition-colors hidden sm:flex items-center gap-1.5">
                        <Info className="h-4 w-4" /> About
                    </Link>
                </nav>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/auth/login">Sign In</Link>
                    </Button>
                    <Button size="sm">Get Started</Button>
                </div>
            </div>
        </header>
    );
}
