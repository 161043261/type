# Redis

## string 字符串

- 键 to 字符串 (值)
- 字符串是 Redis **最**基本的数据类型

| 命令     | 说明                              |
| -------- | --------------------------------- |
| set      | 向内存中写入键值 (字符串) 对      |
| get      | 从内存中读出键值 (字符串) 对      |
| setnx    | 如果 key 已存在, 则 set 失败      |
| setxx    | 如果 key 不存在, 则 set 失败      |
| mset     | 在一条命令中 set 多个键           |
| mget     | 在一条命令中 get 多个键           |
| incr     | 原子的; 将字符串解析为整数, 并 +1 |
| decr     | 原子的; 将字符串解析为整数, 并 -1 |
| incrby n | 原子的; 将字符串解析为整数, 并 +n |
| decrby n | 原子的; 将字符串解析为整数, 并 -n |

### set

```shell
set bike:1 Deimos
get bike:1
```

### setnx, setxx

```shell
set bike:1 bike nx
set bike:1 bike xx
```

### mset, mget

```shell
mset bike:1 "Deimos" bike:2 "Ares" bike:3 "Vanth"
mget bike:1 bike:2 bike:3
```

### 字符串作为计数器

incr 等操作 (读出 -- 加/减 -- 写入) 是原子的

```shell
set total_crashes 0
incr total_crashes
incrby total_crashes 10
```

## list 链表

- 键 to 字符串链表
- 链表是按插入顺序排序的字符串链表, 命令以 l 开头
- 将 list 链表用作栈 stack 和队列 queue
  - 左表头 -- 右表尾
  - 左栈顶 -- 右栈底

### 基本命令

| 命令     | 说明                                                                           |
| -------- | ------------------------------------------------------------------------------ |
| lpush    | 在表头处添加一个新元素                                                         |
| rpush    | 在表尾处添加一个新元素                                                         |
| lpop     | 移除表头元素                                                                   |
| rpop     | 移除表尾元素                                                                   |
| llen     | 获取表长                                                                       |
| lmove    | 原子的; 将元素从源链表移动到目的链表                                           |
| lrange   | 获取链表中指定范围的元素                                                       |
| ltrim    | 将链表裁剪为指定范围                                                           |
| 阻塞命令 |                                                                                |
| blpop    | 移除表头元素, 如果链表为空, 则命令将阻塞, 直到有新元素或超时                   |
| blmove   | 原子的; 将元素从源链表移动到目的链表, 如果链表为空, 则命令将阻塞, 直到有新元素 |

### 例

**将 list 用作队列 (FIFO)**

```shell
lpush bikes:repairs bike:1 # 头插 [bike:1]
lpush bikes:repairs bike:2 # 头插 [bike:2 bike:1]
rpop bikes:repairs         # 尾删 [bike:2]
rpop bikes:repairs         # 尾删 []
```

**将 list 用作栈 (FILO)**

```shell
lpush bikes:repairs bike:1 # 左插 [bike:1]
lpush bikes:repairs bike:2 # 左插 [bike:2 bike:1]
lpop bikes:repairs         # 左删 [bike:1]
lpop bikes:repairs         # 左删 []
```

**获取 list 的长度**

```shell
llen bikes:repairs
```

**原子的; 将元素从源链表移动到目的链表**

```shell
lpush bikes:repairs bike:1 bike:2 # [bike:2 bike:1]
# 将源链表 bikes:repairs 左侧的一个元素移动到目的链表 bikes:finished 的左侧
lmove bikes:repairs bikes:finished LEFT LEFT
lrange bikes:repairs 0 -1
lrange bikes:finished 0 -1
```

**将链表裁剪为指定范围**

```shell
rpush bikes:repairs bike:1 bike:2 bike:3 bike:4 bike:5
ltrim bikes:repairs 0 2 # [0, 2]
lrange bikes:repairs 0 -1 # [bike:1 bike:2 bike:3]
```

**Redis 的 list 基于链表**

```shell
rpush bikes:repairs bike:1 bike:2 bike:3
lpush bikes:repairs bike:important_bike
lrange bikes:repairs 0 -1
```

**弹出元素**

```shell
rpush bikes:repairs bike:1 bike:2 bike:3
rpop bikes:repairs # bike:3
lpop bikes:repairs # bike:1
rpop bikes:repairs # bike:2
rpop bikes:repairs # (nil)
```

**保留最新的 3 个元素**

```shell
rpush bikes:repairs bike:1 bike:2 bike:3 bike:4 bike:5
ltrim bikes:repairs -3 -1
lrange bikes:repairs 0 -1
```

**消息队列**

生产者调用 lpush, 消费者调用 rpop

链表为空时, rpop 返回 null, 消费者可能等待一段时间, 重新调用 rpop (轮询)

使用阻塞的 brpop, 避免无用的 rpop 调用

