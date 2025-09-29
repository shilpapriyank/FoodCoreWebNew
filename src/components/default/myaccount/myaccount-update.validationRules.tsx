import { FormErrors, FormValues } from "@/types/myaccount-types/myaccount.type";
import { allRegex } from "../../common/utility";

export default function validate(values: FormValues) {

  let errors: FormErrors = {};

  if (values.validatePassword) {
    if (!values.newpassword) {
      errors.newpassword = "New password is required";
    }

    if (!values.confirmpassword) {
      errors.confirmpassword = "Confirm password is required";
    } else if (
      values.newpassword &&
      values.confirmpassword !== values.newpassword
    ) {
      errors.confirmpassword = "New Password and confirm password must be same";
    }

    return errors;
  }

  if (!values.emailId) {
    errors.emailId = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.emailId as string)) {
    errors.emailId = "Email address is invalid";
  } else if (!allRegex.validateYopMail.test(values.emailId as string)) {
    errors.emailId =
      "The email address you entered which domain not valid, please try other.";
  }

  if (!values.firstname) {
    errors.firstname = "First name is required";
  }

  if (!values.lastname) {
    errors.lastname = "Last name is required";
  }

  if (values.businessname === "") {
    errors.businessname = "Business name is required";
  }

  return errors;

  //old code that  give the buisness name error while only update password
  // if (!values.emailId) {
  //   errors.emailId = "Email address is required";
  // }
  // if (!/\S+@\S+\.\S+/.test(values.emailId as string)) {
  //   errors.emailId = "Email address is invalid";
  // }
  // if (
  //   !allRegex.validateYopMail.test(values.emailId as string) &&
  //   /\S+@\S+\.\S+/.test(values.emailId as string)
  // ) {
  //   errors.emailId =
  //     "The email address you entered which domain not valid, please try other.";
  // }
  // if (!values.firstname) {
  //   errors.firstname = "First name is required";
  // }

  // if (values.businessname === "") {
  //   errors.businessname = "Business name is required";
  // }
  // if (!values.lastname) {
  //   errors.lastname = "Last name is required";
  // }

  // if (values.validatePassword) {
  //   if (!values.confirmpassword) {
  //     errors.confirmpassword = "Confirm password is required";
  //   }

  //   if (!values.newpassword) {
  //     errors.newpassword = "New password is required";
  //   }
  //   if (values.newpassword) {
  //     if (!values.confirmpassword) {
  //       errors.confirmpassword = "please enter the confirm password";
  //     } else if (values.confirmpassword !== values.newpassword) {
  //       errors.confirmpassword =
  //         "New Password and confirm password must be same";
  //     }
  //   }

  //   // if (values.confirmpassword !== values.newpassword) {
  //   //   errors.confirmpassword = "New Password and confirm password must be same";
  //   // }
  // }
  //return errors;
}
