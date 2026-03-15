import { createContext, useContext, useState, ReactNode, useCallback } from 'react'

type ModalId = 'consultation' | 'internship'

interface ModalContextValue {
  // legacy single-modal API (consultation)
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  // multi-modal API
  activeModal: ModalId | null
  openModalById: (id: ModalId) => void
  closeModalById: () => void
}

const ModalContext = createContext<ModalContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  activeModal: null,
  openModalById: () => {},
  closeModalById: () => {},
})

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null)

  const openModalById = useCallback((id: ModalId) => {
    setActiveModal(id)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModalById = useCallback(() => {
    setActiveModal(null)
    document.body.style.overflow = ''
  }, [])

  // Legacy helpers pointing to 'consultation'
  const openModal  = useCallback(() => openModalById('consultation'), [openModalById])
  const closeModal = useCallback(() => closeModalById(), [closeModalById])
  const isOpen = activeModal === 'consultation'

  return (
    <ModalContext.Provider value={{
      isOpen, openModal, closeModal,
      activeModal, openModalById, closeModalById,
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
