# Medvice
# Hacklytics 2024

import streamlit as st

st.set_page_config(page_title="Medvice", page_icon=":stethoscope:", layout='wide', initial_sidebar_state='collapsed')

tabs = st.tabs(["**Home**", "**Medvisor**","**Specialties**", "**Architecture**","**Elevance Health**","**Intel Developer Cloud**","**Limitations**", "**References**"])


with tabs[0]:
    cols = st.columns(3)

    with cols[1]:
        st.subheader("Access to healthcare information is being _redefined_.", divider='blue')

        st.markdown("We built **Medvice** to be a reliable, cost-friendly medical advisor that also happens to fit in your pocket. Our hope is that with access to a personalized news feed, AI-powered recommendations, and on-the-spot diagnoses all at your fingertips, we can revolutionize the informative power of consumer medical resources and foster a healthier, better-informed population.")
        st.write("")
        st.write("")
        st.write("")

        st.subheader("Why Medvice?", divider='blue')
        st.write("It all started when one of our founding team members came down with food poisoning right before the event started. He consulted Google about his symptoms, which led him to believe he had 3 days to live. We knew something had to change.")
        st.markdown("When investigating this phenomena, we found insignificant evidence to support the assumption of negative effects on patient anxiety or self-diagnosis based on Google searching (Duong, 2021). However, there is still prevalent medical misinformation on other platforms such as Twitter concerning import health topics (Suarez-Lledo, 2021). Also, even though Google searches were not significantly harmful in self-diagnosis, they also did not significantly improve them either (Martin, 2019), potentially suggesting inadequate online information which Medvice plans to tackle.")
        st.write("")
        st.write("")
        st.write("")

with tabs[1]:
    cols = st.columns(3)
    with cols[1]:
        st.subheader("Abstract", divider='blue')
        st.markdown("In recent years, there has been extensive research on the use of Large Language Models (LLMs) in the field of healthcare. These models have been proven to display strong clinical knowledge on various tasks in the field of medicine, setting a high threshold for natural understanding and prediction. However, we find that the predominant focus has been on optimizing these models for general purpose recommendations, with a limited application towards patient-oriented recommendations. ")
        st.markdown("We propose a cascading model (Chen, 2023) known as Medvisor that aims to supplement this gap in generative healthcare applications. The architecture consists of two fine-tuned LLMs, the first being tasked with identifying Fast Healthcare Interoperability Resources (FHIR) data medically relevant to a patient’s query, and the second being tasked with incorporating the patient-level data alongside a medical knowledge base to complete the task. We hypothesize that Medvice performs better than single-model architectures of similar size due to its finetuning and sanity checks during information transfer.")
        st.image('./data/architecture.png',caption='ce - Cascade of LLMs')

with tabs[2]:
    cols = st.columns(3)
    with cols[1]:
        st.subheader("Abstract", divider='blue')
        st.markdown("While we have high confidence in the general predictive ability of the Medvisor architecture, we hypothesize that there are certain medical tasks outside of natural language that benefit from a specialized model trained on highly relevant datasets.")
        st.markdown("We call these models “Specialties” and chose tumor classification as the first example to provide a demonstration of the physical capabilities of our application as well. We aim to leverage the multi-modal nature of the data in our app to create an increasingly comprehensive health profile and provide subsequently improved recommendations.")
        st.write("Here's a sample image we would want the model to classify as either benign or malignant.")
        st.image("./data/benign_example.jpeg", caption='benign')
        st.write("")

        st.subheader("Model Development", divider='blue')
        st.image("./data/vit_ex.png",caption="Vision Transformer Architecture")
        st.markdown("To accomplish this goal, we utilized a Vision Transformer due to its high performance capabilities on computer vision tasks. We imported pre-trained weights from Google's ImageNet-21k model and trained for 10 epochs on a training set of 2900 images.")
        st.image("./data/vit_training.png", caption='Training Results')
        st.markdown("We achieve great results (+90% accuracy) after only 6 epochs. Let's verify this performance on a test set of 165 images.")
        st.image("./data/vit_testing.png", caption='Testing Results')
        st.write("")

        st.subheader("Visualizing Predictions", divider='blue')
        st.markdown("The self-attention mechanism used by Transformers allows us to visualize the parts of the image most correlated with the output.")
        st.image("./data/benign_right.png")
        st.image("./data/malignant_right.png")
        st.markdown("We see that for both of these correct predictions, the model predicts the correct label with high probability and also highlights the areas of the skin where the tumor is present. It is still unclear however how it is determining the label based on these areas alone.")
        st.image("./data/benign_wrong.png")
        st.markdown("We see that corner patches with no tumor in this image have high attention, which is most likely why the model predicts the wrong label with low confidence.")

        st.write("")
        st.markdown("This task demonstrates the power of Vision Transformers when paired with computer-vision-based medical tasks. Not only is this beneficial to a patient worried about the new lump on their skin, but it also helps inform the doctor's decision when making their own diagnosis. Our goal is to expand our range of Specialties to encompass more life-saving diagnoses.")
        

