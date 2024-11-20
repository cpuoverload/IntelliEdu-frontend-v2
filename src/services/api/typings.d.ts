declare namespace API {
  type AddMyAnswerRequest = {
    appId?: number;
    answers?: string[];
  };

  type AddMyAppRequest = {
    appName?: string;
    description?: string;
    imageUrl?: string;
    type?: number;
    strategy?: number;
  };

  type AddMyQuestionRequest = {
    questions?: QuestionContent[];
    appId?: number;
  };

  type AddMyScoringBatchRequest = {
    scorings?: AddMyScoringRequest[];
  };

  type AddMyScoringRequest = {
    appId?: number;
    resultName?: string;
    resultDetail?: string;
    resultImageUrl?: string;
    resultThreshold?: number;
    resultAttributes?: string[];
  };

  type AddScoringRequest = {
    appId?: number;
    resultName?: string;
    resultDetail?: string;
    resultImageUrl?: string;
    resultThreshold?: number;
    resultAttributes?: string[];
  };

  type AddUserRequest = {
    username?: string;
    password?: string;
    nickname?: string;
    avatar?: string;
    role?: string;
  };

  type aiGenerateQuestionSseParams = {
    appId: number;
    questionNumber: number;
    optionNumber: number;
  };

  type AnswerRecord = {
    id?: number;
    userId?: number;
    appId?: number;
    appType?: number;
    strategy?: number;
    answers?: string[];
    resultId?: number;
    resultName?: string;
    resultDetail?: string;
    resultImageUrl?: string;
    resultGrade?: number;
    createTime?: string;
    updateTime?: string;
    deleted?: number;
  };

  type AnswerRecordVo = {
    id?: number;
    userId?: number;
    appId?: number;
    appType?: number;
    strategy?: number;
    answers?: string[];
    resultId?: number;
    resultName?: string;
    resultDetail?: string;
    resultImageUrl?: string;
    resultGrade?: number;
    createTime?: string;
    updateTime?: string;
  };

  type ApiResponseAnswerRecordVo = {
    code?: number;
    data?: AnswerRecordVo;
    message?: string;
  };

  type ApiResponseApplication = {
    code?: number;
    data?: Application;
    message?: string;
  };

  type ApiResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type ApiResponseLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type ApiResponsePageAnswerRecordVo = {
    code?: number;
    data?: PageAnswerRecordVo;
    message?: string;
  };

  type ApiResponsePageApplicationVo = {
    code?: number;
    data?: PageApplicationVo;
    message?: string;
  };

  type ApiResponsePageQuestionVo = {
    code?: number;
    data?: PageQuestionVo;
    message?: string;
  };

  type ApiResponsePageScoringVo = {
    code?: number;
    data?: PageScoringVo;
    message?: string;
  };

  type ApiResponsePageUserVo = {
    code?: number;
    data?: PageUserVo;
    message?: string;
  };

  type ApiResponseQuestion = {
    code?: number;
    data?: Question;
    message?: string;
  };

  type ApiResponseQuestionVo = {
    code?: number;
    data?: QuestionVo;
    message?: string;
  };

  type ApiResponseUserVo = {
    code?: number;
    data?: UserVo;
    message?: string;
  };

  type Application = {
    id?: number;
    appName?: string;
    description?: string;
    imageUrl?: string;
    type?: number;
    strategy?: number;
    userId?: number;
    auditStatus?: number;
    auditorId?: number;
    auditMessage?: string;
    auditTime?: string;
    createTime?: string;
    updateTime?: string;
    deleted?: number;
  };

  type ApplicationVo = {
    id?: number;
    appName?: string;
    description?: string;
    imageUrl?: string;
    type?: number;
    strategy?: number;
    userId?: number;
    auditStatus?: number;
    auditorId?: number;
    auditMessage?: string;
    auditTime?: string;
    createTime?: string;
    updateTime?: string;
    userVo?: UserVo;
  };

  type AuditAppRequest = {
    id?: number;
    auditStatus?: number;
    auditMessage?: string;
  };

  type DoScoreRequest = {
    application?: Application;
    answerList?: string[];
  };

  type getAnswerRecordByIdParams = {
    id: number;
  };

  type getAppByIdTestParams = {
    id: number;
  };

  type getApplicationByIdParams = {
    id: number;
  };

  type GetMyQuestionRequest = {
    appId?: number;
  };

  type GetPublicQuestionRequest = {
    appId?: number;
  };

  type getQuestionByAppIdParams = {
    appId: number;
  };

  type getUserByIdParams = {
    id: number;
  };

  type IdRequest = {
    id?: number;
  };

  type ListAnswerRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    isAscend?: boolean;
    id?: number;
    userId?: number;
    appId?: number;
    appType?: number;
    strategy?: number;
    resultId?: number;
    resultGrade?: number;
  };

  type ListAppRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    isAscend?: boolean;
    id?: number;
    appName?: string;
    type?: number;
    strategy?: number;
    userId?: number;
    auditStatus?: number;
    auditorId?: number;
  };

  type ListMyAnswerRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    isAscend?: boolean;
  };

  type ListMyAppRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    isAscend?: boolean;
    id?: number;
  };

  type ListMyScoringRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    isAscend?: boolean;
    appId?: number;
  };

  type ListPublicAppRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    isAscend?: boolean;
    appName?: string;
  };

  type ListQuestionRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    isAscend?: boolean;
    id?: number;
    appId?: number;
    userId?: number;
  };

  type ListScoringRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    isAscend?: boolean;
    appId?: number;
  };

  type ListUserRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    isAscend?: boolean;
    id?: number;
    username?: string;
    nickname?: string;
    role?: string;
  };

  type Option = {
    key?: string;
    value?: string;
    grade?: number;
    evaluation?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageAnswerRecordVo = {
    records?: AnswerRecordVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageApplicationVo = {
    records?: ApplicationVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageQuestionVo = {
    records?: QuestionVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageScoringVo = {
    records?: ScoringVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserVo = {
    records?: UserVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type Question = {
    id?: number;
    questions?: QuestionContent[];
    appId?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    deleted?: number;
  };

  type QuestionContent = {
    title?: string;
    options?: Option[];
  };

  type QuestionVo = {
    id?: number;
    questions?: QuestionContent[];
    appId?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
  };

  type RegisterRequest = {
    username?: string;
    password?: string;
  };

  type ScoringVo = {
    id?: number;
    appId?: number;
    resultName?: string;
    resultDetail?: string;
    resultImageUrl?: string;
    resultThreshold?: number;
    resultAttributes?: string[];
    userId?: number;
    createTime?: string;
    updateTime?: string;
  };

  type SseEmitter = {
    timeout?: number;
  };

  type UpdateAppRequest = {
    id?: number;
    appName?: string;
    description?: string;
    imageUrl?: string;
  };

  type UpdateMyAppRequest = {
    id?: number;
    appName?: string;
    description?: string;
    imageUrl?: string;
    type?: number;
    strategy?: number;
  };

  type UpdateMyInfoRequest = {
    password?: string;
    nickname?: string;
    avatar?: string;
  };

  type UpdateMyQuestionRequest = {
    id?: number;
    questions?: QuestionContent[];
  };

  type UpdateMyScoringRequest = {
    id?: number;
    appId?: number;
    resultName?: string;
    resultDetail?: string;
    resultImageUrl?: string;
    resultThreshold?: number;
    resultAttributes?: string[];
  };

  type UpdateQuestionRequest = {
    id?: number;
    questions?: QuestionContent[];
  };

  type UpdateScoringRequest = {
    id?: number;
    appId?: number;
    resultName?: string;
    resultDetail?: string;
    resultImageUrl?: string;
    resultThreshold?: number;
    resultAttributes?: string[];
  };

  type UpdateUserRequest = {
    id?: number;
    password?: string;
    nickname?: string;
    avatar?: string;
    role?: string;
  };

  type UserVo = {
    id?: number;
    username?: string;
    nickname?: string;
    avatar?: string;
    role?: string;
    createTime?: string;
    updateTime?: string;
  };
}
