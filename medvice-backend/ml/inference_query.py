import ast
import base64
import json
import sys
from typing import List, Dict
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# tokenizer = AutoTokenizer.from_pretrained("juierror/flan-t5-text2sql-with-schema-v2", cache_dir="./models/llm/query/flan")
# model = AutoModelForSeq2SeqLM.from_pretrained("juierror/flan-t5-text2sql-with-schema-v2", cache_dir="./models/llm/query/flan")

# tokenizer = LlamaTokenizer.from_pretrained("./models/query/llama")
# model = LlamaForCausalLM.from_pretrained("./models/query/llama", ignore_mismatched_sizes=True)

tokenizer = AutoTokenizer.from_pretrained("models/llm/query/flan/models--juierror--flan-t5-text2sql-with-schema-v2/snapshots/177b4a502c62320dcc3ae0b288b5fc082b8de79c")
model = AutoModelForSeq2SeqLM.from_pretrained("models/llm/query/flan/models--juierror--flan-t5-text2sql-with-schema-v2/snapshots/177b4a502c62320dcc3ae0b288b5fc082b8de79c")

def get_prompt(tables, question):
    prompt = f"""convert question and table into SQL query. tables: {tables}. question: {question}"""
    return prompt

def prepare_input(question: str, tables: Dict[str, List[str]]):
    tables = [f"""{table_name}({",".join(tables[table_name])})""" for table_name in tables]
    tables = ", ".join(tables)
    prompt = get_prompt(tables, question)
    input_ids = tokenizer(prompt, max_length=512, truncation=True, return_tensors="pt").input_ids
    return input_ids

def inference(question: str, tables: Dict[str, List[str]]) -> str:
    input_data = prepare_input(question=question, tables=tables)
    input_data = input_data.to(model.device)
    # outputs = model.generate(inputs=input_data, num_beams=10, top_k=10, max_length=512)
    outputs = model.generate(inputs=input_data, num_beams=10, max_length=512)
    result = tokenizer.decode(token_ids=outputs[0], skip_special_tokens=True)
    return result

print(inference(sys.argv[1], json.loads(base64.b64decode(sys.argv[2]))))
