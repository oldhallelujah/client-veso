import React from "react";
import "./loading.css";
export default function LoadingComponent() {
  return (
    <div className="loader-container">
      <div className="loader">
        <img
          src="https://res.cloudinary.com/d24/image/upload/v1617118494/gif/Spinner-1s-204px_mdzkeg.gif"
          alt=""
          width="40%"
        />
      </div>
    </div>
  );
}
