class SkinCancerClassifier {

    static task = 'image-classification';
    static model = 'justin-witter/vit-skin-cancer';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            const { pipeline, env } = await import('@xenova/transformers');

            // NOTE: Uncomment this to change the cache directory
            // env.cacheDir = './.cache';
            // env.allowLocalModels = true;
            // env.allowRemoteModels = false;

            this.instance = pipeline(this.task, this.model, { progress_callback });
        }

        return this.instance;
    }
}

module.exports = SkinCancerClassifier;
