import request from './index';

interface ILogin {
  account: string;
  password: string;
}

interface IResp<T> {
  code: number;
  msg: string;
  data: T;
}

interface ILoginResp {
  code: number;
  msg: string;
  data: ILoginData;
}

interface IEnrollResp {
  code: number;
  msg: string;
  data: number;
}

export interface IAdmin {
  account: string;
  id: string;
  nickname: string;
  level: number;
  avatar: string | null;
}

export type ILoginData = {
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  status: number;
  phone: string;
} & IAdmin;

export const getLoginInfoObj = (obj: ILoginData): IAdmin => {
  return {
    id: obj.id,
    account: obj.account,
    nickname: obj.nickname,
    avatar: obj.avatar,
    level: obj.level,
  };
};

export const loginApi = async (data: ILogin): Promise<ILoginResp> => {
  return await request.post('/admin/user/login', data);
};

type IEnroll = {
  nickname: string;
} & ILogin;

export const enrollApi = async (data: IEnroll): Promise<IEnrollResp> => {
  return await request.post('/admin/user/enroll', data);
};

/**
 * 自动登陆
 * @returns
 */
export const autoLoginApi = async (): Promise<ILoginResp> => {
  return await request.get('/admin/user/adminsuper/whoami');
};

export interface IPageObj {
  page: number;
  pageSize: number;
}

export interface ICondition {
  account: string;
  nickname: string;
  status: number;
}

export const getUserInfoByConditionApi = async (
  pageObj: IPageObj,
  condition: Partial<ICondition>,
): Promise<IResp<{ list: ILoginData[]; total: number }>> => {
  return await request.post('/admin/user/adminsuper/getUserInfoByCondition', {
    pageObj,
    condition,
  });
};

export const chnageUserStatusApi = async (userId: string, status: number) => {
  return await request({
    method: 'GET',
    url: '/admin/user/adminsuper/changeUserStatus',
    params: { userId, status },
  });
};
