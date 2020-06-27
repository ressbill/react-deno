import React from 'react'
import {ServerContext} from './serverContext'
export const ServerState = ({children}) => {
    return (
        <ServerContext.Provider value>
            {children}
        </ServerContext.Provider>
    )
}