# API接口定义如下
> 大多数定义，都在方法的注解中完成

## 1、例子
```php
/**
 * @intro 登录
 * @skipAuth true
 * @skipWrapper false
 * @skipInRouter false
 * @return array
 * @throws Err
 * @responseJson {"success":true,"data":{"user":{"id":1,"username":"zwb"},"token":{"access_token":"4|vhI0eMbOxkd6rNUGX3kBMqZI7bVgbi71bpTB5xME2b1ba05a"},"permissions":{"id":1,"name":"\u603b\u540e\u53f0","guard_name":"sanctum","created_at":"2024-04-08T02:23:52.000000Z","updated_at":"2024-04-08T02:23:52.000000Z","icon":null,"type":"Directory","path":null,"_lft":1,"_rgt":16,"parent_id":null,"children":[{"id":2,"name":"\u673a\u67841","guard_name":"sanctum","created_at":"2024-04-08T02:23:52.000000Z","updated_at":"2024-04-08T02:23:52.000000Z","icon":"ShopOutlined","type":"Directory","path":null,"_lft":2,"_rgt":9,"parent_id":1,"children":[{"id":3,"name":"\u673a\u6784\u7ba1\u74061","guard_name":"sanctum","created_at":"2024-04-08T02:23:52.000000Z","updated_at":"2024-04-08T02:23:52.000000Z","icon":null,"type":"Page","path":"\/company\/companies","_lft":3,"_rgt":4,"parent_id":2,"children":[]},{"id":4,"name":"\u673a\u6784\u7ba1\u7406\u54581","guard_name":"sanctum","created_at":"2024-04-08T02:23:52.000000Z","updated_at":"2024-04-08T02:23:52.000000Z","icon":null,"type":"Page","path":"\/company\/company_admins","_lft":5,"_rgt":6,"parent_id":2,"children":[]},{"id":5,"name":"\u673a\u6784\u5458\u5de51","guard_name":"sanctum","created_at":"2024-04-08T02:23:52.000000Z","updated_at":"2024-04-08T02:23:52.000000Z","icon":null,"type":"Page","path":"\/company\/company_employees","_lft":7,"_rgt":8,"parent_id":2,"children":[]}]},{"id":6,"name":"\u7cfb\u7edf1","guard_name":"sanctum","created_at":"2024-04-08T02:23:52.000000Z","updated_at":"2024-04-08T02:23:52.000000Z","icon":"SettingOutlined","type":"Directory","path":null,"_lft":10,"_rgt":15,"parent_id":1,"children":[{"id":7,"name":"\u7ba1\u7406\u5458\u7ba1\u7406","guard_name":"sanctum","created_at":"2024-04-08T02:23:52.000000Z","updated_at":"2024-04-08T02:23:52.000000Z","icon":null,"type":"Page","path":"\/system\/admins","_lft":11,"_rgt":12,"parent_id":6,"children":[]},{"id":8,"name":"\u529f\u80fd\u7ba1\u7406","guard_name":"sanctum","created_at":"2024-04-08T02:23:52.000000Z","updated_at":"2024-04-08T02:23:52.000000Z","icon":null,"type":"Page","path":"\/system\/sys_permissions","_lft":13,"_rgt":14,"parent_id":6,"children":[]}]}]}}}
 * @responseBody [{"name":"user","type":"object","required":true,"description":"用户","children":[{"name":"id","type":"number","required":true,"description":"用户ID"},{"name":"username","type":"string","required":true,"description":"用户名"}]},{"name":"token","type":"object","required":true,"description":"令牌","children":[{"name":"access_token","type":"string","required":true,"description":"访问令牌"}]},{"name":"permissions","type":"object","required":true,"description":"权限","children":[{"name":"id","type":"number","required":true,"description":"权限ID"},{"name":"name","type":"string","required":true,"description":"权限名称"},{"name":"guard_name","type":"string","required":true,"description":"守卫名称"},{"name":"created_at","type":"string","required":true,"description":"创建时间"},{"name":"updated_at","type":"string","required":true,"description":"更新时间"},{"name":"icon","type":"string","required":false,"description":"图标"},{"name":"type","type":"string","required":true,"description":"类型"},{"name":"path","type":"string","required":false,"description":"路径"},{"name":"children","type":"array","required":true,"description":"子权限","children":[]}]}]
 */
public function userLogin(): array{
    
}
```
## 2、API生成的定义
```php
<?php

namespace LaravelDev\App\Models\Router;


class RouterActionModel
{
    /**
     * 路由名称
     *  自动取function方法名称
     *  比如：userList
     * @var string
     */
    public string $name;

    /**
     * 请求的路径
     *  自动取function方法名称，再转snake
     *  比如：user_list
     * @var string
     */
    public string $uri;

    /**
     * 请求的方法
     *  默认POST
     *  可在方法的注解中定义 @methods GET,POST
     *  在生成的开发文档中，支持不是特别好
     * @var string[]，
     */
    public array $methods;

    public string $summary;

    public string $description;

    /**
     * 路由参数，暂时没用到
     * @var RouterParamModel[]
     */
    public array $parameters;

    /**
     * 请求参数
     *  会根据方法中，定义￥params的参数，自动生成
     *  比如：
     *      $params = request()->validate([
     *          'username' => 'required|string', # 用户名
     *          'password' => 'required|string', # 密码
     *          'roles_id' => 'nullable|array', # 角色
     *      ]);
     * @var RouterParamModel[]
     */
    public array $requestBody;

    /**
     * 响应参数
     *  通过注解生成
     *  在api文档中会显示成可折叠的表结构
     *  比如 @responseBody [{"name":"user","type":"object","required":true,"description":"用户","children":[{"name":"id","type":"number","required":true,"description":"用户ID"},{"name":"username","type":"string","required":true,"description":"用户名"}]},{"name":"token","type":"object","required":true,"description":"令牌","children":[{"name":"access_token","type":"string","required":true,"description":"访问令牌"}]},{"name":"permissions","type":"object","required":true,"description":"权限","children":[{"name":"id","type":"number","required":true,"description":"权限ID"},{"name":"name","type":"string","required":true,"description":"权限名称"},{"name":"guard_name","type":"string","required":true,"description":"守卫名称"},{"name":"created_at","type":"string","required":true,"description":"创建时间"},{"name":"updated_at","type":"string","required":true,"description":"更新时间"},{"name":"icon","type":"string","required":false,"description":"图标"},{"name":"type","type":"string","required":true,"description":"类型"},{"name":"path","type":"string","required":false,"description":"路径"},{"name":"children","type":"array","required":true,"description":"子权限","children":[]}]}]
     * @var string|null
     */
    public ?string $responseBody;

    /**
     * 是否废弃
     * @var bool
     */
    public bool $deprecated;

    /**
     * 响应的json字符串
     *  通过注解生成
     *  在api文档中，会显示成代码块
     *  比如 @responseJson {"success":true,"data":{"id":1,"username":"zwb","last_login_ip":null,"last_login_at":null,"created_at":"2024-04-08T02:23:51.000000Z","updated_at":"2024-04-08T02:23:51.000000Z"}}
     * @var string|null
     */
    public ?string $responseJson;

    /**
     * 中间件
     *  所有接口，默认会加上[api, auth:$moduleName, JsonWrapperMiddleware::class]
     *  api: 系统自带的
     *  auth:$moduleName：用于sanctum鉴权的
     *  JsonWrapperMiddleware::class：用于返回统一的json格式的数据
     *  如果类似login接口，不需要auth中间件，则可以在方法中加上注解 @skipAuth true
     * @var string[]
     */
    public array $middlewares;

    /**
     * 是否跳过生成路由
     *  默认false
     *  有些接口，比如：notify，不需要自动生成路由，可以在方法中加上注解 @skipInRouter true，然后手动在路由文件中定义
     * @var bool
     */
    public bool $skipInRouter;

    /**
     * 是否跳过json包裹
     *  默认false
     *  所有接口，返回的数据，都会被json包裹，比如 {"success":true,"data":{},"message":""}
     *  有些接口，比如：微信支付的notify，不需要json包裹，可以在方法中加上注解 @skipWrap true
     * @var bool
     */
    public bool $skipWrap;

    /**
     * 是否跳过鉴权
     * @var bool
     */
    public bool $skipAuth;

    /**
     * 返回的类型
     *  主要是用来判断是否下载的StreamResponse
     * @var string
     */
    public string $return;

    public bool $isDownload;
}
```