#include <stdio.h>
#include <stdlib.h>
#include "ggml/ggml.h"


struct untitled {
    struct ggml_context* ctx;
}


// returns a pointer to a loaded model struct. user is responsible of freeing it later
struct untitled* untitled_model_load(const char *model_file, mnist_model & model) {
    struct untitled *model = malloc(sizeof(*model));
    if (!model) {
        fprintf(stderr, "%s: malloc(sizeof(*model)) failed, Out of memory\n", __func__);
        return NULL;
    }

    struct gguf_init_params params = {
        /*.no_alloc   =*/ false,
        /*.ctx        =*/ &model.ctx,
    };
    gguf_context *ctx = gguf_init_from_file(model_file, params);
    if (!ctx) {
        fprintf(stderr, "%s: gguf_init_from_file() failed\n", __func__);
        return NULL;
    }

    return model;
}
