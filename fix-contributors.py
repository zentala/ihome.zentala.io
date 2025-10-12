#!/usr/bin/env python3
"""
Skrypt do naprawy formatu contributors w plikach Markdown
Zmienia format YAML z pojedynczej wartości na listę
"""

import os
import re
import yaml

def fix_contributors_format(file_path):
    """Naprawia format contributors w pojedynczym pliku"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Sprawdź czy plik zawiera nieprawidłowy format contributors
        if 'contributors:\n- Paweł Żentała' in content:
            # Zamień na prawidłowy format listy
            fixed_content = content.replace(
                'contributors:\n- Paweł Żentała',
                "contributors: ['Paweł Żentała']"
            )

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(fixed_content)

            print(f"✅ Naprawiono: {file_path}")
            return True

        return False

    except Exception as e:
        print(f"❌ Błąd w {file_path}: {e}")
        return False

def main():
    """Główna funkcja"""
    content_dir = 'content'
    fixed_count = 0

    print("🔧 Naprawianie formatu contributors...")

    # Przejdź przez wszystkie pliki .md w content/
    for root, dirs, files in os.walk(content_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                if fix_contributors_format(file_path):
                    fixed_count += 1

    print(f"✅ Naprawiono {fixed_count} plików")

if __name__ == "__main__":
    main()
