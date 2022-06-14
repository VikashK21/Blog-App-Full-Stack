import React from "react";

function ViewBlogs({ value }) {
  return (
    value === "Edit" &&
    <div>
      {value}
      this is the viewing page.
    </div>
  );
}

export default ViewBlogs;
