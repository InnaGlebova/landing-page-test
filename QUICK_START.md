# ⚡ Быстрый старт

## 🚀 Деплой за 5 минут

### 1. Загрузка на GitHub

```bash
# Инициализация git (если еще не сделано)
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit"

# Переименование ветки в main
git branch -M main

# Добавление удаленного репозитория (замените YOUR_USERNAME и YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Отправка кода на GitHub
git push -u origin main
```

### 2. Настройка GitHub Pages

1. Зайдите в **Settings** → **Pages**
2. В разделе **Source** выберите **GitHub Actions**
3. Готово! Сайт будет доступен через несколько минут

### 3. Ссылка на ваш сайт

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

### 4. Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev
```

## 🔗 Полезные ссылки

- [Подробная инструкция по деплою](DEPLOYMENT.md)
- [Документация GitHub Pages](https://docs.github.com/pages)
- [Документация GitHub Actions](https://docs.github.com/actions)

## ❓ Частые вопросы

**Q: Сайт не отображается после деплоя**
A: Подождите 5-10 минут, GitHub Pages может занимать время на обновление

**Q: GitHub Actions выдает ошибку**
A: Проверьте вкладку Actions в репозитории для просмотра логов ошибок

**Q: Как обновить сайт?**
A: Просто сделайте git push - сайт обновится автоматически