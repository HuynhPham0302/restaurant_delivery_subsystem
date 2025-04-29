import { Tag } from 'antd';

export default function StatusTag({ status }: { status: string }) {
  const color: { [key: string]: string } = {
    pending: 'orange',
    processing: 'blue',
    delivering: 'purple',
    completed: 'green',
    cancelled: 'red',
  };

  return <Tag color={color[status]}>{status}</Tag>;
}
