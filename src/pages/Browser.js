/**
 * @flow
 */

import React from 'react'
import axios from 'axios'
import 'react-select/dist/react-select.css';
import Select from 'react-select'
import { Button } from 'react-bootstrap'

type Option = {
  value : string,
  label : string
}

export default class Browser extends React.Component{
  state : {
    defs : Array<Option>,
    selected : ?Option
  }

  constructor(){
    super();
    this.state = {
      defs : [],
      selected : null
    }
  }

  componentWillMount(){
    axios.get('/defs')
      .then(({data}) => {
        this.setState({...this.state, defs : data.map(f => ({value : f, label : f}))})
      })
  }

  render(){
    return(
      <div>
        <div style={styles.container}>
          <h2 style={{color : 'white'}}>
            Flow Typed Browser
          </h2>
        </div>
        <div style={{width : '100%', marginTop : 30}}>
          <h3 className='text-center'>Select Project</h3>
          <div  style={{margin : '0 auto', width : '70%'}}>
            <Select
              value={this.state.selected}
              options={this.state.defs}
              onChange={(option : Option) => this.setState({...this.state, selected : option})}
            />
          </div>
          <div  style={{display : 'flex', justifyContent : 'center', marginTop : 20}}>
            <Button bsStyle='primary' disabled={this.state.selected == null}>
              View Defs
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  container : {
    height : 150, 
    backgroundColor : 'black', 
    margin : 0,
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
  }
}