"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var fromRoot = require("../../app.reducer");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, uiService, store) {
        this.auth = auth;
        this.uiService = uiService;
        this.store = store;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    };
    LoginComponent.prototype.subimtForm = function (form) {
        this.auth.login({
            email: form.value.email,
            password: form.value.password
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "app-login",
            templateUrl: "./login.component.html",
            styleUrls: ["./login.component.css"]
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
