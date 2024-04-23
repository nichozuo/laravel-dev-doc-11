# 特殊字段是为了规范代码生成，所以在特定的字段，用特定的方式来定义

## 1. 创建外键
> 主要是为了能够生成表之间的关系，所以才要用这种方式定义
> 有了关系定义，可以生成er图，生成模型关系等等
```
SchemaHelper::ForeignId($table, 'companies_id', '公司', 'companies')->nullable();
```
- $table: blueprint的引用
- $field: 数据库的字段
- $comment: 字段的描述。当然字段最终会生成comment：公司id,[ref:companies]
- $referenceTable: 关联表的表名。
  - 默认是字段名去掉_id
  - 如果不符合上述规则，则需要自己指定

## 2. 创建枚举
```
SchemaHelper::Enum($table, 'type', SysPermissionsTypeEnum::class, '类型');
```
- $table: blueprint的引用
- $field: 数据库的字段
- $enumClass: 枚举的类（枚举可以通过命令生成）
- $comment: 字段的描述。当然字段最终会生成comment：类型,[enum:SysPermissionsTypeEnum]
  

## 3. 例子

```php
Schema::create('company_admins', function (Blueprint $table) {  
    $table->id();  
  
    $table->string('username', 20)->comment('用户名');  
    $table->string('password', 100)->comment('密码');  
  
    SchemaHelper::ForeignId($table, 'companies_id');  
    SchemaHelper::Enum($table, 'status', CompanyAdminsStatusEnum::class, '状态')->default(CompanyAdminsStatusEnum::Enabled->value);

    $table->timestamps();
    $table->comment('机构管理员')
});
```