# 🎓 Полная симуляция экзамена DBA1-16

**50 вопросов | 75 минут | Проходной балл: 75% (38 из 50)**

---

### Вопрос 1
**Что такое «кластер баз данных» в PostgreSQL?**

A) Несколько серверов PostgreSQL в режиме репликации
B) Набор баз данных, управляемых одним экземпляром PostgreSQL
C) Группа таблиц в одной базе данных
D) Резервная копия всех данных

<details><summary><b>Ответ: B</b></summary>
Кластер — это данные в файлах, которыми управляет один экземпляр PostgreSQL. Не путать с кластером серверов!
</details>

### Вопрос 2
**Какая утилита инициализирует кластер баз данных?**

A) pg_ctl
B) pg_createcluster
C) initdb
D) createdb

<details><summary><b>Ответ: C</b></summary>
initdb — основная утилита. pg_createcluster — обёртка для Ubuntu.
</details>

### Вопрос 3
**Какой ключ initdb включает контрольные суммы страниц?**

A) -c
B) -s
C) -k
D) --checksums

<details><summary><b>Ответ: C</b></summary>
Ключ -k включает подсчёт контрольных сумм страниц данных.
</details>

### Вопрос 4
**От чьего имени нужно запускать pg_ctl?**

A) root
B) postgres
C) Владельца кластера баз данных
D) Любого пользователя с правами sudo

<details><summary><b>Ответ: C</b></summary>
pg_ctl запускается от имени владельца кластера (обычно postgres, но может быть другой пользователь).
</details>

### Вопрос 5
**Какая команда psql показывает информацию о текущем подключении?**

A) \info
B) \conninfo
C) \connect
D) \status

<details><summary><b>Ответ: B</b></summary>
\conninfo показывает БД, пользователя, тип соединения и порт.
</details>

### Вопрос 6
**Что означает символ «!» в приглашении psql (=!#)?**

A) Суперпользователь
B) Ошибка
C) Транзакция прервана ошибкой
D) Режим автоматической фиксации

<details><summary><b>Ответ: C</b></summary>
=!# означает, что текущая транзакция прервана ошибкой и все последующие команды будут игнорироваться.
</details>

### Вопрос 7
**Что делает ON_ERROR_ROLLBACK = on в psql?**

A) Автоматически выполняет ROLLBACK при ошибке
B) Устанавливает SAVEPOINT перед каждой командой в транзакции
C) Останавливает скрипт при ошибке
D) Отключает AUTOCOMMIT

<details><summary><b>Ответ: B</b></summary>
ON_ERROR_ROLLBACK устанавливает SAVEPOINT перед каждой командой, позволяя продолжать работу после ошибки.
</details>

### Вопрос 8
**Какой файл конфигурации записывает ALTER SYSTEM?**

A) postgresql.conf
B) postgresql.auto.conf
C) pg_hba.conf
D) postgresql.backup.conf

<details><summary><b>Ответ: B</b></summary>
ALTER SYSTEM записывает в postgresql.auto.conf в PGDATA. Этот файл читается после postgresql.conf.
</details>

### Вопрос 9
**Какой контекст параметра требует перезапуска сервера?**

A) sighup
B) user
C) postmaster
D) superuser

<details><summary><b>Ответ: C</b></summary>
Контекст 'postmaster' — требуется полный перезапуск сервера.
</details>

### Вопрос 10
**Как применить изменения sighup-параметра без перезапуска?**

A) ALTER SYSTEM
B) pg_ctl reload или SELECT pg_reload_conf()
C) Перезапустить сервер
D) SET

<details><summary><b>Ответ: B</b></summary>
Параметры sighup применяются при перечитывании конфигурации (reload).
</details>

### Вопрос 11
**Какой процесс создаёт backend для каждого нового клиента?**

A) bgwriter
B) checkpointer
C) postmaster
D) walwriter

<details><summary><b>Ответ: C</b></summary>
Postmaster — главный процесс, fork-ает backend для каждого клиента.
</details>

### Вопрос 12
**Какие 4 свойства транзакции называются ACID?**

