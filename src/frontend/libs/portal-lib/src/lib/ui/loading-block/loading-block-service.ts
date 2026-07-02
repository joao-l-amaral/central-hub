import {Injectable, signal} from "@angular/core";

@Injectable()
export class LoadingBlockService {
  readonly loading = signal<boolean>(false);

  show() {
    this.loading.set(true);
  }

  hide() {
    this.loading.set(false);
  }
}
