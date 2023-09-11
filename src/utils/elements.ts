export const greyscaleInput = document.getElementById("greyscale-file-input")! as HTMLInputElement;
export const greyscaleImg = document.getElementById("greyscale-img")! as HTMLImageElement;
export const colourCanvas = document.getElementById("canvas")! as HTMLCanvasElement;
export const colorCtx = colourCanvas.getContext("2d")! as CanvasRenderingContext2D;
export const greyscaleCanvas = document.getElementById("greyscale-canvas")! as HTMLCanvasElement;
export const greyscaleCtx = greyscaleCanvas.getContext("2d")! as CanvasRenderingContext2D;
export const convertBtn = document.getElementById("convert-btn")! as HTMLButtonElement;
export const downloadLink = document.getElementById("download")! as HTMLAnchorElement;
