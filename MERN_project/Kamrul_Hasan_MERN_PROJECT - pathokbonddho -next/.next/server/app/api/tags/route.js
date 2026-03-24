/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/tags/route";
exports.ids = ["app/api/tags/route"];
exports.modules = {

/***/ "mysql2":
/*!*************************!*\
  !*** external "mysql2" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("mysql2");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = import("sequelize");;

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftags%2Froute&page=%2Fapi%2Ftags%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftags%2Froute.js&appDir=C%3A%5CUsers%5C80509%5CDocuments%5CGitHub%5CReact_Js%5CMERN_project%5CKamrul_Hasan_MERN_PROJECT%20-%20pathokbonddho%20-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5C80509%5CDocuments%5CGitHub%5CReact_Js%5CMERN_project%5CKamrul_Hasan_MERN_PROJECT%20-%20pathokbonddho%20-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftags%2Froute&page=%2Fapi%2Ftags%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftags%2Froute.js&appDir=C%3A%5CUsers%5C80509%5CDocuments%5CGitHub%5CReact_Js%5CMERN_project%5CKamrul_Hasan_MERN_PROJECT%20-%20pathokbonddho%20-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5C80509%5CDocuments%5CGitHub%5CReact_Js%5CMERN_project%5CKamrul_Hasan_MERN_PROJECT%20-%20pathokbonddho%20-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_80509_Documents_GitHub_React_Js_MERN_project_Kamrul_Hasan_MERN_PROJECT_pathokbonddho_next_app_api_tags_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/tags/route.js */ \"(rsc)/./app/api/tags/route.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([C_Users_80509_Documents_GitHub_React_Js_MERN_project_Kamrul_Hasan_MERN_PROJECT_pathokbonddho_next_app_api_tags_route_js__WEBPACK_IMPORTED_MODULE_3__]);\nC_Users_80509_Documents_GitHub_React_Js_MERN_project_Kamrul_Hasan_MERN_PROJECT_pathokbonddho_next_app_api_tags_route_js__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/tags/route\",\n        pathname: \"/api/tags\",\n        filename: \"route\",\n        bundlePath: \"app/api/tags/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\80509\\\\Documents\\\\GitHub\\\\React_Js\\\\MERN_project\\\\Kamrul_Hasan_MERN_PROJECT - pathokbonddho -next\\\\app\\\\api\\\\tags\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_80509_Documents_GitHub_React_Js_MERN_project_Kamrul_Hasan_MERN_PROJECT_pathokbonddho_next_app_api_tags_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ0YWdzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ0YWdzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdGFncyUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUM4MDUwOSU1Q0RvY3VtZW50cyU1Q0dpdEh1YiU1Q1JlYWN0X0pzJTVDTUVSTl9wcm9qZWN0JTVDS2FtcnVsX0hhc2FuX01FUk5fUFJPSkVDVCUyMC0lMjBwYXRob2tib25kZGhvJTIwLW5leHQlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1QzgwNTA5JTVDRG9jdW1lbnRzJTVDR2l0SHViJTVDUmVhY3RfSnMlNUNNRVJOX3Byb2plY3QlNUNLYW1ydWxfSGFzYW5fTUVSTl9QUk9KRUNUJTIwLSUyMHBhdGhva2JvbmRkaG8lMjAtbmV4dCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDc0Y7QUFDbks7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGLHFDIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXDgwNTA5XFxcXERvY3VtZW50c1xcXFxHaXRIdWJcXFxcUmVhY3RfSnNcXFxcTUVSTl9wcm9qZWN0XFxcXEthbXJ1bF9IYXNhbl9NRVJOX1BST0pFQ1QgLSBwYXRob2tib25kZGhvIC1uZXh0XFxcXGFwcFxcXFxhcGlcXFxcdGFnc1xcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdGFncy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3RhZ3NcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3RhZ3Mvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFw4MDUwOVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXFJlYWN0X0pzXFxcXE1FUk5fcHJvamVjdFxcXFxLYW1ydWxfSGFzYW5fTUVSTl9QUk9KRUNUIC0gcGF0aG9rYm9uZGRobyAtbmV4dFxcXFxhcHBcXFxcYXBpXFxcXHRhZ3NcXFxccm91dGUuanNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftags%2Froute&page=%2Fapi%2Ftags%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftags%2Froute.js&appDir=C%3A%5CUsers%5C80509%5CDocuments%5CGitHub%5CReact_Js%5CMERN_project%5CKamrul_Hasan_MERN_PROJECT%20-%20pathokbonddho%20-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5C80509%5CDocuments%5CGitHub%5CReact_Js%5CMERN_project%5CKamrul_Hasan_MERN_PROJECT%20-%20pathokbonddho%20-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/tags/route.js":
/*!*******************************!*\
  !*** ./app/api/tags/route.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_models_tag_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/models/tag-model */ \"(rsc)/./lib/models/tag-model.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_models_tag_model__WEBPACK_IMPORTED_MODULE_1__]);\n_lib_models_tag_model__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nasync function GET() {\n    try {\n        const tags = await _lib_models_tag_model__WEBPACK_IMPORTED_MODULE_1__[\"default\"].findAll({\n            where: {\n                status: true\n            },\n            order: [\n                [\n                    'name',\n                    'ASC'\n                ]\n            ]\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(tags, {\n            status: 200\n        });\n    } catch (error) {\n        console.error(\"Get Tags Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Internal Server Error\"\n        }, {\n            status: 500\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3RhZ3Mvcm91dGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTJDO0FBQ0Y7QUFFbEMsZUFBZUU7SUFDbEIsSUFBSTtRQUNBLE1BQU1DLE9BQU8sTUFBTUYsNkRBQUdBLENBQUNHLE9BQU8sQ0FBQztZQUMzQkMsT0FBTztnQkFBRUMsUUFBUTtZQUFLO1lBQ3RCQyxPQUFPO2dCQUFDO29CQUFDO29CQUFRO2lCQUFNO2FBQUM7UUFDNUI7UUFFQSxPQUFPUCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUFDTCxNQUFNO1lBQUVHLFFBQVE7UUFBSTtJQUNqRCxFQUFFLE9BQU9HLE9BQU87UUFDWkMsUUFBUUQsS0FBSyxDQUFDLG1CQUFtQkE7UUFDakMsT0FBT1QscURBQVlBLENBQUNRLElBQUksQ0FDcEI7WUFBRUcsU0FBUztRQUF3QixHQUNuQztZQUFFTCxRQUFRO1FBQUk7SUFFdEI7QUFDSiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFw4MDUwOVxcRG9jdW1lbnRzXFxHaXRIdWJcXFJlYWN0X0pzXFxNRVJOX3Byb2plY3RcXEthbXJ1bF9IYXNhbl9NRVJOX1BST0pFQ1QgLSBwYXRob2tib25kZGhvIC1uZXh0XFxhcHBcXGFwaVxcdGFnc1xccm91dGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgVGFnIGZyb20gJ0AvbGliL21vZGVscy90YWctbW9kZWwnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdGFncyA9IGF3YWl0IFRhZy5maW5kQWxsKHtcclxuICAgICAgICAgICAgd2hlcmU6IHsgc3RhdHVzOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIG9yZGVyOiBbWyduYW1lJywgJ0FTQyddXVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24odGFncywgeyBzdGF0dXM6IDIwMCB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkdldCBUYWdzIEVycm9yOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgICAgICB7IG1lc3NhZ2U6IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIgfSxcclxuICAgICAgICAgICAgeyBzdGF0dXM6IDUwMCB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiVGFnIiwiR0VUIiwidGFncyIsImZpbmRBbGwiLCJ3aGVyZSIsInN0YXR1cyIsIm9yZGVyIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/tags/route.js\n");

