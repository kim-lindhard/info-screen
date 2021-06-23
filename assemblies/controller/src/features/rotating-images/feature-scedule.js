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


const workerHandler = async (doc, context) => {

    const fetchq = context.client;
    console.log(context.name);
    const results = await fetchq.pool.query('SELECT * FROM NOW()');
    // DO DB MAGIC HERE
    // insert into images_scheduled (url, dont_show_before) values ('aaa',current_timestamp + (5 ||' minutes')::interval)

    console.log(results.rows[0]);

    return doc.reschedule("+5s");
  };


const registerWorker = (registerAction, getContext) => registerAction({
    hook: "$FETCHQ_REGISTER_WORKER",
    name: featureName,
    trace: __filename,
    handler: (_, { getContext }) => {
        const fetchq = getContext("fetchq");


        return [
        {
            queue: scheduleImagesQueue,
            handler: workerHandler,
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
    registerWorker(registerAction, getContext);
    startFeature(registerAction,getContext);

  };
  