"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var filemodel_1 = require('../shared/filemodel');
var MainService = (function () {
    function MainService(http) {
        this.http = http;
    }
    MainService.prototype.close = function (file, files, interpretManager) {
        var index = files.indexOf(file);
        if (index > -1) {
            if (interpretManager.curFile == file)
                interpretManager.curFile = null;
            files.splice(index, 1);
        }
        if (interpretManager.debug)
            this.initInterpretManager(interpretManager);
    };
    MainService.prototype.run = function (interpretManager, operations) {
        interpretManager.debug = false;
        while (interpretManager.contentPointer < interpretManager.curFile.Content.length && !interpretManager.debug) {
            operations[interpretManager.curFile.Content[interpretManager.contentPointer]].execute(interpretManager);
        }
        this.initInterpretManager(interpretManager);
    };
    MainService.prototype.step = function (interpretManager, operations) {
        if (interpretManager.contentPointer < interpretManager.curFile.Content.length && interpretManager.debug) {
            operations[interpretManager.curFile.Content[interpretManager.contentPointer]].execute(interpretManager);
        }
        this.initInterpretManager(interpretManager);
    };
    MainService.prototype.initInterpretManager = function (interpretManager) {
        if (interpretManager.contentPointer == interpretManager.curFile.Content.length) {
            interpretManager.caseStack = [];
            interpretManager.contentPointer = 0;
            interpretManager.debug = false;
            interpretManager.memory = new Array(30000);
            for (var i = 0; i < 30000; i++)
                interpretManager.memory[i] = 0;
            interpretManager.memoryPointer = 0;
            interpretManager.output += '\n';
        }
    };
    MainService.prototype.create = function (path) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('./Home/Create/', JSON.stringify(new filemodel_1.FileModel("", path, "")), { headers: headers })
            .map(function (resp) {
            var curFile = resp.json();
            return new filemodel_1.FileModel(curFile.Name, curFile.Path, curFile.Content);
        })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    MainService.prototype.open = function (path) {
        return this.http.get('./Home/Open?path=' + path)
            .map(function (resp) {
            var curFile = resp.json();
            return new filemodel_1.FileModel(curFile.Name, curFile.Path, curFile.Content);
        })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    MainService.prototype.save = function (curFile) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('./Home/Save/', JSON.stringify(curFile), { headers: headers })
            .map(function (resp) { return resp.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    MainService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MainService);
    return MainService;
}());
exports.MainService = MainService;
//# sourceMappingURL=main.service.js.map