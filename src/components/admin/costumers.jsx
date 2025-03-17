import React from 'react'
import '../style/Bills.css'
import TopBar from '../TopBar';
import AdminNavigation from './navigation';

function AllUsers(prop) {
  return (
    <div className=" user-page">
        <TopBar/>
      {/* Title of the bills section */}
      <div className="page">
        <AdminNavigation/>
      

      {/* Table to display the bill details */}
      <div className='curr-page bills-container'>
      <h2>All consumers</h2>
      <table className="bills-table">
        <thead>
          <tr>
            <th>#</th> {/* Serial Number */}
            <th>Connection No</th> {/* Unique Bill ID */}
            <th>Name</th> {/* Total amount to be paid */}
            <th>Mobile No.</th> {/* Number of electricity units consumed */}
            <th>Mail</th> {/* Rate per unit in rupees */}
            <th>Aadhar</th> {/* Bill generation date */}
          </tr>
        </thead>
        <tbody>
          {/* Mapping through the bills array to display each bill as a row */}
          {Object.keys(prop.users).map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Displaying serial number */}
              <td>{prop.users[user].username}</td> {/* Displaying bill number */}
              <td>{prop.users[user].name}</td> {/* Displaying number of units */}
              <td>{prop.users[user].mobile}</td> {/* Displaying rate per unit */}
              <td>{prop.users[user].mail}</td> {/* Displaying total amount */}
              <td>{prop.users[user].aadhar}</td> {/* Displaying bill date */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  )
}

export default AllUsers
