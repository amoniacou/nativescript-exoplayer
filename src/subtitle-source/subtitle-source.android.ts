﻿import types = require("tns-core-modules/utils/types");
import definition = require("./subtitle-source");
import common = require("./subtitle-source-common");
import * as utilsModule from "tns-core-modules/utils/utils";
import * as fileSystemModule from "tns-core-modules/file-system";
import * as enumsModule from "tns-core-modules/ui/enums";

global.moduleMerge(common, exports);

var utils: typeof utilsModule;
function ensureUtils() {
    if (!utils) {
        utils = require("tns-core-modules/utils/utils");
    }
}

var fs: typeof fileSystemModule;
function ensureFS() {
    if (!fs) {
        fs = require("tns-core-modules/file-system");
    }
}

declare var android: any;

export class SubtitleSource implements definition.SubtitleSource {
    public android: any; /// String - url or resource
    public ios: any; /// NSString

    public loadFromResource(name: string): boolean {
        this.android = null;

        ensureUtils();

        var res = utils.ad.getApplicationContext().getResources();
        if (res) {
            var UrlPath = "android.resource://org.nativescript.videoPlayer/R.raw." + name;
            this.android = UrlPath;

        }

        return this.android != null;
    }

    public loadFromUrl(url: string): boolean {
        this.android = null;
        this.android = url;
        return this.android != null;
    }

    public loadFromFile(path: string): boolean {

        ensureFS();

        var fileName = types.isString(path) ? path.trim() : "";
        if (fileName.indexOf("~/") === 0) {
            fileName = fs.path.join(fs.knownFolders.currentApp().path, fileName.replace("~/", ""));
        }

        this.android = fileName;
        return this.android != null;
    }

}
