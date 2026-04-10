import re
import json
import os

def parse_markdown_modules(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by module headers: ## Модуль XX: Title
    modules = re.split(r'## Модуль (\d+): (.*?)\n', content)
    
    parsed_modules = {}
    if len(modules) > 1:
        for i in range(1, len(modules), 3):
            mod_id = modules[i]
            mod_title = modules[i+1].strip()
            mod_content = modules[i+2].strip()
            parsed_modules[mod_id] = {
                "id": mod_id,
                "title": mod_title,
                "content": mod_content,
                "quiz": []
            }
    return parsed_modules

def parse_quizzes(file_path, modules_dict):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find module sections in quiz file
    sections = re.split(r'## Модуль (\d+):', content)
    
    for i in range(1, len(sections), 2):
        mod_id = sections[i]
        section_content = sections[i+1]
        
        # Find questions in section
        questions = re.findall(r'### Вопрос (\d+)\n\*\*(.*?)\*\*\n\n(.*?)\n\n<details><summary><b>Ответ: ([A-D])</b></summary>\n(.*?)\n</details>', section_content, re.DOTALL)
        
        for q_num, q_text, q_options, q_ans, q_expl in questions:
            options = re.findall(r'([A-D])\) (.*)', q_options)
            if mod_id in modules_dict:
                modules_dict[mod_id]["quiz"].append({
                    "id": q_num,
                    "question": q_text.strip(),
                    "options": [opt[1].strip() for opt in options],
                    "answer": q_ans,
                    "explanation": q_expl.strip()
                })

def parse_full_exam(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    exam_questions = []
    questions = re.findall(r'### Вопрос (\d+)\n\*\*(.*?)\*\*\n\n(.*?)\n\n<details><summary><b>Ответ: ([A-D])</b></summary>\n(.*?)\n</details>', content, re.DOTALL)
    
    for q_num, q_text, q_options, q_ans, q_expl in questions:
        options = re.findall(r'([A-D])\) (.*)', q_options)
        exam_questions.append({
            "id": q_num,
            "question": q_text.strip(),
            "options": [opt[1].strip() for opt in options],
            "answer": q_ans,
            "explanation": q_expl.strip()
        })
    return exam_questions

def main():
    all_modules = {}
    
    # 1. Parse notes
    all_modules.update(parse_markdown_modules('study_notes_modules_00-02.md'))
    all_modules.update(parse_markdown_modules('study_notes_modules_03-16.md'))
    all_modules.update(parse_markdown_modules('study_notes_extra_pg16.md'))
    
    # 2. Parse quizzes for modules
    parse_quizzes('quiz_modules_00-02.md', all_modules)
    parse_quizzes('quiz_modules_03-16.md', all_modules)
    parse_quizzes('quiz_extra_pg16.md', all_modules)
    
    # 3. Parse full exam
    exam50 = parse_full_exam('quiz_full_exam_50.md')
    
    # Convert dict to sorted list
    sorted_modules = [all_modules[k] for k in sorted(all_modules.keys())]
    
    data = {
        "modules": sorted_modules,
        "exam50": exam50
    }
    
    # Create src directory if it doesn't exist
    if not os.path.exists('src'):
        os.makedirs('src')
        
    with open('src/data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Successfully parsed {len(sorted_modules)} modules and {len(exam50)} exam questions.")

if __name__ == "__main__":
    main()
