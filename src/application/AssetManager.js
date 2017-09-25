class AssetManager {

    constructor() {
        this.downloadQueue = [];
        this.cache = {};
        this.succesCount = 0;
        this.errorCount = 0;
    }

    /**
     *
     * @param {string} path
     */
    queueDownload(path) {
        this.downloadQueue.push(path);
    }

    /**
     *
     * @param callback
     */
    downLoadAll(callback) {

        if (this.downloadQueue.length === 0) {
            callback();
        }

        let managerInstance = this;
        this.downloadQueue.forEach(path => {

            let img = new Image();
            img.addEventListener("load", function () {

                managerInstance.succesCount += 1;

                if (managerInstance.done()) {
                    callback();
                }
            }, false);
            img.addEventListener("error", function () {

                managerInstance.errorCount += 1;

                if (managerInstance.done()) {
                    callback();
                }
            }, false);
            img.src = path;
            this.cache[path] = img;
        });
    }

    /**
     *
     * @param {string} path
     */
    getAsset(path){
        return this.cache[path];
    }

    /**
     *
     * @returns {boolean}
     */
    done() {
        return this.downloadQueue.length === this.succesCount + this.errorCount;
    }
}