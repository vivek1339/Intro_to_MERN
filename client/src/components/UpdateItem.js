import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, message, Spin } from 'antd';
import axios from 'axios';

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateValue, setUpdateValue] = useState('');
  const [loading, setLoading] = useState(false);


  const updateCurrentItem = () => {
    setLoading(true);
    axios
      .post(`http://localhost:3002/api/update`, { id, name: updateValue })
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          message.success("Item updated");
          navigate("/");
        } else {
          setLoading(false);
          message.error("Failed to update item");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        message.error("Failed to update item");
      });
  };

  return (
    <Spin spinning={loading}>
      <div>
        <Input
          value={updateValue}
          onChange={e => setUpdateValue(e.target.value)}
          placeholder="Update item"
        />
        <Button type="primary" onClick={updateCurrentItem} disabled={!updateValue}>
          Update
        </Button>
      </div>
    </Spin>
  );
};

export default UpdateItem;
