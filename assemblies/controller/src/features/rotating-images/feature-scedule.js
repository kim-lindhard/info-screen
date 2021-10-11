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

const scheduleImageInFiveProcess = async (doc, context) => {

    const fetchq = context.client;
    
    const imageUrls = await context.getContext("getImageUrls").getImageUrls();
    
    const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)] 


    console.log(imageUrl);

    await fetchq.pool.query(`insert into images_scheduled (url, dont_show_before) values ('${imageUrl}',current_timestamp + (0 ||' minutes')::interval)`);
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
    registerWorker(registerAction,getContext);
    startFeature(registerAction,getContext);

  };
  