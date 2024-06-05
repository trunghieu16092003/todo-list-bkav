import React from 'react';
import { Modal, Input } from 'antd';

interface TodoModalProps {
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  modalInputValue: string;
  onChangeModalInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({
  isModalVisible,
  handleOk,
  handleCancel,
  modalInputValue,
  onChangeModalInput,
}) => {
  return (
    <Modal title="Sửa công việc" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Input value={modalInputValue} onChange={onChangeModalInput} />
    </Modal>
  );
};

export default TodoModal;
