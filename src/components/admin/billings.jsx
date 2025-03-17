import React, { useState } from "react";
import TopBar from "../TopBar";
import AdminNavigation from "./navigation";
import '../style/Bills.css'

const AdminBills = (prop) => {
  // State to toggle between paid and pending bills
  const [showPaid, setShowPaid] = useState(false);

  return (
    <div className='user-page'>
    <TopBar/>
    <div className='page'>
      <AdminNavigation/>
      
    <div className=" curr-page container">
    <h2>{showPaid ? "Paid Bills" : "Pending Bills"}</h2>
      {/* Toggle button to switch between Paid and Pending bills */}
      <button className="toggle-button" onClick={() => setShowPaid(!showPaid)}>
        {showPaid ? "Show Pending Bills" : "Show Paid Bills"}
      </button>
      
      {/* Table to display bills based on the selected type */}
      <table className="bills-table">
        <thead>
          <tr>
            {showPaid ? (
              // Headers for Paid Bills
              <>
                <th>Bill No</th>
                <th>Connection No</th>
                <th>Paid Date</th>
                <th>Rate</th>
                <th>Penalty</th>
                <th>Amount</th>
              </>
            ) : (
              // Headers for Pending Bills
              <>
                <th>Bill No</th>
                <th>Connection No</th>
                <th>Bill Date</th>
                <th>Due Date</th>
                <th>Rate</th>
                <th>Penalty</th>
                <th>Amount</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {showPaid
            ? // Display Paid Bills Data
              Object.keys(prop.payedBills).map((username) => (
                prop.payedBills[username].map((bill)=>(
                <tr key={bill.billNo}>
                  <td>{bill.billNumber}</td>
                  <td>{username}</td>
                  <td>{bill.paidDate}</td>
                  <td>{bill.rate}</td>
                  <td>{bill.penalty}</td>
                  <td>{bill.amount}</td>
                </tr>
              ))))
            : // Display Pending Bills Data
              Object.keys(prop.pendingBills).map((username) => 
                (prop.pendingBills[username].map((bill) => (
                <tr key={bill.billNumber}>
                  <td>{bill.billNumber}</td>
                  <td>{username}</td>
                  <td>{bill.date}</td>
                  <td>{bill.dueDate}</td>
                  <td>{bill.rate}</td>
                  <td>{bill.penalty}</td>
                  <td>{bill.amount}</td>
                </tr>
              ))))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default AdminBills;