import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'
// 使用mock虚拟请求
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
