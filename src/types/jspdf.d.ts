import "jspdf";

declare module "jspdf" {
  interface jsPDF {
    html(
      element: HTMLElement,
      options?: {
        callback?: (doc: jsPDF) => void;
        margin?: number;
        x?: number;
        y?: number;
        width?: number;
        windowWidth?: number;
      }
    ): void;
  }
}
