export default function GlossaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <article className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none">
                {children}
            </article>
        </div>
    );
}
