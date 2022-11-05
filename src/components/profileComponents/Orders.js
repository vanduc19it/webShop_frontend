import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetail } from "../../Redux/Actions/orderActions";
import moment from "moment";
import { Link } from "react-router-dom";
const Orders = (props) => {

const {order} = props;
console.log(order)


  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
     
    {
      !order ? (
      <div className="col-12 alert alert-info text-center mt-3">
        No Orders
        <Link
          className="btn btn-success mx-2 px-3 py-2"
          to="/"
          style={{
            fontSize: "12px",
          }}
        >
          START SHOPPING
        </Link>
      </div> 
      ) : (
        <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>DATE</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {
              order.map((item)=>(
            <tr className={"alert-success"}>
              <td>
                <a href={`/order/${item._id}`} className="link">
                  {item._id}
                </a>
              </td>
              <td>Paid</td>
              <td>{moment(Number(item.createAt)).locale("vi").startOf("second").fromNow() }</td>
              <td>{item.totalPrice}</td>
            </tr>
              ))
            }
            
          </tbody>
        </table>
      </div>
      )
    }
     
    </div>
  );
};

export default Orders;
