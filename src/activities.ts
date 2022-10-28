import fetch from "node-fetch";

export const createActivities = () => ({
  async logActivity() {
    console.log("activity started");
    const result = await fetch("https://www.example.com");
    console.log(await result.text());
    console.log("activity done");
    return true;
  },
});
