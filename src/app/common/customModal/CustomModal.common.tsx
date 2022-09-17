import { ReactNode, useState } from 'react'
import propTypes from 'prop-types'

import { Modal } from 'react-uicomp'
import { Box } from '..'

interface CustomModalProps {
  displayElement: ReactNode
  children: (close?: any, open?: any) => React.ReactNode
}
export const CustomModal = ({ displayElement, children }: CustomModalProps) => {
  const [visible, setVisible] = useState(false)

  const onOpenModalHandler = () => {
    setVisible(true)
  }

  const onCloseModalHandler = () => {
    setVisible(false)
  }

  return (
    <Box>
      <Box
        onClick={(e: any) => {
          e.preventDefault()
          setVisible((prev) => !prev)
        }}
      >
        {displayElement}
      </Box>
      <Modal visible={visible}>
        {children({ onCloseModalHandler, onOpenModalHandler })}
      </Modal>
    </Box>
  )
}

CustomModal.propTypes = {
  displayElement: propTypes.element.isRequired,
  children: propTypes.func.isRequired,
}
