import { useState } from 'react'
import { Modal } from 'react-uicomp'
import { Box } from '../box/box.common'
import TIESHEET from '../../../assets/images/tiesheet.jpg'
import { Text } from '../text/text.common'
import { AiFillCloseCircle } from 'react-icons/ai'

export const Tiesheet = () => {
  const [modalvisible, setModalVisible] = useState(false)
  return (
    <Box>
      <div onClick={() => setModalVisible(true)} style={{ cursor: 'pointer' }}>
        <Text>Tie Sheet</Text>
      </div>
      <Modal visible={modalvisible}>
        <Box style={{ width: '80vw', position: 'relative' }}>
          <Box
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              cursor: 'pointer',
            }}
            onClick={() => setModalVisible(false)}
          >
            <AiFillCloseCircle color="red" size={30} />
          </Box>
          <img
            src={TIESHEET}
            alt={'TIESHEET'}
            style={{ height: '100%', width: '100%', objectFit: 'contain' }}
          />
        </Box>
      </Modal>
    </Box>
  )
}
