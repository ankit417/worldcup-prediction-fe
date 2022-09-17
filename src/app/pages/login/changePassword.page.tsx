import { useNavigation, useAuth } from "react-auth-navigation";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../../hooks";
import { changePassword } from "../../../redux";
import { isValid, validator } from "../../../utils";

import { ActivityIndicator, Button, InputField, Card } from "../../common";

export const ChangePassword = () => {
  const { location, navigation } = useNavigation();
  const { navigate, routes } = navigation;
  const { toast } = useAuth();

  const dispatch = useDispatch();
  const { changePasswordLoader } = useSelector((state: any) => state.login);

  let query = useQuery();

  const token = query.get("token");

  function useQuery() {
    return new URLSearchParams(location?.search);
  }

  const { data, onChangeHandler } = useInput({
    newPassword: "",
    confirmPassword: "",
  });

  const onSubmit = async (event: any) => {
    event.preventDefault();
    const { newPassword, confirmPassword } = data;

    const catchedErros = {};
    const validate = validator(catchedErros);

    validate("password", newPassword.length === 0, () => {
      toast({ message: "Password musn't be empty!", type: "error" });
    });

    validate("confirmPassword", confirmPassword.length === 0, () => {
      toast({ message: "Re enter Password !", type: "error" });
    });
    if (!!newPassword && !!confirmPassword) {
      validate("confirmPassword", confirmPassword !== newPassword, () => {
        toast({ message: "Password doesn't match!", type: "error" });
      });
    }

    if (!isValid(catchedErros)) {
      console.error(catchedErros);
      return;
    }

    dispatch(
      changePassword(
        {
          token,
          newPass: newPassword,
        },
        () => {
          // router.push("/login");
          navigate(routes.Login.path);
        }
      )
    );
  };

  return (
    <>
      <div className="change-password-container">
        <div className="change-password">
          <Card>
            <form className="change-contents" onSubmit={onSubmit}>
              <h1 className="change-head">Reset Password</h1>

              <div className="change-fields">
                <h1 className="change-fields-title">New Password</h1>
                <InputField
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={onChangeHandler("newPassword")}
                />
              </div>

              <div className="change-fields">
                <h1 className="change-fields-title">Confirm Password</h1>
                <InputField
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={onChangeHandler("confirmPassword")}
                  type="password"
                />
              </div>

              <div className="change-action">
                <ActivityIndicator animating={changePasswordLoader}>
                  <Button
                    type="submit"
                    title="Reset Password"
                    className="fit-content"
                  />
                </ActivityIndicator>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};
