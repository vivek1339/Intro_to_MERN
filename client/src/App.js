import React, { useState, useEffect } from 'react';
import { List, Input, Button, Spin, message } from 'antd';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3001/api/get_all')
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
    // alert("hi")
    setLoading(true);
    axios
      .post('http://localhost:3001/api/add', { name: inputValue }, {headers:{'Access-Control-Allow-Credentials':'true'}})
      .then(res => {
        setItems([res.data, ...items]);
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
      .delete(`http://localhost:3001/deletedata/${id}`)
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

  return (
    <div className="container">
      <h1 className="text-center my-5">To-Do List</h1>
      <Spin spinning={loading}>
        <List
          dataSource={items}
          renderItem={item => (
            <List.Item
              actions={[
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
          <Button type="primary" onClick={addItem}>
            Add
          </Button>
        </div>
      </Spin>
    </div>
  );
};

export default App;
