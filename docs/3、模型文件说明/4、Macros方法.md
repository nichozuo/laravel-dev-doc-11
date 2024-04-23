# Macros
> 一些封装好的模型的方法

### 1、示例
```php
<?php

namespace App\Modules\Pad;

use App\Enums\BillsStatusEnum;
use App\Enums\BillsTypeEnum;
use App\Models\Bills;
use App\Models\DeliverTypes;
use App\Models\Platforms;
use App\Services\Bills\DeliverBillsServices;
use App\Services\BillsServices;
use Exception;
use Illuminate\Support\Facades\DB;
use LaravelDev\App\Exceptions\Err;

/**
 * @intro DeliverBillsController
 */
class DeliverBillsController extends BaseController
{
    /**
     * @intro 发货单列表
     * @return mixed
     * @throws Exception
     */
    public function list(): mixed
    {
        $params = request()->validate([
            'code' => 'nullable|string', # 单号
            'day_range' => 'nullable|array', # 创建单据的日期
            'is_pre_sale' => 'nullable|boolean', # 是否预售
            'platforms_id' => 'nullable|integer', # 平台id
            'deliver_types_id' => 'nullable|integer', # 配送方式id
            'deliver_customer' => 'nullable|string', # 收件人
            'deliver_express_no' => 'nullable|string', # 快递单号
            'status' => 'nullable|string', # 单据状态:BillsStatusEnum
        ]);
        $params['from_warehouses_id'] = $this->getWarehouse()->id;

        return Bills::ifWhereLike($params, 'code')
            ->ifWhereDateRange($params, 'day_range', 'day')
            ->ifWhere($params, 'from_warehouses_id')
            ->where('type', BillsTypeEnum::Deliver->value)
//            ->ifWhereNumberRange($params, 'total_weight_range', 'total_weight')
            ->ifWhere($params, 'is_pre_sale')
            ->ifWhere($params, 'platforms_id')
            ->ifWhere($params, 'deliver_types_id')
            ->ifWhere($params, 'deliver_customer')
            ->ifWhere($params, 'deliver_express_no')
            ->ifWhereLike($params, 'remark')
            ->ifWhere($params, 'status')
            ->with('platform:id,name')
            ->with('deliver_type:id,name')
            ->order()
            ->page();
    }
}
```

### 2、说明
```
/**
 * @method static self ifWhere(array $params, string $key, ?string $field = null)
 * @method static self ifWhereLike(array $params, string $key, ?string $field = null)
 * @method static self ifWhereLikeKeyword(array $params, string $key, array $fields)
 * @method static self ifWhereNumberRange(array $params, string $key, ?string $field = null)
 * @method static self ifWhereDateRange(array $params, string $key, ?string $field = null, ?string $type = 'datetime')
 * @method static self ifHasWhereLike(array $params, string $key, string $relation, ?string $field = null)
 * @method static self order(?string $key = 'sorter', ?string $defaultField = 'id')
 * @method static unique(array $params, array $keys, string $label = null, string $field = 'id')
 * @method static forSelect(?string $key1 = 'id', ?string $key2 = 'name', ?string $orderByDesc = 'id')
 * @method static page()
 * @method static self getById(int $id, ?bool $throw = true, ?bool $lock = false, ?string $name = '')
**/
```