```shell
rpush bikes:repairs bike:1 bike:2 # 生产者
brpop bikes:repairs 1 # 消费者, timeout = 1s
brpop bikes:repairs 1 # 消费者, timeout = 1s
brpop bikes:repairs 1 # 消费者, timeout = 1s
```

向集合添加元素时, 如果该集合 (的键) 不存在, 则添加元素前自动创建一个空集合

```shell
del new_bikes
lpush new_bikes bike:1 bike:2 bike:3 # 自动创建 new_bikes

set new_bikes bike:1
type new_bikes # string
#! (error) WRONGTYPE Operation against a key holding the wrong kind of value
lpush new_bikes bike:2 bike:3
```

从集合移除元素时, 如果移除元素后得到空集合, 则自动移除该集合 (的键)

```shell
rpush bikes:repairs bike:1 bike:2 bike:3 # 3
exists bikes:repairs # 1
lpop bikes:repairs
lpop bikes:repairs
lpop bikes:repairs
exists bikes:repairs # 0 自动移除 bikes:repairs
```

## hash 哈希

- 键 to 哈希表 (两两一组的, 字段; 字段值的集合 k1 v1 k2 v2 ...)
- 哈希用于 map; 对象存储

| 命令      | 说明                                      |
| --------- | ----------------------------------------- |
| hset      | 设置哈希表中一个或多个字段的值            |
| hget      | 查询一个字段                              |
| hgetall   | 查询所有字段                              |
| hmget     | 查询一个或多个字段                        |
| hincrby n | 原子的; 将字段 (字符串) 解析为整数, 并 +n |
| hlen      | 获取哈希表的长度                          |

```shell
hset bike:1 \ # 键
model Deimos brand Ergonom type 'Enduro bikes' price 4972 # 哈希表 (两两一组的 kv 集合 k1 v1 k2 v2 ...)

hget bike:1 model
hget bike:1 price
hgetall bike:1
hmget bike:1 model price no-such-field
```

### 例: 计数器

一个骑车 ride 次数; 撞车 crash 次数或更换车主 owner 次数的计数器

```shell
hincrby bike:1:stats rides 1      # 骑车次数 +1
hincrby bike:1:stats rides 1      # 骑车次数 +1
hincrby bike:1:stats rides 1      # 骑车次数 +1
hincrby bike:1:stats crashes 1    # 撞车次数 +1
hincrby bike:1:stats owners 1     # 更换车主次数 +1
hget bike:1:stats rides           # 3
hmget bike:1:stats owners crashes # 1 1
```

### 哈希表的字段过期

TTL, Time To Live 存活时间

| 命令       | 说明                        |
| ---------- | --------------------------- |
| hexpire    | 设置存活时间, 单位 s        |
| hpexpire   | 设置存活时间, 单位 ms       |
| hexpireat  | 设置死亡时间戳, 单位 s      |
| hpexpireat | 设置死亡时间戳, 单位 ms     |
| httl       | 获取剩余的存活时间, 单位 s  |
| hpttl      | 获取剩余的存活时间, 单位 ms |
| hpersist   | 移除存活时间                |

官方客户端暂不支持哈希字段过期

## set 集合

### 基本命令

键 to 唯一字符串的无序集合

| 命令      | 说明                                                     |
| --------- | -------------------------------------------------------- |
| sadd      | 向 set 集合中添加一个或多个元素, 如果 set 中已存在则忽略 |
| srem      | 从 set 集合中移除一个或多个元素                          |
| sismember | 判断 set 集合中是否存在该元素                            |
| smembers  | 获取 set 集合的所有元素                                  |
| sinter    | 计算两个或多个 set 的交集                                |
| sunion    | 计算两个或多个 set 的并集                                |
| sdiff     | 计算两个或多个 set 的差集                                |
| scard     | 返回 set 集合的大小 (基数)                               |
| srem      | 从 set 集合中移除一个或多个元素                          |
| spop      | 从 set 集合中移除随机一个元素                            |

```shell
# bikes:racing:france 参加法国比赛的自行车集合
# bikes:racing:usa 参加美国比赛的自行车集合
sadd bikes:racing:france bike:1
sadd bikes:racing:france bike:1
sadd bikes:racing:france bike:2 bike:3
sadd bikes:racing:usa bike:1 bike:4
```

```shell
# bike:1 是否参加美国比赛
sismember bikes:racing:usa bike:1 # 1
# bike:2 是否参加美国比赛
sismember bikes:racing:usa bike:2 # 0
```

```shell
# 同时参加两个比赛的自行车
sinter bikes:racing:france bikes:racing:usa # bike:1
```

```shell
# 参加法国比赛的自行车数量
scard bikes:racing:france # 3
```

