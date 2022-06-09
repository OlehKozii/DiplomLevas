import React, { useContext, useState } from "react";

import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);

  return <div>gdfgdfg</div>;
});

export default Auth;