A) Атомарность, Согласованность, Изоляция, Долговечность
B) Атомарность, Синхронность, Изоляция, Durability
C) Атомарность, Согласованность, Интеграция, Долговечность
D) Atomic, Consistent, Independent, Durable

<details><summary><b>Ответ: A</b></summary>
ACID: Атомарность, Согласованность, Изоляция, Долговечность (Atomicity, Consistency, Isolation, Durability).
</details>

### Вопрос 13
**Какой уровень изоляции по умолчанию в PostgreSQL?**

A) Read Uncommitted
B) Read Committed
C) Repeatable Read
D) Serializable

<details><summary><b>Ответ: B</b></summary>
Read Committed — снимок строится при начале каждого оператора.
</details>

### Вопрос 14
**Блокирует ли SELECT пишущие транзакции в PostgreSQL?**

A) Да, всегда
B) Да, если те же строки
C) Нет, никогда
D) Только при Serializable

<details><summary><b>Ответ: C</b></summary>
При MVCC чтение никогда не блокирует.
</details>

### Вопрос 15
**Где хранятся статусы транзакций (clog)?**

A) В pg_wal/
B) В pg_xact/
C) В base/
D) В global/

<details><summary><b>Ответ: B</b></summary>
pg_xact/ содержит файлы статусов транзакций — 2 бита на транзакцию.
</details>

### Вопрос 16
**Для чего нужна VACUUM?**

A) Только удаление мёртвых строк
B) Удаление мёртвых строк, обновление карт видимости и свободного пространства, сбор статистики, заморозка
C) Только сбор статистики
D) Уменьшение размера файла

<details><summary><b>Ответ: B</b></summary>
VACUUM выполняет комплекс задач по поддержанию работоспособности.
</details>

### Вопрос 17
**Возвращает ли обычный VACUUM место операционной системе?**

A) Да
B) Нет
C) Только с ключом FULL
D) Только для индексов

<details><summary><b>Ответ: B</b></summary>
Обычный VACUUM только освобождает место внутри страниц. VACUUM FULL возвращает место ОС.
</details>

### Вопрос 18
**Какой параметр включает/выключает автоочистку?**

A) vacuum_enabled
B) autovacuum
C) auto_vacuum
D) vacuum_auto

<details><summary><b>Ответ: B</b></summary>
autovacuum = on/off включает или отключает процесс автоочистки.
</details>

### Вопрос 19
**Что такое LSN?**

A) Log Sequence Number — смещение записи WAL
B) Local Storage Node
C) Log Storage Number
D) Log Sequence Name

<details><summary><b>Ответ: A</b></summary>
LSN — 64-битное смещение записи WAL в байтах от начала журнала.
</details>

### Вопрос 20
**Какой процесс выполняет асинхронную запись WAL?**

A) checkpointer
B) bgwriter
C) walwriter
D) autovacuum launcher

<details><summary><b>Ответ: C</b></summary>
walwriter — асинхронная запись WAL на диск.
</details>

### Вопрос 21
**Какой уровень wal_level нужен для физической репликации?**

A) minimal
B) replica
C) logical
D) archive

<details><summary><b>Ответ: B</b></summary>
replica — для физической репликации и бэкапов. logical — для логической репликации.
</details>

### Вопрос 22
**Какой режим останова НЕ выполняет контрольную точку?**

A) smart
B) fast
C) immediate
D) Все выполняют

<details><summary><b>Ответ: C</b></summary>
immediate — мгновенная остановка без checkpoint. При запуске потребуется восстановление.
</details>

### Вопрос 23
**Какая БД НЕ должна изменяться?**

A) postgres
B) template1
C) template0
D) Все можно изменять

<details><summary><b>Ответ: C</b></summary>
template0 — неизменяемый шаблон для восстановления и создания БД с другой кодировкой.
</details>

### Вопрос 24
**Что такое search_path?**

A) Путь к данным
B) Порядок схем для поиска объектов
C) Путь к конфигурации
D) Путь к логам

<details><summary><b>Ответ: B</b></summary>
search_path определяет порядок схем для разрешения неквалифицированных имён объектов.
</details>

