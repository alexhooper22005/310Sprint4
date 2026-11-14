import assert from "node:assert/strict";
import { test } from "node:test";
import { addSip } from "../src/services/addSip.mjs";

test("adding a sip increases the count and estimated water amount", () => {
  const result = addSip({ sips: 0, totalMl: 0 });

  assert.deepEqual(result, { sips: 1, totalMl: 16 });
});