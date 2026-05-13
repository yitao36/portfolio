import { createContext, useEffect, useState } from "react";
import { HeadContent, Outlet, ScriptOnce, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/theme.tsx
var ThemeContext = createContext(void 0);
var setupPreferredListener = () => {
	throw new Error("createClientOnlyFn() functions can only be called on the client!");
};
function ThemeProvider({ children }) {
	const [userTheme, setUserTheme] = useState(getStoredTheme());
	useEffect(() => {
		if (userTheme === "system") return setupPreferredListener(userTheme);
	}, []);
	useEffect(() => {
		if (userTheme === "system") return setupPreferredListener(userTheme);
	}, [userTheme]);
	return /* @__PURE__ */ jsxs(ThemeContext, {
		value: {
			userTheme,
			systemTheme: userTheme === "system" ? getSystemTheme() : userTheme,
			setTheme: setUserTheme
		},
		children: [/* @__PURE__ */ jsx(ScriptOnce, { children: themeScript }), children]
	});
}
var getStoredTheme = () => "system";
var getSystemTheme = () => "dark";
var themeScript = `(${function() {
	try {
		const theme = localStorage.getItem("theme") || "auto";
		const resolved = theme === "auto" ? matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : theme;
		document.documentElement.classList.add(resolved);
		const darkTheme = {
			name: "dark",
			colorScheme: "dark",
			cssVariables: {
				"--color-background": "#121212",
				"--color-text": "#ffffff",
				"--color-primary": "#007bff",
				"--color-secondary": "#6c757d",
				"--color-accent": "#dc3545",
				"--color-error": "#dc3545"
			}
		};
		const lightTheme = {
			name: "light",
			colorScheme: "light",
			cssVariables: {
				"--color-background": "#ffffff",
				"--color-text": "#000000",
				"--color-primary": "#007bff",
				"--color-secondary": "#6c757d",
				"--color-accent": "#dc3545",
				"--color-error": "#dc3545"
			}
		};
		switch (resolved) {
			case "dark":
				Object.entries(darkTheme.cssVariables).forEach(([key, value]) => {
					document.documentElement.style.setProperty(key, value);
				});
				break;
			case "light":
				Object.entries(lightTheme.cssVariables).forEach(([key, value]) => {
					document.documentElement.style.setProperty(key, value);
				});
				break;
		}
	} catch (e) {}
}.toString()})()`;
//#endregion
//#region src/routes/__root.tsx
var Route$1 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TanStack Start Starter" }
		],
		links: [{
			href: "src/styles.css",
			rel: "stylesheet"
		}]
	}),
	component: RootComponent
});
function RootComponent() {
	return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter = () => import("./routes-DmZDoXeR.js");
/** The main portfolio page. */
//#endregion
//#region src/routeTree.gen.ts
var rootRouteChildren = { IndexRoute: createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") }).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultNotFoundComponent: ((props) => (console.log(`Not found: ${props.routeId} + ${props.data}`), /* @__PURE__ */ jsxs("p", { children: ["Not Found: ", props.routeId] })))
	});
}
//#endregion
export { getRouter };
