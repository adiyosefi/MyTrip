import React, { useContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';



const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const currentUserState = useContext(UserContext);
  if (currentUserState) {
    return (
      <Route
        {...rest}
        render={routeProps =>
          !!currentUserState ? (
            <RouteComponent {...routeProps} />
          ) : (
              <Redirect to={"/signin"} />
            )
        }
      />
    );
  }
  // return spinner
  return (
    <Box display="flex" justifyContent="center" alignItems="center" m={1}
     p={1} width={1} height={600} bgcolor="background.paper">
        <CircularProgress variant="determinate" value={progress} />
    </Box>
  );
};

export default PrivateRoute;