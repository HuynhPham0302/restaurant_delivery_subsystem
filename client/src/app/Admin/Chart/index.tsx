import { Col, Divider, Row } from 'antd';
import BarChart from './BarChart';
import AreaChart from './AreaChart';

export default function AdminChart() {
  return (
    <section>
      <h1 className='text-2xl font-bold'>Sales Report</h1>
      <Divider />
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <BarChart />
        </Col>
        <Col span={12}>
          <AreaChart />
        </Col>
      </Row>
    </section>
  );
}
