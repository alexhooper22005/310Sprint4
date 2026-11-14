import assert from "node:assert/strict";
import { test } from "node:test";
import {
  countEquivalentObjects,
  getComparisonObject,
  getComparisonStatus,
} from "../src/services/compareWater.mjs";

test("calculates how many measuring tablespoons match the water amount", () => {
  const result = countEquivalentObjects(16, 15);

  assert.equal(result, 16 / 15);
});

test("chooses the largest object reached by the water amount", () => {
  assert.deepEqual(getComparisonObject(16), {
    name: "tablespoon",
    volumeMl: 15,
  });
});

test("returns no object before reaching the smallest object's volume", () => {
  assert.equal(getComparisonObject(4), null);
});

test("advances to a teacup at 150 mL", () => {
  assert.deepEqual(getComparisonObject(150), {
    name: "teacup",
    volumeMl: 150,
  });
});

test("reports the reached object and progress toward the next one", () => {
  assert.deepEqual(getComparisonStatus(16), {
    current: { name: "tablespoon", volumeMl: 15 },
    next: { name: "teacup", volumeMl: 150 },
    progressPercent: 11,
  });
});