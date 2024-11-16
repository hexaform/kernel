// @ts-nocheck

import { Controller as Controller_1 } from "./Controller";
  import { CommandBus as CommandBus_1 } from "@hexaform/cqrs";
  import { QueryBus as QueryBus_1 } from "@hexaform/cqrs";
    Object.defineProperty(Controller_1.prototype, "reflect:paramtypes", { get() { return [ CommandBus_1, QueryBus_1 ]; }});

import { HttpResponse as HttpResponse_1 } from "./HttpResponse";
    Object.defineProperty(HttpResponse_1.prototype, "reflect:paramtypes", { get() { return [ "undefined", "undefined" ]; }});

import { HttpError as HttpError_1 } from "./HttpError";
    Object.defineProperty(HttpError_1.prototype, "reflect:paramtypes", { get() { return [ "undefined", "undefined" ]; }});

import { HttpClientError as HttpClientError_1 } from "./HttpClientError";
    Object.defineProperty(HttpClientError_1.prototype, "reflect:paramtypes", { get() { return [ "undefined" ]; }});

import { Kernel as Kernel_1 } from "./Kernel";
  import { Container as Container_1 } from "@hexaform/container";
    Object.defineProperty(Kernel_1.prototype, "reflect:paramtypes", { get() { return [ Container_1 ]; }});

import { HttpKernel as HttpKernel_1 } from "./HttpKernel";
  import { Container as Container_2 } from "@hexaform/container";
    Object.defineProperty(HttpKernel_1.prototype, "reflect:paramtypes", { get() { return [ Container_2 ]; }});

import { HttpRouter as HttpRouter_1 } from "./HttpRouter";

import { HttpServerError as HttpServerError_1 } from "./HttpServerError";
    Object.defineProperty(HttpServerError_1.prototype, "reflect:paramtypes", { get() { return [ "undefined", "undefined" ]; }});

import { ExpressHttpRouter as ExpressHttpRouter_1 } from "./ExpressHttpRouter";
  import { Container as Container_3 } from "@hexaform/container";
  import { Router as Router_1 } from "express";
    Object.defineProperty(ExpressHttpRouter_1.prototype, "reflect:paramtypes", { get() { return [ Container_3, Router_1 ]; }});
    Object.defineProperty(ExpressHttpRouter_1.prototype.getExpressRouter, "reflect:paramtypes", { get() { return [  ]; }});
  import { HttpMethod as HttpMethod_1 } from "./HttpMethod";
    Object.defineProperty(ExpressHttpRouter_1.prototype.addRoute, "reflect:paramtypes", { get() { return [ HttpMethod_1, "undefined", "undefined", "undefined", "undefined" ]; }});

import { ExpressHttpKernel as ExpressHttpKernel_1 } from "./ExpressHttpKernel";
  import { Container as Container_4 } from "@hexaform/container";
    Object.defineProperty(ExpressHttpKernel_1.prototype, "reflect:paramtypes", { get() { return [ Container_4, "undefined" ]; }});
    Object.defineProperty(ExpressHttpKernel_1.prototype.listen, "reflect:paramtypes", { get() { return [  ]; }});
