import React, { Fragment } from 'react';
import TaskInput from './components/TaskInput';
import List from './components/List';
import { Paper, Grid, Tabs, Tab, Hidden } from "@material-ui/core";
import { 
  BrowserRouter, 
  NavLink, 
  Route, 
  Switch,
  Redirect,
  Link 
} from 'react-router-dom';

const styles = {
  Paper: {
    padding: 20,
    margin: "auto", 
    textAlign: "center",
    width: 500
  }
};

const App = ({ location }) => {

  return (
    <div>
      <Hidden xsDown>
        <Tabs orientation='horizontal'
              /* value={location.pathname} */
        >
          <Tab 
            label='Main'
            component={Link}
            to='/main'
            value='/main'
            onClick={(e) => {
              if (location.pathname === '/main') e.preventDefault();
            }}
          />
          <Tab 
            label='Completed'
            component={Link}
            to='/completed'
            value='/completed'
            onClick={(e) => {
              if (location.pathname === './completed') e.preventDefault();
            }}
          />
          <Tab 
            label='Settings'
            component={Link}
            to='/settings'
            value='/value'
            onClick={(e) => {
              if (location.pathname === './settings') e.preventDefault();
            }}

           />
        </Tabs>
      </Hidden>
      <Grid container spacing={0}>
          <Grid item xs={12}>
            <Paper style={styles.Paper}>
              <TaskInput />
            </Paper>
          </Grid>

        <Grid item xs={12} style={styles.Paper}>
          <Grid container>
            <List />
          </Grid>        
        </Grid>
      </Grid>

    </div>
    );
}
  
 export default App;
