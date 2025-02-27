/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const app_controller_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(5);
const config_1 = __webpack_require__(6);
const menu_controller_1 = __webpack_require__(7);
const menu_module_1 = __webpack_require__(11);
const common_1 = __webpack_require__(4);
const prisma_module_1 = __webpack_require__(12);
const prisma_service_1 = __webpack_require__(9);
const configuration_1 = tslib_1.__importDefault(__webpack_require__(13));
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default]
            }),
            menu_module_1.MenuModule,
            prisma_module_1.PrismaModule,
        ],
        controllers: [app_controller_1.AppController, menu_controller_1.MenuController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
let AppController = class AppController {
};
exports.AppController = AppController;
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)()
], AppController);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(6);
let AppService = class AppService {
    constructor(configService) {
        this.configService = configService;
    }
    getAppConfig() {
        return this.configService.getOrThrow('app');
    }
    getDatabaseConfig() {
        return this.configService.getOrThrow('database');
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)()),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AppService);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MenuController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const menu_service_1 = __webpack_require__(8);
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    findAll() {
        return this.menuService.findAll();
    }
    findOne(id, depth) {
        return this.menuService.findOne(id, depth);
    }
    create(createMenuDto) {
        return this.menuService.create(createMenuDto);
    }
    update(id, updateMenuDto) {
        return this.menuService.update(id, updateMenuDto);
    }
    remove(id) {
        return this.menuService.delete(id);
    }
    saveMenu(menuList) {
        return this.menuService.saveMenu(menuList);
    }
};
exports.MenuController = MenuController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MenuController.prototype, "findAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.Query)("depth")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", void 0)
], MenuController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MenuController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], MenuController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(":id"),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], MenuController.prototype, "remove", null);
tslib_1.__decorate([
    (0, common_1.Post)("save"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", void 0)
], MenuController.prototype, "saveMenu", null);
exports.MenuController = MenuController = tslib_1.__decorate([
    (0, common_1.Controller)("menus"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof menu_service_1.MenuService !== "undefined" && menu_service_1.MenuService) === "function" ? _a : Object])
], MenuController);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MenuService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const prisma_service_1 = __webpack_require__(9);
let MenuService = class MenuService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    /**
     * Get all menus hierarchically
     */
    async findAll() {
        return this.findMenuWithChildren(null); // Start from root
    }
    /**
     * Recursively fetch all menus and their children
     */
    async findMenuWithChildren(parentId = null) {
        const menus = await this.prisma.treeMenu.findMany({
            where: { parentId },
            include: { children: true }, // Fetch immediate children
        });
        for (const menu of menus) {
            menu.children = await this.findMenuWithChildren(menu.id); // Fetch nested children
        }
        return menus;
    }
    /**
     * Get a specific menu with depth and root
     */
    async findOne(id, depth = 2) {
        return this.getMenuWithDepth(id, depth);
    }
    async getMenuWithDepth(id, depth) {
        if (depth === 0) {
            return this.prisma.treeMenu.findUnique({ where: { id } });
        }
        return this.prisma.treeMenu.findUnique({
            where: { id },
            include: {
                children: {
                    include: depth > 1 ? { children: { include: { children: true } } } : {},
                },
            },
        });
    }
    /**
     * Create a menu item hierarchically
     */
    async create(data) {
        let generatedUrl = data.url || "";
        if (data.parentId) {
            const parent = await this.prisma.treeMenu.findUnique({
                where: { id: data.parentId },
            });
            if (!parent) {
                throw new common_1.NotFoundException("Parent menu not found");
            }
            const slug = this.slugify(data.name);
            generatedUrl = `${parent.url}/${slug}`;
        }
        else {
            generatedUrl = `/${this.slugify(data.name)}`;
        }
        return this.prisma.treeMenu.create({
            data: { ...data, url: generatedUrl },
        });
    }
    /**
     * Update a menu item
     */
    async update(id, data) {
        return this.prisma.treeMenu.update({
            where: { id },
            data,
        });
    }
    /**
     * Delete a menu item and all its children
     */
    async delete(id) {
        await this.prisma.treeMenu.deleteMany({
            where: { parentId: id },
        });
        return this.prisma.treeMenu.delete({
            where: { id },
        });
    }
    /**
     * Save menu structure (batch update)
     */
    async saveMenu(menuList) {
        const updates = menuList.map((menu) => this.prisma.treeMenu.update({
            where: { id: menu.id },
            data: { parentId: menu.parentId },
        }));
        return this.prisma.$transaction(updates);
    }
    /**
     * Helper function to convert a string into a slug
     */
    slugify(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], MenuService);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const client_1 = __webpack_require__(10);
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MenuModule = void 0;
const tslib_1 = __webpack_require__(1);
const menu_service_1 = __webpack_require__(8);
const common_1 = __webpack_require__(4);
const prisma_service_1 = __webpack_require__(9);
let MenuModule = class MenuModule {
};
exports.MenuModule = MenuModule;
exports.MenuModule = MenuModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [menu_service_1.MenuService, prisma_service_1.PrismaService],
        exports: [menu_service_1.MenuService, prisma_service_1.PrismaService],
    })
], MenuModule);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(4);
const prisma_service_1 = __webpack_require__(9);
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseConfigVars = void 0;
const tslib_1 = __webpack_require__(1);
const dotnev = tslib_1.__importStar(__webpack_require__(14));
const fs = tslib_1.__importStar(__webpack_require__(15));
const yaml = tslib_1.__importStar(__webpack_require__(16));
const path_1 = __webpack_require__(17);
dotnev.config();
const parseConfigVars = (object) => {
    if (!object || typeof object !== 'object')
        return; // Ensure object is valid
    for (const key in object) {
        if (typeof object[key] === 'object' && object[key] !== null) {
            (0, exports.parseConfigVars)(object[key]); // Recursively process nested objects
        }
        else if (typeof object[key] === 'string') {
            const match = object[key].match(/\${(.*?)}/);
            if (match) {
                const envVar = match[1]; // Extract the variable name inside `${}`
                console.log(`Replacing ${key} with ${envVar} = ${process.env[envVar]}`);
                object[key] = process.env[envVar] || object[key]; // Replace with .env value or keep original
            }
        }
    }
};
exports.parseConfigVars = parseConfigVars;
exports["default"] = () => {
    const appConfigPath = (0, path_1.join)(process.cwd(), 'apps/backend-app/src/app/config/application.configuration.yaml');
    if (!fs.existsSync(appConfigPath)) {
        throw new Error(`Configuration file not found: ${appConfigPath}`);
    }
    // Load YAML configuration
    const config = yaml.load(fs.readFileSync(appConfigPath, 'utf8'));
    (0, exports.parseConfigVars)(config); // Parse environment variables
    return config;
};


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("js-yaml");

/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const app_service_1 = __webpack_require__(5);
const common_1 = __webpack_require__(4);
const core_1 = __webpack_require__(18);
const dotenv_1 = tslib_1.__importDefault(__webpack_require__(14));
dotenv_1.default.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', "debug", "verbose"],
    });
    const appConfig = app.get(app_service_1.AppService).getAppConfig();
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = appConfig.port || 8081;
    const host = appConfig.host || 'localhost';
    app.listen(port, host, () => {
        common_1.Logger.log(`Listening at http://${host}:${port}/${globalPrefix}`);
    });
}
bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map