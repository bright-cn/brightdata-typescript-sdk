"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
var axios_1 = require("axios");
var types_1 = require("../types");
var HttpClient = /** @class */ (function () {
    function HttpClient(config) {
        this.config = config;
        this.client = axios_1.default.create({
            baseURL: config.baseUrl || 'https://api.brightdata.com',
            timeout: config.timeout || 30000,
            headers: {
                'Authorization': "Bearer ".concat(config.apiKey),
                'Content-Type': 'application/json',
                'User-Agent': config.userAgent || '@brightdata/sdk/1.0.0'
            }
        });
        this.setupInterceptors();
    }
    HttpClient.prototype.setupInterceptors = function () {
        var _this = this;
        // Request interceptor
        this.client.interceptors.request.use(function (config) {
            // Add request ID for tracing
            config.headers['X-Request-ID'] = _this.generateRequestId();
            return config;
        }, function (error) { return Promise.reject(error); });
        // Response interceptor
        this.client.interceptors.response.use(function (response) { return response; }, function (error) {
            var _a, _b, _c, _d, _e, _f;
            var message = ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message;
            var statusCode = (_c = error.response) === null || _c === void 0 ? void 0 : _c.status;
            var requestId = (_e = (_d = error.config) === null || _d === void 0 ? void 0 : _d.headers) === null || _e === void 0 ? void 0 : _e['X-Request-ID'];
            throw new types_1.BrightDataError(message, statusCode, (_f = error.response) === null || _f === void 0 ? void 0 : _f.data, requestId);
        });
    };
    HttpClient.prototype.generateRequestId = function () {
        return "bd_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
    };
    HttpClient.prototype.post = function (url, data, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.post(url, data, config)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.formatResponse(response)];
                }
            });
        });
    };
    HttpClient.prototype.get = function (url, config) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.get(url, config)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.formatResponse(response)];
                }
            });
        });
    };
    HttpClient.prototype.formatResponse = function (response) {
        var _a;
        return {
            data: response.data,
            status: response.status,
            headers: response.headers,
            requestId: (_a = response.config.headers) === null || _a === void 0 ? void 0 : _a['X-Request-ID']
        };
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;
