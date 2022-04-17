export {};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    adsbygoogle?: Array<any>;
  }

  interface Share {
    share(params: ShareAPIParams): Promise<void>;
  }

  interface Navigator extends Share {}
}
