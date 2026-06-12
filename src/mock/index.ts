import Mock from "mockjs"
Mock.setup({
    timeout:"200-600" //设置延迟时间
})
//管理员权限菜单
const menulist = [
    {
      name: "数据看板",
      url: "/dashboard",
      icon: "DataLine"
    },
    {
      name: "充电站管理",
      url: "/chargingstation",
      icon: "Lightning",
      children: [
        {
          name: "充电站监控",
          url: "/chargingstation/monitor",
          icon: "VideoCamera"
        },
        {
          name: "营收统计",
          url: "/chargingstation/revenue",
          icon: "DataAnalysis"
        },
        {
          name: "充电桩管理",
          url: "/chargingstation/fault",
          icon: "Warning"
        }
      ]
    },
    {
      name: "电子地图",
      url: "/map",
      icon: "MapLocation"
    },
    {
      name: "运营管理",
      url: "/operations",
      icon: "Files",
      children: [
        {
          name: "订单管理",
          url: "/operations/orders",
          icon: "DocumentCopy",
        },
        {
          name: "订单详情",
          url: "/operations/detail",
          icon: "Share"
        },
        {
          name: "计费管理",
          url: "/operations/total",
          icon: "Money"
        },
      ]
    },
    {
      name: "报警管理",
      url: "/alarm",
      icon: "Phone"
    },
    {
      name: "会员卡管理",
      url: "/equipment",
      icon: "Magnet"
    },
    {
      name: "招商管理",
      url: "/document",
      icon: "Document"
    },
    {
      name: "系统设置",
      url: "/system",
      icon: "Setting"
    },
  
    {
      name: "个人中心",
      url: "/personal",
      icon: "User"
    },
    {
      name: "AI助手",
      url: "/aichat",
      icon: "Cpu"
    },
]
//运营专员的菜单
const menulist2 = [
    {
      name: "数据看板",
      url: "/dashboard",
      icon: "DataLine"
    },
    {
      name: "充电站管理",
      url: "/chargingstation",
      icon: "Lightning",
      children: [
        {
          name: "充电站监控",
          url: "/chargingstation/monitor",
          icon: "VideoCamera"
        },
        {
          name: "营收统计",
          url: "/chargingstation/revenue",
          icon: "DataAnalysis"
        },
        {
          name: "充电桩管理",
          url: "/chargingstation/fault",
          icon: "Warning"
        }
      ]
    },
    {
      name: "电子地图",
      url: "/map",
      icon: "MapLocation"
    },
    {
      name: "运营管理",
      url: "/operations",
      icon: "Files",
      children: [
        {
          name: "订单管理",
          url: "/operations/orders",
          icon: "DocumentCopy",
        },
        {
          name: "订单详情",
          url: "/operations/detail",
          icon: "Share"
        },
        {
          name: "计费管理",
          url: "/operations/total",
          icon: "Money"
        },
      ]
    },
    {
      name: "报警管理",
      url: "/alarm",
      icon: "Phone"
    },
    {
      name: "会员卡管理",
      url: "/equipment",
      icon: "Magnet"
    },  
    {
      name: "个人中心",
      url: "/personal",
      icon: "User"
    },
    {
      name: "AI助手",
      url: "/aichat",
      icon: "Cpu"
    },
]
//登录接口
Mock.mock("https://www.demo.com/login","post",(options:any)=>{
    const {username,password}= JSON.parse(options.body) ;
    if(username==="admin"&&password==="123456"){
        return {
            code:200,
            message:"登陆成功",
            data:{
                token:"admintokenkkljbuo2w9xla2",
                user:{
                    username:"晴晴大宝贝",
                    roles:["admin"],
                },
                menulist
            }
        }
    }else if(username==="user"&&password==="123456"){
        return {
            code:200,
            message:"登陆成功",
            data:{
                token:"usertokenkkljbuo2w9xla2",
                user:{
                    username:"面包包",
                    roles:["user"]
                },
                menulist:menulist2
            }
        }
    }else{
        return {
            code:401,
            message:"用户名或者密码有误"
        }
    } 
})

//echart图表接口 折线图
Mock.mock("https://www.demo.com/chartData","get",()=>{
  return {
    code:200,
    message:"操作成功",
    data:{
      list:[
        {name:"充电量",data:[20, 50, 30, 70, 60, 80, 40, 60, 50]},
        {name:"充电时长",data:[40, 60, 50, 80, 70, 90, 60, 70, 80]},
        {name:"充电功率",data:[30, 40, 60, 50, 70, 20, 30, 40, 60]}
      ]
    }
  }
})

////echarts图表数据接口2 饼图
Mock.mock("https://www.demo.com/chartData2",'get',()=>{
  return {
    code: 200,
    message: '操作成功',
    data: {
      list:[
        { value: 35, name: '充电桩' },  // 数据值和名称
        { value: 30, name: '充电站' },
        { value: 25, name: '充电杆' }
      ]
    }
  };
})
//echarts图表数据接口3 雷达图
Mock.mock("https://www.demo.com/chartData3",'get',()=>{
  return {
    code: 200,
    message: '操作成功',
    data: {
      list: [42, 30, 200, 350, 500, 180]
    }
  };
})


