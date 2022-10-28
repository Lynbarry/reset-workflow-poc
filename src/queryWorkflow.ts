import { WorkflowClient } from "@temporalio/client";
import { getUuid } from "./uuid";
import { getStateQuery } from "./workflows";

async function run(): Promise<void> {
  const client = new WorkflowClient();
  const uuid = await getUuid();
  const handle = client.getHandle(uuid);
  const state = await handle.query(getStateQuery);
  console.log({ state });
}
// @@@SNIPEND

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
