// @ts-ignore
/* eslint-disable */
import request from '@/services/apiClient';

/** 此处后端没有提供注释 POST /application/question/add/me */
export async function addMyQuestion(
  body: API.AddMyQuestionRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseBoolean>(`/api/application/question/add/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /application/question/ai_generate/sse */
export async function aiGenerateQuestionSse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.aiGenerateQuestionSseParams,
  options?: { [key: string]: any },
) {
  return request<API.SseEmitter>(`/api/application/question/ai_generate/sse`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/question/delete */
export async function deleteQuestion(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.ApiResponseBoolean>(`/api/application/question/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/question/delete/me */
export async function deleteMyQuestion(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.ApiResponseBoolean>(`/api/application/question/delete/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /application/question/get/${param0} */
export async function getQuestionByAppId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionByAppIdParams,
  options?: { [key: string]: any },
) {
  const { appId: param0, ...queryParams } = params;
  return request<API.ApiResponseQuestion>(`/api/application/question/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/question/get/me */
export async function getMyQuestionOfOneApp(
  body: API.GetMyQuestionRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseQuestionVo>(`/api/application/question/get/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/question/get/public */
export async function getPublicQuestionOfOneApp(
  body: API.GetPublicQuestionRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseQuestionVo>(`/api/application/question/get/public`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/question/list */
export async function listQuestion(
  body: API.ListQuestionRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponsePageQuestionVo>(`/api/application/question/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/question/update */
export async function updateQuestion(
  body: API.UpdateQuestionRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseBoolean>(`/api/application/question/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/question/update/me */
export async function updateMyQuestion(
  body: API.UpdateMyQuestionRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseBoolean>(`/api/application/question/update/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
