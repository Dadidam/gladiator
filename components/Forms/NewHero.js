import React from 'react';
import {Form, Icon, Input, Button, Card} from 'antd';
import dictionary from 'Player/Dictionary';

const FormItem = Form.Item;

export default Form.create()(
    (props) => {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = props.form;
        const heroNameError = isFieldTouched('heroName') && getFieldError('heroName');

        const handleSubmit = (e) => {
            e.preventDefault();

            props.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    props.createNewHero();
                }
            });
        };

        const hasErrors = (fieldsError) => {
            return Object.keys(fieldsError).some(field => fieldsError[field]);
        };

        return (
            <Card title="Create new hero" style={{ width: 350 }}>
                <Form layout="inline" onSubmit={handleSubmit}>
                    <FormItem
                        validateStatus={heroNameError ? 'error' : ''}
                        help={heroNameError || ''}
                    >
                        {getFieldDecorator('heroName', {
                            rules: [{
                                required: true, message: 'Please input name of your hero!'
                            }, {
                                min: 3, message: 'Hero name too short'
                            }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                onChange={props.updateName}
                                placeholder="Russell Crowe"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                        >
                            {dictionary.create}
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        )
    }
);
