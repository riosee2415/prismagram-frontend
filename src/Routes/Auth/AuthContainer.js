import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");

  const secret = useInput("");

  const [requestSecretMutation] = useMutation(LOG_IN, {
    //update는 useMutation의 결과를 얻는 로직이다.
    // update: (_, { data }) => {
    //   const { requestSecret } = data;

    //   if (!requestSecret) {
    //     toast.error("You Don't have an account yet, create one!");
    //     setTimeout(() => setAction("signUp"), 2000);
    //   }
    // },

    // LOG_IN 이라는 함수를 실행할 때 필요한 파라미터를 전달한다.
    variables: { email: email.value },
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret },
          } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error("You Don't have an account yet, create one!");
            setTimeout(() => setAction("signUp"), 2000);
          } else {
            toast.success("Check Your inbox for your Login Secret.");
            setAction("confirm");
          }
        } catch (e) {
          toast.error("Can't request secret, try again");
        }
      } else {
        toast.error("Email is Required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();

          if (!createAccount) {
            toast.error("Can't create account, try again");
            setTimeout(() => setAction("signUp"), 2000);
          } else {
            toast.success("Account Created! Login Now");
            setTimeout(() => setAction("logIn"), 2000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("All Field are Required");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretMutation();

          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch (e) {
          toast.error("Can't confirm Secret");
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
