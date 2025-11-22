import { TOAST_TYPES } from "@/constant/constant";
import { Toaster, toast } from "sonner";

interface ToastOptions {
  message: string;
  type: (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];
  description?: string;
}

/**
 * Displays a toast notification with the specified message and type
 * @param options - Toast configuration options
 */
export const showToast = ({
  message,
  description,
  type,
}: ToastOptions): void => {
  const toastHandlers = {
    [TOAST_TYPES.SUCCESS]: toast.success,
    [TOAST_TYPES.ERROR]: toast.error,
    [TOAST_TYPES.WARNING]: toast.warning,
    [TOAST_TYPES.INFO]: toast.info,
  } as const;
  const handler = toastHandlers[type];
  if (!handler) {
    console.error(`Invalid toast type: ${type}`);
    return;
  }
  handler(message, { description });
};

/**
 * Toast component that provides toast notifications throughout the application
 */
export default function Toast() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      duration={3000}
      visibleToasts={1}
    />
  );
}
