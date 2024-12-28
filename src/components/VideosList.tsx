import {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Empty, Layout, List, Row, Space, Typography} from 'antd';
import ReactPlayer from "react-player";
import {useNavigate} from "react-router-dom";

const {Content} = Layout;
const {Text} = Typography;

export const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [history, setHistory] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {


        fetch('/api/video/history', {
            headers: {
                "Authentication-Info": localStorage.getItem("username")
            }
        })
            .then(res => res.json())
            .then(data => {
                setHistory(data)
            });

        fetch('/api/video/suggest', {
            headers: {
                "Authentication-Info": localStorage.getItem("username")
            }
        })
            .then(res => res.json())
            .then(data => {
                setSuggestions(data)
            });

        fetch('/api/videos', {
            headers: {
                "Authentication-Info": localStorage.getItem("username")
            }
        })
            .then(res => res.json())
            .then(data => setVideos(data));
    }, [selectedVideo]);

    const handleVideoClick = (filename: any) => {
        fetch('/api/video/history?v=' + filename, {
            method: "POST", headers: {
                "Authentication-Info": localStorage.getItem("username")
            }
        })
        setSelectedVideo(filename);
    };

    return (<>
        <Layout style={{padding: '24px'}}>
            <Content>
                <Space direction={"vertical"}>
                    <Button type="primary" onClick={() => {
                        localStorage.removeItem("username");
                        navigate("/login")
                    }}>Logout</Button>
                    <Row gutter={[24, 24]}>
                        <Col span={18}>
                            <center>
                                <Card title="Video Player" style={{
                                    textAlign: 'center', width: '100%', overflow: 'hidden'
                                }}> {/* Added overflow: hidden */}
                                    {!selectedVideo ? (<div style={{width: '100%', height: '300px'}}>
                                            <Empty description="Select a video to play"/>
                                        </div>

                                    ) : (<ReactPlayer width={'100%'} url={`/api/video/${selectedVideo}`}/>)}
                                </Card>
                            </center>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <center>
                                        <Card title="Suggestions">
                                            <List className={"scroll"}
                                                  dataSource={suggestions}
                                                  renderItem={(video) => (<List.Item key={video.filename}
                                                                                     onClick={() => handleVideoClick(video.filename)}
                                                                                     style={{cursor: "pointer"}}>
                                                      <Alert showIcon={false} message={video.filename} type="success"/>
                                                  </List.Item>)}
                                            />
                                        </Card>
                                    </center>

                                </Col>
                                <Col span={12}>
                                    <center>
                                        <Card title="History">
                                            <List
                                                className={"scroll"}
                                                dataSource={history}
                                                renderItem={(video) => (<List.Item key={video.videoName}
                                                                                   onClick={() => handleVideoClick(video.videoName)}
                                                                                   style={{cursor: "pointer"}}>
                                                    <Alert showIcon={false} message={video.videoName} type="success"/>
                                                </List.Item>)}
                                            />
                                        </Card>
                                    </center>
                                </Col>
                            </Row>

                        </Col>
                        <Col span={6}>
                            <center>
                                <Card title="Video List">
                                    <List
                                        className={'scroll'}
                                        style={{maxHeight: ' 80vh'}}
                                        dataSource={videos}
                                        renderItem={(video) => (<List.Item key={video.filename}
                                                                           onClick={() => handleVideoClick(video.filename)}
                                                                           style={{cursor: "pointer"}}>
                                            <Alert showIcon={false} message={video.filename} type="error"/>
                                        </List.Item>)}
                                    />
                                </Card>
                            </center>
                        </Col>

                    </Row>
                </Space>

            </Content>
        </Layout>
    </>);
};