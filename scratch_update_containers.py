import glob, re, os, sys

base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), 'products'))
files = glob.glob(os.path.join(base_path, '*.html'))
fixed = []
for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    original = content
    # Replace class containing mt-10 and space-y-4 (order may vary)
    # Use a regex to capture class attribute and modify accordingly
    def repl(match):
        class_str = match.group(2)
        # split classes
        classes = class_str.split()
        # replace mt-10 with mt-8 and add max-w-sm if not present
        new_classes = []
        for c in classes:
            if c == 'mt-10':
                new_classes.append('mt-8')
            else:
                new_classes.append(c)
        if 'max-w-sm' not in new_classes:
            new_classes.append('max-w-sm')
        # replace space-y-4 with space-y-3
        new_classes = [ 'space-y-3' if c=='space-y-4' else c for c in new_classes ]
        return f'{match.group(1)}{" ".join(new_classes)}{match.group(3)}'
    # Pattern for id="purchase-options-container" with class attribute
    pattern = re.compile(r'(id=["\']purchase-options-container["\']\s+class=["\'])([^"\']*)(["\'])')
    content = pattern.sub(repl, content)
    # Also handle case where class attribute before id (class then id)
    pattern2 = re.compile(r'(class=["\'])([^"\']*)(["\']\s+id=["\']purchase-options-container["\'])')
    def repl2(m):
        class_str = m.group(2)
        classes = class_str.split()
        new_classes = []
        for c in classes:
            if c == 'mt-10':
                new_classes.append('mt-8')
            else:
                new_classes.append(c)
        if 'max-w-sm' not in new_classes:
            new_classes.append('max-w-sm')
        new_classes = [ 'space-y-3' if c=='space-y-4' else c for c in new_classes ]
        return f'{m.group(1)}{" ".join(new_classes)}{m.group(3)}'
    content = pattern2.sub(repl2, content)
    if content != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        fixed.append(f)

print('Fixed files count:', len(fixed))
print('\n'.join(fixed))
