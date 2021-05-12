// @flow
import * as React from 'react';
import {Affix, Anchor, Avatar, Badge, Button, Card, Col, Comment, Divider, Row, Space, Tag, Typography} from "antd";

// @ts-ignore
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/railscasts.css';
import './index.less'

import {createFromIconfontCN, EyeOutlined} from "@ant-design/icons";
import Tocify from "@/pages/PostDetail/tocify";
import PostComment from "@/components/PostComment";
import {history} from "umi";
import {IconFont} from "@/components/IconFont";

const post = {
  content: "参考文档:\n" +
    "- [官方文档](https://apscheduler.readthedocs.io/en/latest/userguide.html)\n" +
    "- [python定时任务最强框架APScheduler详细教程](https://zhuanlan.zhihu.com/p/144506204)\n" +
    "- [https://www.cnblogs.com/zhangliang91/p/12468871.html](https://www.cnblogs.com/zhangliang91/p/12468871.html)\n" +
    "\n" +
    "## 基本介绍\n" +
    "\n" +
    "APScheduler(Advanced Python Scheduler)是一个python的任务调度器，他可以使任务定期执行，同时我们可以动态的添加或删除任务。如果我们希望任务在下次程序启动时继续执行，那么他还支持持久化任务。除此之外，他也是跨平台的。需要注意的是，APScheduler并不是一个守护进程或单独服务，他是依托于现有服务或程序运行。\n" +
    "\n" +
    "## 安装\n" +
    "```python\n" +
    "pip install apscheduler\n" +
    "```\n" +
    "或\n" +
    "```python\n" +
    "poetry add apscheduler\n" +
    "```\n" +
    "\n" +
    "## 快速开始\n" +
    "```python\n" +
    "from apscheduler.schedulers.blocking import BlockingScheduler\n" +
    "from datetime import datetime\n" +
    "\n" +
    "\n" +
    "def job():\n" +
    "    print(f\"{datetime.now()}执行了\")\n" +
    "\n" +
    "\n" +
    "if __name__ == '__main__':\n" +
    "    scheduler = BlockingScheduler()\n" +
    "    scheduler.add_job(func=job, trigger='interval', seconds=3)\n" +
    "    scheduler.start()\n" +
    " ```\n" +
    " 这个栗子做了一件事：每三秒执行一次任务。\n" +
    "首先，初始化调度器，这里的BlockingScheduler是阻塞性的调度器，当调用start方法时，会阻塞当前进程；然后，向调度器中添加任务，这里的任务是job方法，每执行一次任务会打印文字；这里采用的是interval(间隔执行)的方式，每三秒执行一次\n" +
    "\n" +
    "## 组件\n" +
    "\n" +
    "APScheduler具有四个基本组件：\n" +
    "- **triggers**（触发器）：包含调度逻辑。每个作业都有自己的触发器，该触发器确定下一步应在何时运行该作业。除了其初始配置外，触发器完全是无状态的。\n" +
    "- **job stores**（任务存储器）：任务存储器是可以存储任务的地方，默认情况下任务保存在内存，也可将任务保存在各种数据库中。任务存储进去后，会进行序列化，然后也可以反序列化提取出来，继续执行。\n" +
    "- **executors**（执行器）：执行器会将任务放到进程或线程中执行，任务执行完成后，执行程序会通知调度器，然后触发一些事件\n" +
    "- **schedulers**（调度器）：任务调度器是属于整个调度的总指挥官。他会合理安排作业存储器、执行器、触发器进行工作，并进行添加和删除任务等。调度器通常是只有一个的。\n" +
    "![在这里插入图片描述](https://img-blog.csdnimg.cn/2020121715471558.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MDE1NjQ4Nw==,size_16,color_FFFFFF,t_70)\n" +
    "\n" +
    "### 调度器\n" +
    "\n" +
    "APScheduler有很多调度器，不同的调度器适合不同的环境：\n" +
    "- **BlockingScheduler**：适用于当前进程只有这一个调度器在工作\n" +
    "- **BackgroundScheduler**：适用于在程序后台运行\n" +
    "- **AsyncIOScheduler**：适用于使用了asyncio的模块\n" +
    "- **GeventScheduler**：适用于使用了gevent的模块\n" +
    "- **TornadoScheduler**：适用于用tornado构建的应用\n" +
    "- **TwistedScheduler**：适用于用twisted构建的应用\n" +
    "- **QtScheduler**：适用于构建QT应用\n" +
    "### 任务存储器\n" +
    "任务存储器的选择取决于是否需要任务持久化。如果每次任务启动的时候都重新创建任务，那么可以使用内存存储器(MemoryJobStore)。如果需要任务持久化，可以使用和项目匹配的数据库存储器，这样即使是程序崩溃，重启后任务依旧可以继续执行。存储器可以有以下几种：\n" +
    "- **MemoryJobStore**：任务保存在内存中\n" +
    "- **SQLAlchemyJobStore**：使用sqlalchemy作为存储框架，官方建议数据库使用PostgreSQL\n" +
    "- **MongoDBJobStore**：使用 mongodb作为存储器\n" +
    "- **RedisJobStore**：使用 redis作为存储器\n" +
    "### 执行器\n" +
    "执行器的选择取决于程序使用了什么框架，默认情况下使用ThreadPoolExecutor。如果任务涉及了计算密集型操作，可以考虑使用ProcessPoolExecutor。APScheduler针对不同的程序或架构，有以下几种执行器：\n" +
    "- **ThreadPoolExecutor**：线程池执行器；\n" +
    "- **ProcessPoolExecutor**：进程池执行器；\n" +
    "- **GeventExecutor**： Gevent程序执行器；\n" +
    "- **TornadoExecutor**： Tornado程序执行器；\n" +
    "- **TwistedExecutor**： Twisted程序执行器；\n" +
    "- **AsyncIOExecutor**： asyncio程序执行器；\n" +
    "### 触发器\n" +
    "APScheduler内置了三种触发器：\n" +
    "- **date**：特定时间仅运行一次\n" +
    "- **interval**：固定时间间隔运行\n" +
    "- **cron**：某个时间周期运行\n" +
    "\n" +
    "## 构建调度程序\n" +
    "\n" +
    "### 构建调度器\n" +
    "假设构建一个使用默认存储器和默认执行器的阻塞调度器：\n" +
    "```python\n" +
    "from apscheduler.schedulers.blocking import BlockingScheduler\n" +
    "scheduler = BlockingScheduler()\n" +
    "```\n" +
    "通过查看源码可以发现，默认存储器使用的是MemoryJobStore，默认执行器使用的是ThreadPoolExecutor\n" +
    "\n" +
    "除了默认的配置，APScheduler也提供了许多不同的方式来配置调度器。假设现在我们希望构造一个：\n" +
    "- 一个名为“ redis”的MemoryJobStore\n" +
    "- 一个名为“ default”的RedisJobStore\n" +
    "- 一个名为“ default”的ThreadPoolExecutor，其最大线程数为20\n" +
    "- 一个名为“ processpool”的ProcessPoolExecutor，其最大进程数为5\n" +
    "- UTC作为调度程序的时区\n" +
    "- 默认情况下，对新作业关闭合并\n" +
    "- 新作业的默认最大实例限制为3\n" +
    "方法一：\n" +
    "```python\n" +
    "from pytz import utc\n" +
    "\n" +
    "from apscheduler.schedulers.background import BackgroundScheduler\n" +
    "from apscheduler.jobstores.redis import RedisJobStore\n" +
    "from apscheduler.jobstores.memory import MemoryJobStore\n" +
    "from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor\n" +
    "\n" +
    "\n" +
    "jobstores = {\n" +
    "    'redis': RedisJobStore(),\n" +
    "    'default': MemoryJobStore()\n" +
    "}\n" +
    "executors = {\n" +
    "    'default': ThreadPoolExecutor(20),\n" +
    "    'processpool': ProcessPoolExecutor(5)\n" +
    "}\n" +
    "job_defaults = {\n" +
    "    'coalesce': False,\n" +
    "    'max_instances': 3\n" +
    "}\n" +
    "scheduler = BackgroundScheduler(jobstores=jobstores, executors=executors, job_defaults=job_defaults, timezone=utc)\n" +
    "```\n" +
    "方法二：\n" +
    "```python\n" +
    "scheduler = BackgroundScheduler({\n" +
    "    'apscheduler.jobstores.redis': {\n" +
    "        'type': 'redis',\n" +
    "        'url': ''\n" +
    "    },\n" +
    "    'apscheduler.jobstores.default': {\n" +
    "        'type': 'memory'\n" +
    "    },\n" +
    "    'apscheduler.executors.default': {\n" +
    "        'class': 'apscheduler.executors.pool:ThreadPoolExecutor',\n" +
    "        'max_workers': '20'\n" +
    "    },\n" +
    "    'apscheduler.executors.processpool': {\n" +
    "        'type': 'processpool',\n" +
    "        'max_workers': '5'\n" +
    "    },\n" +
    "    'apscheduler.job_defaults.coalesce': 'false',\n" +
    "    'apscheduler.job_defaults.max_instances': '3',\n" +
    "    'apscheduler.timezone': 'UTC',\n" +
    "})\n" +
    "```\n" +
    "方法三：\n" +
    "```python\n" +
    "from pytz import utc\n" +
    "\n" +
    "from apscheduler.schedulers.background import BackgroundScheduler\n" +
    "from apscheduler.jobstores.redis import RedisJobStore\n" +
    "from apscheduler.executors.pool import ProcessPoolExecutor\n" +
    "\n" +
    "jobstores = {\n" +
    "    'redis': RedisJobStore(),\n" +
    "    'default': {'type': 'memory'}\n" +
    "}\n" +
    "executors = {\n" +
    "    'default': {'type': 'threadpool', 'max_workers': 20},\n" +
    "    'processpool': ProcessPoolExecutor(max_workers=5)\n" +
    "}\n" +
    "job_defaults = {\n" +
    "    'coalesce': False,\n" +
    "    'max_instances': 3\n" +
    "}\n" +
    "scheduler = BackgroundScheduler()\n" +
    "scheduler.configure(jobstores=jobstores, executors=executors, job_defaults=job_defaults, timezone=utc)\n" +
    "```\n" +
    "### 启动调度器\n" +
    "除了BlockingScheduler，其他调度器启动后会立即返回，继续执行程序其他操作\n" +
    "```python\n" +
    "scheduler.start()\n" +
    "```\n" +
    "### 添加任务\n" +
    "APScheduler支持两种添加任务的方式：\n" +
    "- 调用`add_job()`\n" +
    "调用add_job方法之后，会返回`apscheduler.job.Job`对象，这个对象可以用来更新或删除\n" +
    "```python\n" +
    "scheduler.add_job(func=job, trigger='interval', seconds=3)\n" +
    "```\n" +
    "- 使用`scheduled_job()`装饰器\n" +
    "```python\n" +
    "@scheduler.scheduled_job(trigger='interval', seconds=3)\n" +
    "def job():\n" +
    "    print(f\"{datetime.now()}执行了\")\n" +
    "```\n" +
    "我们可以在任何时候安排工作给调度器，如果添加工作的时候调度器还木有启动，那么工作会暂停，并在调度器开始工作后才开始\n" +
    "### 删除任务\n" +
    "- 调用`remove()` \n" +
    "```python\n" +
    "job = scheduler.add_job(job, 'interval', minutes=2)\n" +
    "job.remove()\n" +
    "```\n" +
    "- 调用`remove_job()`\n" +
    "```python\n" +
    "scheduler.add_job(job, 'interval', minutes=2, id='my_job_id')\n" +
    "scheduler.remove_job('my_job_id')\n" +
    "```\n" +
    "### 暂停和恢复任务\n" +
    "暂停：\n" +
    "- `apscheduler.job.Job.pause()`\n" +
    "- `apscheduler.schedulers.base.BaseScheduler.pause_job()`\n" +
    "\n" +
    "恢复：\n" +
    "- `apscheduler.job.Job.resume()`\n" +
    "- `apscheduler.schedulers.base.BaseScheduler.resume_job()`\n" +
    "### 更新任务\n" +
    "- `modify_job()`\n" +
    "- `apscheduler.job.Job.modify()`\n" +
    "- `reschedule_job()`\n" +
    "- `apscheduler.job.Job.reschedule()`\n" +
    "### 关闭调度程序\n" +
    "```python\n" +
    "scheduler.shutdown()\n" +
    "```\n" +
    "默认情况下，调度程序关闭其作业存储和执行程序，并等待直到所有当前正在执行的作业完成。如果不想等待，可以执行以下操作：\n" +
    "```python\n" +
    "scheduler.shutdown(wait=False)\n" +
    "```\n" +
    "## APScheduler和fastapi实战\n" +
    "```python\n" +
    "import datetime\n" +
    "import uvicorn\n" +
    "from fastapi import FastAPI, Body\n" +
    "from apscheduler.schedulers.background import BackgroundScheduler\n" +
    "from apscheduler.jobstores.redis import RedisJobStore\n" +
    "from apscheduler.executors.pool import ThreadPoolExecutor\n" +
    "\n" +
    "app = FastAPI(title='fast-api')\n" +
    "\n" +
    "scheduler = None\n" +
    "\n" +
    "\n" +
    "def job(job_id=None):\n" +
    "    print(f\"{datetime.datetime.now()}执行了{job_id}\")\n" +
    "\n" +
    "\n" +
    "@app.on_event('startup')\n" +
    "def init_scheduler():\n" +
    "    \"\"\"初始化\"\"\"\n" +
    "    redis_job_store = RedisJobStore(host='127.0.0.1', port='6379')\n" +
    "    executor = ThreadPoolExecutor()\n" +
    "\n" +
    "    jobstores = {\n" +
    "        'default': redis_job_store\n" +
    "    }\n" +
    "    executors = {\n" +
    "        'default': executor,\n" +
    "    }\n" +
    "    job_defaults = {\n" +
    "        'coalesce': True,\n" +
    "        'max_instance': 1\n" +
    "    }\n" +
    "\n" +
    "    global scheduler\n" +
    "    scheduler = BackgroundScheduler()\n" +
    "    scheduler.configure(jobstores=jobstores, executors=executors, job_defaults=job_defaults)\n" +
    "    scheduler.add_job(job, 'interval', seconds=3)\n" +
    "    print(\"启动调度器...\")\n" +
    "    scheduler.start()\n" +
    "\n" +
    "\n" +
    "@app.post('/add-job')\n" +
    "async def add_job(job_id: str = Body(...)):\n" +
    "    \"\"\"添加job\"\"\"\n" +
    "    scheduler.add_job(id=job_id, func=job, args=(job_id,), trigger='interval', seconds=2)\n" +
    "    return {\"msg\": \"success!\"}\n" +
    "\n" +
    "\n" +
    "@app.post('/remove-job')\n" +
    "async def remove_job(job_id: str = Body(..., embed=True)):\n" +
    "    \"\"\"移除job\"\"\"\n" +
    "    scheduler.remove_job(job_id)\n" +
    "    return {\"msg\": \"success!\"}\n" +
    "\n" +
    "\n" +
    "if __name__ == '__main__':\n" +
    "    uvicorn.run(app, host='127.0.0.1', port=5566)\n" +
    "```\n" +
    "项目启动后，可以看到调度器开始工作，并开始执行任务\n" +
    "![在这里插入图片描述](https://img-blog.csdnimg.cn/20201217155259313.png)\n" +
    "这时添加一个job_id=1的任务，可以看到两个任务在执行\n" +
    "\n" +
    "![在这里插入图片描述](https://img-blog.csdnimg.cn/20201217155306332.png)\n" +
    "删除job_id=1的任务，可以看到只剩下一个任务在执行\n" +
    "![在这里插入图片描述](https://img-blog.csdnimg.cn/20201217155321258.png)\n" +
    "\n" +
    "\n"
}

