
import React from "react";
import { useQuery, gql } from "@apollo/client";


const IMAGE_QUERY = gql`
  query {
    images_scheduled(limit: 1, order_by: {dont_show_before: desc}) {
      dont_show_before
      url
    }
  }
`;

const CurrentImage = () => {

  const {data} = useQuery(IMAGE_QUERY);

  return (
      <div>
      {data && (
        <>
          <pre>{JSON.stringify(data
            , null, 2)}</pre>
    
        </>
      )}
    </div>
  );
};

export default CurrentImage;