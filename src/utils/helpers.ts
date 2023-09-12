import { selectedFileName } from "utils/elements";

/**
 * Toggles the visibility of a given HTMLElement based on the `isVisible` parameter.
 *
 * @param {Object} params - Parameters object.
 * @param {HTMLElement} params.el - The HTML element whose visibility needs to be toggled.
 * @param {boolean} params.isVisible - A boolean indicating whether the element should be visible (`true`) or hidden (`false`).
 *
 * @example
 * toggleElementVisibility({ el: document.getElementById('myElement'), isVisible: true });  // Displays the element with id 'myElement'
 * toggleElementVisibility({ el: document.getElementById('myElement'), isVisible: false }); // Hides the element with id 'myElement'
 */
export const toggleElementVisibility = ({ el, isVisible }: { el: HTMLElement; isVisible: boolean }): void => {
  Object.assign(el.style, isVisible ? { display: "block" } : { display: "none" });
};

/**
 * Displays the name of the selected file from an input element. If no file is selected,
 * it displays a default message indicating that no file has been chosen.
 *
 * @param {Event} event - The event triggered from a file input change.
 * @throws {TypeError} If the event target is not an instance of HTMLInputElement.
 *
 * @example
 * <input type="file" onchange="displayFileName(event)">
 * <div id="selectedFileName"></div>
 */
export const displayFileName = (event: Event) => {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    selectedFileName.textContent = input.files[0].name;
  } else {
    selectedFileName.textContent = "No file chosen";
  }
};

/**
 * this function is not used in the project
 * leaving it here for future reference
 */
export const resizeCanvas = ({
  targetCanvas,
  newWidth,
  newHeight,
}: {
  targetCanvas: HTMLCanvasElement;
  newWidth: number;
  newHeight: number;
}): void => {
  // Get canvas context
  const ctx = targetCanvas.getContext("2d")!;

  // Step 1: Create a temporary canvas and context
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d")!;
  tempCanvas.width = targetCanvas.width;
  tempCanvas.height = targetCanvas.height;

  // Copy the content of the original canvas onto the temporary canvas
  tempCtx.drawImage(targetCanvas, 0, 0);

  // Step 2: Resize the original canvas
  targetCanvas.width = newWidth;
  targetCanvas.height = newHeight;

  // Step 3: Draw the content of the temporary canvas back onto the resized original canvas
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, newWidth, newHeight);
};
