import { Button, Modal } from 'antd'
import React from 'react'

interface Props {
  isModalOpen: boolean
  handleClose: () => void
  onOk: () => void
}

export const ModalWarningImportWallet: React.FunctionComponent<Props> = ({ isModalOpen, handleClose, onOk }) => {
  return (
    <Modal onCancel={handleClose} centered visible={isModalOpen} footer={false} closable={false} width={450}>
      <div className="text-center text-[#fff]">
        <h1 className="text-yellow-400 font-semibold text-lg text-center ">WARNING</h1>
        <p className="mt-5">This will delete and replace your current wallet.</p>
        <p className="mt-3">Are you sure?</p>
      </div>
      <div className="flex justify-center mt-8 gap-2">
        <Button onClick={onOk} className="min-w-[90px] bg-[#6ADAB3] border-0 rounded-[100px] h-10">
          OK
        </Button>
        <Button
          onClick={handleClose}
          className="min-w-[90px] border-[#6ADAB3] text-[#6ADAB3] bg-transparent rounded-[100px] h-10"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  )
}
