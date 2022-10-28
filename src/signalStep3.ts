import { WorkflowClient } from "@temporalio/client";
import { getUuid } from "./uuid";
import { step3Signal } from "./workflows";

async function run(): Promise<void> {
  const client = new WorkflowClient();

  const uuid = await getUuid();
  const handle = client.getHandle(uuid);

  await handle.signal(step3Signal);
  console.log("step3SignalSent");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
