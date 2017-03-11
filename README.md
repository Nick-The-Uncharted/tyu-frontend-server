### 直接跑
npm run start

config.json 为配置文件

所有不以service/(防止重复获取)或者static/ 开头并且带有code参数的url都会自动获取openid

```javascript

const baseUrl = `${config.serverAddress}/service`
export const bindEndpoint = `${baseUrl}/bindPhoneNumber`

export const bindChildrenEndPoint = `${baseUrl}/reportUser/bindStudent`

export const bindPhoneNumberEndPoint = `${baseUrl}/reportUser/bindPhoneNumber`

export const bindedChildrenEndPoint = `${baseUrl}/reportUser/searchStudentByOpenID`

export const getChildrenByNameEndPoint = `${baseUrl}/reportUser/searchStudentByName`

export const childInfoEndPointGetter = (childId) => {
    return `${baseUrl}/report/getStudentInfo?id=${childId}`
}

export const testSubjectDetailEndPointGetter = (childId) => {
    return `${baseUrl}/report/getSubjectInfo?id=${childId}`
}

export const dimensionSubmmaryEndpointGetter = (childId) => {
    return `${baseUrl}/report/getCategoryInfo?id=${childId}`
}

export const adviceEndpointGetter = (childId) => {
    return `${baseUrl}/report/getAdvice?id=${childId}`
}
```