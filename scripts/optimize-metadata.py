#!/usr/bin/env python3
"""
Skrypt do optymalizacji metadanych w plikach Markdown projektu ihome.zentala.io
Automatycznie generuje opisy SEO na podstawie tytułu i kategorii treści.
"""

import os
import yaml
import re
from pathlib import Path
from datetime import datetime

# Szablony opisów dla różnych kategorii
TEMPLATES = {
    'blog': {
        'flat': "Poznaj osobiste doświadczenia Pawła Żentała z budowy inteligentnego mieszkania. {title} - praktyczne wskazówki i rozwiązania Smart Home.",
        'instalacja': "Kompletny przewodnik po instalacji {title}. Techniczne szczegóły, porady i doświadczenia z implementacji systemów IoT.",
        'interior-design': "Projektowanie wnętrz w inteligentnym mieszkaniu. {title} - inspiracje i praktyczne rozwiązania dla nowoczesnego domu.",
        'wyposarzenie': "Recenzje i porady dotyczące wyposażenia Smart Home. {title} - co wybrać i dlaczego?"
    },
    'docs': {
        'default': "Dokumentacja techniczna: {title}. Kompletny przewodnik dla instalatorów i deweloperów IoT.",
        'actuators': "Siłowniki i aktory w systemach Smart Home. {title} - specyfikacja, instalacja i konfiguracja.",
        'sensors': "Czujniki w inteligentnym domu. {title} - rodzaje, zastosowanie i parametry techniczne.",
        'electrical-installation': "Instalacja elektryczna w Smart Home. {title} - normy, bezpieczeństwo i najlepsze praktyki.",
        'networks': "Sieci w systemach IoT. {title} - protokoły, konfiguracja i bezpieczeństwo.",
        'interior-design': "Projektowanie wnętrz Smart Home. {title} - materiały, oświetlenie i ergonomia."
    },
    'tutorials': {
        'default': "Praktyczny tutorial: {title}. Krok po kroku z przykładami i rozwiązaniami problemów."
    },
    'services': {
        'default': "Profesjonalna usługa Smart Home: {title}. Konsultacje, projektowanie i implementacja systemów IoT."
    }
}

# Słowa kluczowe do rotacji w opisach
KEYWORDS = [
    'smart home', 'inteligentny dom', 'IoT', 'automatyzacja',
    'Paweł Żentała', 'ihome.zentala.io', 'instalacja elektryczna',
    'Home Assistant', 'BoneIO', 'ESP32', 'Raspberry Pi'
]

def extract_front_matter(content):
    """Wyciąga front matter z pliku Markdown"""
    if content.startswith('---'):
        end = content.find('---', 3)
        if end != -1:
            return content[:end + 3], content[end + 3:]
    return '', content

def generate_seo_title(title, category=''):
    """Generuje optymalny tytuł SEO"""
    base_title = title.strip('"\'')
    if len(base_title) > 50:
        base_title = base_title[:47] + '...'

    if category in ['blog', 'tutorials']:
        return f"{base_title} | ihome.zentala.io - Smart Home"
    elif category == 'services':
        return f"{base_title} | Paweł Żentała - Ekspert IoT"
    else:
        return f"{base_title} | Dokumentacja - ihome.zentala.io"

def generate_description(title, category, subcategory=''):
    """Generuje opis na podstawie szablonu"""
    template_key = subcategory if subcategory in TEMPLATES.get(category, {}) else 'default'
    template = TEMPLATES.get(category, {}).get(template_key, TEMPLATES.get(category, {}).get('default', '{title} - kompleksowy opis'))

    description = template.format(title=title)

    # Dodaj słowa kluczowe jeśli opis jest krótki
    if len(description) < 120:
        keyword = next((kw for kw in KEYWORDS if kw.lower() not in description.lower()), 'Smart Home')
        description += f" Więcej informacji na {keyword} znajdziesz w naszym serwisie."

    # Przytnij do optymalnej długości
    if len(description) > 155:
        description = description[:152] + '...'

    return description

def optimize_file(file_path):
    """Optymalizuje pojedynczy plik"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        front_matter_text, body = extract_front_matter(content)

        if not front_matter_text:
            print(f"⚠️  Brak front matter w: {file_path}")
            return False

        # Parsuj YAML
        try:
            data = yaml.safe_load(front_matter_text.replace('---', ''))
        except yaml.YAMLError as e:
            print(f"❌ Błąd YAML w {file_path}: {e}")
            return False

        # Określ kategorię i podkategorię
        rel_path = str(file_path).replace(str(Path('content')), '').strip('/')
        parts = rel_path.split('/')
        category = parts[0] if len(parts) > 0 else 'other'
        subcategory = parts[1] if len(parts) > 1 else 'default'

        # Pobierz tytuł
        title = data.get('title', '')
        if not title or title.startswith('Guides lead'):
            print(f"⚠️  Brak tytułu w: {file_path}")
            return False

        # Generuj nowe metadane
        changes = False

        # Aktualizuj description jeśli jest puste
        current_desc = data.get('description', '')
        if not current_desc or current_desc.startswith('Guides lead'):
            new_desc = generate_description(title, category, subcategory)
            data['description'] = new_desc
            changes = True
            print(f"📝 Wygenerowano opis dla: {title}")

        # Aktualizuj SEO jeśli jest puste
        seo = data.get('seo', {})
        if not seo.get('title') or seo.get('title') == '""':
            seo['title'] = generate_seo_title(title, category)
            changes = True

        if not seo.get('description') or seo.get('description') == '""':
            seo_desc = generate_description(title, category, subcategory)
            seo['description'] = seo_desc
            changes = True

        # Zapisz tylko jeśli były zmiany
        if changes:
            # Przygotuj nowy front matter
            new_front_matter = yaml.dump(data, default_flow_style=False, allow_unicode=True, indent=2)
            new_content = f"---\n{new_front_matter}---\n{body}"

            # Backup oryginalnego pliku
            backup_path = file_path.with_suffix('.bak')
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

            print(f"✅ Zaktualizowano: {file_path}")
            return True

        return False

    except Exception as e:
        print(f"❌ Błąd w {file_path}: {e}")
        return False

def main():
    """Główna funkcja"""
    content_dir = Path('content')
    processed = 0
    updated = 0

    print("🔍 Rozpoczynam optymalizację metadanych...")
    print(f"📅 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    # Przejdź przez wszystkie pliki .md w content/
    for md_file in content_dir.rglob('*.md'):
        if md_file.suffix == '.bak':
            continue  # Pomijaj pliki backup

        processed += 1
        if optimize_file(md_file):
            updated += 1

    print("=" * 60)
    print(f"📊 Przetworzono plików: {processed}")
    print(f"✅ Zaktualizowano plików: {updated}")
    print(f"📈 Skuteczność: {updated/processed*100:.1f}%" if processed > 0 else "📈 Brak plików do przetworzenia")
    print("🎯 Optymalizacja zakończona!")

if __name__ == "__main__":
    main()
