import { WorkflowClient } from "@temporalio/client";
import { temporal } from "@temporalio/proto";
import Long from "long";
import { getUuid } from "./uuid";

async function run(): Promise<void> {
  const client = new WorkflowClient();

  const executionResponses =
    await client.workflowService.listWorkflowExecutions({
      namespace: "default",
    });

  const executionInfos = executionResponses.executions;

  const uuid = await getUuid();
  const executionInfo = executionInfos.find(
    (e) => e.execution?.workflowId === uuid
  );
  const execution = executionInfo?.execution;

  const resetWorkflowExecutionRequest =
    temporal.api.workflowservice.v1.ResetWorkflowExecutionRequest.create({
      namespace: "default",
      workflowExecution: execution,
      reason: "Test",
      workflowTaskFinishEventId: new Long(3),
      requestId: "3",
      resetReapplyType:
        temporal.api.enums.v1.ResetReapplyType.RESET_REAPPLY_TYPE_NONE,
    });

  const response = await client.workflowService.resetWorkflowExecution(
    resetWorkflowExecutionRequest
  );

  console.log(response);
  console.log("Workflow execution reset");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
