# 🧪 Тренировочные вопросы: PG16 и Каталог

---

## Модуль 17: Особенности PostgreSQL 16

### Вопрос 1
**Какое новое представление в PostgreSQL 16 позволяет анализировать операции ввода-вывода (I/O) для различных типов процессов (например, checkpointer vs background writer)?**

A) pg_stat_activity
B) pg_stat_io
C) pg_stat_bgwriter
D) pg_stat_database

<details><summary><b>Ответ: B</b></summary>
pg_stat_io — новое представление для глубокого анализа I/O. Старое pg_stat_bgwriter показывает общие счетчики, но не разделяет их так детально.
</details>

### Вопрос 2
**Какая роль позволяет пользователю выполнять команду CHECKPOINT, не будучи суперпользователем?**

A) pg_write_all_data
B) pg_monitor
C) pg_checkpoint
D) pg_execute_server_program

<details><summary><b>Ответ: C</b></summary>
pg_checkpoint — одна из предопределенных ролей для делегирования прав администратора.
</details>

---

## Модуль 18: Шпаргалка по Системному каталогу (pg_catalog)

### Вопрос 3
**В какой таблице системного каталога можно найти информацию о типе объекта (таблица, индекс или представление)?**

A) pg_index
B) pg_attribute
C) pg_class
D) pg_type

<details><summary><b>Ответ: C</b></summary>
pg_class содержит поле relkind (r - relation/table, i - index, v - view), которое определяет тип объекта.
</details>

### Вопрос 4
**Какая функция возвращает полный размер таблицы на диске, включая все её индексы и TOAST-таблицы?**

A) pg_relation_size()
B) pg_table_size()
C) pg_total_relation_size()
D) pg_database_size()

<details><summary><b>Ответ: C</b></summary>
pg_total_relation_size() — это "честный" размер, который учитывает всё, что относится к таблице. pg_relation_size() покажет только размер самого основного файла данных.
</details>

---
