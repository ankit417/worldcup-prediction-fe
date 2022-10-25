// import { useState } from 'react'
import { Modal } from 'react-uicomp'
import { AiFillWarning } from 'react-icons/ai'
import { Button } from '../../../../common'

export const DeleteGroup = ({ visible, onClose, onSubmit }: any) => {
  return (
    <Modal visible={visible}>
      <div className="delete-tournament-wrapper">
        <div className="delete-warning">
          <AiFillWarning size={30} color={'#E3B505'} />
          <div className="delete-warning-text">
            Are you sure You want to delete the Group.
            <br />
            Deleting this will remove all the Data associated with this Group
          </div>
        </div>
        <div className="delete-action-buttons">
          <Button
            title={'cancel'}
            onClick={onClose}
            className="cancel-button"
          />
          <Button
            title={'Delete'}
            onClick={onSubmit}
            className="delete-button"
          />
        </div>
      </div>
    </Modal>
  )
}
