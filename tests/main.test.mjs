import assert from "node:assert/strict";
import { test } from "node:test";
import { mountWaterTracker } from "../src/ui/main.mjs";

test("clicking Add a sip updates the count and estimated water amount", () => {
  let clickHandler;
  let current = { sips: 0, totalMl: 0 };

  const button = {
    addEventListener(event, handler) {
      if (event === "click") clickHandler = handler;
    },
  };
  const resetButton = { addEventListener() {} };
  const waterTotal = { textContent: "0" };
  const waterMl = { textContent: "0 ml estimated" };
  const objectComparison = { textContent: "" };

  const elements = {
    ".add-sip-button": button,
    ".reset-water-button": resetButton,
    "#water-total": waterTotal,
    "#water-ml": waterMl,
    "#object-comparison": objectComparison,
  };
  const page = {
    querySelector(selector) {
      return elements[selector];
    },
  };
  const tracker = {
    getCurrent() {
      return current;
    },
    addSip() {
      current = { sips: current.sips + 1, totalMl: current.totalMl + 16 };
      return current;
    },
    reset() {
      current = { sips: 0, totalMl: 0 };
      return current;
    },
  };

  mountWaterTracker(page, tracker);
  clickHandler();

  assert.equal(waterTotal.textContent, "1");
  assert.equal(waterMl.textContent, "16 mL estimated");
  assert.equal(
    objectComparison.textContent,
    "About 1.1 tablespoons; 11% of a teacup",
  );
});

test("clicking Reset clears the displayed water total", () => {
  let resetHandler;
  let current = { sips: 2, totalMl: 32 };

  const addButton = { addEventListener() {} };
  const resetButton = {
    addEventListener(event, handler) {
      if (event === "click") resetHandler = handler;
    },
  };
  const waterTotal = { textContent: "" };
  const waterMl = { textContent: "" };
  const objectComparison = { textContent: "" };

  const elements = {
    ".add-sip-button": addButton,
    ".reset-water-button": resetButton,
    "#water-total": waterTotal,
    "#water-ml": waterMl,
    "#object-comparison": objectComparison,
  };
  const page = {
    querySelector(selector) {
      return elements[selector];
    },
  };
  const tracker = {
    getCurrent() {
      return current;
    },
    addSip() {
      return current;
    },
    reset() {
      current = { sips: 0, totalMl: 0 };
      return current;
    },
  };

  mountWaterTracker(page, tracker);
  resetHandler();

  assert.equal(waterTotal.textContent, "0");
  assert.equal(waterMl.textContent, "0 mL estimated");
});
