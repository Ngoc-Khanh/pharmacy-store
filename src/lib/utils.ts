import { AxiosError } from "axios"
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleServerError(error: unknown) {
  console.log(error)
  let errMsg = 'Something went wrong!'
  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number(error.status) === 204
  ) {
    errMsg = 'Content not found.'
  }
  if (error instanceof AxiosError) errMsg = error.response?.data.title
  toast.error(errMsg)
}