// import 和 export ES6规范

//commonJS规范 导出exports , module.exports,  导入require

//导入express
let express = require('express');

//创建express实例
let app = express();

//设置静态目录
app.use(express.static('public'));

app.get('/', (req, res) => {
	//req: 请求对象
	//res: 响应对象

	let data = [
    {
      goodsId:'a0001',
      goodsName:"小白裙",
      goodsImage:"http://127.0.0.1:10000/images/aaaa.jpg",
      goodsAddress:"广州",
      goodsPrice: '190.12',
      goodsDescription: '小清新裙子',
      detailImgs: ['http://127.0.0.1:10000/images/aaaa.jpg', 'http://127.0.0.1:10000/images/aaaa.jpg']
    },
    {
      goodsId:'a0003',
      goodsName:"玛瑙手镯",
      goodsImage:"http://127.0.0.1:10000/images/ccc.jpg",
      goodsAddress:"杭州",
      goodsPrice: '3000.87',
      goodsDescription: '柬埔寨天然手镯',
      detailImgs: ['http://127.0.0.1:10000/images/ccc.jpg', 'http://127.0.0.1:10000/images/ccc.jpg', 'http://127.0.0.1:10000/images/ccc.jpg']
    },
    {
      goodsId:'a0004',
      goodsName:"帆布鞋",
      goodsImage:"http://127.0.0.1:10000/images/xxx.jpg",
      goodsAddress:"深圳",
      goodsPrice: '89.00',
      goodsDescription: '怎么穿都穿不破鞋子',
      detailImgs: ['http://127.0.0.1:10000/images/xxx.jpg']
    },
  ]

	//将数据响应给前端
	res.send(data);
})

app.listen(10000, () => {
	console.log('the server running at http://127.0.0.1:10000');
})