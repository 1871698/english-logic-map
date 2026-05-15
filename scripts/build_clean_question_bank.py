#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW_PATH = ROOT / "output" / "grammar_questions.json"
OUTPUT_PATH = ROOT / "src" / "data" / "grammarBank.json"

INLINE_KEY_RE = re.compile(r"_{2,}\s*([A-D])\s*_{2,}| {2,}([A-D]) {2,}")
INLINE_TEXT_RE = re.compile(r"_{1,}\s*([A-Za-z][A-Za-z' ,.!?;:/-]{0,140}?)\s*_{1,}")
TRAILING_TEXT_RE = re.compile(r"_{1,}\s*([A-Za-z][A-Za-z' ,.!?;:/-]{1,200})$")
LEADING_NUMBER_RE = re.compile(r"^\d+[\.\．]\s*")
MULTISPACE_RE = re.compile(r"\s+")
ENGLISH_RE = re.compile(r"[A-Za-z]")
CHINESE_RE = re.compile(r"[\u4e00-\u9fff]")
SECTION_MARKERS = [
    "一、",
    "二、",
    "三、",
    "四、",
    "五、",
    "六、",
    "七、",
    "八、",
    "九、",
    "十、",
    "单项选择",
    "选词填空",
    "短语翻译",
    "用恰当的介词填空",
    "用所给词的适当形式填空",
    "语法填空",
    "完形填空",
    "阅读理解",
    "第二部分",
    "第三部分",
    "考点一",
    "考点二",
    "考点三",
    "考点四",
    "考点五",
    "考点六",
    "考点七",
    "考点八",
    "【特别记忆】",
    "【记忆口诀】",
]
SKIP_KEYWORDS = [
    "定义",
    "构成",
    "用法",
    "固定搭配",
    "记忆口诀",
    "特别记忆",
    "相当于",
    "后面一定不能跟",
    "表示“",
]

TRANSLATION_TABLE = str.maketrans(
    {
        "\u3000": " ",
        "\xa0": " ",
        "．": ".",
        "＋": "+",
        "＝": "=",
        "“": '"',
        "”": '"',
        "‘": "'",
        "’": "'",
        "—": "-",
        "–": "-",
        "►": " ",
        "★": " ",
        "→": " ",
        "\xad": "",
    }
)


def normalize_text(text: str) -> str:
    text = text.translate(TRANSLATION_TABLE).replace("\t", " ")
    text = MULTISPACE_RE.sub(" ", text).strip()
    return text


def strip_section_tail(text: str) -> str:
    for marker in SECTION_MARKERS:
        index = text.find(marker)
        if index > 16:
            text = text[:index].rstrip(" .;")
            break
    return text


def strip_source_prefix(text: str) -> str:
    if not text.startswith(("(", "（")):
        return text
    close_index = text.find(")")
    full_close_index = text.find("）")
    candidates = [index for index in (close_index, full_close_index) if index != -1]
    if not candidates:
        return text

    first_close = min(candidates)
    prefix = text[: first_close + 1]
    if not re.search(r"20\d{2}", prefix):
        return text
    return re.sub(r"^[-—–]\s*", "", text[first_close + 1 :].lstrip())


def english_count(text: str) -> int:
    return len(ENGLISH_RE.findall(text))


def chinese_count(text: str) -> int:
    return len(CHINESE_RE.findall(text))


def parse_options(text: str):
    first_option = re.search(r"\bA[\.\．]\s*", text)
    if not first_option:
        return text, []

    prompt = text[: first_option.start()].strip()
    options_text = text[first_option.start() :].strip()
    options = []
    matches = list(re.finditer(r"(?<![A-Za-z])([A-D])[\.\．]", options_text))

    for index, match in enumerate(matches):
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(options_text)
        key = match.group(1)
        cleaned = options_text[start:end].strip(" .;")
        if cleaned:
            options.append({"key": key, "text": cleaned})

    if len(options) < 2:
        return text, []

    return prompt, options


def extract_inline_key(text: str):
    match = INLINE_KEY_RE.search(text)
    if not match:
        return None
    return match.group(1) or match.group(2)


def extract_inline_text_answer(text: str):
    match = INLINE_TEXT_RE.search(text)
    if not match:
        return None
    answer = match.group(1).strip()
    if not ENGLISH_RE.search(answer):
        return None
    return answer


def extract_embedded_word_answer(text: str):
    for token in text.split():
        if "_" not in token:
            continue
        letters_only = token.replace("_", "")
        if len(letters_only) <= 1 or not ENGLISH_RE.search(letters_only):
            continue
        if not re.search(r"[A-Za-z].*_|_.*[A-Za-z]", token):
            continue
        return letters_only
    return None


