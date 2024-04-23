# php artisan ge 

### 1、99%的情况下，一定要用【表名+字段名】来生成
```bash
php artisan ge company_admins/status
```

### 2、1%的情况，就是全局用的Enum，就可以直接生成
```bash
php artisan ge SexEnum
```

# 自动生成的文件
```php
<?php  
  
namespace App\Enums;  
  
use LaravelDev\App\Traits\EnumTrait;  
  
/**  
 * @intro CompanyAdminsStatusEnum  
 * @field status  
 */enum CompanyAdminsStatusEnum: string  
{  
    use EnumTrait;  
  
    /**  
     * @label Label  
     * @value Value  
     * @color #ff0000  
     */    
     case Label = 'Value';  
}
```
- @intro 要填写成中文
- @field 要填写成字段
- @color表示在前端自动显示成tag的颜色，很重要！


# const的部分，可以用Ai来生成，爽到起飞。