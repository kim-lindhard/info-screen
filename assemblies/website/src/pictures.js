import "./pictures.css";
import React from "react";
import { useSubscription, gql } from "@apollo/client";

const IMAGE_SUBSCRIPTION = gql`
  subscription {
    images_scheduled(limit: 1, order_by: { dont_show_before: desc }) {
      dont_show_before
      url
    }
  }
`;

const CurrentImage = () => {
  const { data } = useSubscription(IMAGE_SUBSCRIPTION);
  if (data) {
    return (
            <img
              src={data.images_scheduled[0].url}
              id="rotatingImage"
              alt=""
            ></img>
    );
  }

  return (<div>Could not display a picture</div>);
};

export default CurrentImage;
