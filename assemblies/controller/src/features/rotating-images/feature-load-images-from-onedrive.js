const featureName = "load-images-from-onedrive"
const service = {
  name: featureName,
  trace: __filename,
};

const getImageUrls = () => {

    const images = [
        'https://cdn.pixabay.com/photo/2021/06/27/14/32/raspberry-6368999_960_720.png',
        'https://cdn.pixabay.com/photo/2021/08/04/14/21/lighthouse-6521858_960_720.jpg',
        'https://cdn.pixabay.com/photo/2021/08/19/16/31/flowers-6558487_960_720.jpg',
        'https://cdn.pixabay.com/photo/2021/08/11/03/19/incense-sticks-6537298_960_720.jpg',
        'https://cdn.pixabay.com/photo/2020/12/16/14/56/farm-5836815_960_720.jpg',
        
    ]
return images;
}


module.exports = ({ registerHook, registerAction }) => {
 //   registerHook(hooks);
  
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