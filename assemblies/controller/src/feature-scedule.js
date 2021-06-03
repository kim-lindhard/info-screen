module.exports = ({ registerAction, getContext }) => {
    // The names of the queues that define this workflow are
    // strings, and strings are obviously treacherous because
    // it is easy to mispell them.
    //
    // In order to reduce fuckups, we can centralize in the
    // application's settings the responsibility to define
    // strings, and we can use ghe `getConfig` API to
    // retrieve those informations all around the application:
    const workflow1 = "workflow1";
  
    // Upsert the queues that are needed in order to
    // support the workflow.
    //
    // NOTE: it is important to enable the notifications
    //       on these queues in order to speedup the
    //       workflow as much as possible.
    registerAction({
      hook: "$FETCHQ_REGISTER_QUEUE",
      name: "workflow",
      trace: __filename,
      handler: [
        {
          name: workflow1
        }
      ]
    });
  
    /**
     * Register the workers that will actually
     * process the queues. Here is where we connect
     * the logic we wrote at the beginning of this file
     * to the happenings in the main app.
     */
  
    registerAction({
      hook: "$START_FEATURE",
      name: "scheduler",
      trace: __filename,
      handler: () => {
        const fetchq = getContext("fetchq");
        //   fetchq.doc.push(workflow1, { a: "1" });
        fetchq.doc.push(workflow1, {
          payload: { createdAt: Date.now() },
          nextIteration: "+2s"
        });
      }
    });
  
    registerAction({
      hook: "$FETCHQ_REGISTER_WORKER",
      name: "scheduler",
      trace: __filename,
      handler: [
        {
          queue: workflow1,
          handler: (doc) => {
            console.log("I handle stuff");

            // DO DB MAGIC HERE
            // insert into images_scheduled (url, dont_show_before) values ('aaa',current_timestamp + (5 ||' minutes')::interval)
            
            // Create hook for getting the schedule interval
            return doc.reschedule("+10s");
          }
        }
      ]
    });
  };
  