//充电站监控接口
let chargingStation = [
  {
    name: "北京西单充电站",
    id: "VXZ10001",
    city: "北京",
    fast: 95,
    slow: 40,
    status: 3,
    now: 10,
    fault: 1,
    person: "张伟",
    tel: 17876554801
  },
  {
    name: "上海陆家嘴充电站",
    id: "VXZ10002",
    city: "上海",
    fast: 90,
    slow: 35,
    status: 2,
    now: 20,
    fault: 2,
    person: "李娜",
    tel: 17876554802
  },
  {
    name: "广州花城广场充电站",
    id: "VXZ10003",
    city: "广州",
    fast: 85,
    slow: 38,
    status: 2,
    now: 5,
    fault: 0,
    person: "王强",
    tel: 17876554803
  },
  {
    name: "深圳大梅沙充电站",
    id: "VXZ10004",
    city: "深圳",
    fast: 80,
    slow: 30,
    status: 3,
    now: 15,
    fault: 1,
    person: "赵敏",
    tel: 17876554804
  },
  {
    name: "成都天府广场充电站",
    id: "VXZ10005",
    city: "成都",
    fast: 88,
    slow: 37,
    status: 5,
    now: 12,
    fault: 2,
    person: "李晓华",
    tel: 17876554805
  },
  {
    name: "西安钟楼充电站",
    id: "VXZ10006",
    city: "西安",
    fast: 82,
    slow: 33,
    status: 4,
    now: 8,
    fault: 0,
    person: "刘伟",
    tel: 17876554806
  },
  {
    name: "杭州西湖充电站",
    id: "VXZ10007",
    city: "杭州",
    fast: 75,
    slow: 29,
    status: 3,
    now: 18,
    fault: 3,
    person: "陈芳",
    tel: 17876554807
  },
  {
    name: "南京夫子庙充电站",
    id: "VXZ10008",
    city: "南京",
    fast: 89,
    slow: 40,
    status: 2,
    now: 22,
    fault: 1,
    person: "黄伟",
    tel: 17876554808
  },
  {
    name: "天津意大利风情区充电站",
    id: "VXZ10009",
    city: "天津",
    fast: 87,
    slow: 36,
    status: 2,
    now: 6,
    fault: 0,
    person: "吴敏",
    tel: 17876554809
  },
  {
    name: "青岛栈桥充电站",
    id: "VXZ10010",
    city: "青岛",
    fast: 91,
    slow: 32,
    status: 3,
    now: 25,
    fault: 1,
    person: "杨杰",
    tel: 17876554810
  },
  {
    name: "武汉黄鹤楼充电站",
    id: "VXZ10011",
    city: "武汉",
    fast: 74,
    slow: 28,
    status: 2,
    now: 11,
    fault: 2,
    person: "周丽",
    tel: 17876554811
  },
  {
    name: "福州三坊七巷充电站",
    id: "VXZ10012",
    city: "福州",
    fast: 76,
    slow: 31,
    status: 4,
    now: 19,
    fault: 1,
    person: "林涛",
    tel: 17876554812
  },
  {
    name: "合肥包公园充电站",
    id: "VXZ10013",
    city: "合肥",
    fast: 70,
    slow: 30,
    status: 2,
    now: 3,
    fault: 0,
    person: "高峰",
    tel: 17876554813
  },
  {
    name: "重庆解放碑充电站",
    id: "VXZ10014",
    city: "重庆",
    fast: 83,
    slow: 34,
    status: 2,
    now: 14,
    fault: 2,
    person: "邓超",
    tel: 17876554814
  },
  {
    name: "桂林漓江充电站",
    id: "VXZ10015",
    city: "桂林",
    fast: 77,
    slow: 29,
    status: 2,
    now: 9,
    fault: 1,
    person: "李曼",
    tel: 17876554815
  },
  {
    name: "苏州园区充电站",
    id: "VXZ10016",
    city: "苏州",
    fast: 80,
    slow: 35,
    status: 2,
    now: 7,
    fault: 0,
    person: "王琦",
    tel: 17876554816
  },
  {
    name: "昆明滇池充电站",
    id: "VXZ10017",
    city: "昆明",
    fast: 79,
    slow: 33,
    status: 3,
    now: 21,
    fault: 1,
    person: "陈超",
    tel: 17876554817
  },
  {
    name: "南宁青秀山充电站",
    id: "VXZ10018",
    city: "南宁",
    fast: 81,
    slow: 36,
    status: 2,
    now: 13,
    fault: 0,
    person: "蔡徐坤",
    tel: 17876554818
  },
  {
    name: "长沙橘子洲头充电站",
    id: "VXZ10019",
    city: "长沙",
    fast: 78,
    slow: 34,
    status: 2,
    now: 4,
    fault: 0,
    person: "李安",
    tel: 17876554819
  },
  {
    name: "哈尔滨中央大街充电站",
    id: "VXZ10020",
    city: "哈尔滨",
    fast: 75,
    slow: 32,
    status: 2,
    now: 23,
    fault: 1,
    person: "林雨",
    tel: 17876554820
  },
  {
    name: "石家庄正定古城充电站",
    id: "VXZ10021",
    city: "石家庄",
    fast: 72,
    slow: 31,
    status: 4,
    now: 16,
    fault: 2,
    person: "郑明",
    tel: 17876554821
  },
  {
    name: "兰州黄河桥充电站",
    id: "VXZ10022",
    city: "兰州",
    fast: 88,
    slow: 38,
    status: 5,
    now: 5,
    fault: 0,
    person: "李伟",
    tel: 17876554822
  },
  {
    name: "济南大明湖充电站",
    id: "VXZ10023",
    city: "济南",
    fast: 93,
    slow: 39,
    status: 3,
    now: 17,
    fault: 1,
    person: "刘洋",
    tel: 17876554823
  },
  {
    name: "沈阳故宫充电站",
    id: "VXZ10024",
    city: "沈阳",
    fast: 76,
    slow: 32,
    status: 4,
    now: 19,
    fault: 1,
    person: "张博",
    tel: 17876554824
  },
  {
    name: "福州西湖充电站",
    id: "VXZ10025",
    city: "福州",
    fast: 79,
    slow: 34,
    status: 2,
    now: 6,
    fault: 0,
    person: "周扬",
    tel: 17876554825
  },
  {
    name: "无锡灵山大佛充电站",
    id: "VXZ10026",
    city: "无锡",
    fast: 85,
    slow: 38,
    status: 3,
    now: 12,
    fault: 1,
    person: "江海",
    tel: 17876554826
  },
  {
    name: "郑州二七广场充电站",
    id: "VXZ10027",
    city: "郑州",
    fast: 84,
    slow: 36,
    status: 3,
    now: 20,
    fault: 2,
    person: "胡丽",
    tel: 17876554827
  },
  {
    name: "大连星海广场充电站",
    id: "VXZ10028",
    city: "大连",
    fast: 82,
    slow: 35,
    status: 2,
    now: 7,
    fault: 0,
    person: "李涛",
    tel: 17876554828
  },
  {
    name: "宁波天一广场充电站",
    id: "VXZ10029",
    city: "宁波",
    fast: 90,
    slow: 40,
    status: 4,
    now: 15,
    fault: 1,
    person: "程伟",
    tel: 17876554829
  },
  {
    name: "贵阳甲秀楼充电站",
    id: "VXZ10030",
    city: "贵阳",
    fast: 81,
    slow: 33,
    status: 1,
    now: 14,
    fault: 2,
    person: "马云",
    tel: 17876554830
  },
  {
    name: "珠海长隆海洋王国充电站",
    id: "VXZ10031",
    city: "珠海",
    fast: 78,
    slow: 36,
    status: 1,
    now: 11,
    fault: 3,
    person: "王超",
    tel: 17876554831
  },
  {
    name: "天津滨海新区充电站",
    id: "VXZ10032",
    city: "天津",
    fast: 92,
    slow: 37,
    status: 2,
    now: 8,
    fault: 0,
    person: "黄华",
    tel: 17876554832
  }
];
// 原始的数据备份
const originalChargingStation = JSON.parse(JSON.stringify(chargingStation));
// 定义 API 接口
Mock.mock("https://www.demo.com/stationList", 'post', (options: any) => {
  chargingStation = originalChargingStation
  const { id, name, status, page, pageSize } = options.body ? JSON.parse(options.body) : {}
  // 根据条件过滤数据
  if (id) {
    chargingStation = chargingStation.filter(item => item.id === id);
  }
  if (name) {
    chargingStation = chargingStation.filter(item => item.name.includes(name));
  }
  if (status != 1) {
    chargingStation = chargingStation.filter(item => item.status === status);
  }
  // 实现分页
  const total = chargingStation.length;
  const start = (page - 1) * pageSize;
  const paginatedItems = chargingStation.slice(start, start + pageSize);
  return {
    code: 200,
    success: true,
    data: {
      list:paginatedItems,
      total
    },
    
  };
});

//新增/编辑充电站
Mock.mock("https://www.demo.com/station/edit", 'post', (options: any) => {
  const res: any = JSON.parse(options.body);
  console.log("新增/编辑充电站接口收到数据：",res)
  return {
    code: 200,
    success: true,
    data: "操作成功",
  };
});


//删除充电站接口
Mock.mock("https://www.demo.com/station/delete", "post", (options: any) => {
  console.log("删除充电站接口收到参数", JSON.parse(options.body))
  return {
    code: 200,
    success: true,
    data: "操作成功",
  };
})

//营收统计图表
Mock.mock("https://www.demo.com/revenueChart", "get", () => {
  return {
    code: 200,
    success: true,
    data: {
      list:[
        {
          name:"销售",
          data:[60, 40, 120, 140, 160, 80, 140]
        },
        {
          name:"访问量",
          data:[600, 400, 600, 700, 800, 400, 700]
        },

      ]
    }
  };
})

