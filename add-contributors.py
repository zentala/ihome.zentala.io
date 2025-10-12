#!/usr/bin/env python3
"""
Skrypt do dodawania pola contributors do plików Markdown które go nie mają
"""

import os

def add_contributors(file_path):
    """Dodaje pole contributors do pliku jeśli go nie ma"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Sprawdź czy plik już ma contributors
        if 'contributors:' in content:
            return False

        # Znajdź pozycję po dacie lub title żeby dodać contributors
        lines = content.split('\n')
        insert_position = -1

        for i, line in enumerate(lines):
            if line.startswith('date:') or line.startswith('title:') or line.startswith('description:'):
                # Znajdź następną pozycję po której można dodać contributors
                for j in range(i + 1, len(lines)):
                    if lines[j].strip() == '' or lines[j].startswith('---') or lines[j].startswith('draft:') or lines[j].startswith('weight:'):
                        insert_position = j
                        break
                if insert_position != -1:
                    break

        if insert_position == -1:
            # Jeśli nie znalazłem dobrej pozycji, dodaj na końcu front matter
            for i, line in enumerate(lines):
                if line.startswith('---') and i > 0:
                    insert_position = i
                    break

        if insert_position != -1:
            lines.insert(insert_position, "contributors: ['Paweł Żentała']")

            with open(file_path, 'w', encoding='utf-8') as f:
                f.write('\n'.join(lines))

            print(f"✅ Dodano contributors do: {file_path}")
            return True

        return False

    except Exception as e:
        print(f"❌ Błąd w {file_path}: {e}")
        return False

def main():
    """Główna funkcja"""
    content_dir = 'content'
    added_count = 0

    print("🔧 Dodawanie pola contributors...")

    # Przejdź przez wszystkie pliki .md w content/
    for root, dirs, files in os.walk(content_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                if add_contributors(file_path):
                    added_count += 1

    print(f"✅ Dodano contributors do {added_count} plików")

if __name__ == "__main__":
    main()
