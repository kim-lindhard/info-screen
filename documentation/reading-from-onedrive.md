# Reading from OneDrive

We need:

1. a auth token
2. a client to read from OneDrive

## Auth token
[](https://docs.microsoft.com/en-us/onedrive/developer/rest-api/getting-started/graph-oauth?view=odsp-graph-online)

Register a app at [Microsoft AAD RegisteredApps](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade) 
Use Personal Microsoft accounts only if you are connecting to a personal accounts Onedrive

Select Access tokens (used for implicit flows)
give a redict url http://localhost:8081 is fine


https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=<client_id>&scope=files.readwrite%2coffline_access&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A8081


http://localhost:8081/#access_token=<token>&token_type=bearer&expires_in=3600&scope=Files.ReadWrite




scope=files.readwrite%2coffline_access

https://login.live.com/oauth20_authorize.srf?client_id=<client_id>&scope=files.readwrite%2coffline_access&redirect_uri=http%3a//localhost%3a8081&response_type=token


## Client to read from onedrive

```javascript
const oneDriveAPI = require("onedrive-api");

oneDriveAPI.items
  .listChildren({
    accessToken:
      "<token>",
    drive: "me",
    driveId: ""
  })
  .then((childrens) => {
    let imageUrls = childrens.value.map((obj) => {
      return obj["@microsoft.graph.downloadUrl"];
    });
    console.table(imageUrls);
  });

```