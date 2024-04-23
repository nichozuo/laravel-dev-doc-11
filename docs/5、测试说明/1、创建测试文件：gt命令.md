# php artisan gt

```
php artisan gt admin/companies -f
```

- -f会覆盖，默认不覆盖
- 会根据controller下的functions，自动生成测试文件，包括对应的参数


### 示例
```php
<?php

namespace Tests\Modules\Company;


use Tests\TestCase;

/**
 * App\Modules\Company\AuthController
 */
class AuthControllerTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test_captcha()
    {
        $this->go(__METHOD__, [

        ]);
    }

    public function test_login()
    {
        $this->go(__METHOD__, [
            'username' => 'cswy', # 用户名,
            'password' => '123123', # 密码,
            'captcha' => '123', # 验证码,
            'captcha_key' => '123', # 验证码key
        ]);
    }

    public function test_logout()
    {
        $this->go(__METHOD__, [

        ]);
    }

    public function test_me()
    {
        $this->go(__METHOD__, [

        ]);
    }

    public function test_changePassword()
    {
        $this->go(__METHOD__, [
            'old_password' => '', # 老密码,
            'new_password' => '', # 新密码,
            're_new_password' => '', # 重复新密码
        ]);
    }
}

```