import { Button } from "@chat-app/ui/components/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@chat-app/ui/components/dialog"
import { LogOut, TriangleAlert } from "lucide-react"

export function Logout({ logout }: { logout: () => void }) {
    return (
        <Dialog>
            <DialogTrigger className={"w-full"}>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-sm font-medium hover:bg-destructive/10 hover:text-destructive"
                >
                    <LogOut className="size-5" />
                    Logout
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-3xl border-0 p-0 overflow-hidden">
                <form>
                    <div className="p-6">
                        {/* Top Icon */}
                        <div className="mb-5 flex items-center justify-center">
                            <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
                                <TriangleAlert className="size-7 text-destructive" />
                            </div>
                        </div>

                        {/* Header */}
                        <DialogHeader className="space-y-3 text-center">
                            <DialogTitle className="text-2xl font-bold tracking-tight">
                                Logout Account
                            </DialogTitle>

                            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                                Are you sure you want to logout from your account?
                                You can always login again later.
                            </DialogDescription>
                        </DialogHeader>


                        {/* Footer */}
                        <DialogFooter className="mt-8 flex-row gap-3 sm:justify-end">
                            <DialogClose>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 rounded-xl"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button
                                type="submit"
                                variant="destructive"
                                className="flex-1 rounded-xl"
                                onClick={() => logout()}
                            >
                                Logout
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}