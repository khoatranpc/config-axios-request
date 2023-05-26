// get, post, put, delete || patch

import httpClient from "./axios";

/**
 * API gọi đến là gì ? (route) endpoint
 * Phương thức gửi là gì? GET, POST, PUT, DELETE
 * (payload)
 * Dữ liệu gửi lên, (lên route) là gì?
 * lên route: config: req.query, req.params, req.body
 * 
 * optimize -> function để tổ hợp cho các điều kiện muốn dùng api phía trên
 * 
 * 
 * API cho phép GET như thế nào?
 *  chỉ được phép dùng với dữ liệu gửi lên là: params, query
 * https://jsonplaceholder.typicode.com/post
 * 
 * sau dấu ? là query,
 *  /:id -> params
 * 
 * ... -> trải dữ liệu -> spread
 * 
 * 
 * params khi dùng GET của axios -> query của backend
 * 
 * 
 * rule call api:
 * luật tạo endpoint
 * mỗi endpoint ví dụ: /posts/1 -> backend /posts/:param/:param/:param
 *                  query chắc chắn sẽ nằm ở cuối cùng của endPoint
 * 
 * *1: cứ endpoint mà cần truyền params: endpoint/$/$/$
 */
export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}
const doRequest = async (apiEndpoint, method, payload) => {
    // config /:id/:username: param chỉ là các giá trị dùng mảng để lưu trữ các giá trị param này
    // const {userName,page} = req.query
    let mapEndpoint = apiEndpoint;
    if (payload) {
        if (payload.params) {
            payload.params.forEach(element => {
                if (mapEndpoint.includes('$')) {
                    mapEndpoint = mapEndpoint.replace('$', element);
                }
            });
        }
        let configQuery = '?';
        if (payload.query) {
            for (const key in payload.query) {
                if (key && payload.query[key]) {
                    configQuery += `${key}=${payload.query[key]}&`
                }
            }
            /// nhớ slice ,splice vị trí bắt đầu để lấy, vị trí để cắt, [ )
            configQuery = configQuery.slice(0, configQuery.length - 1);
            mapEndpoint += configQuery;
        }
    }
    let response;
    switch (method) {
        case METHOD.GET:
            response = (await httpClient.get(mapEndpoint)).data;
            break;
        case METHOD.POST:
            // data -> req,body
            // ts -> dễ dàng hơn
            // mặc định với nhau là object
            response = (await httpClient.post(mapEndpoint, {
                ...(payload && payload.data ? payload.data : {})
            })).data;
            break;
        default:
            break;
    }
    return response;
};

export default doRequest;