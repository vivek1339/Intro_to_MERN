import React, { useState, useEffect } from 'react';
import { List, Input, Button, Spin, message, Modal } from 'antd';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateItem, setUpdateItem] = useState({ id: '', name: '' });
  const [updateValue, setUpdateValue] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3002/api/get_all')
      .then(res => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        message.error('Failed to fetch items');
      });
  }, []);

  const addItem = () => {
    setLoading(true);
    axios
      .post('http://localhost:3002/api/add', { name: inputValue })
      .then(res => {
        const newItem = { _id: res.data.id, name: inputValue };
        setItems([newItem, ...items]);
        setLoading(false);
        setInputValue('');
        message.success('Item added');
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        message.error('Failed to add item');
      });
  };
  

  const deleteItem = id => {
    setLoading(true);
    axios
      .post(`http://localhost:3002/api/delete`, { id })
      .then(() => {
        setItems(items.filter(item => item._id !== id));
        setLoading(false);
        message.success('Item deleted');
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        message.error('Failed to delete item');
      });
  };

  const updateCurrentItem = () => {
    setLoading(true);
    axios
      .post(`http://localhost:3002/api/update`, { id: updateItem.id, name: updateValue })
      .then(() => {
        const updatedItems = items.map(item => {
          if (item._id === updateItem.id) {
            return { ...item, name: updateValue };
          }
          return item;
        });
        setItems(updatedItems);
        setLoading(false);
        setUpdateModalVisible(false);
        setUpdateItem({ id: '', name: '' });
        setUpdateValue('');
        message.success('Item updated');
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        message.error('Failed to update item');
      });
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">To-Do List</h1>
      <Spin spinning={loading}>
        <List
          dataSource={items}
          renderItem={item => (
            <List.Item
              actions={[
                <Button type="primary" onClick={() => {
                  setUpdateItem({ id: item._id, name: item.name });
                  setUpdateValue(item.name);
                  setUpdateModalVisible(true);
                }}>
                  Edit
                </Button>,
                <Button type="danger" onClick={() => deleteItem(item._id)}>
                  Delete
                </Button>
              ]}
            >
              {item.name}
            </List.Item>
          )}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Add a new item"
          />
          <Button type="primary" onClick={addItem}>        Add
      </Button>
    </div>
  </Spin>
  <Modal
    title="Update Item"
    visible={updateModalVisible}
    onOk={updateCurrentItem}
    onCancel={() => {
      setUpdateModalVisible(false);
      setUpdateItem({ id: '', name: '' });
      setUpdateValue('');
    }}
  >
    <Input
      value={updateValue}
      onChange={e => setUpdateValue(e.target.value)}
      placeholder="Update item"
    />
  </Modal>
</div>
);
};

export default App;