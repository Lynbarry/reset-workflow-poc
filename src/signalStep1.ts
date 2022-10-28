import { WorkflowClient } from "@temporalio/client";
import { getUuid } from "./uuid";
import { step1Signal } from "./workflows";

async function run(): Promise<void> {
  const client = new WorkflowClient();

  const uuid = await getUuid();
  const handle = client.getHandle(uuid);

  await handle.signal(step1Signal);
  console.log("step1SignalSent");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
