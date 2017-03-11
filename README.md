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

'/service/smsCode': {
    "phoneNumber": string
}

```

```javascript

export default class InfoModel {
    static getBindedChildren() {
        return $.ajax(bindedChildrenEndPoint)
    }

    static getChildrenByName(name) {
        return $.ajax(getChildrenByNameEndPoint, {
            data: {
                name: name
            }
        })
    }

    static bindChild(childId) {
        return $.ajax(bindChildrenEndPoint, {
            method: 'POST',
            data: {studentID: childId}
        })
    }

    static bindPhoneNumber(phoneNumber, smsCode) {
        return $.ajax(bindPhoneNumberEndPoint, {
            method: 'POST',
            data: {
                phoneNumber: phoneNumber,
                smsCode: smsCode
            }
        })
    }

    static getChildInfo(childId) {
        return $.ajax(childInfoEndPointGetter(childId))
    }

    static getTestSubjectDetail(childId) {
        return $.ajax(testSubjectDetailEndPointGetter(childId))
    }

    static getDimensionSummary(childId) {
        return $.ajax(dimensionSubmmaryEndpointGetter(childId))
    }

    static getAdvice(childId) {
        return $.ajax(adviceEndpointGetter(childId))
    }
}
```