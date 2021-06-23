const workflow1 = "workflow1";

const registerQueue = (registerAction) =>  registerAction({
    hook: "$FETCHQ_REGISTER_QUEUE",
    name: "workflow",
    trace: __filename,
    handler: [
        {
            name: workflow1
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
    name: "scheduler",
    trace: __filename,
    handler: (_, { getContext }) => {
        const fetchq = getContext("fetchq");


        return [
        {
            queue: workflow1,
            handler: workerHandler,
            decorateContext: {name: "Kim"}
        },
        ];
    },
});

const startFeature = (registerAction, getContext) => registerAction({
    hook: "$START_FEATURE",
    name: "scheduler",
    trace: __filename,
    handler: async () => {
        const fetchq = getContext("fetchq");

        await fetchq.pool.query(`select * from fetchq.queue_truncate('workflow1')`);


        fetchq.doc.push(workflow1, {
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
  