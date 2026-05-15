#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
from docx import Document

def extract_text_from_docx(docx_path):
    """从docx文件中提取文本内容"""
    doc = Document(docx_path)
    content = []
    for paragraph in doc.paragraphs:
        text = paragraph.text.strip()
        if text:
            content.append(text)
    return content

def parse_grammar_question(text):
    """解析语法题目文本"""
    tokens = []
    main_branch = ""
    grammar_points = []
    analysis = ""
    
    # 简单的分词逻辑（语义块级别）
    if text:
        # 按常见动词短语分割
        verb_phrases = [
            "have taken place", "have been", "has been", "was born", "were born",
            "have done", "has done", "had done", "will do", "would do",
            "should do", "must do", "can do", "may do", "might do",
            "is doing", "are doing", "was doing", "were doing",
            "be going to", "used to", "be able to", "have to",
            "make sure", "take care", "look forward to", "pay attention to"
        ]
        
        remaining = text
        for phrase in verb_phrases:
            if phrase in remaining:
                tokens.append(phrase)
                remaining = remaining.replace(phrase, " ")
        
        # 添加剩余的单词
        for word in remaining.split():
            if word.strip():
                tokens.append(word.strip())
    
    return {
        "tokens": tokens,
        "main_branch": main_branch,
        "grammar_points": grammar_points,
        "analysis": analysis
    }

def process_documents(input_dir, output_dir):
    """处理所有docx文件并输出JSON"""
    os.makedirs(output_dir, exist_ok=True)
    
    json_data = {
        "version": "1.0",
        "title": "初中英语语法题库",
        "categories": []
    }
    
    for filename in os.listdir(input_dir):
        if filename.endswith(".docx") and "教师版" in filename:
            category_name = filename.replace("（教师版）.docx", "").replace("(教师版).docx", "")
            
            docx_path = os.path.join(input_dir, filename)
            content = extract_text_from_docx(docx_path)
            
            questions = []
            current_question = None
            
            for i, line in enumerate(content):
                # 检测题目格式（如：1. ... 或 ( ) 等）
                if line.strip() and (line[0].isdigit() or "(" in line):
                    if current_question:
                        questions.append(current_question)
                    current_question = {
                        "id": f"{category_name}_{len(questions)+1}",
                        "category": category_name,
                        "original_text": line.strip(),
                        "tokens": [],
                        "main_branch": "",
                        "grammar_points": [category_name],
                        "analysis": ""
                    }
                elif current_question:
                    current_question["original_text"] += " " + line.strip()
            
            if current_question:
                questions.append(current_question)
            
            # 为每个题目添加语法解析
            for q in questions:
                q["tokens"] = parse_grammar_question(q["original_text"])["tokens"]
                q["main_branch"] = identify_main_branch(q["original_text"])
                q["grammar_points"] = identify_grammar_points(q["original_text"], category_name)
                q["analysis"] = generate_analysis(q["original_text"], q["grammar_points"])
            
            category_data = {
                "name": category_name,
                "questions": questions
            }
            
            json_data["categories"].append(category_data)
    
    # 保存JSON文件
    output_path = os.path.join(output_dir, "grammar_questions.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)
    
    print(f"已成功转换 {len(json_data['categories'])} 个类别，共 {sum(len(cat['questions']) for cat in json_data['categories'])} 道题目")

def identify_main_branch(text):
    """识别句子主干（主谓宾/主系表）"""
    # 简化的主干识别
    keywords = ["is", "are", "was", "were", "be", "been", "being",
                "have", "has", "had", "do", "does", "did",
                "will", "would", "should", "could", "may", "might", "must", "can"]
    
    for keyword in keywords:
        if keyword in text.lower():
            parts = text.lower().split(keyword, 1)
            subject = parts[0].strip()
            predicate = keyword + " " + parts[1].strip() if len(parts) > 1 else keyword
            return f"{subject} [{keyword}] {predicate}"
    
    return text[:30] + "..." if len(text) > 30 else text

def identify_grammar_points(text, category):
    """识别语法考点"""
    points = [category]
    
    # 根据文本内容识别更多语法点
    if "have" in text.lower() and "since" in text.lower():
        points.append("现在完成时")
    if "have" in text.lower() and "for" in text.lower():
        points.append("现在完成时")
    if "had" in text.lower():
        points.append("过去完成时")
    if "will" in text.lower() or "be going to" in text.lower():
        points.append("一般将来时")
    if "is" in text.lower() and "ing" in text.lower():
        points.append("现在进行时")
    if "was" in text.lower() and "ing" in text.lower():
        points.append("过去进行时")
    if "ed" in text.lower() and "yesterday" in text.lower():
        points.append("一般过去时")
    if "every" in text.lower() or "often" in text.lower():
        points.append("一般现在时")
    if "because" in text.lower():
        points.append("原因状语从句")
    if "if" in text.lower():
        points.append("条件状语从句")
    if "when" in text.lower():
        points.append("时间状语从句")
    if "which" in text.lower() or "that" in text.lower() or "who" in text.lower():
        points.append("定语从句")
    
    return list(set(points))

def generate_analysis(text, grammar_points):
    """生成治愈系、拟人化的语法解析（50字以内）"""
    templates = {
        "现在完成时": "宝贝，现在完成时像个时间旅行者，连接过去与现在哦~",
        "一般过去时": "过去时就像回忆，带你回到那个特定的时刻~",
        "一般现在时": "现在时是个乖宝宝，每天都按时出现呢~",
        "一般将来时": "将来时像个魔法师，预知未来的精彩~",
        "现在进行时": "进行时正在发生，就像此刻的心跳~",
        "过去完成时": "过去完成时是时间的先行者，比过去更早~",
        "定语从句": "定语从句像个贴心小尾巴，紧紧跟着名词~",
        "状语从句": "状语从句是个向导，指明时间地点原因~",
        "介词": "介词是桥梁，连接词语的好朋友~",
        "代词": "代词是替身演员，代替名词上场~",
        "冠词": "冠词是名词的小帽子，a/an/the各有分工~",
        "动词": "动词是句子的心脏，让句子充满活力~",
        "名词": "名词是万物的名字，世界因它而清晰~",
        "形容词": "形容词是化妆师，让名词更漂亮~",
        "副词": "副词是调味剂，给动词添味道~",
        "情态动词": "情态动词是小精灵，表达各种可能性~",
        "连词": "连词是粘合剂，把句子粘在一起~",
        "非谓语动词": "非谓语动词是自由舞者，不做谓语也精彩~",
        "复合句": "复合句是大家庭，主句从句手拉手~"
    }
    
    for point in grammar_points:
        if point in templates:
            return templates[point]
    
    return "这道题藏着有趣的语法小秘密哦~"

if __name__ == "__main__":
    input_directory = "初中语法"
    output_directory = "output"
    process_documents(input_directory, output_directory)
    print("转换完成！")