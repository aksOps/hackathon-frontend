import React, { useState, useEffect } from 'react';
import {Layout, List, Typography, Empty, Divider, Space} from 'antd';
import ReactPlayer from "react-player";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

export const VideoList = () => {
    const [videos, setVideos] = useState();
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        fetch('/api/videos')
            .then(res => res.json())
            .then(data => setVideos(data));
    },);

    const handleVideoClick = (filename) => {
        setSelectedVideo(filename);
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <Layout hasSider>
            <Layout style={{ padding: '24px' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        width: "calc(100vw - 300px)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#fff"
                    }}
                >
                    {!selectedVideo ? (
                        <Empty width="100%" height="auto" description="Select a video to play" />
                    ) : (
                        <div>
                            <ReactPlayer playing={true} url={`/api/video/${selectedVideo}`} controls width="100%" height="auto"/>
                            <Title level={3}>{selectedVideo}</Title>
                        </div>
                    )}
                </Content>
            </Layout>
            <Sider
                width={300}
                className="site-layout-background"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundColor:"#fff",
                    padding:"20px"
                }}
            >
                <Title level={5} style={{marginBottom:"10px"}}>Video List</Title>
                <Divider/>
                <List
                    dataSource={videos}
                    renderItem={(video) => (
                        <List.Item key={video.filename} onClick={() => handleVideoClick(video.filename)} style={{cursor:"pointer"}}>
                            <Space direction={"vertical"}>
                                <ReactPlayer playing={false} url={`/api/video/${video.filename}`} width="100%" height="auto"/>
                                <center>{video.filename}</center>
                            </Space>
                        </List.Item>
                    )}
                />
            </Sider>
        </Layout>
    );
};