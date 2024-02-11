import sys
import torch
import numpy as np
from transformers import ViTForImageClassification, ViTImageProcessor, ViTFeatureExtractor
from PIL import Image


def get_prediction(image_path):
    image = Image.open(image_path)
    model_directory = "./models/vit/"
    model = ViTForImageClassification.from_pretrained(model_directory, return_dict=True)
    model_id = 'google/vit-base-patch16-224-in21k'
    processor = ViTImageProcessor.from_pretrained(model_id)
    inputs = processor(image, return_tensors='pt')['pixel_values']
    logits = model(inputs).logits
    logits = logits.to(torch.device("cpu"))
    p = torch.nn.functional.softmax(logits, dim=1)
    p = np.max(p.detach().numpy(), axis=-1).item()
    pred_class_idx = np.argmax(logits.detach().numpy(), axis=-1)
#     print(model.config.id2label[pred_class_idx.item()])
    return pred_class_idx.item()

exit(get_prediction(sys.argv[1]))
