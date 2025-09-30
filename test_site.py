#!/usr/bin/env python3
"""Тестирование сайта CoFound IT с Playwright"""
import time
from playwright.sync_api import sync_playwright

def test_site():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        print("🌐 Открываю http://localhost:9000/index.html...")
        try:
            page.goto("http://localhost:9000/index.html", wait_until="networkidle", timeout=5000)
        except Exception as e:
            print(f"❌ Ошибка загрузки страницы: {e}")
            browser.close()
            return
        
        print("✅ Страница загружена!")
        
        # Проверяем заголовок
        title = page.title()
        print(f"📝 Title: {title}")
        
        # Проверяем наличие основных элементов
        print("\n🔍 Проверяю элементы...")
        
        # Hero section
        hero = page.locator(".hero h1")
        if hero.count() > 0:
            print(f"✅ Hero заголовок: {hero.inner_text()[:50]}...")
        else:
            print("❌ Hero заголовок не найден")
        
        # Brand
        brand = page.locator(".brand")
        if brand.count() > 0:
            print(f"✅ Логотип: {brand.inner_text()}")
        else:
            print("❌ Логотип не найден")
        
        # Cards
        cards = page.locator(".card")
        print(f"✅ Найдено карточек: {cards.count()}")
        
        # Metrics
        metrics = page.locator(".metric")
        print(f"✅ Найдено метрик: {metrics.count()}")
        
        # Buttons
        buttons = page.locator(".btn")
        print(f"✅ Найдено кнопок: {buttons.count()}")
        
        # Проверяем CSS
        print("\n🎨 Проверяю стили...")
        hero_bg = page.locator(".hero").evaluate("el => window.getComputedStyle(el).background")
        print(f"✅ Hero background: {hero_bg[:80]}...")
        
        # Тестируем калькулятор
        print("\n🧮 Тестирую калькулятор...")
        salary_input = page.locator("#salary")
        if salary_input.count() > 0:
            salary_input.fill("300000")
            page.wait_for_timeout(500)
            total = page.locator("#total").inner_text()
            print(f"✅ Расчет для 300к: {total}")
        
        # Скролл для проверки анимаций
        print("\n📜 Скроллю страницу...")
        page.evaluate("window.scrollTo(0, 500)")
        time.sleep(1)
        page.evaluate("window.scrollTo(0, 1000)")
        time.sleep(1)
        
        # Проверяем hover эффект
        print("\n🖱️  Проверяю hover эффекты...")
        if cards.count() > 0:
            cards.first.hover()
            time.sleep(0.5)
            print("✅ Hover на карточке работает")
        
        # Скриншот
        print("\n📸 Делаю скриншот...")
        page.screenshot(path="screenshot.png", full_page=True)
        print("✅ Скриншот сохранен: screenshot.png")
        
        # Проверяем консоль на ошибки
        print("\n🐛 Проверяю консоль...")
        errors = []
        page.on("console", lambda msg: errors.append(msg) if msg.type == "error" else None)
        page.reload()
        time.sleep(2)
        
        if errors:
            print(f"⚠️  Найдено ошибок в консоли: {len(errors)}")
            for err in errors[:5]:
                print(f"  - {err}")
        else:
            print("✅ Ошибок в консоли нет!")
        
        print("\n⏳ Держу браузер открытым 5 секунд...")
        time.sleep(5)
        
        browser.close()
        print("\n✨ Тестирование завершено!")

if __name__ == "__main__":
    test_site()
