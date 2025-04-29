import { Col, Row } from 'antd';
import BarChart from './BarChart';
import AreaChart from './AreaChart';

export default function AdminChart() {
  return (
    <Row gutter={[20, 20]}>
      <Col span={12}>
        <BarChart />
      </Col>
      <Col span={12}>
        <AreaChart />
      </Col>
    </Row>
  );
}
