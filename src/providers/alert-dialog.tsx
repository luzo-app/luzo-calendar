import { createContext, useState, ReactNode } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type AlertDialogOptions = {
    title: string;
    description: string;
    onConfirm?: () => void;
};

type AlertDialogContextType = (options: AlertDialogOptions) => void;

export const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);

export function AlertDialogProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [dialogOptions, setDialogOptions] = useState<AlertDialogOptions | null>(null);

    const alertDialog: AlertDialogContextType = (options) => {
        setDialogOptions(options);
        setIsOpen(true);
    };

    return (
        <AlertDialogContext.Provider value={alertDialog}>
            {children}
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{dialogOptions?.title}</AlertDialogTitle>
                        <AlertDialogDescription>{dialogOptions?.description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (dialogOptions?.onConfirm) dialogOptions.onConfirm();
                                setIsOpen(false);
                            }}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AlertDialogContext.Provider>
    );
}