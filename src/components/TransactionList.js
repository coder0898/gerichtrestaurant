import React, { useState,useEffect } from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 100%;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto !important;
  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
  }
`;

const Cell = styled.div`
  background-color: white;
  list-style-type: none;
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
`;

const TransactionList = (props) => {

  const [searchText, setSearchText] = useState("");
  const [filterTransaction, setFilterTransaction] = useState(props.transactions);

  const filterData = (searchText)=>{
    if (!searchText || !searchText.trim().length) {
      setFilterTransaction(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim()),
    );
    setFilterTransaction(txn);
  }

  useEffect(() => {
    filterData(searchText);
  }, [props.transactions]);

  return (
    <ListContainer>
        Recent Transaction 
        <input 
        placeholder='Search...' 
        onChange={(e) => {
          setSearchText(e.target.value);
          filterData(e.target.value);
        }}/>
        {filterTransaction?.map((payload) => (
           <Cell isExpense={payload?.type === "EXPENSE"}>
                <span>{payload?.desc}</span>
                <span>${payload?.amount}</span>
           </Cell>
      ))}
        
    </ListContainer>
  )
}

export default TransactionList;
