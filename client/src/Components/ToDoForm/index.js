import React from 'react';
import {Formik, Form, Field} from 'formik';
import { format } from 'date-fns';

const ToDoForm = (props) => {

    const initialValues = {
        body: '',
        deadline: format(new Date(), 'yyyy-MM-dd')
    }

    const onSubmit = (values, actions) => {
        props.sendData(values);
        actions.resetForm();
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(props) => (
                <Form>
                    <Field name="body" placeholder="New todo..." />
                    <Field name="deadline" type="date" />
                    <button type='submit'>Send!</button>
                </Form>
            )}
        </Formik>
    );
}

export default ToDoForm;