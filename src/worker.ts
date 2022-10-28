import { Worker } from "@temporalio/worker";
import { createActivities } from "./activities";

async function run() {
  const activities = createActivities();
  const worker = await Worker.create({
    workflowsPath: require.resolve("./workflows"),
    activities,
    taskQueue: "state",
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
