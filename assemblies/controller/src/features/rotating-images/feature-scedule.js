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
        'https://cdn.pixabay.com/photo/2021/06/27/14/32/raspberry-6368999_960_720.png',
        'https://cdn.pixabay.com/photo/2021/08/04/14/21/lighthouse-6521858_960_720.jpg',
        'https://cdn.pixabay.com/photo/2021/08/19/16/31/flowers-6558487_960_720.jpg',
        'https://cdn.pixabay.com/photo/2021/08/11/03/19/incense-sticks-6537298_960_720.jpg',
        'https://cdn.pixabay.com/photo/2020/12/16/14/56/farm-5836815_960_720.jpg',
        
    ]
    const image = images[Math.floor(Math.random() * images.length)] 
return image;
}

const scheduleImageInFiveProcess = async (doc, context) => {

    const fetchq = context.client;
    console.log(context.name);

    await fetchq.pool.query(`insert into images_scheduled (url, dont_show_before) values ('${getImageUrl()}',current_timestamp + (1 ||' minutes')::interval)`);
    return doc.reschedule("+10s");
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
  