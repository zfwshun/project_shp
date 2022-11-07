import mockRequest from '@/utils/mockRequest'
// 获取楼层信息
export const getFloorList = function () {
  return mockRequest.get('/floor')
}
