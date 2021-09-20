# Banner styles

Стили для отображения баннеров. Используются в редакторе баннеров в [dashboard](https://github.com/Convead/dashboard) и подключаются скриптом [analytics-js](https://github.com/Convead/analytics-js) перед показом баннера пользователям.

Файл со стилями залит в jsDelivr и доступен по ссылке:
https://cdn.jsdelivr.net/gh/Convead/banner-styles@latest/dist/styles.min.css

`npm i` - установка зависимостей \
`npm build` - сборка единого минифицированного css файла

## Публикация обновления в jsDelivr

1. Внести изменения.
2. Сбилдить (`npm build`) новый файл `styles.min.css`.
3. Залить изменения в мастер.
4. Выполнить post запрос через консоль, что бы сообщить, что версия изменилась:

```
curl -X POST \
  http://purge.jsdelivr.net/ \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
    "path": [
       "gh/convead/banner-styles@latest/dist/styles.min.css"
     ]
  }'
```

За сутки этот запрос сработает только 2 раза, остальные запросы будут игнорироваться. \
По ссылке теперь доступен обновленный файл.
