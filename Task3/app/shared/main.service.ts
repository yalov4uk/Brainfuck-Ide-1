import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IFileModel, FileModel } from '../shared/filemodel'

@Injectable()
export class MainService {
    constructor(private http: Http) { }

    close(file, files, interpretManager) {
        let index = files.indexOf(file);
        if (index > -1) {
            if (interpretManager.curFile == file)
                interpretManager.curFile = null;
            files.splice(index, 1);    
        }
        if (interpretManager.debug)
            this.initInterpretManager(interpretManager);
    }

    run(interpretManager, operations){
        interpretManager.debug = false;
        while (interpretManager.contentPointer < interpretManager.curFile.Content.length && !interpretManager.debug) {
            operations[interpretManager.curFile.Content[interpretManager.contentPointer]].execute(interpretManager);
        }
        this.initInterpretManager(interpretManager);
    }

    step(interpretManager, operations){
        if (interpretManager.contentPointer < interpretManager.curFile.Content.length && interpretManager.debug) {
            operations[interpretManager.curFile.Content[interpretManager.contentPointer]].execute(interpretManager);
        }
        this.initInterpretManager(interpretManager);
    }

    private initInterpretManager(interpretManager): void {
        if (interpretManager.contentPointer == interpretManager.curFile.Content.length) {
            interpretManager.caseStack = [];
            interpretManager.contentPointer = 0;
            interpretManager.debug = false;
            interpretManager.memory = new Array(30000);
            for (let i = 0; i < 30000; i++)
                interpretManager.memory[i] = 0;
            interpretManager.memoryPointer = 0;
            interpretManager.output += '\n';
        }
    }

    create(path: string): Observable<IFileModel> {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('./Home/Create/', JSON.stringify(new FileModel("", path, "")), { headers: headers })
            .map((resp: Response) => {
                let curFile = resp.json();
                return new FileModel(curFile.Name, curFile.Path, curFile.Content);
            })
            .catch((error: any) => { return Observable.throw(error); });
    }

    open(path: string): Observable<IFileModel> {
        return this.http.get('./Home/Open?path=' + path)
            .map((resp: Response) => {
                let curFile = resp.json();
                return new FileModel(curFile.Name, curFile.Path, curFile.Content);
            })
            .catch((error: any) => { return Observable.throw(error); });
    }

    save(curFile: IFileModel): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post('./Home/Save/', JSON.stringify(curFile), { headers: headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }
}