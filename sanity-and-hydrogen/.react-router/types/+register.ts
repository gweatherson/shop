import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }

  interface Future {
    unstable_middleware: false
  }
}

type Params = {
  "/": {};
  "/products/:handle": {
    "handle": string;
  };
  "/resource/preview": {};
  "/collections/all": {};
  "/graphiql": {};
  "/subrequest-profiler": {};
};