// 全局共享数据示例
import { IAdmin } from '@/api/user';
import { useState } from 'react';

/**
 * 用户登陆信息
 * @returns
 */
const useAdmin = () => {
  const [admin, setAdmin] = useState<IAdmin | null>(null);
  return {
    admin,
    setAdmin,
  };
};

export default useAdmin;
