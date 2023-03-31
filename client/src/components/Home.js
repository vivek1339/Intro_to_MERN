import React, { useState, useEffect } from 'react';
import { List, Button, Spin, message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <Spin spinning={loading}>
      <List
        dataSource={items}
        renderItem={item => (
          <List.Item
            actions={[
              <Link to={`/update/${item._id}`}>
                <Button type="primary">Edit</Button>
              </Link>,
              <Button type="danger" onClick={() => deleteItem(item._id)}>
                Delete
              </Button>
            ]}
          >
            {item.name}
          </List.Item>
        )}
      />
    </Spin>
  );
};

export default Home;
