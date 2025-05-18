export interface AppState {
  locale: string;
  serviceType: string;
  deliveryMethod: string;
  deviceType: string;
  dialog :DialogState,
}

export interface DialogState {
  component: string;
  show: boolean;
  options: {};
  data: object | []
}