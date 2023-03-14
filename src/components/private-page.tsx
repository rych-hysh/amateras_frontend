import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../auth/use-auth";

interface Props {
	children: React.ReactNode
}

const PrivatePage: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  return isLoading ? <div>loading</div> : isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};
export default PrivatePage;