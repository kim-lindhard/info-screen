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
/* const registerWorker = (registerAction, getContext) => registerAction({
    hook: "$FETCHQ_REGISTER_WORKER",
    name: "scheduler",
    trace: __filename,
    handler: [
        {
            queue: workflow1,
            handler: async (doc) => {
                console.log("I handle stuff", doc.payload);

                // DO DB MAGIC HERE
                // insert into images_scheduled (url, dont_show_before) values ('aaa',current_timestamp + (5 ||' minutes')::interval)

                // Create hook for getting the schedule interval

                //fetchq.query(q1);
                const fetchq = getContext("fetchq");
                const results = await fetchq.query('SELECT * FROM NOW()');

                console.log(`The time: ${results.rows[0].now}`);

                return doc.reschedule("+10s");
            }
        }
    ]
}); */

const createWorkerHandler = (ctx) => async (doc) => {
    console.log(">createWorkerHandler")
    const fetchq = ctx.fetchq;
    const results = await fetchq.pool.query('SELECT * FROM NOW()');
    console.log(results);

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
            handler: createWorkerHandler({
            fetchq
            }),
        },
        ];
    },
});

const startFeature = (registerAction, getContext) => registerAction({
    hook: "$START_FEATURE",
    name: "scheduler",
    trace: __filename,
    handler: () => {
        const fetchq = getContext("fetchq");
        fetchq.doc.push(workflow1, {
            payload: { createdAt: Date.now() },
            nextIteration: "+2s"
        });
    }
});
module.exports = ({ registerAction, getContext }) => {

    registerQueue(registerAction);
    registerWorker(registerAction, getContext);
    startFeature(registerAction,getContext);

  };
  