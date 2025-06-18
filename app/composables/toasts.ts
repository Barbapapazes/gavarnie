export const useSuccessToast = (title: string, description?: string) => {
  const toast = useToast()

  toast.add({
    title,
    description,
    color: 'success',
    icon: 'i-heroicons-check-circle',
  })
}

export const useErrorToast = (title: string, description?: string) => {
  const toast = useToast()

  toast.add({
    title,
    description,
    color: 'error',
    icon: 'i-heroicons-x-circle',
  })
}
