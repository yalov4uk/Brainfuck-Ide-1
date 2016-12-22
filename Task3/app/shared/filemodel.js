"use strict";
var FileModel = (function () {
    function FileModel(Name, Path, Content) {
        if (Name === void 0) { Name = ''; }
        if (Path === void 0) { Path = ''; }
        if (Content === void 0) { Content = ''; }
        this.Name = Name;
        this.Path = Path;
        this.Content = Content;
    }
    return FileModel;
}());
exports.FileModel = FileModel;
//# sourceMappingURL=filemodel.js.map