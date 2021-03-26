import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "components/CustomButtons/Button.js";
import Accordion from "components/Accordion/Accordion.js";


import {handleJoinRequestAsAdmin,getJoinRequestsByGrouIp} from "../../util/ApiUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex:100,
    position: 'fixed',
    overflow: 'auto',
    maxHeight: 300,
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();

  const [requests,setRequests] = React.useState([]);

  React.useEffect(() => {
    getJoinRequestsByGrouIp(props.groupId).then((response)=>{
      setRequests(response.content);
    })
},[]);
  return (
      requests.length>0?
          <div style={{marginLeft: "50px"}} className={classes.root}>
              <div style={{marginLeft: "20px"}}>
      <Accordion  className={classes.root}
          active={0}
          collapses={[
              ...requests.map((r)=>{
              return(
                  {
                    title: "User " + r.candidateUsername + " requested to join",
                      content: <div>Message:  {r.message}
                      <div>
                          <Button onClick={()=>{handleJoinRequestAsAdmin(r.id,1).then(()=>{getJoinRequestsByGrouIp(props.groupId).then((response)=>{setRequests(response.content)})})}} size={"sm"} style={{marginRight:"40px"}}>Accept</Button>
                          <Button onClick={()=>{handleJoinRequestAsAdmin(r.id,-1).then(()=>{getJoinRequestsByGrouIp(props.groupId).then((response)=>{setRequests(response.content)})})}} size={"sm"}>Decline</Button></div>
                      </div>
                  }
              )
            })
          ]}
      /></div>
      </div>:null
  );
}