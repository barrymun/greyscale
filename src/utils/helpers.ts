export const toggleBtnVisibility = ({ btn, isVisible }: { btn: HTMLButtonElement; isVisible: boolean }): void => {
  Object.assign(btn.style, isVisible ? { display: "block" } : { display: "none" });
};
