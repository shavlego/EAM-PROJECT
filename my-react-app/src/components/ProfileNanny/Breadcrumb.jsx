import React from "react";

function Breadcrumb() {
  return (
    <div className="container d-flex align-items-center">
      <nav aria-label="breadcrumb" className="flex-grow-1">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="/">Αρχική</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Προφίλ Νταντάς
          </li>
        </ol>
      </nav>
    </div>
  );
}

export default Breadcrumb;
