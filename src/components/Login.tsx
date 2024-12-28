import {useState} from 'react';
import {Button, Checkbox, Drawer, Form, Input, message, Space} from 'antd';
import Signup from "./Signup.tsx";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [signup, setSignup] = useState(false);
    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            fetch('/api/login', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(values),
            }).then(value => {
                if (value.ok) {
                    message.success('Login successful');
                    value.text().then(data => {
                        localStorage.setItem('username', data);
                        window.location.reload();
                    })
                }
            })
        } catch (error) {
            message.error('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (<div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
    }}> {/* Center the form */}
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            style={{width: "400px"}}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Space>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="default" onClick={() => {
                        setSignup(true)
                    }} loading={loading}>
                        Signup
                    </Button>
                </Form.Item>
            </Space>

        </Form>
        <Drawer placement={'right'} title="Signup" open={signup} onClose={() => {
            setSignup(false)
        }}>
            <Signup/>
        </Drawer>
    </div>);
};

export default Login;