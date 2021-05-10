import React from 'react';
// @ts-ignore
import _ from 'lodash';
import {
  Chart,
  Geom,
  Tooltip,
  Coordinate,
  Legend,
  Axis,
  Interaction,
  G2,
  registerShape
} from "bizcharts";
import DataSet from "@antv/data-set";

// 给point注册一个词云的shape

function getTextAttrs(cfg: any) {
  return _.assign(
    {},
    cfg.style,
    {
      fontSize: cfg.data.size,
      text: cfg.data.text,
      textAlign: 'center',
      fontFamily: cfg.data.font,
      fill: cfg.color,
      textBaseline: 'Alphabetic'
    }
  );
}
registerShape("point", "cloud", {
  draw(cfg, container) {
    // console.log('cloud cfg', cfg);
    const attrs = getTextAttrs(cfg);
    const textShape = container.addShape("text", {
      attrs: _.assign(attrs, {
        x: cfg.x,
        y: cfg.y
      })
    });
    // @ts-ignore
    if (cfg.data.rotate) {
      // @ts-ignore
      G2.Util.rotate(textShape, cfg.data.rotate * Math.PI / 180);
    }
    return textShape;
  }
});
const data = [
  {
    "x": "China",
    "value": 1383220000,
    "category": "asia"
  }, {
    "x": "India",
    "value": 1316000000,
    "category": "asia"
  }, {
    "x": "United States",
    "value": 324982000,
    "category": "america"
  }, {
    "x": "Indonesia",
    "value": 263510000,
    "category": "asia"
  }, {
    "x": "Brazil",
    "value": 207505000,
    "category": "america"
  }];



class Wordcloud extends React.Component {
  render() {
    const dv = new DataSet.View().source(data);
    const range = dv.range('value');
    const min = range[0];
    const max = range[1];
    dv.transform({
      type: 'tag-cloud',
      fields: ['x', 'value'],
      size: [600, 500],
      font: 'Verdana',
      padding: 0,
      timeInterval: 5000, // max execute time
      rotate() {
        let random = ~~(Math.random() * 4) % 4;
        if (random === 2) {
          random = 0;
        }
        return random * 90; // 0, 90, 270
      },
      fontSize(d) {
        if (d.value) {
          return ((d.value - min) / (max - min)) * (40 - 12) + 12;
        }
        return 0;
      }
    });
    const scale = {
      x: {
        nice: false
      },
      y: {
        nice: false
      }
    };
    return (
      <Chart
        width={250}
        height={200}
        data={dv.rows}
        scale={scale}
        padding={0}
        autoFit={false}
        onPointClick={console.log}
      >
        <Tooltip showTitle={false} />
        <Coordinate reflect="y" />
        <Axis name='x' visible={false} />
        <Axis name='y' visible={false} />
        <Legend visible={false} />
        <Geom
          type='point'
          position="x*y"
          color="category"
          shape="cloud"
          tooltip="value*category"
        />
        <Interaction type='element-active' />
      </Chart>
    );
  }
}

export default Wordcloud
