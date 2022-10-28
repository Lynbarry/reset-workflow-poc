import fetch from "node-fetch";

export const createActivities = () => ({
  async step1Activity() {
    console.log("step 1 activity started");
    const result = await fetch("https://www.example.com");
    console.log(await result.text());
    console.log("step 1 activity done");
    return true;
  },
  async step2Activity() {
    console.log("step 2 activity started");
    const result = await fetch("https://www.example.com");
    console.log(await result.text());
    console.log("step 2 activity done");
    return true;
  },
  async step3Activity() {
    console.log("step 3 activity started");
    const result = await fetch("https://www.example.com");
    console.log(await result.text());
    console.log("step 3 activity done");
    return true;
  },
});
