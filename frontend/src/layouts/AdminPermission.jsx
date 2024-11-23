import { useSelector } from "react-redux";
import { isAdminUser } from "../utils/util";

const AdminPermission = ({ children }) => {
  const user = useSelector((state) => state.user);

  return (
    <>{isAdminUser(user.role) ? children : <p>Do not have permission</p>}</>
  );
};

export default AdminPermission;
