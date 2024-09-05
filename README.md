# sock-tech-1
Prototype of customisable market workflow solution.

## Setup:

1. Make sure you have node and npm installed. You can check if node is installed with:

```$ node -v```

and npm with

```$ npm -v```

2. Git clone this repository to your machine.
3. Run the below to install packages:

```$ npm install```

4. Start the server with:

```$ npm run dev```

## Notes:

* The flows are defined in the './flows/' directory.
* The two sample flows required for SockTech marketing have been included in the './flows/' directory.
* I have made the wait time 0.02 minutes rather than 2 hours for testing purposes in file 'flow-1.json'. This can be changed if needed.
* You can bypass waiting for all of the results to finally return by changing the constant `AWAIT_PROMISE` to false.
* I have added a log function for all the steps in the flow to show the progress of the flow. You can see the results at './logs/flow_log.txt'.
