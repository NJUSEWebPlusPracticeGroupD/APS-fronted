import {request} from '../utils/request'

export function testRequest() {
    return request({
      method:'GET',
      url: 'api/user/test'
    })
}

