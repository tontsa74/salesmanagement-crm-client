import React, { Component } from 'react';

import {withRouter} from 'react-router-dom';
import axios from '../../../axios-options';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Loading from '../../../components/Loading/Loading';

class EditUser extends Component {

  state = {
    data: {},
    loading: false,
    roleName: undefined,
    userToSave: {}
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const jwt = sessionStorage.getItem('accessToken');

    const { id } = this.props.match.params;
    this.setState({loading: true}, () => {
      axios.get(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
        .then((res) => { 
          this.setState({data: res.data, loading: false}, () => {
            if (this.state.data.roles[1] !== undefined) {
              this.setState({roleName: 'ROLE_ADMIN'});
            } else {
              this.setState({roleName: 'ROLE_USER'});
            }
          });
        })
        .catch(err => console.error(err));
    });
  }

  handleChange = (e) => {
    this.setState({
      data: Object.assign({}, this.state.data, {[e.target.name]: e.target.value})
    });
  }

  handleRoleChange = (e) => {
    this.setState({roleName: e.target.value});
  }

  handleSave = () => {
    const jwt = sessionStorage.getItem('accessToken');
    const options = {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };

    let userToSave = {
      ...this.state.data
    };
    
    let userRoles = {
      ...userToSave.roles
    };

    if (this.state.roleName === 'ROLE_ADMIN') {
      userRoles = [{
        id: 2, definition: 'ROLE_USER'
      }, {
        id: 1, definition: 'ROLE_ADMIN'
      }];
    } else {
      userRoles = [{
        id: 2, definition: 'ROLE_USER'
      }];
    }

    userToSave = {
      ...userToSave,
      roles: userRoles
    };

    axios.put('/admin/users/edit', userToSave, options)
      .then((res) => {
        this.props.update();
        this.props.history.push('/admin/users');
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.loading || this.state.roleName === undefined) {
      return (
        <Loading />
      );
    }

    return (
      <Grid container direction='column' alignItems='center'>
        <Grid item xs={11} style={{textAlign: 'center', marginTop: '5vh'}}>
          <Typography variant='h4' gutterBottom>
            KÄYTTÄJÄN MUOKKAUS
          </Typography>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <TextField
              fullWidth
              variant='outlined'
              label='Käyttäjän ID'
              defaultValue={this.state.data.userId}
              disabled></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <TextField
              fullWidth
              variant='outlined'
              name='userFirst'
              required
              label='Etunimi'
              defaultValue={this.state.data.userFirst}
              onChange={this.handleChange}></TextField>
          </Grid>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <TextField
              fullWidth
              variant='outlined'
              name='userLast'
              required
              label='Sukunimi'
              defaultValue={this.state.data.userLast}
              onChange={this.handleChange}></TextField>
          </Grid>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <FormControl className='content-item' fullWidth>
              <Select
                name='roleName'
                value={this.state.roleName}
                onChange={this.handleRoleChange}
                input={
                  <OutlinedInput
                    name='role'
                    labelWidth={0}
                  />
                }
                required>
                {this.props.roleNames}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify='space-around'>
          <Grid style={{marginTop: '3vh'}} item xs={11}>
            <TextField
              fullWidth
              variant='outlined'
              name='monthlyGoal'
              required
              label='Kuukausitavoite'
              defaultValue={this.state.data.monthlyGoal}
              onChange={this.handleChange}></TextField>
          </Grid>
        </Grid>
        <Button onClick={this.handleSave.bind(this)} size='large' style={{color: '#FFF', marginTop: '5vh', width: '15vw'}} variant='contained' color='primary'>
          Tallenna
        </Button>
      </Grid>
    );
  }
}

export default withRouter(EditUser);