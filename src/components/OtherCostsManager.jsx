import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Divider, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOtherCosts,
  addOtherCost,
  updateOtherCost,
  deleteOtherCost,
  selectOtherCosts,
} from "../features/otherCostsSlice";
import { selectCurrentUser } from "../features/authSlice";
import { showNotification } from "@mantine/notifications";

const OtherCostsManager = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const otherCosts = useSelector(selectOtherCosts);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (user) dispatch(fetchOtherCosts(user.uid));
  }, [user, dispatch]);

  const handleAddOrUpdateCost = () => {
    if (!description || !amount || parseFloat(amount) <= 0) {
      showNotification({
        title: "Invalid input",
        message: "Description & positive amount required",
        color: "red",
      });
      return;
    }

    if (editId) {
      dispatch(
        updateOtherCost({
          userId: user.uid,
          costId: editId,
          updatedCost: { description, amount: parseFloat(amount) },
        })
      );
      setEditId(null);
    } else {
      dispatch(
        addOtherCost({
          userId: user.uid,
          cost: { description, amount: parseFloat(amount) },
        })
      );
    }

    setDescription("");
    setAmount("");
  };

  const handleEdit = (cost) => {
    setDescription(cost.description);
    setAmount(cost.amount);
    setEditId(cost.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteOtherCost({ userId: user.uid, costId: id }));
  };

  const totalCost = otherCosts.reduce((sum, c) => sum + c.amount, 0);

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-header">Other Project Costs</div>

        <div className="form-section">
          <div className="coolinput">
            <label className="text">Description:</label>
            <input
              type="text"
              className="input"
              placeholder="Write description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="coolinput">
            <label className="text">Cost:</label>
            <input
              type="number"
              className="input"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button className="add-button" onClick={handleAddOrUpdateCost}>
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <Divider my="xs" />

        <div className="items-list">
          {otherCosts.map((cost) => (
            <div className="item" key={cost.id}>
              <span>
                {cost.description} — ₹{cost.amount}
              </span>
              <div className="actions">
                <button onClick={() => handleEdit(cost)}>✏️</button>
                <button onClick={() => handleDelete(cost.id)}>❌</button>
              </div>
            </div>
          ))}
        </div>

        <Text className="total">
          Total: <span>₹{totalCost}</span>
        </Text>
      </div>
    </StyledWrapper>
  );
};

export default OtherCostsManager;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;

  .card {
    width: 90%;
    background: radial-gradient(circle at 26% 106%, #FFF7B1 0%, #fff 80%);
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
    border-radius: 23px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: all 0.3s ease-in-out;
  }

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
    font-size: 0.9rem;
    color: #818cf8;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .coolinput .input {
    padding: 11px 10px;
    font-size: 0.85rem;
    border: 2px #818cf8 solid;
    border-radius: 5px;
    background: #e8e8e8;
  }

  .coolinput .input:focus {
    outline: none;
  }

  .add-button {
    position: relative;
    padding: 10px 20px;
    border-radius: 7px;
    border: 1px solid rgb(61, 106, 255);
    font-size: 15px;
    font-weight: 600;
    background: transparent;
    color: #333;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.4s ease-in;
    align-self: center;
  }

  .add-button:hover {
    background: rgb(61, 106, 255);
    color: #fff;
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
    background: rgba(255, 255, 255, 0.05);
    border-radius: 5px;
    color:black;
    font-family:'arial';
    font-weight: 600;
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
