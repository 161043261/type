from datasets import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    DataCollatorForSeq2Seq,
    TrainingArguments,
    Trainer,
    pipeline,
)

# import os;
import pathlib

# 加载数据集
ds = Dataset.load_from_disk("./data/")
# os.environ['HTTP_PROXY'] = 'http://127.0.0.1:7890'
# os.environ['HTTPS_PROXY'] = 'http://127.0.0.1:7890'
# 数据集预处理
tokenizer = AutoTokenizer.from_pretrained("Langboat/bloom-389m-zh")


def process_func(example):
    MAX_LENGTH = 256
    input_ids, attention_mask, labels = [], [], []
    instruction = tokenizer(
        "\n".join(["Human: " + example["instruction"], example["input"]]).strip()
        + "\n\nAssistant: "
    )
    response = tokenizer(example["output"] + tokenizer.eos_token)
    input_ids = instruction["input_ids"] + response["input_ids"]
    attention_mask = instruction["attention_mask"] + response["attention_mask"]
    labels = [-100] * len(instruction["input_ids"]) + response["input_ids"]
    if len(input_ids) > MAX_LENGTH:
        input_ids = input_ids[:MAX_LENGTH]
        attention_mask = attention_mask[:MAX_LENGTH]
        labels = labels[:MAX_LENGTH]
    return {"input_ids": input_ids, "attention_mask": attention_mask, "labels": labels}


tokenized_ds = ds.map(process_func, remove_columns=ds.column_names)
# tokenizer.decode(tokenized_ds[1]["input_ids"])
# tokenizer.decode(list(filter(lambda x: x != -100, tokenized_ds[1]["labels"])))
# 创建模型
model = AutoModelForCausalLM.from_pretrained(
    f"{pathlib.Path.home()}/.cache/huggingface/hub/models--Langboat--bloom-389m-zh/snapshots/762a9501fe3e47365cc178bf70ab0a9d9c4aff0a"
)
# 配置训练参数
args = TrainingArguments(
    output_dir="./chatbot",
    per_device_train_batch_size=4,
    gradient_accumulation_steps=8,
    logging_steps=10,
    num_train_epochs=2,
)
# 创建训练器
trainer = Trainer(
    model=model,
    args=args,
    processing_class=tokenizer,
    train_dataset=tokenized_ds,
    data_collator=DataCollatorForSeq2Seq(tokenizer=tokenizer, padding=True),
)
# 模型训练
# trainer.train()
# 模型推理
pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, device=0)
ipt = "Human: {}\n{}".format("你的头怎么尖尖的？", "").strip() + "\n\nAssistant: "
print(pipe(ipt, max_length=256, do_sample=True, truncation=True))
