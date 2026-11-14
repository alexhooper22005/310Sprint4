import { createLocalStorageWaterRepository } from "../data/localStorageWaterRepository.mjs";
import { countEquivalentObjects, getComparisonStatus } from "../services/compareWater.mjs";
import { createWaterTracker } from "../services/createWaterTracker.mjs";

export function mountWaterTracker(page, tracker) {
  const addButton = page.querySelector(".add-sip-button");
  const resetButton = page.querySelector(".reset-water-button");
  const waterTotal = page.querySelector("#water-total");
  const waterMl = page.querySelector("#water-ml");
  const objectComparison = page.querySelector("#object-comparison");

  function render(current) {
    waterTotal.textContent = String(current.sips);
    waterMl.textContent = `${current.totalMl} mL estimated`;

    const status = getComparisonStatus(current.totalMl);
    const reachedObject = status.current ?? status.next;
    const amount = countEquivalentObjects(current.totalMl, reachedObject.volumeMl);
    const reachedText = `About ${amount.toFixed(1)} ${reachedObject.name}s`;

    objectComparison.textContent = status.next
      ? `${reachedText}; ${status.progressPercent}% of a ${status.next.name}`
      : reachedText;
  }

  addButton.addEventListener("click", () => {
    render(tracker.addSip());
  });

  resetButton.addEventListener("click", () => {
    render(tracker.reset());
  });

  render(tracker.getCurrent());
}

if (typeof document !== "undefined") {
  const repository = createLocalStorageWaterRepository(window.localStorage);
  const tracker = createWaterTracker(repository);
  mountWaterTracker(document, tracker);
}