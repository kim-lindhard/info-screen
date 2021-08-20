
import React, { Component, Fragment } from "react";
import { useQuery, gql } from "@apollo/client";


const LinkList = () => {
const images_scheduled = [
  {
    "dont_show_before": "2021-08-20T13:02:27.584636+00:00",
    "url": "https://pixabay.com/get/geee9ff3c51d35de5227ec3a78d54ba2aa84fb0146705be573f490116d9e53750b57159de9cc34e3f1f08e8d9e0097dfe_1280.jpg"
  }
];

const Link = (props) => {
  const { link } = props;
  return (
    <div>
      <div>
        {link.dont_show_before} ({link.url})
      </div>
    </div>
  );
};

  return (
    <div>
      {images_scheduled.map((link) => (
        <Link link={link} />
      ))}
    </div>
  );
};

export default LinkList;
