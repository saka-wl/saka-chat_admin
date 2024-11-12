import { chnageUserStatusApi, getUserInfoByConditionApi } from '@/api/user';
import type { TableProps } from 'antd';
import { message, Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';

interface DataType {
  id: string;
  account: string;
  nickname: string;
  phone: string;
  status: number;
}

const LoginControl = () => {
  const [tableQuery, setTableQuery] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<DataType[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const { code, msg, data } = await getUserInfoByConditionApi(tableQuery, {});
    if (code !== 200) {
      setLoading(false);
      message.warning(msg || '获取失败！');
      return;
    }
    const { list, total } = data;
    setTableData(
      list.map((it) => ({
        id: it.id,
        account: it.account,
        nickname: it.nickname,
        phone: it.phone,
        status: it.status,
      })),
    );
    setTableQuery({
      ...tableQuery,
      total: total,
    });
    message.success('获取成功');
    setLoading(false);
  };

  const handleStatusChange = async (userId: string, status: number) => {
    await chnageUserStatusApi(userId, status);
    await fetchData();
    message.success('操作成功');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'UserId',
      dataIndex: 'id',
      key: 'id',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: 'Nickname',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (value) => {
        const color = value === 0 ? 'red' : 'green';
        const text = value === 0 ? '封禁' : '正常';
        return (
          <>
            <Tag color={color}>{text}</Tag>
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { status, id }) => {
        const text = status === 0 ? '解封' : '封禁';
        const resultStatus = status === 0 ? 1 : 0;
        return (
          <Space size="middle">
            <a onClick={() => handleStatusChange(id, resultStatus)}>{text}</a>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Table<DataType>
        loading={loading}
        columns={columns}
        dataSource={tableData}
        pagination={tableQuery}
      />
    </div>
  );
};

export default LoginControl;
