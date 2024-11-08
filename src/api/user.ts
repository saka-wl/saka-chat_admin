import request from './index';

interface ILogin {
  account: string;
  password: string;
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

type ILoginData = {
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
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
