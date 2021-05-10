// @flow
import * as React from 'react';
import {Checkbox, Form, Modal, Radio, Tag} from "antd";
import EditableTagGroup from "@/components/PostPublishModal/EditableTagGroup";
import './index.less'

type Props = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
};
export const PostPublishModal = (props: Props) => {

  const {visible, onCancel, onOk} = props

  return (
    <Modal visible={visible} onOk={onOk} onCancel={onCancel} title="发布文章"
           okText="发布"
           destroyOnClose
    >
      <Form>
        <Form.Item label="文章标签" name="tag">
          <EditableTagGroup/>
        </Form.Item>
        <Form.Item label="文章分类" name="category">
          <EditableTagGroup/>
          <Form.Item className="categoryCheckBox">
            <Checkbox.Group>
              <Checkbox value='python'>python</Checkbox>
              <Checkbox value='fastapi'>fastapi</Checkbox>
              <Checkbox value='fastapi1'>fastapi</Checkbox>
              <Checkbox value='fastapi2'>fastapi</Checkbox>
              <Checkbox value='fastapi3'>fastapi</Checkbox>
              <Checkbox value='fastapi4'>fastapi</Checkbox>
              <Checkbox value='fastapi5'>fastapi</Checkbox>
              <Checkbox value='fastapi6'>fastapi</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form.Item>
        <Form.Item label="发布形式" name="publish_type">
          <Radio.Group>
            <Radio value='0'>公开</Radio>
            <Radio value='1'>私密</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