```shell
sadd bikes:racing:france bike:1 bike:2 bike:3
sadd bikes:racing:usa bike:1 bike:4
# 只参加法国比赛, 未参加美国比赛的自行车
# 参加法国比赛的自行车集合 - 交集
sdiff bikes:racing:france bikes:racing:usa
```

```shell
sadd bikes:racing:france bike:1 bike:2 bike:3
sadd bikes:racing:usa bike:1 bike:4
sadd bikes:racing:italy bike:1 bike:2 bike:3 bike:4
# 法国; 美国; 意大利的交集
sinter bikes:racing:france bikes:racing:usa bikes:racing:italy # "bike:1"
# 法国; 美国; 意大利的并集
sunion bikes:racing:france bikes:racing:usa bikes:racing:italy
```

### 差集

```shell
# 只参加法国比赛, 未参加美国; 意大利比赛的自行车
sdiff bikes:racing:france bikes:racing:usa bikes:racing:italy
# 只参加法国比赛, 未参加美国比赛的自行车
sdiff bikes:racing:france bikes:racing:usa
# 只参加美国比赛, 未参加法国比赛的自行车
sdiff bikes:racing:usa bikes:racing:france
```

### 从集合中移除元素

- srem 从 set 中移除一个或多个元素
- spop 从 set 中移除随机一个元素

```shell
sadd bikes:racing:france bike:1 bike:2 bike:3 bike:4 bike:5
# 移除一个元素
srem bikes:racing:france bike:1
# 移除随机一个元素
spop bikes:racing:france
# 获取 set 中的所有元素
smembers bikes:racing:france
```

## zset 有序集合

- 有序集合是唯一字符串的有序集合, 命令以 s 开头
- 字符串按分数 score 排序, 分数相同时按字典排序
- zset 有序集合可以看作 set 无序集合和 hash 哈希的混合体. 有序集合的每个元素 (键) 都关联一个浮点类型的分数 (值)
- 有序集合通过跳表和哈希表 (字典) 实现, 添加元素时排序, 添加元素的时间复杂度是 O(log(N))

| 命令             | 说明                                                           |
| ---------------- | -------------------------------------------------------------- |
| zadd             | 向 zset 有序集合中添加一个或多个元素, 如果 zset 中已存在则忽略 |
| zrem             | 从 zset 有序集合中移除一个或多个元素                           |
| zrange           | 获取下标区间的元素, 升序排序, 分数由低到高                     |
| zrevrange        | 获取下标区间的元素, 降序排序, 分数由高到低                     |
| zrangebyscore    | 获取成绩区间的元素, 升序排序, 分数由低到高                     |
| zremrangebyscore | 获取成绩区间的元素, 降序排序, 分数由高到低                     |
| zrank            | 获取升序排序时, 某元素的排名                                   |
| zrevrank         | 获取降序排序时, 某元素的排名                                   |

```shell
#! set:  sadd set_key  k1     v1    k2     v2    ...
#! zset: zadd zset_key score1 elem1 score2 elem2 ...
zadd racer_scores 10 "Norem" # score elem
zadd racer_scores 12 "Castilla"
zadd racer_scores 8 "Sam-Bodden" 10 "Royce" 6 "Ford" 14 "Prickett"
zrange racer_scores 0 -1    # 升序排序, 分数由低到高
zrevrange racer_scores 0 -1 # 降序排序, 分数由高到低
zrange racer_scores 0 -1 withscores
```

**范围操作**

```shell
# 获取分数 <= 10 的赛车手
zrangebyscore racer_scores -inf 10
# 从 zset 无序集合中移除元素
zrem racer_scores "Castilla"
# 从 zset 无序集合中移除分数 <= 9 的赛车手
zremrangebyscore racer_scores -inf 9
# 获取所有赛车手
zrange racer_scores 0 -1 [withscores]
# 获取升序排序时, 某元素的排名
zrank racer_scores "Norem" # 0
# 获取降序排序时, 某元素的排名
zrevrank racer_scores "Norem" # 3
```

clang-format -i --style=google $(SRCS)

**字典序**

| 命令                | 说明           |
| ------------------- | -------------- |
| zrangebylex         | 字典序升序排序 |
| zrevrangebylex      | 字典序降序排序 |
| zremrangebylexcount |                |

```shell
zadd racer_scores 0 "Norem" 0 "Sam-Bodden" 0 "Royce" 0 "Castilla" 0 "Prickett" 0 "Ford"
zrange racer_scores 0 -1
zrangebylex racer_scores [A [L # [A, L)
# [A [L
# [A (L
# (A [L
# (A (L
# 都可以, 都表示左闭右开区间
# - 表示负无穷
# + 表示正无穷
```

### 例

```shell
zadd racer_scores 100 "Wood"
zadd racer_scores 100 "Henshaw"
zadd racer_scores 150 "Henshaw" # 忽略！
zincrby racer_scores 50 "Wood"
zincrby racer_scores 50 "Henshaw"
```
