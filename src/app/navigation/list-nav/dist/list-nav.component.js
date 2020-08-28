"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListNavComponent = void 0;
var core_1 = require("@angular/core");
var fromRoot = require("../../app.reducer");
var ListNavComponent = /** @class */ (function () {
    function ListNavComponent(auth, store) {
        this.auth = auth;
        this.store = store;
        this.closeSideNav = new core_1.EventEmitter();
    }
    ListNavComponent.prototype.ngOnInit = function () {
        this.isAuth$ = this.store.select(fromRoot.getIsAuthenticate);
    };
    ListNavComponent.prototype.onClose = function () {
        this.closeSideNav.emit();
    };
    ListNavComponent.prototype.onLogout = function () {
        this.onClose();
        this.auth.logout();
    };
    __decorate([
        core_1.Output()
    ], ListNavComponent.prototype, "closeSideNav");
    ListNavComponent = __decorate([
        core_1.Component({
            selector: "app-list-nav",
            templateUrl: "./list-nav.component.html",
            styleUrls: ["./list-nav.component.css"]
        })
    ], ListNavComponent);
    return ListNavComponent;
}());
exports.ListNavComponent = ListNavComponent;
