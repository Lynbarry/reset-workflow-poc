import {
  condition,
  defineQuery,
  defineSignal,
  proxyActivities,
  setHandler,
} from "@temporalio/workflow";
import { createActivities } from "./activities";

export const step1Signal = defineSignal("step1");
export const step2Signal = defineSignal("step2");
export const step3Signal = defineSignal("step3");

export const getStep1Query = defineQuery<boolean>("getStep1");
export const getStep2Query = defineQuery<boolean>("getStep2");
export const getStep3Query = defineQuery<boolean>("getStep3");

const { logActivity } = proxyActivities<ReturnType<typeof createActivities>>({
  startToCloseTimeout: "2 minutes",
});

interface State {
  step1: boolean;
  step2: boolean;
  step3: boolean;
}

export const getStateQuery = defineQuery<State>("getState");

export async function testReset(): Promise<void> {
  let step1 = false;
  let step2 = false;
  let step3 = false;

  setHandler(step1Signal, () => {
    step1 = true;
  });
  setHandler(step2Signal, () => {
    step2 = true;
  });
  setHandler(step3Signal, () => {
    step3 = true;
  });
  setHandler(getStateQuery, () => {
    return {
      step1,
      step2,
      step3,
    };
  });

  console.log("before step 1");
  await condition(() => step1);
  console.log("after step 1");

  console.log("before log activity");
  await logActivity();
  console.log("after log activity");

  console.log("before step 2");
  await condition(() => step2);
  console.log("after step 2");

  console.log("before step 3");
  await condition(() => step3);
  console.log("after step 3");

  console.log("workflow done");
  return;
}
