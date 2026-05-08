import { Link } from "@tanstack/react-router";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
            <div className="w-full max-w-md rounded-3xl border border-border bg-card p-10 shadow-xl">
                <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-4xl font-bold text-primary">
                            404
                        </span>
                    </div>
                </div>

                <div className="space-y-3 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Page Not Found
                    </h1>

                    <p className="text-sm leading-6 text-muted-foreground">
                        The page you are looking for does not exist or may have
                        been moved.
                    </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                        to="/"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                        <Home className="size-4" />
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
                    >
                        <ArrowLeft className="size-4" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}