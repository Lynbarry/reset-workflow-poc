import { WorkflowClient } from "@temporalio/client";
import { getUuid } from "./uuid";
import { resetToStep3Signal } from "./workflows";

async function run(): Promise<void> {
  const client = new WorkflowClient();

  const uuid = await getUuid();
  const handle = client.getHandle(uuid);

  await handle.signal(resetToStep3Signal);
  console.log("resetToStep3Signal sent");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
