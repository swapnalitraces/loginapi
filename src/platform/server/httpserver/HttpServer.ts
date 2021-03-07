export interface IHttpServer {
  registerRoute(path: string, httpMethods: HttpMethod[], handler: any): void;

  listenOn(port: number): void;

  stop(): void;
}

export enum HttpMethod {
  Get,
  Post,
  Put,
  Patch,
  Delete,
}
