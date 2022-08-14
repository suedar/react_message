import React, { FC, ReactElement } from "react";
import IconInfo from "../static/info";
import IconError from '../static/error'
import IconSuccess from '../static/success'
import IconWarning from '../static/warning'

import "./style.scss";

export type MessageType = 'info' | 'success' | 'error' | 'warning'

export interface MessageProps {
    text: string;
    type: MessageType
}

const Message: FC<MessageProps> = (props: MessageProps) => {
    const { text, type } = props
   
    const renderIcon = (messageType: MessageType): ReactElement => {

        const iconMap = {
            info: <IconInfo />,
            success: <IconSuccess />,
            warning: <IconWarning />,
            error: <IconError />,
        };

        return iconMap[messageType]
      }

   
    return (<div className="message">
        <div className="message-content">
            <div className={`message-content-icon message-content-icon-${type}`}>
                {renderIcon(type)}
            </div>
            <div className="message-content-text">
                {text}
            </div>
        </div>
    </div>
  )
}
   

export default Message