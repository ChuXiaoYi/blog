import React from "react"
import './index.less'
import {Avatar, Card, Col, List, Row, Space, Tag} from "antd";
import {MessageOutlined, LikeOutlined, StarOutlined, GithubOutlined, createFromIconfontCN} from '@ant-design/icons';
import Wordcloud from "@/components/WordCloud";
import {history} from "umi";


const listData: any[] | undefined = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({icon, text}: { icon: any, text: any }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


export default function PostList() {


  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2531977_xy9265niq7.js',
  });

  return (
    <Row gutter={[16, 16]}>
      <Col span={18}>
        <Card>
          <List
            itemLayout="vertical"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 5,
            }}
            dataSource={listData}
            renderItem={item => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
                  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                ]}

              >
                <List.Item.Meta
                  avatar={<Avatar src={"avatar.gif"}/>}
                  title={<a onClick={() => {
                    history.push(`/post/detail?id=${1}`)
                  }}><Tag color="volcano">python</Tag>{item.title}</a>}
                />
                {item.content}
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card className="userCard" style={{fontSize: '20px'}}>
          <Avatar size='large' src={"avatar.gif"}/>
          <div style={{margin: '20px 0 10px 0'}}>
            <span>一只路过的小码农</span>
          </div>
          <div>
            <Space>
              <IconFont className="userIcon" type="icon-wechat"/>
              <IconFont className="userIcon" type="icon-csdn"/>
              <IconFont className="userIcon" type="icon-QQ"/>
              <IconFont className="userIcon" type="icon-email"/>
              <IconFont className="userIcon" type="icon-GitHub"/>
            </Space>
          </div>
          <div style={{marginTop: '10px'}}>
            <dl>
              <dt>39</dt>
              <dd>文章</dd>
            </dl>
          </div>
        </Card>
        <Card title="分类专栏">
          <List size="small" split={false} style={{fontSize: '16px'}}
                dataSource={[{name: '分类1', count: 10}, {name: '分类2', count: 10},]}
                renderItem={(item) => (
                  <List.Item onClick={() => console.log(item.name)} style={{cursor: 'pointer'}}>
                    <div>{item.name}</div>
                    <div>{item.count}</div>
                  </List.Item>
                )}
          />
        </Card>
        <Card style={{marginTop: '20px'}}
              title="标签云"
        >
          <Wordcloud/>
        </Card>
      </Col>
    </Row>
  );
}
