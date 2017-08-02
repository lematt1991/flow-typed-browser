/**
 * @flow
 */

import 'highlight.js/styles/vs.css'
import React from 'react'
import axios from 'axios'
import 'react-select/dist/react-select.css';
import Select from 'react-select'
import { Button } from 'react-bootstrap'
import Highlight from 'react-highlight';
import type { GHResponse } from '../types/Github'

type Option = {
  value : string,
  label : string,
  obj : GHResponse
}

export default class Browser extends React.Component{
  state : {
    defs : Array<Option>,
    selected : Array<Option>,
    code : ?GHResponse
  }

  constructor(){
    super();
    this.state = {
      defs : [],
      selected : [],
      code : null
    }
  }

  fetchOptions(url : string){
    axios.get(url)
      .then(({data}) => {
        const newDefs = data.map(f => ({value : f.name, label : f.name, obj : f}));
        this.setState({
          ...this.state, 
          defs : this.state.defs.concat([newDefs])
        })
      })
  }

  componentWillMount(){
    this.fetchOptions('https://api.github.com/repos/flowtype/flow-typed/contents/definitions/npm')
  }

  select = (i : number) => (option : Option) => {
    this.setState({ 
      ...this.state, 
      selected : this.state.selected.slice(0, i).concat([option]),
      defs : this.state.defs.slice(0, i+1),
      code : null,
    })

    if(option && option.obj.type === 'file'){
      axios.get(option.obj.url)
        .then(({data}) => {
          this.setState({...this.state, code : data})
        })
    }else if(option && option.obj.type === 'dir'){
      this.fetchOptions(option.obj.url);
    }
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
          {
            this.state.defs.map((defs, i) => 
              <div key={i} style={{margin : '0 auto', width : '70%', marginTop : 10}}>
                <Select
                  value={this.state.selected[i]}
                  options={defs}
                  onChange={this.select(i)}
                />
              </div>
            )
          }
        </div>
        {
          this.state.code ? 
            <div className='col-xs-10 col-xs-offset-1' style={styles.codeContainer}>
              <Highlight className='javascript'>
                {atob(this.state.code.content)}
              </Highlight>
            </div> : null
        }
      </div>
    )
  }
}

const styles = {
  codeContainer : {
    marginTop : 20,
    overflowY : 'scroll'
  },
  container : {
    height : 150, 
    backgroundColor : 'black', 
    margin : 0,
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
  }
}