# ExamPlatformPublicApi.DefaultApi

All URIs are relative to *http://localhost:3000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**certificatesIdGet**](DefaultApi.md#certificatesIdGet) | **GET** /certificates/{id} | Get a certificate by ID
[**certificatesVerifyCodeGet**](DefaultApi.md#certificatesVerifyCodeGet) | **GET** /certificates/verify/{code} | Verify a certificate by its code
[**enrollmentsGet**](DefaultApi.md#enrollmentsGet) | **GET** /enrollments | List all enrollments
[**enrollmentsIdDelete**](DefaultApi.md#enrollmentsIdDelete) | **DELETE** /enrollments/{id} | Unenroll a student
[**enrollmentsPost**](DefaultApi.md#enrollmentsPost) | **POST** /enrollments | Enroll a student in an exam
[**examsGet**](DefaultApi.md#examsGet) | **GET** /exams | List all exams
[**examsIdGet**](DefaultApi.md#examsIdGet) | **GET** /exams/{id} | Get a single exam by ID
[**examsIdPut**](DefaultApi.md#examsIdPut) | **PUT** /exams/{id} | Update an exam
[**examsPost**](DefaultApi.md#examsPost) | **POST** /exams | Create a new exam
[**keysIdDelete**](DefaultApi.md#keysIdDelete) | **DELETE** /keys/{id} | Revoke an API key
[**keysIdLogsGet**](DefaultApi.md#keysIdLogsGet) | **GET** /keys/{id}/logs | Get request logs for an API key
[**keysPost**](DefaultApi.md#keysPost) | **POST** /keys | Create a new API key
[**questionsGet**](DefaultApi.md#questionsGet) | **GET** /questions | List all questions
[**questionsPost**](DefaultApi.md#questionsPost) | **POST** /questions | Create a new question
[**resultsGet**](DefaultApi.md#resultsGet) | **GET** /results | List all results
[**resultsPost**](DefaultApi.md#resultsPost) | **POST** /results | Submit a new result
[**resultsStudentStudentIdGet**](DefaultApi.md#resultsStudentStudentIdGet) | **GET** /results/student/{studentId} | Get results for a specific student
[**webhooksGet**](DefaultApi.md#webhooksGet) | **GET** /webhooks | List your webhook subscriptions
[**webhooksIdDelete**](DefaultApi.md#webhooksIdDelete) | **DELETE** /webhooks/{id} | Delete a webhook subscription
[**webhooksPost**](DefaultApi.md#webhooksPost) | **POST** /webhooks | Register a new webhook subscription



## certificatesIdGet

> certificatesIdGet(id)

Get a certificate by ID

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let id = 56; // Number | 
apiInstance.certificatesIdGet(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## certificatesVerifyCodeGet

> certificatesVerifyCodeGet(code)

Verify a certificate by its code

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let code = "code_example"; // String | 
apiInstance.certificatesVerifyCodeGet(code, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **code** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## enrollmentsGet

> enrollmentsGet()

List all enrollments

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
apiInstance.enrollmentsGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## enrollmentsIdDelete

> enrollmentsIdDelete(id)

Unenroll a student

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let id = 56; // Number | 
apiInstance.enrollmentsIdDelete(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## enrollmentsPost

> enrollmentsPost(enrollmentsPostRequest)

Enroll a student in an exam

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let enrollmentsPostRequest = new ExamPlatformPublicApi.EnrollmentsPostRequest(); // EnrollmentsPostRequest | 
apiInstance.enrollmentsPost(enrollmentsPostRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **enrollmentsPostRequest** | [**EnrollmentsPostRequest**](EnrollmentsPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## examsGet

> examsGet()

List all exams

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
apiInstance.examsGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## examsIdGet

> examsIdGet(id)

Get a single exam by ID

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let id = 56; // Number | 
apiInstance.examsIdGet(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## examsIdPut

> examsIdPut(id, examsIdPutRequest)

Update an exam

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let id = 56; // Number | 
let examsIdPutRequest = new ExamPlatformPublicApi.ExamsIdPutRequest(); // ExamsIdPutRequest | 
apiInstance.examsIdPut(id, examsIdPutRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 
 **examsIdPutRequest** | [**ExamsIdPutRequest**](ExamsIdPutRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## examsPost

> examsPost(examsPostRequest)

Create a new exam

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let examsPostRequest = new ExamPlatformPublicApi.ExamsPostRequest(); // ExamsPostRequest | 
apiInstance.examsPost(examsPostRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **examsPostRequest** | [**ExamsPostRequest**](ExamsPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## keysIdDelete

> keysIdDelete(id)

Revoke an API key

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let id = 56; // Number | 
apiInstance.keysIdDelete(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## keysIdLogsGet

> keysIdLogsGet(id)

Get request logs for an API key

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let id = 56; // Number | 
apiInstance.keysIdLogsGet(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## keysPost

> KeysPost200Response keysPost(keysPostRequest)

Create a new API key

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let keysPostRequest = new ExamPlatformPublicApi.KeysPostRequest(); // KeysPostRequest | 
apiInstance.keysPost(keysPostRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **keysPostRequest** | [**KeysPostRequest**](KeysPostRequest.md)|  | 

### Return type

[**KeysPost200Response**](KeysPost200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## questionsGet

> questionsGet()

List all questions

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
apiInstance.questionsGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## questionsPost

> questionsPost(questionsPostRequest)

Create a new question

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let questionsPostRequest = new ExamPlatformPublicApi.QuestionsPostRequest(); // QuestionsPostRequest | 
apiInstance.questionsPost(questionsPostRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **questionsPostRequest** | [**QuestionsPostRequest**](QuestionsPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## resultsGet

> resultsGet()

List all results

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
apiInstance.resultsGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## resultsPost

> resultsPost(resultsPostRequest)

Submit a new result

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let resultsPostRequest = new ExamPlatformPublicApi.ResultsPostRequest(); // ResultsPostRequest | 
apiInstance.resultsPost(resultsPostRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resultsPostRequest** | [**ResultsPostRequest**](ResultsPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## resultsStudentStudentIdGet

> resultsStudentStudentIdGet(studentId)

Get results for a specific student

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let studentId = 56; // Number | 
apiInstance.resultsStudentStudentIdGet(studentId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **studentId** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## webhooksGet

> webhooksGet()

List your webhook subscriptions

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
apiInstance.webhooksGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## webhooksIdDelete

> webhooksIdDelete(id)

Delete a webhook subscription

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let id = 56; // Number | 
apiInstance.webhooksIdDelete(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## webhooksPost

> webhooksPost(webhooksPostRequest)

Register a new webhook subscription

### Example

```javascript
import ExamPlatformPublicApi from 'exam_platform_public_api';
let defaultClient = ExamPlatformPublicApi.ApiClient.instance;
// Configure Bearer access token for authorization: BearerAuth
let BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new ExamPlatformPublicApi.DefaultApi();
let webhooksPostRequest = new ExamPlatformPublicApi.WebhooksPostRequest(); // WebhooksPostRequest | 
apiInstance.webhooksPost(webhooksPostRequest, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **webhooksPostRequest** | [**WebhooksPostRequest**](WebhooksPostRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

