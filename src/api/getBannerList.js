import mockRequest from '@/utils/mockRequest'
// 获取轮播图信息
export const getBannerList = function () {
  return mockRequest.get('/banner')
}
