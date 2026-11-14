import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createLocalStorageWaterRepository,
} from "../src/data/localStorageWaterRepository.mjs";

test("loads an empty state and saves water for the next load", () => {
  const values = new Map();
  const storage = {
    getItem(key) {
      return values.get(key) ?? null;
    },
    setItem(key, value) {
      values.set(key, value);
    },
  };

  const repository = createLocalStorageWaterRepository(storage);

  assert.deepEqual(repository.load(), { sips: 0, totalMl: 0 });

  repository.save({ sips: 2, totalMl: 32 });
  assert.deepEqual(repository.load(), { sips: 2, totalMl: 32 });
});