/***/ }),

/***/ "(rsc)/./lib/db/sequelize.js":
/*!*****************************!*\
  !*** ./lib/db/sequelize.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   sequelize: () => (/* binding */ sequelize)\n/* harmony export */ });\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var mysql2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mysql2 */ \"mysql2\");\n/* harmony import */ var mysql2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mysql2__WEBPACK_IMPORTED_MODULE_1__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([sequelize__WEBPACK_IMPORTED_MODULE_0__]);\nsequelize__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nlet sequelize = null;\nconst getSequelizeInstance = ()=>{\n    if (sequelize) {\n        return sequelize;\n    }\n    sequelize = new sequelize__WEBPACK_IMPORTED_MODULE_0__.Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {\n        host: process.env.MYSQL_HOST,\n        port: process.env.MYSQL_PORT || 3306,\n        dialect: 'mysql',\n        dialectModule: (mysql2__WEBPACK_IMPORTED_MODULE_1___default()),\n        dialectOptions: {\n            charset: 'utf8mb4'\n        },\n        define: {\n            charset: 'utf8mb4',\n            collate: 'utf8mb4_unicode_ci',\n            timestamps: true,\n            underscored: false,\n            freezeTableName: true\n        },\n        pool: {\n            max: 5,\n            min: 0,\n            acquire: 30000,\n            idle: 10000\n        },\n        logging: false,\n        sync: {\n            force: false,\n            alter: false\n        }\n    });\n    return sequelize;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getSequelizeInstance);\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIvc2VxdWVsaXplLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXNDO0FBQ1Y7QUFFNUIsSUFBSUUsWUFBWTtBQUVoQixNQUFNQyx1QkFBdUI7SUFDM0IsSUFBSUQsV0FBVztRQUNiLE9BQU9BO0lBQ1Q7SUFFQUEsWUFBWSxJQUFJRixnREFBU0EsQ0FDdkJJLFFBQVFDLEdBQUcsQ0FBQ0MsY0FBYyxFQUMxQkYsUUFBUUMsR0FBRyxDQUFDRSxVQUFVLEVBQ3RCSCxRQUFRQyxHQUFHLENBQUNHLGNBQWMsRUFDMUI7UUFDRUMsTUFBTUwsUUFBUUMsR0FBRyxDQUFDSyxVQUFVO1FBQzVCQyxNQUFNUCxRQUFRQyxHQUFHLENBQUNPLFVBQVUsSUFBSTtRQUNoQ0MsU0FBUztRQUNUQyxlQUFlYiwrQ0FBTUE7UUFDckJjLGdCQUFnQjtZQUNkQyxTQUFTO1FBQ1g7UUFDQUMsUUFBUTtZQUNORCxTQUFTO1lBQ1RFLFNBQVM7WUFDVEMsWUFBWTtZQUNaQyxhQUFhO1lBQ2JDLGlCQUFpQjtRQUNuQjtRQUNBQyxNQUFNO1lBQ0pDLEtBQUs7WUFDTEMsS0FBSztZQUNMQyxTQUFTO1lBQ1RDLE1BQU07UUFDUjtRQUNBQyxTQUFTO1FBQ1RDLE1BQU07WUFDSkMsT0FBTztZQUNQQyxPQUFPO1FBQ1Q7SUFDRjtJQUdGLE9BQU81QjtBQUNUO0FBRUEsaUVBQWVDLG9CQUFvQkEsRUFBQztBQUNmIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXDgwNTA5XFxEb2N1bWVudHNcXEdpdEh1YlxcUmVhY3RfSnNcXE1FUk5fcHJvamVjdFxcS2FtcnVsX0hhc2FuX01FUk5fUFJPSkVDVCAtIHBhdGhva2JvbmRkaG8gLW5leHRcXGxpYlxcZGJcXHNlcXVlbGl6ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXF1ZWxpemUgfSBmcm9tICdzZXF1ZWxpemUnO1xyXG5pbXBvcnQgbXlzcWwyIGZyb20gJ215c3FsMic7XHJcblxyXG5sZXQgc2VxdWVsaXplID0gbnVsbDtcclxuXHJcbmNvbnN0IGdldFNlcXVlbGl6ZUluc3RhbmNlID0gKCkgPT4ge1xyXG4gIGlmIChzZXF1ZWxpemUpIHtcclxuICAgIHJldHVybiBzZXF1ZWxpemU7XHJcbiAgfVxyXG5cclxuICBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKFxyXG4gICAgcHJvY2Vzcy5lbnYuTVlTUUxfREFUQUJBU0UsXHJcbiAgICBwcm9jZXNzLmVudi5NWVNRTF9VU0VSLFxyXG4gICAgcHJvY2Vzcy5lbnYuTVlTUUxfUEFTU1dPUkQsXHJcbiAgICB7XHJcbiAgICAgIGhvc3Q6IHByb2Nlc3MuZW52Lk1ZU1FMX0hPU1QsXHJcbiAgICAgIHBvcnQ6IHByb2Nlc3MuZW52Lk1ZU1FMX1BPUlQgfHwgMzMwNixcclxuICAgICAgZGlhbGVjdDogJ215c3FsJyxcclxuICAgICAgZGlhbGVjdE1vZHVsZTogbXlzcWwyLFxyXG4gICAgICBkaWFsZWN0T3B0aW9uczoge1xyXG4gICAgICAgIGNoYXJzZXQ6ICd1dGY4bWI0JyxcclxuICAgICAgfSxcclxuICAgICAgZGVmaW5lOiB7XHJcbiAgICAgICAgY2hhcnNldDogJ3V0ZjhtYjQnLFxyXG4gICAgICAgIGNvbGxhdGU6ICd1dGY4bWI0X3VuaWNvZGVfY2knLFxyXG4gICAgICAgIHRpbWVzdGFtcHM6IHRydWUsXHJcbiAgICAgICAgdW5kZXJzY29yZWQ6IGZhbHNlLFxyXG4gICAgICAgIGZyZWV6ZVRhYmxlTmFtZTogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgICAgcG9vbDoge1xyXG4gICAgICAgIG1heDogNSxcclxuICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgYWNxdWlyZTogMzAwMDAsXHJcbiAgICAgICAgaWRsZTogMTAwMDAsXHJcbiAgICAgIH0sXHJcbiAgICAgIGxvZ2dpbmc6IGZhbHNlLFxyXG4gICAgICBzeW5jOiB7XHJcbiAgICAgICAgZm9yY2U6IGZhbHNlLFxyXG4gICAgICAgIGFsdGVyOiBmYWxzZVxyXG4gICAgICB9LFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBzZXF1ZWxpemU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRTZXF1ZWxpemVJbnN0YW5jZTtcclxuZXhwb3J0IHsgc2VxdWVsaXplIH07XHJcbiJdLCJuYW1lcyI6WyJTZXF1ZWxpemUiLCJteXNxbDIiLCJzZXF1ZWxpemUiLCJnZXRTZXF1ZWxpemVJbnN0YW5jZSIsInByb2Nlc3MiLCJlbnYiLCJNWVNRTF9EQVRBQkFTRSIsIk1ZU1FMX1VTRVIiLCJNWVNRTF9QQVNTV09SRCIsImhvc3QiLCJNWVNRTF9IT1NUIiwicG9ydCIsIk1ZU1FMX1BPUlQiLCJkaWFsZWN0IiwiZGlhbGVjdE1vZHVsZSIsImRpYWxlY3RPcHRpb25zIiwiY2hhcnNldCIsImRlZmluZSIsImNvbGxhdGUiLCJ0aW1lc3RhbXBzIiwidW5kZXJzY29yZWQiLCJmcmVlemVUYWJsZU5hbWUiLCJwb29sIiwibWF4IiwibWluIiwiYWNxdWlyZSIsImlkbGUiLCJsb2dnaW5nIiwic3luYyIsImZvcmNlIiwiYWx0ZXIiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db/sequelize.js\n");

