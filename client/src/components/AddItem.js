import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddItem = () => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const addItem = () => {
    setLoading(true);
    axios
      .post('http://localhost:3002/api/add', { name: inputValue })
      .then(res => {
        setLoading(false);
        setInputValue('');
        message.success('Item added');
        navigate("/");
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        message.error('Failed to add item');
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Add a new item"
        />
        <Button type="primary" onClick={addItem} loading={loading}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddItem;
