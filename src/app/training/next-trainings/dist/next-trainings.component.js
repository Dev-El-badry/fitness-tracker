"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NextTrainingsComponent = void 0;
var core_1 = require("@angular/core");
var fromRoot = require("../../app.reducer");
var fromTraning = require("../training.reducer");
var NextTrainingsComponent = /** @class */ (function () {
    function NextTrainingsComponent(trainingService, db, uiService, store) {
        this.trainingService = trainingService;
        this.db = db;
        this.uiService = uiService;
        this.store = store;
    }
    NextTrainingsComponent.prototype.ngOnInit = function () {
        this.isLoading$ = this.store.select(fromRoot.getIsLoading);
        this.trainingService.fetchAvailableExcerice();
        this.excerices$ = this.store.select(fromTraning.getAvailableTrainings);
        this.fetchExcerices();
        this.store.select(fromTraning.getAvailableTrainings).subscribe(function (data) { return console.log(data); });
        console.log(this.excerices$, 'exc');
    };
    NextTrainingsComponent.prototype.fetchExcerices = function () {
        this.trainingService.fetchAvailableExcerice();
    };
    NextTrainingsComponent.prototype.submitExcerice = function (form) {
        this.trainingService.startExcerice(form.value.excerice);
    };
    NextTrainingsComponent = __decorate([
        core_1.Component({
            selector: "app-next-trainings",
            templateUrl: "./next-trainings.component.html",
            styleUrls: ["./next-trainings.component.css"]
        })
    ], NextTrainingsComponent);
    return NextTrainingsComponent;
}());
exports.NextTrainingsComponent = NextTrainingsComponent;
