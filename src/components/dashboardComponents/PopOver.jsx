/* eslint-disable no-unused-vars */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export default function PopoverPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          
          <img
            className="w-8 h-8 rounded-full border-4 border-indigo-400"
            src="https://randomuser.me/api/portraits/women/50.jpg"
            alt=""
            {...bindTrigger(popupState)}
          />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
          >
            <center >
            <Box sx={{ p: 3 }}>
            <Typography sx={{ p: 2 }}><Link to="/profile">Profile</Link></Typography>
            <Typography sx={{ p: 2 }}><Link to="/settings">Settings</Link></Typography>
            <Button sx={{backgroundColor:'yellow'}}>Log Out</Button>
            </Box>
            </center>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