### Вопрос 25
**Какая схема неявно подразумевается первой, даже если нет в search_path?**

A) public
B) pg_catalog
C) pg_temp
D) information_schema

<details><summary><b>Ответ: C</b></summary>
pg_temp (временная схема) — самая первая. Затем pg_catalog.
</details>

### Вопрос 26
**Какой префикс имеют таблицы системного каталога?**

A) sys_
B) pg_
C) cat_
D) system_

<details><summary><b>Ответ: B</b></summary>
Все таблицы и представления системного каталога начинаются с pg_.
</details>

### Вопрос 27
**Что хранит pg_class?**

A) Только таблицы
B) Таблицы, представления, индексы, последовательности
C) Только индексы
D) Схемы

<details><summary><b>Ответ: B</b></summary>
pg_class — все «отношения»: r=table, v=view, i=index, S=sequence, m=materialized view.
</details>

### Вопрос 28
**Что такое тип regclass?**

A) Регулярное выражение для классов
B) Псевдоним oid для pg_class
C) Тип данных для хранения классов
D) Тип индексации

<details><summary><b>Ответ: B</b></summary>
regclass — псевдоним oid, преобразует имя таблицы в OID и обратно.
</details>

### Вопрос 29
**Какое табличное пространство по умолчанию для таблиц?**

A) pg_global
B) pg_default
C) main
D) pg_system

<details><summary><b>Ответ: B</b></summary>
pg_default — для таблиц и индексов. pg_global — для общих объектов.
</details>

### Вопрос 30
**Какой суффикс файла — карта видимости?**

A) _fsm
B) _vm
C) _init
D) _vis

<details><summary><b>Ответ: B</b></summary>
_vm = visibility map. _fsm = free space map.
</details>

### Вопрос 31
**Что такое TOAST?**

A) Тип индекса
B) Механизм хранения длинных значений вне таблицы
C) Тип репликации
D) Метод бэкапа

<details><summary><b>Ответ: B</b></summary>
TOAST — The Oversized-Attribute Storage Technique — разбивает длинные значения на chunks.
</details>

### Вопрос 32
**Какая функция возвращает полный размер таблицы со всеми индексами?**

A) pg_table_size()
B) pg_relation_size()
C) pg_total_relation_size()
D) pg_size()

<details><summary><b>Ответ: C</b></summary>
pg_total_relation_size() = данные + TOAST + FSM + VM + все индексы.
</details>

### Вопрос 33
**Какой параметр нужен для работы автоочистки?**

A) track_activities
B) track_counts
C) track_functions
D) track_io_timing

<details><summary><b>Ответ: B</b></summary>
track_counts собирает счётчики операций, необходимые автоочистке.
</details>

### Вопрос 34
**Какое представление показывает текущую активность?**

A) pg_stat_all_tables
B) pg_stat_database
C) pg_stat_activity
D) pg_stat_user_tables

<details><summary><b>Ответ: C</b></summary>
pg_stat_activity — PID, пользователь, БД, состояние, запрос, ожидания.
</details>

### Вопрос 35
**Какой атрибут роли позволяет подключаться к серверу?**

A) CONNECT
B) ACCESS
C) LOGIN
D) ENTER

<details><summary><b>Ответ: C</b></summary>
LOGIN — атрибут роли для подключения к серверу.
</details>

### Вопрос 36
**Какой метод аутентификации в pg_hba.conf не требует пароля и проверяет имя пользователя ОС?**

A) trust
B) password
C) peer
D) md5

<details><summary><b>Ответ: C</b></summary>
peer — имя пользователя ОС должно совпадать с именем роли.
</details>

### Вопрос 37
**Как создать роль с правом создания баз данных?**

A) `CREATE ROLE app CREATEDB;`
B) `CREATE ROLE app CREATEDATABASE;`
C) `CREATE ROLE app CREATE_DB;`
D) `CREATE ROLE app WITH DATABASE;`

<details><summary><b>Ответ: A</b></summary>
CREATEDB — атрибут роли для создания БД.
</details>

### Вопрос 38
**Какая команда pg_dump создаёт дамп в пользовательском формате?**

