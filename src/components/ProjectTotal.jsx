import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectItems } from "../features/itemsSlice";
import { selectOtherCosts } from "../features/otherCostsSlice";

function ProjectTotal() {
  const items = useSelector(selectItems);
  const otherCosts = useSelector(selectOtherCosts);

  const itemTotal = items.reduce((sum, item) => sum + item.cost, 0);
  const otherCostsTotal = otherCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const grandTotal = itemTotal + otherCostsTotal;

  return (
    <StyledWrapper>
      <div className="card">
        <p className="main-title">Project Total</p>
        <div className="totals">
          <p>Items : ₹ <span className="total-style">{itemTotal}</span></p>
          <p>Other Costs : ₹ <span className="total-style">{otherCostsTotal}</span></p>
        </div>
        <p className="grand-total">₹ <span className="total-style">{grandTotal}</span></p>
      </div>
    </StyledWrapper>
  );
}

export default ProjectTotal;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 34px 20px 34px;

  .total-style{
    font-family:'arial';
  }
  
  .card {
    width: 80%;
    background: linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85));
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: center;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    padding: 15px;
  }

  .card:hover {
    transform: scale(1.04);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
  }

  .main-title {
    font-size: 34px;
    font-weight: 700;
    margin: 20px 0 10px 0;
    text-align: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  .main-title:hover{
    transform:scale(1.07);
  }

  .totals {
    font-size: 18px;
    display: flex;
    justify-content: center;
    gap: 100px;
    margin-bottom: 8px;
    font-weight: 600;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .grand-total {
    font-size: 30px;
    text-align: center;
    font-weight: 800;
    color: #F1C40F;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
`;