type Props = {};

const ExampleComment = ({children}: {children?: any}) => (
  <Comment
    actions={[<span key="comment-nested-reply-to">回复</span>]}
    author={<a>吃瓜群众</a>}
    avatar={
      <Avatar
        src="avatar.gif"
        alt="吃瓜群众"
      />
    }
    content={
      <p>
        这是一个评论
      </p>
    }
  >
    {children}
  </Comment>
);

const PostDetail = (props: Props) => {

  const tocify = new Tocify();
  const renderer = new marked.Renderer();
  renderer.heading = (text: any, level: any, raw: any) => {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    smartLists: true,
    smartypants: true,
    highlight: function (code: string) {
      return hljs.highlightAuto(code).value;
    },
  });

  const html = marked(post.content)


  return (
    <Row gutter={8}>
      <Col span={5}>
        <Affix offsetTop={70}>
          <Card title={'目录'}>
            {tocify && tocify.render()}
          </Card>
        </Affix>
      </Col>
      <Col span={18}>
        <Card>
          <div style={{textAlign: 'center'}}>
            <Typography.Title>apScheduler和fastapi交互</Typography.Title>
            <Space>
              <span>2020-12-17 15:55:50</span>
              <span><EyeOutlined/>1000</span>
            </Space>
            <div style={{marginTop: '10px'}}>
              <span>文章分类: <Tag>fastapi</Tag></span>
            </div>
          </div>
          <Divider/>
          <Typography>
            <div
              id="content"
              className="article-detail"
              dangerouslySetInnerHTML={{
                __html: html
              }}
            />
          </Typography>
        </Card>
        <Card id="Comment" style={{marginTop: '10px'}}>
          <PostComment/>
        </Card>
        <Card title="评论" style={{marginTop: '10px'}}>
          <ExampleComment>
            <ExampleComment>
              <ExampleComment/>
              <ExampleComment/>
            </ExampleComment>
          </ExampleComment>
        </Card>
      </Col>
      <Col span={1}>
        <Affix offsetTop={70}>
          <div className="opt">
            <Badge className="optHeader" count={5}>
              <Button icon={<IconFont className="optIcon" type="icon-dianzan_active-copy-copy"/>}/>
            </Badge>
          </div>
          <div className="opt">
            <Badge className="optHeader" count={5}>
              <Button icon={<IconFont className="optIcon" type="icon-shoucang-copy"/>}/>
            </Badge>
          </div>
          <div className="opt">
            <Badge className="optHeader" count={5}>
              <Anchor>
                <Anchor.Link className="commentLink" href="#Comment"
                             title={<Button icon={<IconFont className="optIcon" type="icon-pinglun"/>}/>}>
                </Anchor.Link>
              </Anchor>
            </Badge>
          </div>
          <div className="opt">
            <Button icon={<IconFont className="optIcon" type="icon-bianji"/>}
                    onClick={()=>history.push(`/post/edit?id=1`)}
            />
          </div>
        </Affix>
      </Col>
    </Row>
  );
};

export default PostDetail
