import { WorkflowClient } from "@temporalio/client";
import { getUuid } from "./uuid";
import { resetToStep1Signal } from "./workflows";

async function run(): Promise<void> {
  const client = new WorkflowClient();

  const uuid = await getUuid();
  const handle = client.getHandle(uuid);

  await handle.signal(resetToStep1Signal);
  console.log("resetToStep1Signal sent");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
