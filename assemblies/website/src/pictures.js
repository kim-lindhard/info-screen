
import React, { Component, Fragment } from "react";
import { useQuery, gql } from "@apollo/client";


const LinkList = () => {

  const FEED_QUERY = gql`
  query {
    images_scheduled(limit: 1) {
      dont_show_before
      url
    }
  }
`;

const data = useQuery(FEED_QUERY);
console.log(data)


  return (
    <div>
    {data && (
      <>
        <pre>{JSON.stringify(data.data, null, 2)}</pre>
  
      </>
    )}
  </div>
);
};

export default LinkList;

