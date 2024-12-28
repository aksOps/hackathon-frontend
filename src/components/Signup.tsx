import {useState} from 'react';
import {Button, Form, Input, message} from 'antd';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values:any) => {
        setLoading(true);
        try {
            const response = await fetch('/api/signup', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(values),
            });

            if (response.status === 201) {
                message.success('Signup successful. Please login');
                navigate('/login');
            } else if (response.status === 208) {
                await response.text();
                message.warning('User Already exists. Please login instead');
                navigate("/login")
            } else {
                await response.text();
                message.error('Signup failed');
            }
        } catch (error) {
            message.error('An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    return (<div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
        }}>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                initialValues={{remember: true}}
                onFinish={onFinish}
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

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </div>);
};

export default Signup;