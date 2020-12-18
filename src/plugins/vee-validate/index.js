import {
  required,
  confirmed,
  email,
  numeric,
  min,
  regex
} from "vee-validate/dist/rules";
import { extend } from "vee-validate";

const MOBILE_REGEX = /^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$/;

extend("required", {
  ...required,
  message: "Vui lòng nhập trường này"
});

extend("email", {
  ...email,
  message: "Vui lòng nhập email"
});

extend("confirmed", {
  ...confirmed,
  message: "Mật khẩu không khớp"
});

extend("numeric", {
  ...numeric,
  message: "Trường này phải là số"
});

extend("min", {
  ...min,
  message: "Mật khẩu phải có ít nhất 6 ký tự"
});

extend("phone", {
  validate: val => {
    console.log(val, MOBILE_REGEX.test(val));
    return MOBILE_REGEX.test(val);
  },
  message: "Phải là số điện thoại"
});

extend("regex", regex);
