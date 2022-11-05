import React from 'react'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'

export default function RouterPrivate({component: Component, ...rest}) {
  return (
    <div>
        <Route
            {...rest}
            component={(props) => {
                const token = window.localStorage.getItem("userInfo")
                if (token) {
                    return <Component {...props} />;
                }else {
                    return <Redirect to= {"/login"} /> ;
                }
            }}
        />
    </div>
  )
}
