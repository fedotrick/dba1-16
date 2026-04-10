# Этап 1: Сборка данных и приложения
FROM node:20-alpine AS build

# Устанавливаем Python 3 для парсинга данных
RUN apk add --no-cache python3

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы
COPY . .

# Запускаем парсинг Markdown в JSON
RUN python3 parse_data.py

# Собираем React приложение через Vite
RUN npm run build

# Этап 2: Раздача статики через Nginx
FROM nginx:stable-alpine

# Копируем результаты сборки в стандартную папку Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем 80 порт (Nginx по умолчанию)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
