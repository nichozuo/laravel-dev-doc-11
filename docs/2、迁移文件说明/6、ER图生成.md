# ER图生成
> ER图是项目中最基本的，也是判断系统好坏的根本
> 文档系统是根据DB的信息，结合plantuml/markdown，渲染出来的

### 1、project.php配置，然后在
```php
return [
    # 在文档系统中，浏览ER图的时候，需要填写plantuml的渲染接口
    'plantUmlServer' => env('PLANT_UML_SERVER', 'https://www.plantuml.com/plantuml/svg/'),

    # 在文档系统中，浏览ER图的时候，会根据这个配置，把表分组，分别生成子图
    'erMaps' => [
        '基础模块' => [
            'admins',
            'sys_permissions',
            'sys_roles',
            'sys_role_has_permissions',
            'sys_model_has_roles',
            'personal_access_tokens',
        ],
        '订单模块' => [
            'orders',
            'order_details'
        ],
    ]
];
```

### 2、渲染PlantUML
> 在markdown中，渲染PlantUML，需要服务器来解析

#### 2.1 本机渲染（速度快）
- 1.本机服务器渲染，用docker运行一个plantuml-server
```bash
docker run -d --name plantuml -p 8888:8080 plantuml/plantuml-server:jetty
```
- 2. project.php修改服务器地址
```php
return [
    # 在文档系统中，浏览ER图的时候，需要填写plantuml的渲染接口
    # 如果局域网内给其他同事用，就要用局域网的ip
    'plantUmlServer' => env('PLANT_UML_SERVER', 'http://0.0.0.0:8888/svg/'),
];
```

#### 2.2 在线渲染（默认，速度慢）