def extract_trailing_answer(text: str):
    match = TRAILING_TEXT_RE.search(text.strip())
    if not match:
        return None

    answer = match.group(1).strip(" .;")
    if not ENGLISH_RE.search(answer):
        return None
    return answer


def normalize_prompt(prompt: str) -> str:
    prompt = re.sub(r"_{2,}\s*[^_]{0,40}\s*_{2,}", "____", prompt)
    prompt = re.sub(r"\b[A-Za-z]*_[A-Za-z_]+\b", "____", prompt)
    prompt = re.sub(r"_{4,}", "____", prompt)
    prompt = re.sub(r" {2,}([A-Za-z][A-Za-z' /-]{0,30}) {2,}", " ____ ", prompt)
    prompt = MULTISPACE_RE.sub(" ", prompt)
    return prompt.strip()


def clean_main_branch(text: str):
    cleaned = normalize_text(text)
    if "..." in cleaned:
        return None
    if chinese_count(cleaned) > english_count(cleaned):
        return None
    return cleaned


def build_question(raw_question: dict, category_name: str, index: int):
    original_text = normalize_text(raw_question.get("original_text", ""))
    original_text = LEADING_NUMBER_RE.sub("", original_text)
    original_text = strip_source_prefix(original_text)
    original_text = strip_section_tail(original_text)

    prompt_without_options, options = parse_options(original_text)
    answer_key = extract_inline_key(prompt_without_options) if options else None
    answer_text = None

    if options and answer_key:
        answer_text = next((item["text"] for item in options if item["key"] == answer_key), None)
    elif "____" in prompt_without_options or "_" in prompt_without_options:
        answer_text = extract_inline_text_answer(prompt_without_options)
        if not answer_text:
            answer_text = extract_embedded_word_answer(prompt_without_options)
        if not answer_text:
            answer_text = extract_trailing_answer(prompt_without_options)

    prompt = normalize_prompt(prompt_without_options)
    prompt = re.sub(r"^[\-\–—]\s*", "", prompt)

    english = english_count(prompt)
    chinese = chinese_count(prompt)
    has_blank = "____" in prompt
    has_options = len(options) >= 2

    if english < 6:
        return None
    if chinese > max(english, 1) * 0.7:
        return None
    if not has_blank and not has_options:
        return None
    if len(prompt) > 220 and chinese > 8:
        return None
    if any(keyword in original_text for keyword in SKIP_KEYWORDS):
        return None

    question_type = "multiple_choice" if has_options else "fill_blank"
    return {
        "id": f"{category_name}-{index}",
        "category": category_name,
        "type": question_type,
        "prompt": prompt,
        "answerKey": answer_key,
        "answerText": answer_text,
        "options": options,
        "analysis": normalize_text(raw_question.get("analysis", "")),
        "mainBranch": clean_main_branch(raw_question.get("main_branch", "")),
        "grammarPoints": [category_name],
        "originalText": original_text,
    }


def build_bank():
    raw = json.loads(RAW_PATH.read_text(encoding="utf-8"))
    categories = []
    usable_total = 0
    multiple_choice_total = 0
    fill_blank_total = 0

    for raw_category in raw.get("categories", []):
        name = normalize_text(raw_category.get("name", "未分类"))
        cleaned_questions = []

        for index, raw_question in enumerate(raw_category.get("questions", []), start=1):
            cleaned = build_question(raw_question, name, index)
            if cleaned is None:
                continue
            cleaned_questions.append(cleaned)

        if not cleaned_questions:
            continue

        usable_total += len(cleaned_questions)
        multiple_choice_total += sum(1 for item in cleaned_questions if item["type"] == "multiple_choice")
        fill_blank_total += sum(1 for item in cleaned_questions if item["type"] == "fill_blank")

        categories.append(
            {
                "id": f"bank-{len(categories) + 1}",
                "name": name,
                "questionCount": len(cleaned_questions),
                "samplePrompt": cleaned_questions[0]["prompt"],
                "questions": cleaned_questions,
            }
        )

    payload = {
        "version": "2.0",
        "title": "English Logic Map Grammar Bank",
        "stats": {
            "rawCategoryCount": len(raw.get("categories", [])),
            "usableCategoryCount": len(categories),
            "usableQuestionCount": usable_total,
            "multipleChoiceCount": multiple_choice_total,
            "fillBlankCount": fill_blank_total,
        },
        "categories": categories,
    }

    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    return payload


if __name__ == "__main__":
    result = build_bank()
    print(
        f"Cleaned {result['stats']['usableQuestionCount']} usable questions "
        f"across {result['stats']['usableCategoryCount']} categories."
    )
