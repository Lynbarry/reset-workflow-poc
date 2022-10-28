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

export const resetToStep1Signal = defineSignal("resetToStep1");
export const resetToStep2Signal = defineSignal("resetToStep2");
export const resetToStep3Signal = defineSignal("resetToStep3");

export const getStep1Query = defineQuery<boolean>("getStep1");
export const getStep2Query = defineQuery<boolean>("getStep2");
export const getStep3Query = defineQuery<boolean>("getStep3");

const { step1Activity, step2Activity, step3Activity } = proxyActivities<
  ReturnType<typeof createActivities>
>({
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
  setHandler(resetToStep1Signal, () => {
    console.log("resetting to before step 1");
    step1 = false;
    step2 = false;
    step3 = false;
  });
  setHandler(resetToStep2Signal, () => {
    console.log("resetting to before step 2");
    step2 = false;
    step3 = false;
  });
  setHandler(resetToStep3Signal, () => {
    console.log("resetting to before step 3");
    step3 = false;
  });

  setHandler(getStateQuery, () => {
    return {
      step1,
      step2,
      step3,
    };
  });

  while (true) {
    if (!step1 && !step2 && !step3) {
      console.log("workflow started");
      await condition(() => step1);
    } else if (step1 && !step2 && !step3) {
      console.log("before step 1 activity");
      await step1Activity();
      console.log("after step 1 activity");
      await condition(() => step2);
    } else if (step1 && step2 && !step3) {
      console.log("before step 2 activity");
      await step2Activity();
      console.log("after step 2 activity");
      await condition(() => step3);
    } else if (step1 && step2 && step3) {
      console.log("before step 3 activity");
      await step3Activity();
      console.log("after step 3 activity");
      console.log("workflow done");
      return;
    } else {
      console.log("Illegal state, ending workflow");
      return;
    }
  }
}
