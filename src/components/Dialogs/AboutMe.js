import React, { useMemo } from 'react';
import flowRight from 'lodash/flowRight';
import TextField from 'react-md/lib/TextFields/TextField';
import TextFieldMessage from 'react-md/lib/TextFields/TextFieldMessage';
import Select from 'react-select';
import withDialog from 'lib/hocs/dialog';
import { getValidationResult, getAddressValue, getAddressOptions } from 'lib/tools';
import DatePicker from 'react-datepicker';

import * as yup from 'yup';
import {
  customChangeHandler,
} from './Job';

function AboutMe(props) {
  const { formState, formHandlers } = props;
  const { fields, errors } = formState;
  console.log('fields: ', fields);
  const { onElementChange, onChange } = formHandlers;
  return (
    <>
      <div className="row iFieldRow">
        <TextField
          className="iField col-md-6"
          label="Firstname*"
          id="first_name"
          error={!!errors.first_name}
          errorText={errors.first_name}
          value={fields.first_name || ''}
          onChange={onElementChange}
        />
        <TextField
          className="iField col-md-6"
          label="Lastname*"
          id="last_name"
          error={!!errors.last_name}
          errorText={errors.last_name}
          value={fields.last_name || ''}
          onChange={onElementChange}
        />
      </div>
      <div className="row iFieldRow">
        <div className="iField col-md-6">
          <label>Date of Birth</label>
          <DatePicker
            placeholderText="Select Date"
            selected={new Date(fields.birth_date) || ''}
            onChange={value => onChange('birth_date', value)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"

          />
          <TextFieldMessage
            errorText={errors.birth_date}
            error={errors.birth_date}
          />
        </div>
        <TextField
          className="iField col-md-6"
          id="nationality"
          label="Nationality"
          onChange={onElementChange}
          error={!!errors.nationality}
          errorText={errors.nationality}
          value={fields.nationality || ''}
        />
      </div>
      <div className="row iFieldRow">
        <TextField
          className="iField col-md-6"
          id="email"
          label="Email*"
          type="email"
          onChange={onElementChange}
          error={!!errors.email}
          errorText={errors.email}
          value={fields.email || ''}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          className="iField col-md-6"
          id="contact_number"
          label="Contact Number"
          onChange={onElementChange}
          error={!!errors.contact_number}
          errorText={errors.contact_number}
          value={fields.contact_number || ''}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div className="row iField">
        <div className="iField col-md-4">
          <label>Province</label>
          <Select
            isSearchable
            getOptionLabel={e => e.provDesc}
            value={getAddressValue('province', fields)}
            onChange={value => onChange('province', value.provCode)}
            options={getAddressOptions('province')}
          />
          <TextFieldMessage
            errorText={errors.province}
            error={errors.province}
          />
        </div>
        <div className="iField col-md-4">
          <label>Municipality</label>
          <Select
            isSearchable
            getOptionLabel={e => e.citymunDesc}
            value={getAddressValue('municipality', fields)}
            onChange={value => onChange('municipality', value.citymunCode)}
            options={getAddressOptions('municipality', fields)}
          />
          {errors.municipality && (
            <span>{errors.municipality}</span>
          )}
        </div>
        <div className="iField col-md-4">
          <label>Barangay</label>
          <Select
            isSearchable
            getOptionLabel={e => e.brgyDesc}
            onChange={value => onChange('barangay', value.brgyCode)}
            options={getAddressOptions('barangay', fields)}
            value={getAddressValue('barangay', fields)}
          />
          <TextFieldMessage
            errorText={errors.barangay}
            error={errors.barangay}
          />
        </div>
      </div>
      <TextField
        className="iField"
        id="address"
        label="Street"
        margin="normal"
        variant="outlined"
        onChange={onElementChange}
        error={!!errors.address}
        errorText={errors.address}
        value={fields.address || ''}
      />
    </>
  );
}

function validator(data) {
  const schema = yup.object({
    first_name: yup.string().required('Firstname is required'),
    last_name: yup.string().required('Lastname is required'),
    email: yup.string().email().required('Email is required'),
    // address: yup.string().required().error(() => 'Address is required'),
    // nationality: yup.string().required().error(() => 'Nationality is required'),
    // contact_number: joi
    //   .string()
    //   .regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)
    //   // .required()
    //   .error(() => 'Invalid Phone Number'),
    // birth_date: yup.date().required().error(() => 'Birth Date is required')
  });
  return getValidationResult(data, schema);
}

const Dialog = flowRight(
  withDialog(),
)(AboutMe);

Dialog.defaultProps = {
  validator,
  customChangeHandler,
};
export default Dialog;
