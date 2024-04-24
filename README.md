Телеграм-бот с использованием OpenAI
Этот проект представляет собой пример телеграм-бота, который использует API OpenAI для обработки голосовых и текстовых сообщений пользователей.

Установка
Клонируйте репозиторий на свой локальный компьютер:
bash
Copy code
git clone https://github.com/Enkeym/gpt.git
Установите зависимости:
Copy code
npm install
Создайте файл конфигурации config/default.json с вашими настройками:
json
Copy code
{
  "TELEGRAM_TOKEN": "YOUR_TELEGRAM_TOKEN",
  "TEST_ENV": "YOUR_TEST_ENV"
}
Запустите бот:
sql
Copy code
npm start
Использование
После запуска бота, он будет доступен в вашем Telegram аккаунте. Вот некоторые команды, которые вы можете использовать:

/start - Начать диалог с ботом.
/new - Начать новый диалог с ботом (эквивалентно /start).
Бот поддерживает отправку как текстовых, так и голосовых сообщений. При отправке голосового сообщения бот произведет транскрибацию голоса и ответит вам текстом.

Особенности
Бот использует API OpenAI для обработки сообщений пользователя.
Взаимодействие с API происходит через HTTP запросы.
Для работы с голосовыми сообщениями используется модуль ogg.js.
Весь код бота находится в файле index.js.
Вклад
Если вы хотите внести свой вклад в развитие этого проекта, пожалуйста, прочитайте CONTRIBUTING.md для получения дополнительной информации.