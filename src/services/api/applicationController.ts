// @ts-ignore
/* eslint-disable */
import request from '@/services/apiClient';

/** 此处后端没有提供注释 POST /application/add/me */
export async function addMyApplication(
  body: API.AddMyAppRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseLong>(`/api/application/add/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/audit */
export async function auditApplication(
  body: API.AuditAppRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseBoolean>(`/api/application/audit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/delete */
export async function deleteApplication(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.ApiResponseBoolean>(`/api/application/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/delete/me */
export async function deleteMyApplication(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.ApiResponseBoolean>(`/api/application/delete/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /application/get/${param0} */
export async function getApplicationById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getApplicationByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ApiResponseApplication>(`/api/application/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/list */
export async function listApplication(body: API.ListAppRequest, options?: { [key: string]: any }) {
  return request<API.ApiResponsePageApplicationVo>(`/api/application/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/list/me */
export async function listMyApplication(
  body: API.ListMyAppRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponsePageApplicationVo>(`/api/application/list/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/list/public */
export async function listPublicApplication(
  body: API.ListPublicAppRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponsePageApplicationVo>(`/api/application/list/public`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/update */
export async function updateApplication(
  body: API.UpdateAppRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseBoolean>(`/api/application/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /application/update/me */
export async function updateMyApplication(
  body: API.UpdateMyAppRequest,
  options?: { [key: string]: any },
) {
  return request<API.ApiResponseBoolean>(`/api/application/update/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
