import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoModal from './components/TodoModal';
import type { TreeDataNode, TreeProps } from 'antd';
import 'antd/dist/reset.css';

const App: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalInputValue, setModalInputValue] = useState('');
  const [editingNodeKey, setEditingNodeKey] = useState<React.Key | null>(null);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
  };

  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info);
  };

  const onDrop: TreeProps['onDrop'] = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: TreeDataNode[],
      key: React.Key,
      callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...treeData];

    let dragObj: TreeDataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: TreeDataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setTreeData(data);
  };

  const addNode = () => {
    setTreeData([...treeData, { title: 'Công việc mới', key: `${Date.now()}`, children: [] }]);
  };

  const deleteNode = (key: React.Key) => {
    const loop = (data: TreeDataNode[]): TreeDataNode[] => {
      return data.filter(item => {
        if (item.children) {
          item.children = loop(item.children);
        }
        return item.key !== key;
      });
    };
    setTreeData(loop(treeData));
  };

  const editNode = (key: React.Key) => {
    setEditingNodeKey(key);
    const node = findNode(treeData, key);
    if (node) {
      setModalInputValue(node.title as string);
      setIsModalVisible(true);
    }
  };

  const findNode = (data: TreeDataNode[], key: React.Key): TreeDataNode | null => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === key) {
        return data[i];
      }
      if (data[i].children) {
        const result = findNode(data[i].children!, key);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  const handleOk = () => {
    const updateNode = (data: TreeDataNode[]): TreeDataNode[] => {
      return data.map(item => {
        if (item.key === editingNodeKey) {
          item.title = modalInputValue;
        }
        if (item.children) {
          item.children = updateNode(item.children);
        }
        return item;
      });
    };
    setTreeData(updateNode(treeData));
    setIsModalVisible(false);
    setEditingNodeKey(null);
    setModalInputValue('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingNodeKey(null);
    setModalInputValue('');
  };

  const onChangeModalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInputValue(e.target.value);
  };

  return (
    <div>
      <TodoList
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={onExpand}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        addNode={addNode}
        editNode={editNode}
        deleteNode={deleteNode}
      />
      <TodoModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        modalInputValue={modalInputValue}
        onChangeModalInput={onChangeModalInput}
      />
    </div>
  );
};

export default App;
