import React from 'react';
import { Tree, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { TreeProps, TreeDataNode } from 'antd';

interface TodoListProps {
  treeData: TreeDataNode[];
  expandedKeys: React.Key[];
  onExpand: (newExpandedKeys: React.Key[]) => void;
  onDragEnter: TreeProps['onDragEnter'];
  onDrop: TreeProps['onDrop'];
  addNode: () => void;
  editNode: (key: React.Key) => void;
  deleteNode: (key: React.Key) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  treeData,
  expandedKeys,
  onExpand,
  onDragEnter,
  onDrop,
  addNode,
  editNode,
  deleteNode,
}) => {
  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={addNode}>
        Thêm công việc
      </Button>
      <Tree
        className="draggable-tree"
        expandedKeys={expandedKeys}
        draggable
        blockNode
        onExpand={onExpand}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={treeData}
        titleRender={(node: any) => (
          <div>
            <span>{node.title}</span>
            <Button type="link" onClick={() => editNode(node.key)}>
              Sửa
            </Button>
            <Button type="link" danger onClick={() => deleteNode(node.key)}>
              Xóa
            </Button>
          </div>
        )}
      />
    </div>
  );
};

export default TodoList;
