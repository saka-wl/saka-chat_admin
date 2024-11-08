import { enrollApi } from '@/api/user';
import { useNavigate } from '@umijs/max';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { FC } from 'react';
import './index.less';

type FieldType = {
  account: string;
  password: string;
  checkPassword: string;
  nickname: string;
};

const Enroll: FC = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    if (values.password !== values.checkPassword) {
      message.warning('前后密码不一致！');
      return;
    }
    const { code, data, msg } = await enrollApi(values);
    if (code === 200 && data >= 0) {
      message.success('注册成功');
      navigate('/login');
      return;
    }
    message.error(msg || '注册失败！');
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {};

  return (
    <div className="enroll-container">
      <h1 className="title">Enroll</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="form-content"
      >
        <Form.Item<FieldType>
          label="nickname"
          name="nickname"
          rules={[{ required: true, message: 'Please input your nickname!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="account"
          name="account"
          rules={[{ required: true, message: 'Please input your account!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="CheckPassword"
          name="checkPassword"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="link" onClick={() => navigate('/login')}>
            去登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Enroll;
