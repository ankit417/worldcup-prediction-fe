import React from 'react'

import { ActivityIndicator, Button, Box, Text, CustomModal } from '../../common'
import { colors } from '../../../modules'
interface ConfirmModalProps {
  displayElement: React.ReactNode
  label: string
  onConfirmClick?: (e?: any, arg?: any) => void
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
  danger?: boolean
}
export const ConfirmationModal = ({
  displayElement,
  label,
  onConfirmClick,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  loading = false,
  danger,
}: ConfirmModalProps) => {
  return (
    <CustomModal displayElement={displayElement}>
      {({ onCloseModalHandler }: any) => (
        <Box flexBox vertical>
          <Box flexBox>
            <Text>{label}</Text>
          </Box>
          <ActivityIndicator animating={loading}>
            <Box
              flexBox
              jEnd
              alCenter
              style={{
                width: '100%',
                float: 'right',
              }}
            >
              <Button.Ripple
                onClick={() => {
                  onCloseModalHandler()
                }}
                type="button"
                title={cancelLabel}
              />
              <Button.Ripple
                style={{
                  background: !!danger
                    ? colors.light.red
                    : colors.light.primary200,
                  color: 'white',
                }}
                type="button"
                onClick={(e) => {
                  onConfirmClick(e, onCloseModalHandler)
                }}
                title={confirmLabel}
              />
            </Box>
          </ActivityIndicator>
        </Box>
      )}
    </CustomModal>
  )
}
