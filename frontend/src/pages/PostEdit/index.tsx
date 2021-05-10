import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Form, Input} from "antd";

// @ts-ignore
import marked from 'marked';
import highlight from 'highlight.js';
import 'highlight.js/styles/railscasts.css';
// @ts-ignore
import SimpleMDE from 'simplemde';
import 'simplemde/dist/simplemde.min.css';
import './index.less'
import {PostPublishModal} from "@/components/PostPublishModal";


class PostEdit extends Component {

  state = {
    smde: null,
    visible: false
  }

  constructor(props: {}) {
    super(props);
  }

  componentDidMount() {
    // @ts-ignore
    this.state.smde = new SimpleMDE({
      element: document.getElementById('editor')?.childElementCount,
      autofocus: true,
      autosave: {
        enabled: true,
        uniqueId: "MyUniqueID",
        delay: 1000,
      },
      blockStyles: {
        bold: "__",
        italic: "_"
      },
      forceSync: true,
      // hideIcons: ["guide", "heading"],
      indentWithTabs: false,
      insertTexts: {
        horizontalRule: ["", "\n\n-----\n\n"],
        image: ["![](http://", ")"],
        link: ["[", "](http://)"],
        table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
      },
      lineWrapping: false,
      parsingConfig: {
        allowAtxHeaderWithoutSpace: true,
        strikethrough: false,
        underscoresBreakWords: true,
      },
      placeholder: "Type here...",
      previewRender: function (plainText: any) {
        return marked(plainText, {
          renderer: new marked.Renderer(),
          gfm: true,
          pedantic: false,
          sanitize: false,
          tables: true,
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight(code: string) {
            return highlight.highlightAuto(code).value;
          },
        });
      },
      promptURLs: true,
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
      },
      shortcuts: {
        drawTable: "Cmd-Alt-T"
      },
      showIcons: ["code", "table"],
      spellChecker: false,
      status: ["autosave", "lines", "words", "cursor"], // Optional usage
      styleSelectedText: false,
      tabSize: 4,
      toolbarTips: false,
    });
  }


  render() {
    return (
      <>
        <Card>
          <Form
            onFinish={(values) => console.log(values)}
          >
            <div>
              <Form.Item label="文章标题" name="title" style={{display: 'inline-flex', width: 'calc(90% - 4px)'}}>
                <Input allowClear/>
              </Form.Item>
              <Form.Item style={{display: 'inline-flex', marginLeft: '4px', width: 'calc(10% - 4px)'}}>
                <Button type="primary" style={{width: '100%'}}
                        onClick={() => this.setState({visible: true})}>发布</Button>
              </Form.Item>
            </div>
            <Form.Item name="content">
              <Input.TextArea id="editor"/>
            </Form.Item>

          </Form>
        </Card>
        <PostPublishModal visible={this.state.visible} onCancel={() => this.setState({visible: false})}
                          onOk={() => {
                            this.setState({visible: false})
                          }}/>
      </>
    );
  }
}

// @ts-ignore
PostEdit.propTypes = {};

export default PostEdit;