with tabs[3]:
    st.image("system_arch.png",caption="Complete Design for Backend")       

with tabs[4]:
    cols = st.columns(3)
    with cols[1]:
        st.markdown("We throughly enjoyed getting to pursue the Elevance Health challenge. To complete task 1, we built a Text-to-SQL LLM using the Hugging Face library and pre-trained model weights from juierror/text-to-sql-with-table-schema. This model was used to support the backend of our application and also provide a benchmark to train fine-tuned LLMs against. When prompting, we ensured to assign a role, provide the schema in context, and test on a signficant dataset. Unfortunately, we were not able to implement a RAG due to HF server and environment issues, but we look forward to adding this implementation to future iterations of our product.")
        st.markdown("For Task 2, we implemented a LLM using the LLAMA-7B architecture to provide recommendations to users based on a given query and a corresponding health profile. The model is able to aggregate the health profile by synthesizing information across various FHIR tables, allowing it get a better understanding of the patient's medical history.")
with tabs[5]:
    cols = st.columns(3)
    with cols[1]:
        st.markdown("The Intel Developer Cloud provided a great challenge for our team to undertake. We completed several tasks, such as uploading our final Vision Transformer for tumor classification to Hhugging Face")
        st.image("vit_idc.png", caption='Building a ViT in Jupyter Notebook on IDC')
        st.image("ft_idc.png", caption="Finetuning a LLM for Text-To-SQL in Jupyter Notebook on IDC")

with tabs[-2]:
    cols = st.columns(3)
    with cols[1]:
        st.text("DISCLAIMER: THIS APPLICATION DOES NOT PROVIDE PROFESSIONAL MEDICAL ADVICE")
        st.markdown("The information, including but not limited to, text, graphics, images and other material contained on this application are for informational purposes only. No material on this application is intended to be a substitute for professional medical advice, diagnosis or treatment. Always seek the advice of your physician or other qualified health care provider with any questions you may have regarding a medical condition or treatment and before undertaking a new health care regimen, and never disregard professional medical advice or delay in seeking it because of something you have read on this application.")

        st.markdown("We acknowledge the safety risks our application may present especially considering the possibility of hallucinations being delivered as genuine research-backed recommendations (Sharun, 2023). We tried to put as many measures in place as possible to mitigate this hazard. This includes giving the model explicit prompts to prevent ambiguity and assigning it a role (Marinkovic, 2023). We also have future plans to further tune hyperparameters such as temperature to reduce randomness, and also have outputs periodically evaluated by humans (Beutel, 2023).")
        st.markdown("We are extremely thankful to Intel for the compute provided by Intel Developer Cloud to train our deep learning models. We had access to 4 Intel GPUs, which allowed us to develop a ViT model and an LLM. However we restricted the depth of our training and hyperparameter optimization due to compute limits. In the future, we plan to improve on our fine-tuning efforts as increased resources become available.")

with tabs[-1]:
    st.write("Chen, 2023 - https://arxiv.org/pdf/2312.11462.pdf")
    st.write("Duong, 2021 - https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8084564/")
    st.write("Suarez-Lledo, 2021 - https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7857950/")
    st.write("Martin, 2019 - https://www.nature.com/articles/s41746-019-0183-0")
    st.write("Sharun, 2023 - https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10553015/")
    st.write('Marinkovic, 2023 - https://surferseo.com/blog/ai-hallucination/')
    st.write("Beutel, 2023 - https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10114308/")
