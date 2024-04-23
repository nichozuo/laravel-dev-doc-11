# BaseController.php文件
### 1、每个模块下（app/Modules），都要放一个BaseController.php文件
### 2、每个模块下的所有控制器，都必须要继承BaseController（生成的控制器默认继承）
### 3、文件内容
```php
<?php  
  
namespace App\Modules\Admin;  
  
use App\Enums\SysModuleEnum;  
use App\Http\Controllers\Controller;  
use App\Models\Admins;  
  
class BaseController extends Controller  
{  
    private ?Admins $user = null;  
    protected string $guardName = SysModuleEnum::Admin->value;  
  
    /**  
     * @return Admins|null  
     */
    public function getUser(): ?Admins  
    {  
        if (!$this->user) {  
            $user = auth()->guard($this->guardName)->user();  
            $this->user = $user;  
        }  
        return $this->user;  
    }  
  
    /**  
     * @return string  
     */
    protected function getUploadDir(): string  
    {  
        return implode('/', [  
            'manager'  
        ]);  
    }  
}
```