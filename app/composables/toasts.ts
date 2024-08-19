export const useSuccessToast = (title: string, description?: string) => {
  const toast = useToast()

  toast.add({
    title,
    description,
    color: 'green',
    icon: 'i-heroicons-check-circle',
  })
}

export const useErrorToast = (title: string, description?: string) => {
  const toast = useToast()

  toast.add({
    title,
    description,
    color: 'red',
    icon: 'i-heroicons-x-circle',
  })
}
