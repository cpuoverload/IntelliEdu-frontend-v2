// @ts-ignore
/* eslint-disable */
import request from '@/services/apiClient';

/** 此处后端没有提供注释 POST /scoring/add */
export async function addScoring(body: API.AddScoringRequest, options?: { [key: string]: any }) {
  return request<API.ApiResponseBoolean>(`/api/scoring/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoring/add/me */
export async function addMyScoring(
  body: API.AddMyScoringRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseBoolean>(`/api/scoring/add/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoring/add/me/batch */
export async function addMyScoringBatch(
  body: API.AddMyScoringBatchRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseBoolean>(`/api/scoring/add/me/batch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoring/delete */
export async function deleteScoring(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.ApiResponseBoolean>(`/api/scoring/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoring/delete/me */
export async function deleteMyScoring(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.ApiResponseBoolean>(`/api/scoring/delete/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoring/doScore */
export async function doScore(body: API.DoScoreRequest, options?: { [key: string]: any }) {
  return request<API.AnswerRecord>(`/api/scoring/doScore`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoring/list */
export async function listScoring(body: API.ListScoringRequest, options?: { [key: string]: any }) {
  return request<API.ApiResponsePageScoringVo>(`/api/scoring/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoring/list/me */
export async function listMyScoring(
  body: API.ListMyScoringRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponsePageScoringVo>(`/api/scoring/list/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /scoring/test/getAppById */
export async function getAppByIdTest(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAppByIdTestParams,
  options?: { [key: string]: any },
) {
  return request<API.Application>(`/api/scoring/test/getAppById`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoring/update */
export async function updateScoring(
  body: API.UpdateScoringRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseBoolean>(`/api/scoring/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /scoring/update/me */
export async function updateMyScoring(
  body: API.UpdateMyScoringRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseBoolean>(`/api/scoring/update/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
