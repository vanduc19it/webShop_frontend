import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const {pages, page} = props;
  console.log(pages,typeof page);

  return (
    pages > 1 && (
      <nav>
      <ul className="pagination justify-content-center">
        {[...Array(pages).keys()].map((x) => (
          <li className={`page-item ${x + 1 === Number(page) ? "active" : ""}`} key={x + 1}>
            <Link className="page-link" to={`/page/${x + 1}`}>
              {x + 1}
            </Link>
          </li>
          ))}
      </ul>
    </nav>
    )
   
  );
};

export default Pagination;
