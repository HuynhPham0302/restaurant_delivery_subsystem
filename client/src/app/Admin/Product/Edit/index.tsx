/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCategory } from '@/types/Category.types';
import { TProduct } from '@/types/Product.types';
import HTTP, { TResponse } from '@/utils/Http.utils';
import { InboxOutlined, LoadingOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Upload,
  UploadProps,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VALIDATION_RULES = [{ required: true, message: 'This field is required' }];

const { Dragger } = Upload;

const OptionCategory = (category: TCategory[]) => {
  return category.map((item) => ({ value: item.id, label: item.name }));
};

export default function AdminEditProduct() {
  const [form] = Form.useForm();
  const [api, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useQuery<TResponse<TProduct>>({
    queryKey: ['product', id],
    queryFn: async () => await HTTP.GET(`/product/${id}`),
    enabled: !!id,
  });

  useEffect(() => {
    if (product) {
      setImageUrl(product.metadata.image_cover);
      form.setFieldsValue({
        ...product.metadata,
        categoryId: product.metadata.category_id,
        meta: Object.keys(product.metadata.meta).map((key) => ({
          key,
          value: product.metadata.meta[key],
        })),
      });
    }
  }, [form, product]);

  const { data: category, isFetching } = useQuery<TResponse<TCategory[]>>({
    queryKey: ['category'],
    queryFn: async () => await HTTP.GET(`/category`),
  });

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    listType: 'picture-card',
    action: import.meta.env.VITE_UPLOAD_URL,
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        api.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        api.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.url);
      setLoading(false);
      api.success('Image uploaded successfully');
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    console.log('RAW: ', values);

    values.image_cover = imageUrl;

    if (values.image === undefined) {
      delete values.image;
    } else {
      values.image = values.image.fileList.map((image: any) => ({
        url: image.response.url,
      }));
    }
    values.meta = values.meta.reduce((acc: { [x: string]: any }, { key, value }: any) => {
      acc[key] = value;
      return acc;
    }, {} as Record<string, any>);

    console.log('VALUES: ', values);

    const update = await HTTP.PATCH<TResponse<TProduct>>(`/product/${id}`, values);
    if (update.status_code === 201) {
      api.success('Update product success');
    } else {
      api.error('Update product failed');
    }
    setLoading(false);
  };

  return (
    <section>
      {contextHolder}
      {!isLoading ? (
        <>
          <h1 className='text-2xl font-bold'>Create Product</h1>
          <Form form={form} onFinish={onFinish} layout='vertical' className='mt-6'>
            <Row gutter={[20, 20]}>
              <Col span={8}>
                <Form.Item label='Product Name' name='name' rules={VALIDATION_RULES}>
                  <Input type='text' className='w-full' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='Brand' name='brand' rules={VALIDATION_RULES}>
                  <Input type='text' className='w-full' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label='SKU' name='sku' rules={VALIDATION_RULES}>
                  <Input type='text' className='w-full' />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label='Category' name='categoryId' rules={VALIDATION_RULES}>
              <Select
                options={OptionCategory(category?.metadata || [])}
                loading={isFetching}
                placeholder='Select category'
                className='w-full'
              />
            </Form.Item>
            <Form.Item label='Description' name='description' rules={VALIDATION_RULES}>
              <Input.TextArea rows={4} className='w-full' />
            </Form.Item>
            <Form.Item name='image_cover' label='Image Cover'>
              <Upload
                name='file'
                listType='picture-card'
                className='avatar-uploader'
                accept='image/*'
                showUploadList={false}
                action={import.meta.env.VITE_UPLOAD_URL}
                onChange={handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item label='Images' name='image'>
              <Dragger
                defaultFileList={product?.metadata.images.map((item) => {
                  return {
                    uid: item.id,
                    name: item.url,
                    status: 'done',
                    url: item.url,
                    response: { url: item.url },
                  };
                })}
                {...props}
                accept='image/*'
              >
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined />
                </p>
                <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                <p className='ant-upload-hint'>
                  Only support for <strong>image</strong> files
                </p>
              </Dragger>
            </Form.Item>
            <p className='my-2'>Items product</p>
            <Form.List name='items'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} size='middle' style={{ display: 'flex', marginBottom: 8 }} align='center'>
                      <Form.Item name={[name, 'type']} initialValue='size' hidden />
                      <Form.Item label='Size type' {...restField} name={[name, 'description']} rules={VALIDATION_RULES}>
                        <Input placeholder='EX: UK 40, US 40.5' />
                      </Form.Item>
                      <Form.Item label='Stock' {...restField} name={[name, 'stock']} rules={VALIDATION_RULES}>
                        <InputNumber className='w-44' />
                      </Form.Item>
                      <Form.Item label='Price' {...restField} name={[name, 'price']} rules={VALIDATION_RULES}>
                        <InputNumber className='w-44' prefix={'$'} />
                      </Form.Item>
                      <Form.Item
                        initialValue={false}
                        className='w-40'
                        label='Is Discount'
                        {...restField}
                        name={[name, 'is_discount']}
                      >
                        <Switch />
                      </Form.Item>
                      <Form.Item initialValue={0} label='Discount' {...restField} name={[name, 'discount']}>
                        <InputNumber className='w-44' placeholder='Enter the discount percentage' prefix={'%'} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <p className='my-2'>Meta data</p>
            <Form.List name='meta'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} size='middle' style={{ display: 'flex', marginBottom: 8 }} align='center'>
                      <Form.Item label='Title' {...restField} name={[name, 'key']} rules={VALIDATION_RULES}>
                        <Input />
                      </Form.Item>
                      <Form.Item label='Value' {...restField} name={[name, 'value']} rules={VALIDATION_RULES}>
                        <Input />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                      Add field
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button disabled={loading} loading={loading} type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div className='w-full h-[80vh] flex flex-col items-center justify-center space-y-3'>
          <Spin />
          <p>Loading</p>
        </div>
      )}
    </section>
  );
}
