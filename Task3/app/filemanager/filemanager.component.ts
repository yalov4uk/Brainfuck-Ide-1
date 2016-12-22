import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Response } from '@angular/http';

import { IFileModel, FileModel } from '../shared/filemodel'
import { MainService } from '../shared/main.service';
import { IInterpretManager } from '../shared/InterpretManager';

@Component({
    selector: 'filemanager',
    templateUrl: './app/filemanager/filemanager.component.html',
    styleUrls: ['./app/filemanager/filemanager.component.css']
})
export class FileManagerComponent {
    @Input() files: IFileModel[];
    @Input() interpretManager: IInterpretManager;
    @Output() choosed: EventEmitter<IFileModel>;

    constructor(private mainService: MainService) {
        this.choosed = new EventEmitter();
    }

    choose(file: IFileModel): void {
        this.choosed.emit(file);
    }

    close(file: IFileModel): void {
        this.mainService.close(file, this.files, this.interpretManager);
    }

    create(): void {
        let path = prompt('Enter path', '');
        if (path) 
            this.mainService.create(path).subscribe((curFile) => {
                this.files.push(curFile);
                this.interpretManager.curFile = curFile;
            });
    }

    open(): void {
        let path = prompt('Enter path', '');
        if (path)
            this.mainService.open(path).subscribe((curFile) => {
                this.files.push(curFile);
                this.interpretManager.curFile = curFile;
            });
    }

    save(): void {
        if (this.interpretManager.curFile)
            this.mainService.save(this.interpretManager.curFile).
                subscribe((body) => this.interpretManager.output += '\n' + body);
    }
}