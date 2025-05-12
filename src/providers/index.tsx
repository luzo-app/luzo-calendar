import { AnimatePresence } from "framer-motion";

import Routes from "@/routes";

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip";
import { AlertDialogProvider } from "./alert-dialog";
import AuthProvider from "./auth";
import { ThemeProvider } from "./theme"

export default function Providers() {
    return (
        <AnimatePresence mode={"wait"}>
            <ThemeProvider defaultTheme="light">
                <TooltipProvider delayDuration={0}>
                    <AlertDialogProvider>
                        <AuthProvider>
                            <Routes />
                            <Toaster />
                        </AuthProvider>
                    </AlertDialogProvider>
                </TooltipProvider>
            </ThemeProvider>
        </AnimatePresence>
    )
}