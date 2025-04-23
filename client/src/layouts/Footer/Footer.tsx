import { Col, Input, Row } from 'antd';

export function Footer() {
  return (
    <div className='w-full bg-black text-white p-12'>
      <h1 className='text-6xl font-bold my-10'>Logo</h1>
      <Row>
        <Col span={5}>
          <ul className='space-y-3'>
            <li className='font-bold text-2xl de'>Shop name</li>
            <li>About us</li>
            <li>Blog</li>
            <li>Hiring</li>
          </ul>
        </Col>
        <Col span={5}>
          <ul className='space-y-3'>
            <li className='font-bold text-2xl de'>Shop name</li>
            <li>About us</li>
            <li>Blog</li>
            <li>Hiring</li>
          </ul>
        </Col>
        <Col span={5}>
          <ul className='space-y-3'>
            <li className='font-bold text-2xl de'>Shop name</li>
            <li>About us</li>
            <li>Blog</li>
            <li>Hiring</li>
          </ul>
        </Col>
        <Col span={8}>
          <h1 className='uppercase text-2xl font-bold'>subscribe to our newsletter</h1>
          <p>Join our mailing list to receive the latest news and updates</p>
          <Input placeholder='Enter your email' size='large' className='my-2' name='email' />
          <button className='w-full py-2 bg-gray-900 uppercase rounded-md'>Subscribe</button>
        </Col>
      </Row>
    </div>
  );
}
