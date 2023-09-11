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
