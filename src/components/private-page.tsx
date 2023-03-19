import { CircularProgress } from "@mui/material";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../auth/use-auth";

import './private-page.scss';

interface Props {
	children: React.ReactNode
}

const PrivatePage: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  return isLoading ? <div id="page-loading"><CircularProgress /></div> : isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};
export default PrivatePage;