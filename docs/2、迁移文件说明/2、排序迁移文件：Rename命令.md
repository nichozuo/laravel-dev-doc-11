# php artisan Rename
> 重命名所有迁移文件，然后会根据表名排序，会好看很多。体验超棒！

```bash
php artisan Rename

# 运行后效果如下：
2024_04_16_143652_create_admins_table.php ==> 2024_4_16_000000_create_admins_table.php
2024_4_16_000000_create_permission_tables.php ==> 2024_4_16_000000_create_permission_tables.php
2024_4_16_000000_create_personal_access_tokens_table.php ==> 2024_4_16_000000_create_personal_access_tokens_table.php
2024_4_16_000000_create_tag_tables.php ==> 2024_4_16_000000_create_tag_tables.php
```
- 会把所有迁移文件的名字重新命名
- 除了定义在 config('project.migrationBlacklists')中的名称
- 日期默认当天
