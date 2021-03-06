import React from 'react';
import flowRight from 'lodash/flowRight';
import TextField from 'react-md/lib/TextFields/TextField';
import TextFieldMessage from 'react-md/lib/TextFields/TextFieldMessage';
import withDialog from 'lib/hocs/dialog';
import { getValidationResult } from 'lib/tools';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';

function ExperienceDialog(props) {
  const { formState, formHandlers } = props;
  const { fields, errors } = formState;
  const { onElementChange, onChange } = formHandlers;
  return (
    <>
      <TextField
        className="iField"
        required
        label="Position title"
        id="position"
        errorText={errors.position}
        value={fields.position || ''}
        error={!!errors.position}
        onChange={onElementChange}
      />
      <TextField
        className="iField"
        required
        id="company"
        label="Company"
        onChange={onElementChange}
        error={!!errors.company}
        errorText={errors.company}
        value={fields.company || ''}
      />
      <div className="row iFieldRow">
        <div className="iField col-md-6">
          <label>Date Started*</label>
          <DatePicker
            placeholderText="Select Date"
            selected={fields.start_date || ''}
            onChange={value => onChange('start_date', value)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
          <TextFieldMessage
            errorText={errors.start_date}
            error={errors.start_date}
          />
        </div>
        <div className="iField col-md-6">
          <label>Date Ended</label>
          <DatePicker
            placeholderText="Present"
            selected={fields.end_date || ''}
            onChange={value => onChange('end_date', value)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            isClearable
          />
          <TextFieldMessage
            errorText={errors.end_date}
            error={errors.end_date}
          />
        </div>
      </div>
    </>
  );
}

function validator(data) {
  const schema = yup.object({
    position: yup.string().required('Position is required'),
    company: yup.string().required('Company is required'),
    start_date: yup.date().required('Start Date is required'),
  });
  return getValidationResult(data, schema);
}

const Dialog = flowRight(
  withDialog(),
)(ExperienceDialog);

Dialog.defaultProps = {
  validator,
};

export default Dialog;
