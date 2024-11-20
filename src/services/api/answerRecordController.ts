// @ts-ignore
/* eslint-disable */
import request from '@/services/apiClient';

/** 此处后端没有提供注释 POST /answer-record/add/me */
export async function addMyAnswerRecord(
  body: API.AddMyAnswerRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseLong>(`/api/answer-record/add/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /answer-record/delete */
export async function deleteAnswerRecord(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.ApiResponseBoolean>(`/api/answer-record/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /answer-record/get/${param0} */
export async function getAnswerRecordById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAnswerRecordByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResponseAnswerRecordVo>(`/api/answer-record/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /answer-record/list */
export async function listAnswerRecord(
  body: API.ListAnswerRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponsePageAnswerRecordVo>(`/api/answer-record/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /answer-record/list/me */
export async function listMyAnswerRecord(
  body: API.ListMyAnswerRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponsePageAnswerRecordVo>(`/api/answer-record/list/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
