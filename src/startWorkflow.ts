import { WorkflowClient } from "@temporalio/client";
import { v4 as uuidv4 } from "uuid";
import { testReset } from "./workflows";
import { writeFile } from "fs/promises";
import { createUuid } from "./uuid";

async function run(): Promise<void> {
  const client = new WorkflowClient();
  const uuid = await createUuid();

  const _handle = await client.start(testReset, {
    taskQueue: "state",
    workflowId: uuid,
  });

  console.log(
    `Workflow '${uuid}' started. You can now signal, query, or cancel it.`
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
