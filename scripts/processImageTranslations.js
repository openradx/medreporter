"use strict";
exports.__esModule = true;
/* eslint-disable no-console */
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var glob_1 = require("glob");
var js_yaml_1 = require("js-yaml");
var jsdom_1 = require("jsdom");
var path_1 = require("path");
var projectDir = process.cwd();
var imageFiles = glob_1["default"].sync("**/*.svg", {
    cwd: path_1["default"].join(projectDir, "resources", "images"),
    absolute: true
});
var _loop_1 = function (imageFile) {
    var imageFilename = path_1["default"].basename(imageFile);
    /* Load translations */
    var translationsFile = imageFile.replace(".svg", ".yml");
    var translationsFilename = path_1["default"].basename(translationsFile);
    var translationsFileExists = fs_1["default"].existsSync(translationsFile);
    if (!translationsFileExists) {
        console.error(chalk_1["default"].red("Missing translation file of \"".concat(imageFilename, "\".")));
        return "continue";
    }
    var translations = js_yaml_1["default"].load(fs_1["default"].readFileSync(translationsFile).toString());
    var dom = new jsdom_1["default"].JSDOM("");
    var DOMParser_1 = dom.window.DOMParser;
    var parser = new DOMParser_1();
    var document_1 = parser.parseFromString(fs_1["default"].readFileSync(imageFile).toString(), "text/xml");
    var metadataEl = document_1.querySelector("metadata");
    if (!metadataEl) {
        metadataEl = document_1.createElementNS("http://www.w3.org/2000/svg", "metadata");
        var svgEl = document_1.querySelector("svg");
        if (!svgEl)
            throw new Error("Invalid SVG file \"".concat(imageFilename, "\"."));
        svgEl === null || svgEl === void 0 ? void 0 : svgEl.prepend(metadataEl);
    }
    var getTranslation = function (lng, key) {
        var trans = translations[lng][key];
        if (!trans)
            console.error(chalk_1["default"].red("Missing ".concat(lng, " translation with key \"").concat(key, "\" in \"").concat(translationsFilename, "\".")));
        return trans;
    };
    var createTransEl = function (lng, key) {
        var trans = getTranslation(lng, key);
        if (trans) {
            var transEl = document_1.createElement("Trans");
            transEl.setAttribute("lng", lng);
            transEl.innerText = trans;
            return transEl;
        }
        return null;
    };
    var createPartEl = function (id) {
        var partEl = document_1.createElementNS(null, "Part");
        partEl.setAttribute("id", id);
        ["de", "en"].forEach(function (lng) {
            var transEl = createTransEl(lng, id);
            if (transEl)
                partEl.append(transEl);
        });
        return partEl;
    };
    var createTitleEl = function () {
        var titleEl = document_1.createElementNS(null, "Title");
        ["de", "en"].forEach(function (lng) {
            var transEl = createTransEl(lng, "title");
            if (transEl)
                titleEl.append(transEl);
        });
        return titleEl;
    };
    var titleEl = createTitleEl();
    metadataEl.append(titleEl);
    var ids = [];
    var findId = function (el) {
        var id = el.getAttribute("id");
        if (id) {
            ids.push(id);
        }
        else {
            Array.from(el.children).forEach(function (child) {
                findId(child);
            });
        }
    };
    findId(document_1.children[0]);
    for (var _a = 0, ids_1 = ids; _a < ids_1.length; _a++) {
        var id = ids_1[_a];
        var partEl = createPartEl(id);
        metadataEl.append(partEl);
    }
};
for (var _i = 0, imageFiles_1 = imageFiles; _i < imageFiles_1.length; _i++) {
    var imageFile = imageFiles_1[_i];
    _loop_1(imageFile);
}
