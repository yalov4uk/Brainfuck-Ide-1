export interface IFileModel {
    Name: string;
    Path: string;
    Content: string;
}

export class FileModel implements IFileModel {
    constructor(public Name: string = '', public Path: string = '', public Content: string = '') { }
}