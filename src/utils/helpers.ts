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
