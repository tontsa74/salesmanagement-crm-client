import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LeadContent extends Component {
  state = {
    date: new Date().toISOString().split('T')[0],
    companyname: '',
    businessarea: '',
    website: '',
    personname: '',
    personrole: '',
    personemail: '',
    personphone: '',
    info: ''
  }

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return(
      <div className='content-all'>
      
        <Typography variant='h5' className='event-header'>
            Liidi
        </Typography>

        <div className='content-fields'>
          <TextField
            name='date'
            label='Päivämäärä'
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
            required
            value={this.state.date}
          />
          
          <TextField
            name='companyname'
            label='Yrityksen nimi'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
            required
          />
          
          <TextField
            name='businessarea'
            label='Yrityksen toimiala'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
          />
          <TextField
            name='website'
            label='Yrityksen kotisivu'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
          />
        </div>
      
        <Typography variant='h5' className='event-header'>
            Yhteyshenkilö:
        </Typography>
        
        <div className='content-fields'>
          <TextField
            name='personname'
            label='Nimi'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
            required
          />
          
          <TextField
            name='personrole'
            label='Rooli'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
            required
          />
          
          <TextField
            name='personemail'
            label='Sähköposti'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
          />
          <TextField
            name='personphone'
            label='Puhelinnumero'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
          />
        </div>

        <Typography variant='h5' className='event-header'>
            Lisätiedot:
        </Typography>

        <div className='info-container'>
          <TextField
            name='info'
            label='Lisätiedot'
            onChange={this.handleChange}
            className='content-item'
            variant='outlined'
            multiline={true}
            fullWidth={true}
          />
        </div>

        <Button 
          variant='contained' 
          color='primary' 
          onClick={this.props.handleClick(this.state)}
          size='large'
          className='button-save'>Tallenna</Button>

      </div>
    );
  }

}

export default LeadContent;