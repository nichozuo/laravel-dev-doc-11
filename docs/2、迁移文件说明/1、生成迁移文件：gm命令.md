# php artisan gm

```
php artisan gm company
php artisan gm company_admin
```

根据输入的数据库表名，生成migration迁移文件。
- 表名：会转成蛇形，单数，复数。
- 例如：php artisan gm users
- 例如：php artisan gm User


#### 运行后效果如下：
```
INFO  Migration [database/migrations/2024_04_16_143652_create_admins_table.php] created successfully.  
```