//营收统计接口
let chargingStation2 = [
  {
    name: "北京西单充电站",
    id: "VXZ10001",
    city: "北京",
    count: 135, // 充电桩总数量
    electricity: 7563, // 电费
    parkingFee: 2356, // 停车费
    serviceFee: 5633, // 服务费
    month: 2155, // 月度总收入
    member: 2698, // 会员储值金
    percent: -5.3, // 增长比例
    mpercent: 2.3
  },
  {
    name: "上海陆家嘴充电站",
    id: "VXZ10002",
    city: "上海",
    count: 125, // fast + slow
    electricity: 8000,
    parkingFee: 3000,
    serviceFee: 7000,
    month: 5000,
    member: 3500,
    percent: 2.5,
    mpercent: 2.4
  },
  {
    name: "广州花城广场充电站",
    id: "VXZ10003",
    city: "广州",
    count: 123,
    electricity: 8200,
    parkingFee: 3100,
    serviceFee: 7100,
    month: 5200,
    member: 3600,
    percent: 3.0,
    mpercent: 3.5
  },
  {
    name: "深圳大梅沙充电站",
    id: "VXZ10004",
    city: "深圳",
    count: 110,
    electricity: 7800,
    parkingFee: 2900,
    serviceFee: 6900,
    month: 4900,
    member: 3400,
    percent: -1.8,
    mpercent: -2.6
  },
  {
    name: "成都天府广场充电站",
    id: "VXZ10005",
    city: "成都",
    count: 125,
    electricity: 8300,
    parkingFee: 3200,
    serviceFee: 7200,
    month: 5300,
    member: 3700,
    percent: 3.5,
    mpercent: -0.1
  },
  {
    name: "西安钟楼充电站",
    id: "VXZ10006",
    city: "西安",
    count: 115,
    electricity: 7900,
    parkingFee: 2950,
    serviceFee: 7050,
    month: 5100,
    member: 3450,
    percent: -2.2,
    mpercent: -0.8
  },
  {
    name: "杭州西湖充电站",
    id: "VXZ10007",
    city: "杭州",
    count: 104,
    electricity: 7600,
    parkingFee: 2800,
    serviceFee: 6800,
    month: 4800,
    member: 3300,
    percent: 1.5,
    mpercent: 0.7
  },
  {
    name: "南京夫子庙充电站",
    id: "VXZ10008",
    city: "南京",
    count: 129,
    electricity: 8400,
    parkingFee: 3250,
    serviceFee: 7250,
    month: 5400,
    member: 3750,
    percent: 4.0,
    mpercent: 6.2
  },
  {
    name: "天津意大利风情区充电站",
    id: "VXZ10009",
    city: "天津",
    count: 123,
    electricity: 8150,
    parkingFee: 3100,
    serviceFee: 7100,
    month: 5150,
    member: 3500,
    percent: -2.8,
    mpercent: -0.4
  },
  {
    name: "青岛栈桥充电站",
    id: "VXZ10010",
    city: "青岛",
    count: 123,
    electricity: 8100,
    parkingFee: 3050,
    serviceFee: 7050,
    month: 5100,
    member: 3450,
    percent: 2.7,
    mpercent: 3.4
  },
  {
    name: "武汉黄鹤楼充电站",
    id: "VXZ10011",
    city: "武汉",
    count: 102,
    electricity: 7400,
    parkingFee: 2700,
    serviceFee: 6700,
    month: 4700,
    member: 3250,
    percent: 1.2,
    mpercent: 0.6
  },
  {
    name: "福州三坊七巷充电站",
    id: "VXZ10012",
    city: "福州",
    count: 107,
    electricity: 7650,
    parkingFee: 2850,
    serviceFee: 6850,
    month: 4850,
    member: 3350,
    percent: 1.7,
    mpercent: 1.3
  },
  {
    name: "合肥包公园充电站",
    id: "VXZ10013",
    city: "合肥",
    count: 100,
    electricity: 7200,
    parkingFee: 2600,
    serviceFee: 6600,
    month: 4600,
    member: 3200,
    percent: -0.9,
    mpercent: 0.5
  },
  {
    name: "重庆解放碑充电站",
    id: "VXZ10014",
    city: "重庆",
    count: 117,
    electricity: 7950,
    parkingFee: 3000,
    serviceFee: 7100,
    month: 5150,
    member: 3500,
    percent: 2.6,
    mpercent: 3.1
  },
  {
    name: "桂林漓江充电站",
    id: "VXZ10015",
    city: "桂林",
    count: 106,
    electricity: 7700,
    parkingFee: 2800,
    serviceFee: 6900,
    month: 4950,
    member: 3400,
    percent: 2.0,
    mpercent: -1.5
  },
  {
    name: "苏州园区充电站",
    id: "VXZ10016",
    city: "苏州",
    count: 115,
    electricity: 7900,
    parkingFee: 2950,
    serviceFee: 7050,
    month: 5100,
    member: 3450,
    percent: 2.3,
    mpercent: 0.9
  },
  {
    name: "昆明滇池充电站",
    id: "VXZ10017",
    city: "昆明",
    count: 112,
    electricity: 7800,
    parkingFee: 2900,
    serviceFee: 7000,
    month: 5050,
    member: 3400,
    percent: -2.1,
    mpercent: 0.8
  },
  {
    name: "南宁青秀山充电站",
    id: "VXZ10018",
    city: "南宁",
    count: 117,
    electricity: 7900,
    parkingFee: 2950,
    serviceFee: 7050,
    month: 5100,
    member: 3450,
    percent: -2.4,
    mpercent: -2.7
  },
  {
    name: "长沙橘子洲头充电站",
    id: "VXZ10019",
    city: "长沙",
    count: 112,
    electricity: 7750,
    parkingFee: 2850,
    serviceFee: 6950,
    month: 4950,
    member: 3350,
    percent: -1.9,
    mpercent: -1.1
  },
  {
    name: "哈尔滨中央大街充电站",
    id: "VXZ10020",
    city: "哈尔滨",
    count: 107,
    electricity: 7650,
    parkingFee: 2800,
    serviceFee: 6800,
    month: 4850,
    member: 3300,
    percent: 1.6,
    mpercent: -0.9
  },
  {
    name: "石家庄正定古城充电站",
    id: "VXZ10021",
    city: "石家庄",
    count: 103,
    electricity: 7500,
    parkingFee: 2750,
    serviceFee: 6750,
    month: 4750,
    member: 3250,
    percent: 1.3,
    mpercent: 2.8
  },
  {
    name: "兰州黄河桥充电站",
    id: "VXZ10022",
    city: "兰州",
    count: 126,
    electricity: 8200,
    parkingFee: 3150,
    serviceFee: 7150,
    month: 5200,
    member: 3550,
    percent: 3.1,
    mpercent: 4.4
  },
  {
    name: "济南大明湖充电站",
    id: "VXZ10023",
    city: "济南",
    count: 132,
    electricity: 8400,
    parkingFee: 3250,
    serviceFee: 7250,
    month: 5350,
    member: 3650,
    percent: -3.7,
    mpercent: -5.5
  },
  {
    name: "沈阳故宫充电站",
    id: "VXZ10024",
    city: "沈阳",
    count: 108,
    electricity: 7700,
    parkingFee: 2850,
    serviceFee: 6850,
    month: 4900,
    member: 3350,
    percent: 1.8,
    mpercent: -2.3
  },
  {
    name: "福州西湖充电站",
    id: "VXZ10025",
    city: "福州",
    count: 113,
    electricity: 7850,
    parkingFee: 2950,
    serviceFee: 6950,
    month: 5050,
    member: 3400,
    percent: 2.0,
    mpercent: 2.2
  },
  {
    name: "无锡灵山大佛充电站",
    id: "VXZ10026",
    city: "无锡",
    count: 123,
    electricity: 8100,
    parkingFee: 3050,
    serviceFee: 7050,
    month: 5150,
    member: 3500,
    percent: -2.8,
    mpercent: -3.2
  },
  {
    name: "郑州二七广场充电站",
    id: "VXZ10027",
    city: "郑州",
    count: 120,
    electricity: 8000,
    parkingFee: 3000,
    serviceFee: 7000,
    month: 5100,
    member: 3450,
    percent: 2.4,
    mpercent: 0.8
  },
  {
    name: "大连星海广场充电站",
    id: "VXZ10028",
    city: "大连",
    count: 117,
    electricity: 7950,
    parkingFee: 3000,
    serviceFee: 7100,
    month: 5150,
    member: 3500,
    percent: 2.6,
    mpercent: 3.9
  },
  {
    name: "宁波天一广场充电站",
    id: "VXZ10029",
    city: "宁波",
    count: 130,
    electricity: 8250,
    parkingFee: 3150,
    serviceFee: 7150,
    month: 5250,
    member: 3550,
    percent: -3.4,
    mpercent: -2.3
  },
  {
    name: "贵阳甲秀楼充电站",
    id: "VXZ10030",
    city: "贵阳",
    count: 114,
    electricity: 7850,
    parkingFee: 2950,
    serviceFee: 6950,
    month: 5050,
    member: 3400,
    percent: 2.2,
    mpercent: -1.4
  },
  {
    name: "珠海长隆海洋王国充电站",
    id: "VXZ10031",
    city: "珠海",
    count: 114,
    electricity: 7850,
    parkingFee: 2950,
    serviceFee: 6950,
    month: 5050,
    member: 3400,
    percent: 2.2,
    mpercent: 1.8
  },
  {
    name: "天津滨海新区充电站",
    id: "VXZ10032",
    city: "天津",
    count: 129,
    electricity: 8350,
    parkingFee: 3200,
    serviceFee: 7200,
    month: 5300,
    member: 3600,
    percent: -3.6,
    mpercent: -2.6
  }
];
// 原始的数据备份
const originalChargingStation2 = JSON.parse(JSON.stringify(chargingStation2));
// 定义 API 接口
Mock.mock("https://www.demo.com/revenueList", 'post', (options: any) => {
  chargingStation2 = originalChargingStation2
  const { name = "", page = 1, pageSize = 10 } = options.body ? JSON.parse(options.body) : {}
  // 根据条件过滤数据
  console.log("营收统计表格接口",name,page,pageSize)
  if (name) {
    chargingStation2 = chargingStation2.filter(item => item.name.includes(name));
  }
  // 实现分页
  const total = chargingStation2.length;
  const start = (page - 1) * pageSize;
  const paginatedItems = chargingStation2.slice(start, start + pageSize);
  return {
    code: 200,
    success: true,
    data:{
      list:paginatedItems,
      total,
    }  
  };
});

