import { getLoginInfoObj, loginApi } from '@/api/user';
import { useModel, useNavigate } from '@umijs/max';
import type { FormProps } from 'antd';
import { Button, Form, Input, message } from 'antd';
import { FC } from 'react';
import './index.less';

type FieldType = {
  account: string;
  password: string;
};

const Login: FC = () => {
  const navigate = useNavigate();
  const { setAdmin } = useModel('admin');

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const { code, data, msg } = await loginApi(values);
    if (code !== 200 || !data) {
      message.warning(msg || '账号登陆失败！');
      return;
    }
    message.success('登陆成功');
    setAdmin(getLoginInfoObj(data));
    navigate('/home');
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
      <h1 className="title">Login</h1>
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

        {/* <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="link" onClick={() => navigate('/enroll')}>
            去注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
