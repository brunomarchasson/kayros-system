import { useEffect, useState } from 'react';
// import { useLocalize } from 'react-localize';
import { useTranslation } from 'react-i18next';
import { validate } from './validation';

export const useInput = (opts = {}) => {
  const [value, setValue] = useState(opts.initialValue);
  const [error, setError] = useState();
  const { t } = useTranslation();
  useEffect(() => {
    opts.form.registerField({
      key: opts.key,
      reset,
    });
  }, []);

  useEffect(() => {
    opts.form.setFieldError(opts.key, error);
  }, [error]);

  useEffect(() => {
    if (opts.validate || opts.validateItems) setError(validate(opts, value, t));
    opts.form.setFieldValue(opts.key, value);
  }, [value]);

  const reset = () => setValue(opts.initialValue);

  return {
    value,
    setValue,
    reset,
    bind: {
      label: opts.label,
      error: error?.length,
      errors: error,
      helperText: error?.[0],
      setError,
      value,
      onChange: (v) => {
        setValue(v);
      },
    },
  };
};
