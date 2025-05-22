import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Divider, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
  selectItems,
} from "../features/itemsSlice";
import { selectCurrentUser } from "../features/authSlice";
import { showNotification } from "@mantine/notifications";

const ItemsManager = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const items = useSelector(selectItems);

  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (user) dispatch(fetchItems(user.uid));
  }, [user, dispatch]);

  const handleAddOrUpdateItem = () => {
    if (!itemName || !itemCost || parseFloat(itemCost) <= 0) {
      showNotification({
        title: "Invalid input",
        message: "Item name & positive cost required",
        color: "red",
      });
      return;
    }

    if (editId) {
      dispatch(
        updateItem({
          userId: user.uid,
          itemId: editId,
          updatedItem: { name: itemName, cost: parseFloat(itemCost) },
        })
      );
      setEditId(null);
    } else {
      dispatch(
        addItem({
          userId: user.uid,
          item: { name: itemName, cost: parseFloat(itemCost) },
        })
      );
    }

    setItemName("");
    setItemCost("");
  };

  const handleEdit = (item) => {
    setItemName(item.name);
    setItemCost(item.cost);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteItem({ userId: user.uid, itemId: id }));
  };

  const totalItemsCost = items.reduce((sum, i) => sum + i.cost, 0);

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-header">Project Items</div>

        <div className="form-section">
          <div className="coolinput">
            <label className="text">Item Name:</label>
            <input
              type="text"
              className="input"
              placeholder="Item Name..."
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>

          <div className="coolinput">
            <label className="text">Cost:</label>
            <input
              type="number"
              className="input"
              placeholder="Amount"
              value={itemCost}
              onChange={(e) => setItemCost(e.target.value)}
            />
          </div>

          <button className="add-button" onClick={handleAddOrUpdateItem}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <Divider my="xs" />

        <div className="items-list">
          {items.map((item) => (
            <div className="item" key={item.id}>
              <span>
                {item.name} — ₹{item.cost}
              </span>
              <div className="actions">
                <button onClick={() => handleEdit(item)}>✏️</button>
                <button onClick={() => handleDelete(item.id)}>❌</button>
              </div>
            </div>
          ))}
        </div>

        <Text className="total">
          Total: <span>₹{totalItemsCost}</span>
        </Text>
      </div>
    </StyledWrapper>
  );
};

export default ItemsManager;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;

  .card {
    width: 90%;
    background: radial-gradient(circle at 26% 106%, rgb(61, 106, 255) 0%, #fff 80%);
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
    border-radius: 23px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: all 0.3s ease-in-out;
  }
// #FFF7B1
  .card:hover {
    transform: scale(1.04);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
  }

  .card-header {
    font-size: 24px;
    font-weight: 800;
    color: #574d33;
    font-family:"arial";
    text-align: center;
    text-shadow: 1.5px 1.5px 1.5px black;
  }

  .form-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .coolinput {
    display: flex;
    flex-direction: column;
  }

  .coolinput label.text {
    font-size: 0.95rem;
    color: #ed8807;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .coolinput .input {
    padding: 11px 10px;
    font-size: 0.85rem;
    border: 2px #f8f043 solid;
    border-radius: 5px;
    background: #f1f1ed;
  }

  .coolinput .input:focus {
    outline: none;
  }

  .add-button {
    position: relative;
    padding: 10px 20px;
    border-radius: 7px;
    border: 1.7px solid #fef312;
    font-size: 15px;
    font-weight: 600;
    background: transparent;
    color: white;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.4s ease-in;
    align-self: center;
  }

  .add-button:hover {
    background: #fef312;
    color: black;
    box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);
  }

  .add-button:hover::before {
    animation: sh02 0.5s linear;
  }

  .add-button::before {
    content: '';
    display: block;
    width: 0px;
    height: 86%;
    position: absolute;
    top: 7%;
    left: 0%;
    opacity: 0;
    background: #fff;
    box-shadow: 0 0 50px 30px #fff;
    transform: skewX(-20deg);
  }

  @keyframes sh02 {
    from {
      opacity: 0;
      left: 0%;
    }
    50% {
      opacity: 1;
    }
    to {
      opacity: 0;
      left: 100%;
    }
  }

  .items-list {
    display: flex;
    gap: 8px;
    max-height: 150px;
    overflow-y: auto;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding: 6px 10px;
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
    color: black;
    font-family: 'arial';
    font-weight: 700;
    min-width: 200px;
  }

  .actions button {
    margin-left: 6px;
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }

  .actions button:hover {
    color: #ff5555;
  }

  .total {
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    margin-top: 8px;
  }

  .total span {
    color: #e74c3c;
    margin-left: 4px;
  }
`;
