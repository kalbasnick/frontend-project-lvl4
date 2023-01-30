import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap';
import _ from 'lodash';

const generateOnSubmit = ({ onHide }) => (values) => {
  console.log(values.body, `id: ${_.uniqueId()}`);
  onHide();
};

const AddChannel = (props) => {
  const { onHide } = props;
  const f = useFormik({ initialValues: { body: '' }, onSubmit: generateOnSubmit(props) });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <>
      <Modal show>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={f.handleSubmit}>
            <FormGroup>
              <FormControl
                required
                ref={inputRef}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                values={f.values.body}
                data-testid="input-body"
                name="body"
              />
            </FormGroup>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Отменить
          </Button>
          <Button variant="primary">
            Отправить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddChannel;