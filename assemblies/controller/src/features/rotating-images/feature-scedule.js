const scheduleImagesQueue = "schedule_images";
const featureName = "image-scheduler"
const registerQueue = (registerAction) =>  registerAction({
    hook: "$FETCHQ_REGISTER_QUEUE",
    name: featureName,
    trace: __filename,
    handler: [
        {
            name: scheduleImagesQueue
        }
    ]
});

const getImageUrl = () => {

    const images = [
        'https://pixabay.com/get/gdd488fc242a6fc24a3c5772f098a9111e06dcd43bf0ec2ef9b491ad4838b92ca8a7a49e38a9afcf7811c117e00099bfa_1280.jpg',
        'https://pixabay.com/get/g53241e98a59fbd04ce6b364a67739d94d3719f6c7163dd92d97f2aed6bc1ca8526e2f30e1106af15fe0cf5c7d0d88c5b_1280.jpg',
        'https://pixabay.com/get/gb134d59cddfbb04339ed594e75bd0d422064be318286c43205c5e4f02fbd076a11f4d84d5521d8c39aa0890e1f3698d9_1280.jpg',
        'https://pixabay.com/get/g6ec5aefbb8875b17125f2398e62346396c4b22f361e0f7c78731c905451152fa7e72b06c32183ecc5c1bc037e49bfccf_1280.jpg',
        'https://pixabay.com/get/geff085c7dee1aaf9397140519d6706c735b37e497e30786387d1d2c0d893321338f3e3d568a261545c54a16efce33b84_1280.jpg',
        'https://pixabay.com/get/g133101f41f04bf849865356dbc366f91622e21811e30ff723640382915a3b4061a806fd94bf7a77c20823e8fa6daa547_1280.jpg',
        'https://pixabay.com/get/geee9ff3c51d35de5227ec3a78d54ba2aa84fb0146705be573f490116d9e53750b57159de9cc34e3f1f08e8d9e0097dfe_1280.jpg',
        'https://pixabay.com/get/g4d53a1068189bd6f6612306da16924d0b09e912ef8b9986cb7957256483385b7c1a454bbc7180b1d15de7a81167588f3_1280.jpg'
    ]
    const image = images[Math.floor(Math.random() * images.length)] 
return image;
}

const scheduleImageInFiveProcess = async (doc, context) => {

    const fetchq = context.client;
    console.log(context.name);

    await fetchq.pool.query(`insert into images_scheduled (url, dont_show_before) values ('${getImageUrl()}',current_timestamp + (5 ||' minutes')::interval)`);

    console.log(results);

    return doc.reschedule("+5s");
  };


const registerWorker = (registerAction) => registerAction({
    hook: "$FETCHQ_REGISTER_WORKER",
    name: featureName,
    trace: __filename,
    handler: () => {
        return [
            {
                queue: scheduleImagesQueue,
                handler: scheduleImageInFiveProcess,
                decorateContext: {name: "Kim"}
            },
        ];
    },
});

const startFeature = (registerAction, getContext) => registerAction({
    hook: "$START_FEATURE",
    name: featureName,
    trace: __filename,
    handler: async () => {
        const fetchq = getContext("fetchq");

        await fetchq.pool.query(`select * from fetchq.queue_truncate('${scheduleImagesQueue}')`);


        fetchq.doc.push(scheduleImagesQueue, {
            payload: { createdAt: Date.now() },
            nextIteration: "-1ms"
        });
    }
});
module.exports = ({ registerAction, getContext }) => {

    registerQueue(registerAction);
    registerWorker(registerAction);
    startFeature(registerAction,getContext);

  };
  