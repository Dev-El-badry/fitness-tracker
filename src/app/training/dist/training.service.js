"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TrainingService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
// import { UIService } from '../shared/ui.service';
var fromTraining = require("./training.reducer");
var UI = require("../shared/ui.actions");
var Training = require("./training.actions");
var TrainingService = /** @class */ (function () {
    function TrainingService(db, store) {
        this.db = db;
        this.store = store;
        this.availableExcerice = [];
        this.afSub = [];
    }
    TrainingService.prototype.fetchAvailableExcerice = function () {
        var _this = this;
        // this.uiService.loadingChangedStatus.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.afSub.push(this.db
            .collection("availableExcerices")
            .snapshotChanges()
            .pipe(operators_1.map(function (docArray) {
            return docArray.map(function (doc) {
                return {
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data().name,
                    duration: doc.payload.doc.data().duration,
                    calories: doc.payload.doc.data().calories
                };
            });
        }))
            .subscribe(function (res) {
            _this.store.dispatch(new Training.SetAvailableTrainings(res));
            _this.store.dispatch(new UI.StopLoading());
        }));
    };
    TrainingService.prototype.startExcerice = function (selectedID) {
        // this.runningExcerice = this.availableExcerice.find(
        //   ex => ex.id === selectedID
        // );
        this.store.dispatch(new Training.SetStartTraining(selectedID));
        // this.changeStatus.next({ ...this.runningExcerice });
    };
    TrainingService.prototype.complateExcerice = function () {
        var _this = this;
        this.store.select(fromTraining.getActiveTrainings).pipe(operators_1.take(1)).subscribe(function (ex) {
            _this.addDataToDatabase(__assign(__assign({}, ex), { type: 'complated', date: new Date() }));
            _this.store.dispatch(new Training.SetStopTraining());
        });
    };
    TrainingService.prototype.canceledExcerice = function (progress) {
        var _this = this;
        this.store.select(fromTraining.getActiveTrainings).pipe(operators_1.take(1)).subscribe(function (ex) {
            _this.addDataToDatabase(__assign(__assign({}, ex), { calories: ex.calories * (progress / 100), duration: ex.duration * (progress / 100), type: 'cancel', date: new Date() }));
            _this.store.dispatch(new Training.SetStopTraining());
        });
    };
    TrainingService.prototype.getRunningExcerice = function () {
        return __assign({}, this.runningExcerice);
    };
    TrainingService.prototype.cancelSubscriptions = function () {
        this.afSub.forEach(function (sub) {
            sub.unsubscribe();
        });
    };
    TrainingService.prototype.fetchExcericesWhenComplateOrCancel = function () {
        var _this = this;
        this.afSub.push(this.db
            .collection("finishExcerices")
            .valueChanges()
            .subscribe(function (excerices) {
            // this.finishExcericesChanges.next([...excerices]);
            _this.store.dispatch(new Training.SetFinishedTrainings(excerices));
        }));
    };
    TrainingService.prototype.addDataToDatabase = function (excerice) {
        this.db.collection('finishExcerices').add(excerice);
    };
    TrainingService = __decorate([
        core_1.Injectable()
    ], TrainingService);
    return TrainingService;
}());
exports.TrainingService = TrainingService;
