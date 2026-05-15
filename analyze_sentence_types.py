#!/usr/bin/env python3
import json

with open('output/sentence_types_full.json', encoding='utf-8') as f:
    data = json.load(f)

print('=== 主题列表 ===')
for i, p in enumerate(data['paragraphs']):
    print(f"{i+1}. {p['topic']} - {len(p['content'])} 条内容")

print()
print('=== 表格列表 ===')
for t in data['tables']:
    rows = len(t['data'])
    cols = len(t['data'][0]) if t['data'] else 0
    header = t['data'][0] if t['data'] else []
    print(f"表格 {t['table_index']+1}: {rows} 行 x {cols} 列")
    if header:
        print(f"  表头: {header}")