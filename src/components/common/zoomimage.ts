/*
 * Types
 */

interface ZoomConfig {
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  zoomSpeed?: number;
}

interface ZoomDefaults extends Required<ZoomConfig> {}

/*
 * Constants
 */

const Default: ZoomDefaults = {
  initialZoom: 3,
  minZoom: 1.25,
  maxZoom: 1.5,
  zoomSpeed: 0.01,
};

/*
 * Class definition
 */

export class Zoomable {
  private element: HTMLElement;
  private config: ZoomDefaults;
  private zoomed: boolean;
  private initialZoom: number;
  private zoom: number;
  private img: HTMLImageElement | null;

  constructor(element: HTMLElement, config?: ZoomConfig) {
    this.element = element;
    this.config = this._mergeConfig(config);

    const { initialZoom, minZoom, maxZoom } = this.config;

    this.zoomed = false;
    this.initialZoom = Math.max(Math.min(initialZoom, maxZoom), minZoom);
    this.zoom = this.initialZoom;

    this.img = this.element.querySelector(
      ".zoomable__img"
    ) as HTMLImageElement | null;
    if (this.img) this.img.draggable = false;

    this.element.style.setProperty("--zoom", this.initialZoom.toString());

    this._addEventListeners();
  }

  static get Default(): ZoomDefaults {
    return Default;
  }

  private _addEventListeners(): void {
    this.element.addEventListener("mouseover", () => this._handleMouseover());
    this.element.addEventListener("mousemove", (evt: MouseEvent) =>
      this._handleMousemove(evt)
    );
    this.element.addEventListener("mouseout", () => this._handleMouseout());

    // Optional: Enable if using scroll zoom
    // this.element.addEventListener("wheel", (evt: WheelEvent) => this._handleWheel(evt));

    this.element.addEventListener(
      "touchstart",
      (evt: TouchEvent) => this._handleTouchstart(evt),
      { passive: false }
    );
    this.element.addEventListener(
      "touchmove",
      (evt: TouchEvent) => this._handleTouchmove(evt),
      { passive: false }
    );
    this.element.addEventListener("touchend", () => this._handleTouchend());
  }

  private _handleMouseover(): void {
    if (this.zoomed) return;

    this.element.classList.add("zoomable__zoomed");
    this.zoomed = true;
  }

  private _handleMousemove(evt: MouseEvent): void {
    if (!this.zoomed) return;

    const elPos = this.element.getBoundingClientRect();

    const percentageX = `${((evt.clientX - elPos.left) * 100) / elPos.width}%`;
    const percentageY = `${((evt.clientY - elPos.top) * 100) / elPos.height}%`;

    this.element.style.setProperty("--zoom-pos-x", percentageX);
    this.element.style.setProperty("--zoom-pos-y", percentageY);
  }

  private _handleMouseout(): void {
    if (!this.zoomed) return;

    this.element.style.setProperty("--zoom", this.initialZoom.toString());
    this.element.classList.remove("zoomable__zoomed");

    this.zoomed = false;
  }

  private _handleWheel(evt: WheelEvent): void {
    if (!this.zoomed) return;

    evt.preventDefault();

    const delta = evt.deltaY * (this.config.zoomSpeed ?? 0.01);
    const newZoom = this.zoom - delta;
    const { minZoom, maxZoom } = this.config;

    this.zoom = Math.max(Math.min(newZoom, maxZoom), minZoom);
    this.element.style.setProperty("--zoom", this.zoom.toString());
  }

  private _handleTouchstart(evt: TouchEvent): void {
    evt.preventDefault();
    this._handleMouseover();
  }

  private _handleTouchmove(evt: TouchEvent): void {
    if (!this.zoomed || evt.touches.length === 0) return;

    const elPos = this.element.getBoundingClientRect();
    let percentageX =
      ((evt.touches[0].clientX - elPos.left) * 100) / elPos.width;
    let percentageY =
      ((evt.touches[0].clientY - elPos.top) * 100) / elPos.height;

    percentageX = Math.max(Math.min(percentageX, 100), 0);
    percentageY = Math.max(Math.min(percentageY, 100), 0);

    this.element.style.setProperty("--zoom-pos-x", `${percentageX}%`);
    this.element.style.setProperty("--zoom-pos-y", `${percentageY}%`);
  }

  private _handleTouchend(): void {
    this._handleMouseout();
  }

  private _mergeConfig(config?: ZoomConfig): ZoomDefaults {
    return {
      ...Zoomable.Default,
      ...(typeof config === "object" ? config : {}),
    };
  }
}
