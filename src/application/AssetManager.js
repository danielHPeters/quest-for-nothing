class AssetManager {

    constructor() {
        this.downloadQueue = [];
        this.cache = {};
        this.succesCount = 0;
        this.errorCount = 0;
    }

    /**
     *
     * @param {string} name
     * @param {string} path
     */
    queueDownload(name, path) {
        this.downloadQueue.push({name: name, path: path});
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
        this.downloadQueue.forEach(item => {

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
            img.src = item.path;
            this.cache[item.name] = img;
        });
    }

    /**
     *
     * @param {string} name
     */
    getAsset(name){
        return this.cache[name];
    }

    /**
     *
     * @returns {boolean}
     */
    done() {
        return this.downloadQueue.length === this.succesCount + this.errorCount;
    }
}