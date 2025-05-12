import { toast } from "sonner";

export const processError = (error: unknown) => {
  toast.error("Une erreur s'est produite");
  console.error(error);
};
