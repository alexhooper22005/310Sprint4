import assert from "node:assert/strict";
import { test } from "node:test";
import { createWaterTracker } from "../src/services/createWaterTracker.mjs";

test("loads saved water and saves the next sip", () => {
  let savedState = { sips: 2, totalMl: 32 };

  const repository = {
    load() {
      return savedState;
    },
    save(state) {
      savedState = state;
    },
  };

  const tracker = createWaterTracker(repository);
  tracker.addSip();

  assert.deepEqual(tracker.getCurrent(), { sips: 3, totalMl: 48 });
  assert.deepEqual(savedState, { sips: 3, totalMl: 48 });
});

test("reset clears the count and saves the empty state", () => {
  let savedState = { sips: 3, totalMl: 48 };

  const repository = {
    load() {
      return savedState;
    },
    save(state) {
      savedState = state;
    },
  };

  const tracker = createWaterTracker(repository);
  tracker.reset();

  assert.deepEqual(tracker.getCurrent(), { sips: 0, totalMl: 0 });
  assert.deepEqual(savedState, { sips: 0, totalMl: 0 });
});