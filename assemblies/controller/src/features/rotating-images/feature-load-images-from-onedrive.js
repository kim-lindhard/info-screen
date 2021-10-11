const oneDriveAPI = require("onedrive-api");

const featureName = "load-images-from-onedrive"
const service = {
  name: featureName,
  trace: __filename,
};

const getImageUrls = async () => {


const childrens = await oneDriveAPI.items
  .listChildren({
    accessToken:
      "token",
    itemId: "1D3EA2F4A80839BB!115040",
    drive: "me",
    driveId: ""
  });

  let imageUrls = childrens.value.map((obj) => {
    return obj["@microsoft.graph.downloadUrl"];
  });

    return imageUrls;
}


module.exports = ({ registerAction }) => {
  
    registerAction({
      ...service,
      hook: '$INIT_SERVICE',
      handler: ({ setContext }) => {

        setContext('getImageUrls', {
            getImageUrls,
          });
        }
    });
}