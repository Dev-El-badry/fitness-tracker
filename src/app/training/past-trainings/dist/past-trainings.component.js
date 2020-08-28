"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PastTrainingsComponent = void 0;
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var fromTraining = require("../training.reducer");
var PastTrainingsComponent = /** @class */ (function () {
    function PastTrainingsComponent(trainingService, store) {
        this.trainingService = trainingService;
        this.store = store;
        this.displayedColumns = ["date", "name", "duration", "calories", "type"];
        this.dataSource = new material_1.MatTableDataSource();
    }
    PastTrainingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select(fromTraining.getFinishedTrainings).subscribe(function (excerices) {
            _this.dataSource.data = excerices;
        });
        this.trainingService.fetchExcericesWhenComplateOrCancel();
        //this.dataSource.data = this.trainingService.getExcericesWhenComplateOrCancel();
    };
    PastTrainingsComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    };
    PastTrainingsComponent.prototype.onFiltering = function (filterValue) {
        this.dataSource.filter = filterValue;
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: true })
    ], PastTrainingsComponent.prototype, "sort");
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: true })
    ], PastTrainingsComponent.prototype, "paginator");
    PastTrainingsComponent = __decorate([
        core_1.Component({
            selector: "app-past-trainings",
            templateUrl: "./past-trainings.component.html",
            styleUrls: ["./past-trainings.component.css"]
        })
    ], PastTrainingsComponent);
    return PastTrainingsComponent;
}());
exports.PastTrainingsComponent = PastTrainingsComponent;
