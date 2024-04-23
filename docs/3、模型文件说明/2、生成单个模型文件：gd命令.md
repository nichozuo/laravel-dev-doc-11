# php artisan gd

```
php artisan gd company -f
```

- 默认覆盖 BaseCompanies.php
- -f 才会强制覆盖 Companies.php
- 所以，一般有额外的代码，写在Companies.php里，就不会被覆盖

### 1、生成的：Companies.php
```php
<?php

namespace App\Models;

use App\Models\Base\BaseCompanies;

class Companies extends BaseCompanies
{
}

```

### 2、生成的：BaseCompanies.php
```php
<?php

namespace App\Models\Base;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations;
use App\Models;
use Illuminate\Database\Eloquent\SoftDeletes;


/**
 * 这里是自动生成的字段列表，在用$company->name的时候会高亮显示
 * 
 * @property integer $id
 * @property string $name
 * @property string $prefix
 * @property string $full_name
 * @property string $license_number
 * @property array $logo_image
 * @property string $description
 * @property array $banner_images
 * @property mixed $deleted_at
 * @property mixed $created_at
 * @property mixed $updated_at
 */
class BaseCompanies extends Base
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'companies';
    protected string $comment = '机构';
    protected $fillable = ['name', 'prefix', 'full_name', 'license_number', 'logo_image', 'description', 'banner_images'];
    
    protected $casts = [
        'logo_image' => 'array',
    ];

    # relations
    public function company_projects(): Relations\HasMany
    {
        return $this->hasMany(Models\CompanyProjects::class, 'companies_id', 'id');
    }
}

```