import { n as createMiddleware, t as createStart } from "../server.js";
//#region src/start.ts
var myGlobalMiddleware = createMiddleware().server(({ next }) => {
	return next();
});
var startInstance = createStart(() => {
	return {
		requestMiddleware: [myGlobalMiddleware],
		functionMiddleware: []
	};
});
//#endregion
export { startInstance };
