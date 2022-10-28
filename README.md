# POC project for workflow resets

To reproduce:

## Start Worker

```
yarn worker:start
```

## Start Workflow

```
yarn workflow:start
```

## Query Workflow

```
yarn workflow:query
```

Expected output:

```json
{ "state": { "step1": false, "step2": false, "step3": false } }
```

## Step 1

```
yarn workflow:step1
```

## Query Workflow

```
yarn workflow:query
```

Expected output:

```json
{ "state": { "step1": true, "step2": false, "step3": false } }
```

## Reset Workflow

```bash
cat uuid | xargs -I{} tctl workflow reset --workflow_id {} --reason Test-Reset --event_id 3
```

## Query Workflow

```
yarn workflow:query
```

Expected output:

```json
{ "state": { "step1": false, "step2": false, "step3": false } }
```

## Query Workflow

```
yarn workflow:query
```

Actual output:

```json
{ "state": { "step1": true, "step2": false, "step3": false } }
```
