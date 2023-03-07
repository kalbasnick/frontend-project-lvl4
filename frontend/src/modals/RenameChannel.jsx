import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { Modal, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import * as Yup from 'yup';

const generateValidationSchema = (itmes) => Yup.object().shape({
  body: Yup.string()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .notOneOf(itmes, 'Должно быть уникальным'),
});

const RenameChannel = (props) => {
  const { onHide, handleChannelAction, channels, extra } = props;
  const channelName = channels
  .filter(({ id }) => id === extra.channelId)
  .map(({ name }) => name)
  [0];

  const channelsNames = channels.map(({ name }) => name);
  const addChannelSchema = generateValidationSchema(channelsNames);

  const f = useFormik({ 
    initialValues: { body: channelName },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: addChannelSchema,
    onSubmit: (values) => handleChannelAction({ channelName: values.body }),
  });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  return (
    <>
      <Modal show>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>Переименовать канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={f.handleSubmit}>
            <FormGroup>
              <FormControl
                ref={inputRef}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                values={f.values.body}
                value={f.values.body}
                data-testid="input-body"
                name="body"
                isInvalid={f.errors.body && f.touched.body}
              />
              {f.errors.body && f.touched.body ? <div className="invalid-feedback">{f.errors.body}</div> : null}
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Отменить
          </Button>
          <Button variant="primary" onClick={f.handleSubmit}>
            Отправить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RenameChannel;