/***/ }),

/***/ "(rsc)/./lib/models/tag-model.js":
/*!*********************************!*\
  !*** ./lib/models/tag-model.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sequelize */ \"sequelize\");\n/* harmony import */ var _db_sequelize_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../db/sequelize.js */ \"(rsc)/./lib/db/sequelize.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([sequelize__WEBPACK_IMPORTED_MODULE_0__, _db_sequelize_js__WEBPACK_IMPORTED_MODULE_1__]);\n([sequelize__WEBPACK_IMPORTED_MODULE_0__, _db_sequelize_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\nconst sequelize = (0,_db_sequelize_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\nconst Tag = sequelize.define(\"Tag\", {\n    name: {\n        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.STRING,\n        allowNull: false\n    },\n    slug: {\n        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.STRING,\n        allowNull: false,\n        unique: true\n    },\n    tagTitle: {\n        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.STRING,\n        allowNull: true\n    },\n    tagDescription: {\n        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.TEXT,\n        allowNull: true\n    },\n    image: {\n        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.STRING,\n        allowNull: true\n    },\n    metaTitle: {\n        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.STRING,\n        allowNull: true\n    },\n    metaDescription: {\n        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.TEXT,\n        allowNull: true\n    },\n    metaKeywords: {\n        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.TEXT,\n        allowNull: true\n    },\n    status: {\n        type: sequelize__WEBPACK_IMPORTED_MODULE_0__.DataTypes.BOOLEAN,\n        defaultValue: true\n    }\n}, {\n    tableName: 'tags',\n    timestamps: true,\n    charset: \"utf8mb4\",\n    collate: \"utf8mb4_unicode_ci\"\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tag);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9kZWxzL3RhZy1tb2RlbC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBc0M7QUFDZ0I7QUFFdEQsTUFBTUUsWUFBWUQsNERBQW9CQTtBQUV0QyxNQUFNRSxNQUFNRCxVQUFVRSxNQUFNLENBQUMsT0FBTztJQUNoQ0MsTUFBTTtRQUNGQyxNQUFNTixnREFBU0EsQ0FBQ08sTUFBTTtRQUN0QkMsV0FBVztJQUNmO0lBQ0FDLE1BQU07UUFDRkgsTUFBTU4sZ0RBQVNBLENBQUNPLE1BQU07UUFDdEJDLFdBQVc7UUFDWEUsUUFBUTtJQUNaO0lBQ0FDLFVBQVU7UUFDTkwsTUFBTU4sZ0RBQVNBLENBQUNPLE1BQU07UUFDdEJDLFdBQVc7SUFDZjtJQUNBSSxnQkFBZ0I7UUFDWk4sTUFBTU4sZ0RBQVNBLENBQUNhLElBQUk7UUFDcEJMLFdBQVc7SUFDZjtJQUNBTSxPQUFPO1FBQ0hSLE1BQU1OLGdEQUFTQSxDQUFDTyxNQUFNO1FBQ3RCQyxXQUFXO0lBQ2Y7SUFDQU8sV0FBVztRQUNQVCxNQUFNTixnREFBU0EsQ0FBQ08sTUFBTTtRQUN0QkMsV0FBVztJQUNmO0lBQ0FRLGlCQUFpQjtRQUNiVixNQUFNTixnREFBU0EsQ0FBQ2EsSUFBSTtRQUNwQkwsV0FBVztJQUNmO0lBQ0FTLGNBQWM7UUFDVlgsTUFBTU4sZ0RBQVNBLENBQUNhLElBQUk7UUFDcEJMLFdBQVc7SUFDZjtJQUNBVSxRQUFRO1FBQ0paLE1BQU1OLGdEQUFTQSxDQUFDbUIsT0FBTztRQUN2QkMsY0FBYztJQUNsQjtBQUNKLEdBQUc7SUFDQ0MsV0FBVztJQUNYQyxZQUFZO0lBQ1pDLFNBQVM7SUFDVEMsU0FBUztBQUNiO0FBRUEsaUVBQWVyQixHQUFHQSxFQUFDIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXDgwNTA5XFxEb2N1bWVudHNcXEdpdEh1YlxcUmVhY3RfSnNcXE1FUk5fcHJvamVjdFxcS2FtcnVsX0hhc2FuX01FUk5fUFJPSkVDVCAtIHBhdGhva2JvbmRkaG8gLW5leHRcXGxpYlxcbW9kZWxzXFx0YWctbW9kZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSAnc2VxdWVsaXplJztcclxuaW1wb3J0IGdldFNlcXVlbGl6ZUluc3RhbmNlIGZyb20gJy4uL2RiL3NlcXVlbGl6ZS5qcyc7XHJcblxyXG5jb25zdCBzZXF1ZWxpemUgPSBnZXRTZXF1ZWxpemVJbnN0YW5jZSgpO1xyXG5cclxuY29uc3QgVGFnID0gc2VxdWVsaXplLmRlZmluZShcIlRhZ1wiLCB7XHJcbiAgICBuYW1lOiB7XHJcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgICBhbGxvd051bGw6IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHNsdWc6IHtcclxuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICAgIGFsbG93TnVsbDogZmFsc2UsXHJcbiAgICAgICAgdW5pcXVlOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHRhZ1RpdGxlOiB7XHJcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlNUUklORyxcclxuICAgICAgICBhbGxvd051bGw6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgdGFnRGVzY3JpcHRpb246IHtcclxuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuVEVYVCxcclxuICAgICAgICBhbGxvd051bGw6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgaW1hZ2U6IHtcclxuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBtZXRhVGl0bGU6IHtcclxuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxyXG4gICAgICAgIGFsbG93TnVsbDogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICBtZXRhRGVzY3JpcHRpb246IHtcclxuICAgICAgICB0eXBlOiBEYXRhVHlwZXMuVEVYVCxcclxuICAgICAgICBhbGxvd051bGw6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgbWV0YUtleXdvcmRzOiB7XHJcbiAgICAgICAgdHlwZTogRGF0YVR5cGVzLlRFWFQsXHJcbiAgICAgICAgYWxsb3dOdWxsOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHN0YXR1czoge1xyXG4gICAgICAgIHR5cGU6IERhdGFUeXBlcy5CT09MRUFOLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcclxuICAgIH0sXHJcbn0sIHtcclxuICAgIHRhYmxlTmFtZTogJ3RhZ3MnLFxyXG4gICAgdGltZXN0YW1wczogdHJ1ZSxcclxuICAgIGNoYXJzZXQ6IFwidXRmOG1iNFwiLFxyXG4gICAgY29sbGF0ZTogXCJ1dGY4bWI0X3VuaWNvZGVfY2lcIlxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhZztcclxuIl0sIm5hbWVzIjpbIkRhdGFUeXBlcyIsImdldFNlcXVlbGl6ZUluc3RhbmNlIiwic2VxdWVsaXplIiwiVGFnIiwiZGVmaW5lIiwibmFtZSIsInR5cGUiLCJTVFJJTkciLCJhbGxvd051bGwiLCJzbHVnIiwidW5pcXVlIiwidGFnVGl0bGUiLCJ0YWdEZXNjcmlwdGlvbiIsIlRFWFQiLCJpbWFnZSIsIm1ldGFUaXRsZSIsIm1ldGFEZXNjcmlwdGlvbiIsIm1ldGFLZXl3b3JkcyIsInN0YXR1cyIsIkJPT0xFQU4iLCJkZWZhdWx0VmFsdWUiLCJ0YWJsZU5hbWUiLCJ0aW1lc3RhbXBzIiwiY2hhcnNldCIsImNvbGxhdGUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/models/tag-model.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftags%2Froute&page=%2Fapi%2Ftags%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftags%2Froute.js&appDir=C%3A%5CUsers%5C80509%5CDocuments%5CGitHub%5CReact_Js%5CMERN_project%5CKamrul_Hasan_MERN_PROJECT%20-%20pathokbonddho%20-next%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5C80509%5CDocuments%5CGitHub%5CReact_Js%5CMERN_project%5CKamrul_Hasan_MERN_PROJECT%20-%20pathokbonddho%20-next&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();