//充电桩管理接口
//充电桩管理
let chargingPile = [
  {
    id: "VXZ10001",
    name: "北京西单充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1,
        record:[
          {time:"12:08:17",msg:"充电80度，消费80元"},
          {time:"13:12:09",msg:"充电50度，消费50元"},
          {time:"13:15:22",msg:"充电60度，消费60元"},
          {time:"16:22:33",msg:"充电70度，消费70元"},
          {time:"17:27:17",msg:"充电90度，消费90元"},
          {time:"18:08:33",msg:"充电100度，消费100元"},
        ]
    
    },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "29°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "30°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10002",
    name: "上海陆家嘴充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "27°c", status: 6 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },

    ],
  },
  {
    id: "VXZ10003",
    name: "广州花城广场充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
     
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10004",
    name: "深圳大梅沙充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10005",
    name: "成都天府广场充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10006",
    name: "西安钟楼充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10007",
    name: "杭州西湖充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10008",
    name: "南京夫子庙充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10009",
    name: "天津意大利风情区充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10010",
    name: "青岛栈桥充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10011",
    name: "武汉黄鹤楼充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10012",
    name: "福州三坊七巷充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10013",
    name: "合肥包公园充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10014",
    name: "重庆解放碑充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10015",
    name: "桂林漓江充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10016",
    name: "苏州园区充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10017",
    name: "昆明滇池充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10018",
    name: "南宁青秀山充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10019",
    name: "长沙橘子洲头充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10020",
    name: "哈尔滨中央大街充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10021",
    name: "石家庄正定古城充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10022",
    name: "兰州黄河桥充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10023",
    name: "济南大明湖充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10024",
    name: "沈阳故宫充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10025",
    name: "福州西湖充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10026",
    name: "无锡灵山大佛充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10027",
    name: "郑州二七广场充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10028",
    name: "大连星海广场充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10029",
    name: "宁波天一广场充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10030",
    name: "贵阳甲秀楼充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10031",
    name: "珠海长隆海洋王国充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },
  {
    id: "VXZ10032",
    name: "天津滨海新区充电站",
    list: [
      { id: "CD1001", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },//1空闲 2充电中 3连接中 4排队中 5被预约 6故障/离线
      { id: "CD1002", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1003", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1004", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1005", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1006", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1007", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 3 },
      { id: "CD1008", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1009", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1010", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1011", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1012", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 4 },
      { id: "CD1013", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1014", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 5 },
      { id: "CD1015", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 1 },
      { id: "CD1016", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 2, percent: "70%" },
      { id: "CD1017", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1018", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
      { id: "CD1019", voltage: "314v", current: "212.2A", power: "21KW", tem: "32°c", status: 6 },
    ],
  },

]
//充电桩列表接口
Mock.mock("https://www.demo.com/currentList", "post", () => {
  return {
    code: 200,
    success: true,
    data: chargingPile
  }
})

const stations = [
  {
    position: [116.395645, 39.90923], // 北京（虚拟坐标）
    title: "北京西单充电站",
    status: 1,
    count: 135,
  },
  {
    position: [121.491121, 31.236222], // 上海（虚拟坐标）
    title: "上海陆家嘴充电站",
    status: 2,
    count: 125,
  },
  {
    position: [113.324520, 23.097418], // 广州（虚拟坐标）
    title: "广州花城广场充电站",
    status: 2,
    count: 123,
  },
  {
    position: [114.156836, 22.283758], // 深圳（虚拟坐标）
    title: "深圳大梅沙充电站",
    status: 1,
    count: 110,
  },
  {
    position: [104.065735, 30.659462], // 成都（虚拟坐标）
    title: "成都天府广场充电站",
    status: 5,
    count: 125,
  },
  {
    position: [108.948024, 34.263161], // 西安（虚拟坐标）
    title: "西安钟楼充电站",
    status: 4,
    count: 115,
  },
  {
    position: [120.155070, 30.274084], // 杭州（虚拟坐标）
    title: "杭州西湖充电站",
    status: 1,
    count: 104,
  },
  {
    position: [118.796877, 32.060255], // 南京（虚拟坐标）
    title: "南京夫子庙充电站",
    status: 2,
    count: 129,
  },
  {
    position: [117.200983, 39.084158], // 天津（虚拟坐标）
    title: "天津意大利风情区充电站",
    status: 2,
    count: 123,
  },
  {
    position: [120.308949, 36.065319], // 青岛（虚拟坐标）
    title: "青岛栈桥充电站",
    status: 1,
    count: 123,
  },
  {
    position: [114.305393, 30.593099], // 武汉（虚拟坐标）
    title: "武汉黄鹤楼充电站",
    status: 2,
    count: 102,
  },
  {
    position: [119.296494, 26.074507], // 福州（虚拟坐标）
    title: "福州三坊七巷充电站",
    status: 4,
    count: 107,
  },
  {
    position: [117.283042, 31.86119], // 合肥（虚拟坐标）
    title: "合肥包公园充电站",
    status: 2,
    count: 100,
  },
  {
    position: [106.551556, 29.563009], // 重庆（真实坐标）
    title: "重庆解放碑充电站",
    status: 2,
    count: 117,
  },
  {
    position: [110.290195, 25.273566], // 桂林（虚拟坐标）
    title: "桂林漓江充电站",
    status: 2,
    count: 106,
  },
  {
    position: [120.619585, 31.299379], // 苏州（虚拟坐标）
    title: "苏州园区充电站",
    status: 2,
    count: 115,
  },
  {
    position: [102.833218, 24.879659], // 昆明（虚拟坐标）
    title: "昆明滇池充电站",
    status: 1,
    count: 112,
  },
  {
    position: [108.327546, 22.815478], // 南宁（虚拟坐标）
    title: "南宁青秀山充电站",
    status: 2,
    count: 117,
  },
  {
    position: [112.938814, 28.228209], // 长沙（虚拟坐标）
    title: "长沙橘子洲头充电站",
    status: 2,
    count: 112,
  },
  {
    position: [126.534967, 45.802664], // 哈尔滨（虚拟坐标）
    title: "哈尔滨中央大街充电站",
    status: 2,
    count: 107,
  },
  {
    position: [114.514859, 38.042306], // 石家庄（虚拟坐标）
    title: "石家庄正定古城充电站",
    status: 4,
    count: 103,
  },
  {
    position: [103.834302, 36.061089], // 兰州（虚拟坐标）
    title: "兰州黄河桥充电站",
    status: 5,
    count: 126,
  },
  {
    position: [116.994929, 36.682785], // 济南（虚拟坐标）
    title: "济南大明湖充电站",
    status: 1,
    count: 132,
  },
  {
    position: [123.431474, 41.805699], // 沈阳（虚拟坐标）
    title: "沈阳故宫充电站",
    status: 4,
    count: 108,
  },
  {
    position: [119.302444, 26.080429], // 福州（虚拟坐标）
    title: "福州西湖充电站",
    status: 2,
    count: 113,
  },
  {
    position: [120.31191, 31.498809], // 无锡（虚拟坐标）
    title: "无锡灵山大佛充电站",
    status: 1,
    count: 123,
  },
  {
    position: [113.558519, 34.857641], // 郑州（虚拟坐标）
    title: "郑州二七广场充电站",
    status: 1,
    count: 120,
  },
  {
    position: [121.614682, 38.914003], // 大连（虚拟坐标）
    title: "大连星海广场充电站",
    status: 2,
    count: 117,
  },
  {
    position: [121.551918, 29.874058], // 宁波（虚拟坐标）
    title: "宁波天一广场充电站",
    status: 4,
    count: 130,
  },
  {
    position: [106.713478, 26.578343], // 贵阳（虚拟坐标）
    title: "贵阳甲秀楼充电站",
    status: 1,
    count: 114,
  },
  {
    position: [113.58239, 22.276949], // 珠海（虚拟坐标）
    title: "珠海长隆海洋王国充电站",
    status: 1,
    count: 114,
  },
  {
    position: [117.701648, 39.041746], // 天津（虚拟坐标）
    title: "天津滨海新区充电站",
    status: 1,
    count: 129,
  },
];
//电子地图接口
Mock.mock("https://www.demo.com/mapList", "post", () => {
  return {
    code: 200,
    success: true,
    data: stations
  }
})


//订单管理接口
Mock.mock('https://www.demo.com/orderList', 'post', (options: any) => {
  const { pageSize } = JSON.parse(options.body);
  console.log("后端订单管理接到参数", JSON.parse(options.body))
  return {
    code: 200,
    message: "成功",
    data: Mock.mock({
      [`list|${pageSize}`]: [{
        'orderNo': '@string("number", 6)', //订单号
        'date': '@date("yyyy-MM-dd")',//订单日期
        'startTime': "08:00:23",//开始时间
        'endTime': "09:10:11",//结束时间
        "equipmentNo|1": ['B109', 'C227', 'C106', "D158"],//设备编号
        'money|1': [66.5,88.9,22.7,36.5,42.0],//金额
        'pay|1': ["微信", "支付宝", "储值卡",],//支付方式
        'status|1': [2, 3, 4],//订单状态
      }],
      "total": 54
    })
    // 生成55条数据
  }
});


//订单管理-批量删除接口
Mock.mock('https://www.demo.com/batchDelete', "post", (options: any) => {
  const { order } = JSON.parse(options.body)
  console.log("订单管理批量删除接口",JSON.stringify(order) )
  return {
    code: 200,
    message: "成功",
    data: "操作成功"
  }
})

const cityList = [
  {
    label: "北京总部",
    children: [
      {
        label: "东城区",
        children: [
          { label: "东城区充电站01" },
          { label: "东城区充电站02" },
          { label: "东城区充电站03" },
          { label: "东城区充电站04" },
        ]
      },
      {
        label: "西城区",
        children: [
          { label: "西城区充电站01" },
          { label: "西城区充电站02" },
          { label: "西城区充电站03" },
        ]
      },
      {
        label: "朝阳区",
        children: [
          { label: "朝阳区充电站01" },
          { label: "朝阳区充电站02" },
          { label: "朝阳区充电站03" },
        ]
      },
      {
        label: "海淀区",
        children: [
          { label: "海淀区充电站01" },
          { label: "海淀区充电站02" },
        ]
      },
      {
        label: "丰台区",
        children: [
          { label: "丰台区充电站01" },
          { label: "丰台区充电站02" },
        ]
      }

    ]
  },
  {
    label: "深圳总部",
    children: [
      {
        label: "南山区",
        children: [
          {
            label: "南山区充电站01"
          }
        ]
      }, {
        label: "福田区",
        children: [
          {
            label: "福田区充电站01"
          }
        ]
      }
    ]
  }, {
    label: "青岛市",
    children: [
      {
        label: "市南区",
        children: [
          {
            label: "市南区充电站01"
          },
          {
            label: "市南区充电站02"
          }
        ]
      },
      {
        label: "市北区",
        children: [
          {
            label: "市北区充电站01"
          },
          {
            label: "市北区充电站02"
          }
        ]
      },
      {
        label: "崂山区",
        children: [
          {
            label: "崂山区充电站01"
          },
          {
            label: "崂山区充电站02"
          }
        ]
      }
    ]
  },
  {
    label: "武汉市",
    children: [
      {
        label: "武汉充电站01"
      },
      {
        label: "武汉充电站02"
      }, {
        label: "武汉充电站03"
      }
    ]
  }, {
    label: "成都市",
    children: [
      {
        label: "成都充电站01"
      },
      {
        label: "成都充电站02"
      }, {
        label: "成都充电站03"
      }
    ]
  },
  {
    label: "上海市",
    children: [
      {
        label: "上海充电站01"
      },
      {
        label: "上海充电站02"
      }, {
        label: "上海充电站03"
      }
    ]
  },
  {
    label: "长沙市",
    children: [
      {
        label: "长沙充电站01"
      },
      {
        label: "长沙充电站02"
      }, {
        label: "长沙充电站03"
      }
    ]
  }
]

//计费管理城市接口
Mock.mock('https://www.demo.com/cityList', "get", () => {
  return {
    code: 200,
    message: "操作成功",
    data: cityList
  }
})


//报警管理-报警列表接口
const alarmList = [
  {
    description: "充电桩拿不下来",
    address: "北京市东城区",
    equNo: "CD1001",
    level: 1,//1严重 2紧急 3一般
    time: "2024-09-15 09:33:24",
    code: 10023,//故障代码
    status: 1,//1待指派 2处理中 处理异常
  },
  {
    description: "电动车无法充电",
    address: "上海市浦东新区",
    equNo: "CD1002",
    level: 2,
    time: "2024-09-16 10:15:00",
    code: 10024,
    status: 2,
  },
  {
    description: "充电结束未通知",
    address: "广州市天河区",
    equNo: "CD1003",
    level: 3,
    time: "2024-09-17 11:28:45",
    code: 10025,
    status: 1,
  },
  {
    description: "设备显示屏故障",
    address: "深圳市南山区",
    equNo: "CD1004",
    level: 1,
    time: "2024-09-18 14:05:12",
    code: 10026,
    status: 1,
  },
  {
    description: "无法启动充电",
    address: "重庆市渝中区",
    equNo: "CD1005",
    level: 2,
    time: "2024-09-19 08:43:09",
    code: 10027,
    status: 2,
  },
  {
    description: "充电枪接触不良",
    address: "杭州市西湖区",
    equNo: "CD1006",
    level: 3,
    time: "2024-09-20 13:17:38",
    code: 10028,
    status: 3,
  },
  {
    description: "设备漏电报警",
    address: "成都市武侯区",
    equNo: "CD1007",
    level: 1,
    time: "2024-09-21 07:26:55",
    code: 10029,
    status: 2,
  },
]

Mock.mock('https://www.demo.com/alarmList', "get", () => {
  return {
    code: 200,
    message: "操作成功",
    data: alarmList
  }
})

//会员卡管理接口
Mock.mock('https://www.demo.com/member', 'post', (req:any) => {
  const { page, pageSize,no,tel,name } = JSON.parse(req.body);
  console.log("会员管理接口",page, pageSize,no,tel,name)
  return {
    "code": 200,
    "message": "操作成功",
    data: Mock.mock({
      [`list|${pageSize}`]:[{
        'memberCardNumber': '@id',  // 会员卡号
        'cardType|1': ["普通卡", "VIP卡", "季卡"],  // 卡类型
        'issueDate': '@date("yyyy-MM-dd")',  // 开卡日期
        'holderName': '@cname',  // 持有人姓名
        'holderPhone': /^1[3-9]\d{9}$/,  // 持有人电话
        'cardBalance': '@float(100, 10000, 2, 2)',  // 卡余额
        'transactionRecords|1-5': [{  // 消费记录
            'transactionDate|1': ["2024-02-18","2024-04-08","2024-10-03","2024-10-15"],  // 消费日期
            'transactionAmount': '@float(10, 500, 2, 2)',  // 消费金额
            'transactionType|1': ["充电扣款", "服务费扣款", "停车费扣款", "其他"]  // 消费类型
        }],
        'validUntil': '@date("yyyy-MM-dd")'  // 有效期至
    }],
    total:53
    })
  }
});


//招商管理分类列表接口
Mock.mock('https://www.demo.com/document',"get",()=>{
  return {
    code:200,
    message:"操作成功",
    data:{
      type:["招商类","广告类","公告类","提示类","日常类","告警类","其他"],//文章类型
      important:["一级","二级","三级","四级"],//重要程度
      publish:["站内信","公众号","小程序","H5","官网"]//发布渠道
    }
  }
})

// 自定义生成随机账号函数
Mock.Random.extend({
  account: function() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = Mock.mock('@natural(6, 10)');
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
})
//权限设置页面
Mock.mock('https://www.demo.com/permissionList','post',(req:any)=>{
  const {pageSize} = JSON.parse(req.body);
  console.log("权限设置接口收到参数",JSON.parse(req.body)) 
return {
    code:200,
    message:"操作成功",
    data:Mock.mock({
      [`list|${pageSize}`]:[{
        'name': '@cname',  // 姓名
        'account': '@account',//账号
        'phone': /^1[3-9]\d{9}$/,  // 电话
        'idNo': '@id',  // 身份证号
        'position|1':["客服专员",'客服经理','市场专员',"市场经理","运营专员","运营经理","技术工程师","技术经理","Boss"],//职位
        'department|1':['总裁办','技术部','市场部','维修部','运营部','客服部'],//所属部门
        "pageAuthority|1":['admin','manager','user','自定义权限'],//页面权限
        'btnAuthority|1':['add','delete','edit','all','自定义权限'],//按钮权限
    }],
    total:41
    })
  }
})


const userMenulist = [
  {
    name: "数据看板",
    url: "/dashboard",
    icon: "DataLine"
  },
  {
    name: "充电站管理",
    url: "/chargingstation",
    icon: "Lightning",
    children: [
      {
        name: "充电站监控",
        url: "/chargingstation/monitor",
        icon: "VideoCamera"
      },

      {
        name: "充电桩管理",
        url: "/chargingstation/fault",
        icon: "Warning"
      }
    ]
  },
  {
    name: "电子地图",
    url: "/map",
    icon: "MapLocation"
  },

  {
    name: "报警管理",
    url: "/alarm",
    icon: "Phone"
  },

  {
    name: "会员卡管理",
    url: "/equipment",
    icon: "Magnet"
  },
  {
    name: "个人中心",
    url: "/personal",
    icon: "User"
  },
]
//获取当前用户权限
Mock.mock("https://www.demo.com/userAuth","post",(req:any)=>{
 //console.log(234,req.body)
 const {pageAuthority}=JSON.parse(req.body)
  console.log("后端收到当前权限",pageAuthority)
  return {
    code:200,
    message:"操作成功",
    data:{
      list:pageAuthority=="user"? userMenulist:(pageAuthority=="manager"?menulist2:menulist),
      btn:pageAuthority=="user"?['add']:(pageAuthority=="manager"?['add',"edit"]:['add',"edit","all","delete"])
    }
  }
})

//权限设置接口
Mock.mock("https://www.demo.com/setAuth","post",(req:any)=>{
  const {btnList,pageList,account}=JSON.parse(req.body)
  console.log("权限设置接口修改账号权限",account,btnList,pageList)
  return{
    code:200,
    message:"操作成功",
    data:null
  }
})

// AI Chat 接口
Mock.mock("https://www.demo.com/ai/chat","post",(options:any)=>{
  const { prompt } = JSON.parse(options.body)
  console.log("AI Chat 收到提问：", prompt)

  // 根据用户输入智能匹配回复
  let reply = ""
  const q = prompt
  const ql = q.toLowerCase()

  // ========== 问候 / 自我介绍 ==========
  if (ql.includes("你好") || ql.includes("hello") || ql.includes("hi") || ql.includes("你是谁") || ql.includes("自我介绍") || ql.includes("你能做什么") || ql.includes("你叫什么") || ql.match(/^.{0,4}$/)) {
    const greetings = [
      `你好呀！👋\n\n我是 **AI 智能助手**，你可以把我当作你的专属技术顾问。\n\n我能帮你做的事情还挺多的：\n\n- 💬 **技术问答**：前端、后端、架构，你问我就答\n- 📊 **数据分析**：我可以帮你解读充电站的运营数据，发现隐藏在数字背后的趋势\n- ✍️ **文案策划**：推广方案、运营策略、技术文档都能写\n- 💻 **代码编写**：Vue、TypeScript、Python 都是我的舒适区\n- 🔍 **问题排查**：遇到 bug 了？把问题描述给我，一起定位\n\n对了我现在接入了你的充电站管理系统，所以关于充电站运营的问题我可以结合你的实际数据来聊。\n\n有什么想聊的？随便问，别客气 😄`,
      `嗨！很高兴见到你 🌟\n\n我是动力港平台的 AI 助手，专门为充电站运营团队打造的智能伙伴。\n\n简单介绍一下我的能力：\n- 懂技术：能写代码、调 bug、做架构设计\n- 懂业务：充电站运营、数据分析、方案策划\n- 懂行业：新能源充电行业的趋势、政策、商业模式\n\n不用跟我客气，直接说你想做什么就行。比如：\n\n> "帮我分析一下最近的充电量趋势"\n> "给我写一个充电桩状态面板的 Vue 组件"\n> "充电站怎么提高用户留存率？"\n\n来吧，抛出你的第一个问题 🚀`,
      `Hi there! 👋\n\n我是这个充电站管理系统的内置 AI 助手。\n\n坦白说，我的知识面还挺广的——从 Vue 3 组件设计到充电站行业趋势，从数据分析到运营策略，都是我的强项。\n\n你可以把我当成一个随时在线的技术合伙人。开发遇到困难了找我，数据看不懂了找我，想做个推广方案了找我。\n\n那么，今天想聊点什么？`
    ]
    reply = greetings[Math.floor(Math.random() * greetings.length)]
  }
  // ========== 数据分析 ==========
  else if (ql.includes("数据") || ql.includes("分析") || ql.includes("统计") || ql.includes("趋势") || ql.includes("报表") || ql.includes("指标")) {
    // 进一步细分
    if (ql.includes("充电量") || ql.includes("电量") || ql.includes("用电")) {
      reply = `看了一下充电量数据，最近一周的情况是这样的：\n\n📊 **充电量概览（近7天）**\n\n| 日期 | 充电量(kWh) | 环比 |\n|------|------------|------|\n| 周一 | 1,856 | - |\n| 周二 | 1,921 | +3.5% |\n| 周三 | 2,034 | +5.9% |\n| 周四 | 1,978 | -2.8% |\n| 周五 | 2,156 | +9.0% |\n| 周六 | 1,624 | -24.7% |\n| 周日 | 1,278 | -21.3% |\n\n一眼就能看出来，**周中充电量明显高于周末**，周五是峰值。这说明充电需求和通勤高度相关——大部分人是在上班通勤途中或公司附近充电。\n\n周末充电量断崖式下降，这其实反映了一个机会：**周末可以推出优惠活动**，把周末闲置的充电桩利用起来。\n\n你觉得这个方向值得深挖吗？`
    } else if (ql.includes("营收") || ql.includes("收入") || ql.includes("盈利") || ql.includes("利润")) {
      reply = `关于营收，我帮你拉了一下数据：\n\n💰 **营收结构分析**\n\n从系统数据来看，目前的营收主要由三块构成：\n\n- **电费收入**：约占 42%，这是基本盘，但利润空间有限\n- **服务费**：约占 38%，这是核心竞争力，服务越好这块越高\n- **停车费**：约占 12%，还有较大增长空间\n- **会员储值**：约占 8%，这块增长最快\n\n📈 **关键发现**\n\n1. 服务费占比远低于行业头部的 50%+，说明**增值服务还有很大空间**\n2. 会员储值虽然占比不高，但**增速最快**——用户一旦充值，粘性显著提升\n3. 部分站点（如贵阳甲秀楼站）增长率为 -5.3%，需要重点关注\n\n我的建议是：把精力放在提升服务费占比和会员转化率上，这两块的 ROI 最高。需要我针对某个具体站点做详细分析吗？`
    } else if (ql.includes("故障") || ql.includes("异常") || ql.includes("设备") || ql.includes("健康")) {
      reply = `我查了下设备运行数据，目前系统内有 9 台设备处于异常状态：\n\n🔧 **异常设备分布**\n\n| 站点 | 异常数量 | 主要问题 |\n|------|----------|----------|\n| 珠海长隆站 | 3 台 | 故障离线 |\n| 杭州西湖站 | 3 台 | 故障离线 |\n| 成都天府站 | 1 台 | 通信中断 |\n| 北京西单站 | 1 台 | 温度过高 |\n| 上海陆家嘴站 | 1 台 | 电流异常 |\n\n⚠️ 珠海和杭州两个站点各挂了 3 台，这不是个例了，建议优先排查这两个站点的供电环境。\n\n另外我发现一个规律：**温度偏高的设备，故障率是正常设备的 3.2 倍**。夏天快到了，散热维护得提前安排起来。\n\n要我帮你生成一份设备巡检清单吗？`
    } else {
      reply = `看了下系统的整体数据，给你一个快速概览：\n\n📊 **核心指标速览**\n\n| 指标 | 数值 | 状态 |\n|------|------|------|\n| 充电桩总数 | 3,398 台 | - |\n| 当前使用中 | 2,263 台 | 利用率 66.6% |\n| 异常设备 | 9 台 | ⚠️ 需关注 |\n| 快充占比 | 82% | ✅ 健康 |\n\n几个值得关注的信号：\n\n1. **整体利用率 66.6%**，属于行业中等偏上水平，还有提升空间\n2. **快充占比 82%**，用户明显偏好快充，后续新增设备可以优先考虑快充桩\n3. **异常率 0.26%**，控制在合理范围内\n\n你想深入看哪个维度？比如充电量走势、各站点对比、用户行为分析，我都能展开聊。`
    }
  }
  // ========== 方案策划 / 运营 ==========
  else if (ql.includes("方案") || ql.includes("推广") || ql.includes("运营") || ql.includes("营销") || ql.includes("活动") || ql.includes("策划") || ql.includes("策略")) {
    if (ql.includes("留存") || ql.includes("会员") || ql.includes("用户") || ql.includes("客户")) {
      reply = `用户留存确实是个好问题，也是充电站运营最核心的指标之一。\n\n🎯 **提高用户留存的 5 个策略**\n\n**1. 会员分层运营**\n不要一刀切。根据充电频次把用户分成 3 层：\n- 高频用户（月充≥8次）：给专属优惠，防止流失\n- 中频用户（月充3-7次）：推储值套餐，提升消费频次\n- 低频用户（月充≤2次）：发新人券，激活沉默用户\n\n**2. 储值锁客**\n系统数据显示，储值用户的月均充电次数是普通用户的 2.4 倍。可以设计阶梯储值套餐：\n- 充 200 送 20（基础）\n- 充 500 送 80（进阶）\n- 充 1000 送 200（铁粉）\n\n**3. 充电即积分**\n每充 1 度电积 1 分，积分可以兑换停车券、洗车、保养服务。关键是**积分要有实际价值**，不能鸡肋。\n\n**4. 精准推送**\n用户常去哪个站、什么时间充、用快充还是慢充——这些数据系统里都有。别群发，针对性地推。比如："你常去的北京西单站明天下午有优惠哦～"\n\n**5. 社交裂变**\n老用户邀请新用户，双方各得一次免费充电。成本可控，获客效率高。\n\n这些策略里，你觉得哪个最适合你们当前的阶段？我可以细化成具体执行方案。`
    } else {
      reply = `好，我帮你系统地梳理一下充电站的运营推广思路：\n\n🎯 **运营推广三步走**\n\n---\n\n**第一步：引流（前两周）**\n\n核心目标：让更多人知道你的充电站\n\n- 📍 **地图标注优化**：确保所有站点在高德/百度地图上的位置、价格、空闲桩数都准确，这是最大的自然流量入口\n- 🤝 **周边商户合作**：跟附近商场、写字楼、4S 店谈合作，在他们那放充电优惠码\n- 📱 **本地社群渗透**：加入本地的电动车车主群，自然地分享充电体验\n\n---\n\n**第二步：转化（第3-4周）**\n\n核心目标：让人第一次来充，并且觉得不错\n\n- 🎁 **首充立减**：新用户第一次充电减 10 元，门槛很低，转化率通常能到 30%+\n- ⭐ **高峰期分流**：10:00-14:00 和 17:00-20:00 是高峰期，非高峰时段充电打 8 折，平滑负载\n- 📊 **透明定价**：把电费、服务费、停车费列清楚，用户讨厌"隐藏费用"\n\n---\n\n**第三步：留存（长期）**\n\n核心目标：让用户下次还来\n\n- 💳 **储值锁客**：充值送余额，锁定长期用户\n- 🎯 **个性化推送**：别发垃圾消息，推真正有用的——比如用户常去的站排队了，推荐附近的空闲站\n- 🏆 **游戏化**：充电排行榜、勋章、等级，让充电这件事变得好玩\n\n---\n\n整体逻辑是：**先让用户来 → 来了满意 → 满意了储值 → 储值了就很难走了**。\n\n你现在的阶段是刚起步还是已经有稳定用户量了？不同阶段的策略侧重点差别很大。`
    }
  }
  // ========== 代码编写 ==========
  else if (ql.includes("代码") || ql.includes("写") || ql.includes("组件") || ql.includes("vue") || ql.includes("typescript") || ql.includes("编程") || ql.includes("实现") || ql.includes("函数") || ql.includes("typescript") || ql.includes("前端") || ql.includes("后端")) {
    if (ql.includes("表格") || ql.includes("table") || ql.includes("列表")) {
      reply = `没问题，给你写一个带分页、排序、筛选的表格组件。这个组件已经在项目里验证过，可以直接用：\n\n` +
        "<pre><code>" +
        "&lt;script setup lang=\"ts\"&gt;\n" +
        "import { ref, computed } from 'vue'\n\n" +
        "interface Column {\n" +
        "  prop: string\n" +
        "  label: string\n" +
        "  width?: number\n" +
        "  sortable?: boolean\n" +
        "}\n\n" +
        "const props = defineProps&lt;{\n" +
        "  columns: Column[]\n" +
        "  data: Record&lt;string, any&gt;[]\n" +
        "  pageSize?: number\n" +
        "}&gt;()\n\n" +
        "const currentPage = ref(1)\n" +
        "const sortField = ref('')\n" +
        "const sortOrder = ref&lt;'asc' | 'desc'&gt;('asc')\n\n" +
        "const sortedData = computed(() =&gt; {\n" +
        "  if (!sortField.value) return props.data\n" +
        "  return [...props.data].sort((a, b) =&gt; {\n" +
        "    const va = a[sortField.value]\n" +
        "    const vb = b[sortField.value]\n" +
        "    const dir = sortOrder.value === 'asc' ? 1 : -1\n" +
        "    return va &gt; vb ? dir : va &lt; vb ? -dir : 0\n" +
        "  })\n" +
        "})\n\n" +
        "const paginatedData = computed(() =&gt; {\n" +
        "  const size = props.pageSize ?? 10\n" +
        "  const start = (currentPage.value - 1) * size\n" +
        "  return sortedData.value.slice(start, start + size)\n" +
        "})\n\n" +
        "function toggleSort(prop: string) {\n" +
        "  if (sortField.value === prop) {\n" +
        "    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'\n" +
        "  } else {\n" +
        "    sortField.value = prop\n" +
        "    sortOrder.value = 'asc'\n" +
        "  }\n" +
        "}\n" +
        "&lt;/script&gt;\n" +
        "</code></pre>\n\n" +
        "核心设计思路：\n- computed 链式处理 sortedData → paginatedData，不用手动维护中间状态\n- 排序切换逻辑是「同字段切换方向，换字段默认升序」，跟 Excel 的体验一致\n- 分页从 computed 数据里切片，天然保证排序后再分页\n\n和你项目里的 Element Plus 风格完全一致，拿去就能用。需要我补全 template 部分吗？"
    } else if (ql.includes("图表") || ql.includes("echarts") || ql.includes("chart") || ql.includes("可视化")) {
      reply = `正好，ECharts 是咱们项目的核心依赖之一。给你写一个封装好的图表 composable：\n\n` +
        "<pre><code>" +
        "// hooks/useECharts.ts\n" +
        "import { ref, onMounted, onUnmounted, type Ref } from 'vue'\n" +
        "import * as echarts from 'echarts'\n\n" +
        "export function useECharts(\n" +
        "  containerRef: Ref&lt;HTMLElement | null&gt;,\n" +
        "  optionFactory: () =&gt; echarts.EChartsOption\n" +
        ") {\n" +
        "  const chart = ref&lt;echarts.ECharts | null&gt;(null)\n\n" +
        "  function init() {\n" +
        "    if (!containerRef.value) return\n" +
        "    chart.value = echarts.init(containerRef.value)\n" +
        "    chart.value.setOption(optionFactory())\n" +
        "  }\n\n" +
        "  function resize() {\n" +
        "    chart.value?.resize()\n" +
        "  }\n\n" +
        "  function refresh() {\n" +
        "    chart.value?.setOption(optionFactory(), true)\n" +
        "  }\n\n" +
        "  onMounted(() =&gt; {\n" +
        "    init()\n" +
        "    window.addEventListener('resize', resize)\n" +
        "  })\n\n" +
        "  onUnmounted(() =&gt; {\n" +
        "    window.removeEventListener('resize', resize)\n" +
        "    chart.value?.dispose()\n" +
        "  })\n\n" +
        "  return { chart, refresh, resize }\n" +
        "}\n" +
        "</code></pre>\n\n" +
        "这样封装的好处：\n1. **响应式更新**：optionFactory 里引用的 ref 变了，调用 refresh() 就能刷新图表\n2. **自动清理**：组件卸载时 dispose 实例，不会内存泄漏\n3. **resize 自动处理**：窗口大小变了图表跟着自适应\n\n你们项目里 src/hooks/useChart.ts 已经有类似的逻辑，我这个版本把类型写得更完整了一些，可以参考升级一下。"
    } else {
      reply = `好的，给你写一个实用的示例——基于咱们项目现有架构的写法：\n\n` +
        "<pre><code>" +
        "// composables/useStationFilter.ts\n" +
        "import { ref, computed } from 'vue'\n" +
        "import type { Station } from '@/types/station'\n\n" +
        "export function useStationFilter(stations: Ref&lt;Station[]&gt;) {\n" +
        "  const searchKeyword = ref('')\n" +
        "  const statusFilter = ref&lt;number | null&gt;(null)\n\n" +
        "  const filtered = computed(() =&gt; {\n" +
        "    let result = stations.value\n\n" +
        "    if (searchKeyword.value) {\n" +
        "      const kw = searchKeyword.value.toLowerCase()\n" +
        "      result = result.filter(s =&gt;\n" +
        "        s.name.toLowerCase().includes(kw) ||\n" +
        "        s.id.toLowerCase().includes(kw) ||\n" +
        "        s.city.toLowerCase().includes(kw)\n" +
        "      )\n" +
        "    }\n\n" +
        "    if (statusFilter.value !== null) {\n" +
        "      result = result.filter(s =&gt; s.status === statusFilter.value)\n" +
        "    }\n\n" +
        "    return result\n" +
        "  })\n\n" +
        "  const stats = computed(() =&gt; ({\n" +
        "    total: filtered.value.length,\n" +
        "    online: filtered.value.filter(s =&gt; s.status === 2).length,\n" +
        "    fault: filtered.value.filter(s =&gt; s.status === 6).length,\n" +
        "  }))\n\n" +
        "  function reset() {\n" +
        "    searchKeyword.value = ''\n" +
        "    statusFilter.value = null\n" +
        "  }\n\n" +
        "  return { searchKeyword, statusFilter, filtered, stats, reset }\n" +
        "}\n" +
        "</code></pre>\n\n" +
        "几个设计点：\n- **computed 级联**：filtered 根据搜索词和状态联动，stats 自动从 filtered 派生，不用手动同步\n- **类型安全**：Station 类型从项目 types 里导入，如果接口变了编译器会告诉你哪里要改\n- **单一职责**：只负责筛选逻辑，不碰 UI，组件里用起来很干净\n\n在你的 Monitor.vue 或 Fault.vue 里用这个 hook，能把几百行筛选逻辑精简到几十行。需要我演示一下怎么集成到现有页面吗？"
    }
  }
  // ========== 行业 / 技术趋势 ==========
  else if (ql.includes("行业") || ql.includes("趋势") || ql.includes("未来") || ql.includes("发展") || ql.includes("前景") || ql.includes("新能源")) {
    reply = `聊到行业趋势，这个话题我确实有不少想说的。\n\n🚗 **充电行业正在经历几个关键变化**\n\n---\n\n**1. 从「有桩用」到「充得快」**\n\n两三年前大家关心的是充电站够不够多。现在一线城市的充电站密度已经很高了，竞争焦点转移到了**充电速度和体验**。\n\n- 主流快充从 60kW 升级到 120kW → 240kW\n- 头部厂商已经在推 480kW 超充，号称"充电 5 分钟，续航 200 公里"\n- 对运营方的挑战：超充对电网冲击大，需要配储能设备\n\n---\n\n**2. 光储充一体化成为标配**\n\n这是一个正在发生的结构性变化：\n\n> 光伏发电 → 储能电池 → 充电桩\n\n好处很直接：白天光伏发电自己用，电费成本大幅下降；储能还能参与电网调峰，多一条收入来源。\n\n现在新建的大型充电站，不做光储充反而显得落伍了。\n\n---\n\n**3. V2G（车网互动）**\n\n这个方向目前还在早期，但想象空间很大：\n- 电动车不只是用电设备，还是**移动储能设备**\n- 晚上电价低时充电，白天电价高时可以卖回给电网\n- 相当于每个车主都变成了"能源交易商"\n\n技术上已经可行了，缺的是政策标准和商业模式。\n\n---\n\n**4. 智能化运营成为分水岭**\n\n这其实跟你们的系统直接相关。行业正在从「人工管站」过渡到「AI 管站」：\n- 动态定价：根据供需实时调价，高峰期涨价、低谷期降价\n- 预测维护：不等设备坏了再修，而是提前预警\n- 智能调度：引导用户去空闲站点，平衡负载\n\n以上这些，你们现在做的系统已经覆盖了很大一部分。接下来如果把 AI 分析能力再做深一些，竞争力会更强。\n\n你对哪个方向比较感兴趣？我可以展开细聊。`
  }
  // ========== 故障 / 问题排查 ==========
  else if (ql.includes("故障") || ql.includes("报错") || ql.includes("bug") || ql.includes("问题") || ql.includes("错误") || ql.includes("error") || ql.includes("修") || ql.includes("解决")) {
    reply = `好的，我来帮你排查一下。虽然看不到你的实际运行环境，但咱们可以按套路来定位：\n\n🔍 **标准排查流程**\n\n**1. 先看现象，归类方向**\n- 前端报错还是后端报错？控制台有没有红字？\n- 是所有用户都遇到，还是个别情况？\n- 什么时候开始出现的？最近改了什么？\n\n**2. 常见问题速查**\n\n| 现象 | 大概率是 | 优先级 |\n|------|----------|--------|\n| 页面白屏 | JS 报错 / 路由配置错误 | 🔴 高 |\n| 接口 401 | Token 过期 / 未登录 | 🔴 高 |\n| 数据不更新 | 响应式丢失 / computed 写错了 | 🟡 中 |\n| 样式不生效 | scoped 隔离 / 选择器优先级 | 🟢 低 |\n| 列表不刷新 | 直接改数组下标，没触发响应式 | 🟡 中 |\n\n**3. Vue 3 项目特别注意**\n- reactive() 包装的对象，直接赋值整个对象会丢失响应式 → 用 Object.assign() 或 ref()\n- ref() 在 &lt;script setup&gt; 里自动解包，但在 JS/TS 文件里要 .value\n- watch 默认不深度监听，对象内部变化监听不到 → 加 { deep: true }\n- Pinia store 里如果用了解构，响应式会断 → 用 storeToRefs()\n\n能把具体的报错信息或者问题现象发给我吗？信息越详细我定位越准。`
  }
  // ========== 系统相关 ==========
  else if (ql.includes("系统") || ql.includes("平台") || ql.includes("项目") || ql.includes("架构") || ql.includes("技术栈")) {
    reply = `我们这个动力港平台的技术架构还挺清晰的，给你梳理一下：\n\n🏗 **技术架构一览**\n\n\`\`\`\n┌─────────────────────────────────────────┐\n│              浏览器 (Browser)              │\n├─────────────────────────────────────────┤\n│  Vue 3 + TypeScript + Element Plus       │\n│  ┌──────────┐ ┌──────────┐ ┌─────────┐ │\n│  │  组件层   │ │  路由层   │ │  状态层  │ │\n│  │ views/   │ │ router/  │ │ store/   │ │\n│  │ components│ │ guard.ts │ │ Pinia    │ │\n│  └──────────┘ └──────────┘ └─────────┘ │\n│  ┌──────────┐ ┌──────────┐ ┌─────────┐ │\n│  │  Hooks   │ │  Utils   │ │  Types  │ │\n│  │ useHttp  │ │ axios.ts │ │ user/   │ │\n│  │ useChart │ │ http.ts  │ │ station/│ │\n│  └──────────┘ └──────────┘ └─────────┘ │\n├─────────────────────────────────────────┤\n│          Axios → REST API / Mock.js       │\n├─────────────────────────────────────────┤\n│        后端服务 (Mock / 生产环境)          │\n└─────────────────────────────────────────┘\n\`\`\`\n\n几个关键设计决策：\n\n- **Mock.js 劫持 XMLHttpRequest**，开发阶段完全不用启动后端，前端独立开发\n- **Pinia 替代 Vuex**，API 更简洁，TypeScript 支持更好\n- **路由守卫 + 权限指令**，页面级和按钮级双层权限控制\n- **KeepAlive + 标签页**，页面切换保留状态，用户体验好\n\n如果你想知道某个模块的具体实现细节，告诉我，我可以深入讲。`
  }
  // ========== 通用回复（基于语义分析） ==========
  else {
    // 分析问题类型，生成更有针对性的回复
    const questionWords = ["什么", "怎么", "如何", "为什么", "哪个", "多少", "where", "what", "how", "why", "which", "meaning", "means", "能不能", "可以", "能不能", "帮我"]
    const isQuestion = questionWords.some(w => ql.includes(w))
    const isShort = q.length < 15
    const hasQuestionMark = q.includes("？") || q.includes("?")
    const mentionsCharging = ql.includes("充电") || ql.includes("站") || ql.includes("桩") || ql.includes("电")

    if (isQuestion || hasQuestionMark) {
      if (isShort) {
        // 简短问题 — 先给答案再展开
        reply = `这个问题问得挺好。\n\n让我直接回答你：\n\n` +
          (mentionsCharging
            ? `充电站运营中确实需要注意这一点。我觉得关键不在于这个问题的答案本身，而在于它背后反映的运营思路——是不是在以用户为中心做决策。\n\n如果你能多给我一点上下文，比如具体是哪个站点遇到了什么情况，我可以给出更落地的建议。`
            : `坦白说，你这个问题背后可能有好几种不同的场景，我需要更多信息才能给出精准的答案。\n\n不过我可以先说说一般情况下的思路，你看看是否对得上你的场景。如果不对，再补充点细节，我帮你进一步分析。`)
      } else {
        reply = `好问题，让我认真思考一下。\n\n你问的是关于「${q.length > 40 ? q.slice(0, 40) + '...' : q}」的问题。\n\n我的理解是，这个问题的核心在于几个方面：\n\n1. **现状是什么** — 把事实和数据理清楚，避免凭感觉判断\n2. **为什么会出现** — 找到根本原因，而不是治标不治本\n3. **怎么解决** — 方案要有可操作性，不能只是概念\n4. **如何衡量效果** — 做完之后怎么知道有没有用\n\n其实很多复杂问题的解决思路都是类似的：先拆解、再分析、然后制定方案、最后验证。\n\n如果你不介意的话，可以告诉我更多背景信息——比如具体是什么场景下遇到的问题、已经尝试过哪些方法、期望达到什么效果。信息越具体，我能给出的建议就越精准。`
      }
    } else if (isShort) {
      // 简短非提问 — 可能是关键词
      reply = `嗯，我收到了你的消息。\n\n不过你说的比较简略，我理解起来可能有些偏差。你是想聊关于「${q}」这个话题吗？\n\n可以多说两句你想了解的具体方面，这样我能更准确地帮你。不用写很多，一句话描述清楚就行 😊`
    } else {
      // 长文本非提问 — 可能是描述场景
      reply = `谢谢你分享这些信息，我仔细看了一遍。\n\n你描述的内容我大致理解了。这里面涉及几个层面的事情，我觉得可以这样来梳理：\n\n**先抓住核心矛盾**\n你提到的这些问题，如果抽丝剥茧去看，核心矛盾可能在于效率和体验的平衡——怎么在控制成本的同时，还能让用户有好的感受。\n\n**再找关键突破口**\n与其试图一次性解决所有问题，不如先找到一个"四两拨千斤"的点。通常来说，数据是最好的向导——看看哪个环节的用户流失率最高，或者哪个渠道的成本最低、转化率最高，从那里开始发力。\n\n**最后持续迭代**\n不要追求一次做到完美。先把最小可行方案跑起来，收集反馈，再调整。这比花很长时间做一个"完美的方案"要有效得多。\n\n如果你能告诉我更多具体的背景——比如当前的业务阶段、已有的资源、最头疼的一两个问题——我可以给出更有针对性的建议。`
    }
  }

  // 模拟真实 AI 的思考延迟（300-800ms）
  const delay = 300 + Math.random() * 500

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: "操作成功",
        data: {
          reply,
          timestamp: new Date().toISOString()
        }
      })
    }, delay)
  })
})