A) -Fp
B) -Fc
C) -Fd
D) -Ft

<details><summary><b>Ответ: B</b></summary>
-Fc — custom (пользовательский) формат, сжатый, можно выбирать объекты при восстановлении.
</details>

### Вопрос 39
**Какая утилита создаёт физический бэкап кластера?**

A) pg_dump
B) pg_dumpall
C) pg_basebackup
D) pg_backup

<details><summary><b>Ответ: C</b></summary>
pg_basebackup — физическая копия кластера.
</details>

### Вопрос 40
**Какой параметр включает архивирование WAL?**

A) wal_level = archive
B) archive_mode = on
C) archive_enabled = true
D) wal_archive = on

<details><summary><b>Ответ: B</b></summary>
archive_mode = on + archive_command.
</details>

### Вопрос 41
**Что означает %f в archive_command?**

A) Путь к файлу WAL
B) Имя файла WAL
C) LSN
D) Размер файла

<details><summary><b>Ответ: B</b></summary>
%f — имя файла WAL. %p — полный путь.
</details>

### Вопрос 42
**Какой процесс на основном отправляет WAL реплике?**

A) walreceiver
B) walsender
C) walwriter
D) startup

<details><summary><b>Ответ: B</b></summary>
walsender — на основном. walreceiver — на реплике.
</details>

### Вопрос 43
**Какой тип репликации по умолчанию?**

A) Синхронная
B) Асинхронная
C) Полусинхронная
D) Логическая

<details><summary><b>Ответ: B</b></summary>
Асинхронная — основной не ждёт подтверждения.
</details>

### Вопрос 44
**Для чего нужны слоты репликации?**

A) Ограничение скорости
B) Гарантия сохранения WAL до получения репликой
C) Аутентификация
D) Шифрование

<details><summary><b>Ответ: B</b></summary>
Слоты гарантируют, что WAL не будет удалён, пока реплика не получит.
</details>

### Вопрос 45
**Какая функция повышает реплику до основного?**

A) pg_switch_wal()
B) pg_promote()
C) pg_standby()
D) pg_failover()

<details><summary><b>Ответ: B</b></summary>
pg_promote() — SQL-функция для promotion реплики.
</details>

### Вопрос 46
**Какой wal_level нужен для логической репликации?**

A) minimal
B) replica
C) logical
D) full

<details><summary><b>Ответ: C</b></summary>
logical — требуется для логического декодирования WAL.
</details>

### Вопрос 47
**Реплицируются ли DDL-команды при логической репликации?**

A) Да
B) Нет
C) Только CREATE TABLE
D) Только ALTER TABLE

<details><summary><b>Ответ: B</b></summary>
DDL НЕ реплицируется. Структуру нужно создавать вручную.
</details>

### Вопрос 48
**Что такое REPLICA IDENTITY?**

A) Копия таблицы
B) Идентификация строк для UPDATE/DELETE при репликации
C) Тип индекса
D) Метод сжатия

<details><summary><b>Ответ: B</b></summary>
REPLICA IDENTITY определяет столбцы для идентификации строк при UPDATE/DELETE.
</details>

### Вопрос 49
**Какое представление показывает статистику запросов?**

A) pg_stat_activity
B) pg_stat_statements
C) pg_stat_all_tables
D) pg_stat_database

<details><summary><b>Ответ: B</b></summary>
pg_stat_statements — кол-во вызовов, время, строки для каждого запроса.
</details>

### Вопрос 50
**Какой файл создаётся в PGDATA для запуска режима восстановления?**

A) backup.signal
B) restore.signal
C) recovery.signal
D) wal.signal

<details><summary><b>Ответ: C</b></summary>
recovery.signal сигнализирует серверу о необходимости восстановления при запуске.
</details>

---

## 📊 Результаты

| Правильных | Процент | Результат |
|------------|---------|-----------|
| 38-50 | 76-100% | ✅ СДАНО |
| 30-37 | 60-74% | ❌ Не сдано, нужно повторить |
| Менее 30 | < 60% | ❌ Требуется серьёзная подготовка |
