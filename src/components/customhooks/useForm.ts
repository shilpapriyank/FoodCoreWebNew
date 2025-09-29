import React, { useState, useEffect } from "react";
import {
  allRegex,
  formatePhoneNumber,
  unFormatePhoneNumber,
} from "../common/utility";
import {
  characterValid,
  dateValidate,
  numberValidate,
} from "../default/helpers/validate";
import { FormErrors, FormValues } from "@/types/myaccount-types/myaccount.type";

const initialFormValues: FormValues = {
  firstname: "",
  lastname: "",
  emailId: "",
  //businessname: "",
  newpassword: "",
  confirmpassword: "",
  validatePassword: false,
};

const useForm = (
  callback: () => void,
  validate: (values: FormValues) => Partial<Record<keyof FormValues, string>>
) => {
  const [values, setValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setIsDisabled(true);
      callback();
    }
  }, [errors]);

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
    setIsDisabled(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));

    setErrors((errors) => ({
      ...errors,
      [event.target.name]: "",
    }));

    updatevalue();
    setIsDisabled(false);
  };

  const updatevalue = () => {
    if (Object.keys(errors).length > 0) {
      setIsDisabled(false);
    }
  };

  const handleCustomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let regex1 = allRegex.phoneRegex1;
    let regex2 = allRegex.validwithFormatephoneRegex;
    let regex3 = allRegex.phoneRegex3;
    let validdigit = allRegex.validdigit;

    // if (phoneno.length > 10)
    //   return;
    // if (phoneno === "")
    //   setuserName(e.target.value);
    // if ((regex1.test(phoneno) || regex2.test(phoneno) || (regex3.test(phoneno))) && validdigit.test(phoneno)) {
    //   setuserName(e.target.value);
    //   if (userName.length === 9) {
    //     setuserName(formatePhoneNumber(e.target.value));
    //   }
    //   if (phoneno.length < 10) {
    //     setuserName(unFormatePhoneNumber(e.target.value));
    //   }
    event.persist();
    if (event.target.name === "custom_testimonial_phone") {
      let phoneno = unFormatePhoneNumber(event.target.value);
      if (phoneno.length > 10) return;
      if (phoneno === "")
        setValues((values) => ({
          ...values,
          [event.target.name]: event.target.value,
        }));
      if (
        (regex1.test(phoneno) ||
          regex2.test(phoneno) ||
          regex3.test(phoneno)) &&
        validdigit.test(phoneno)
      ) {
        // setValues((values) => ({
        //   ...values,
        //   [event.target.name]: event.target.value,
        // }));
        setValues((values) => ({
          ...values,
          [event.target.name]: event.target.value,
        }));
        if (event.target.value?.length === 10) {
          setValues((values) => ({
            ...values,
            [event.target.name]: formatePhoneNumber(event.target.value),
          }));
        }
        if (phoneno.length < 10) {
          setValues((values) => ({
            ...values,
            [event.target.name]: unFormatePhoneNumber(event.target.value),
          }));
        }
        setErrors((errors) => ({
          ...errors,
          [event.target.name]: "",
        }));
        updatevalue();
        // return;
      } else {
        return;
      }
    } else {
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.value,
      }));

      setErrors((errors) => ({
        ...errors,
        [event.target.name]: "",
      }));
      updatevalue();
    }
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.persist();
    //fillpageInfo();
    if (event.target.name === "email" || event.target.name === "zipcode") {
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.value,
      }));

      setErrors((errors) => ({
        ...errors,
        [event.target.name]: "",
      }));
    } else if (
      event.target.name === "cardnumber" &&
      numberValidate(event.target.value) &&
      event.target.value !== "" &&
      event.target.value.length <= 16
    ) {
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.value,
      }));

      setErrors((errors) => ({
        ...errors,
        [event.target.name]: "",
      }));
      updatevalue();
    } else if (
      event.target.name === "expiremonthyear" &&
      dateValidate(event.target.value) &&
      event.target.value.length <= 5
    ) {
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.value,
      }));
    } else if (
      event.target.name === "cvv" &&
      numberValidate(event.target.value) &&
      event.target.value !== "" &&
      event.target.value.length <= 3
    ) {
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.value,
      }));
    } else if (
      event.target.name === "cardname" &&
      characterValid(event.target.value)
    ) {
      setValues((values) => ({
        ...values,
        [event.target.name]: event.target.value,
      }));
    } else {
      setValues((values) => ({
        ...values,
        [event.target.name]: "",
      }));
    }
  };

  const fillpageInfo = () => {
    setValues({
      email: "test@gmail.com",
      cardnumber: "4242424242424242",
      expiremonthyear: "20/22",
      cvv: 123,
      cardname: "test",
      zipcode: 123456,
    });
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    handleCustomChange,
    isDisabled,
    handlePaymentChange,
  };
};

export default useForm;
